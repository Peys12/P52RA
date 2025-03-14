<script lang="ts">
    import PocketBase from "pocketbase";
    import { onMount } from "svelte";
    import { writable, derived } from "svelte/store";


    let pb = new PocketBase("http://localhost:8090");
    
    type Produk = {
        id: string;
        nama: string;
    };

    type Pesanan = {
        id: string;
        nama: string;
        whatsapp: string;
        produk: Produk;
        total_pesanan: number;
        harga: number;
        pesan: string;
        catatan: string;
        expand?: { produk?: Produk };
    };

    let orders = writable<Pesanan[]>([]);
    let openOrderName = writable<string | null>(null);

        async function fetchOrders() {
    try {
        let records = await pb.collection("pesanan").getFullList<Pesanan>({
            expand: "produk"
        });
        console.log("Data pesanan:", records); // Debugging

        records = records.map(order => ({
            ...order,
            produk: typeof order.produk === "string" 
                ? { id: order.produk, nama: "(Produk Tidak Ditemukan)" } 
                : order.expand?.produk || { id: "", nama: "(Produk Tidak Ditemukan)" }
        }));
        orders.set(records);
    } catch (error) {
        console.error("Gagal mengambil pesanan:", error);
    }
}


    onMount(fetchOrders);

    function toggleDetails(nama: string) {
        openOrderName.update(currentName => (currentName === nama ? null : nama));
    }

    let groupedOrders = derived(orders, ($orders) => {
        let grouped = new Map();
        $orders.forEach(order => {
            if (!grouped.has(order.nama)) {
                grouped.set(order.nama, []);
            }
            grouped.get(order.nama).push(order);
        });
        return grouped;
    });
</script>

<main class="container mx-auto p-6">
    <h1 class="text-2xl font-bold mb-4">Daftar Pesanan</h1>
    <div class="overflow-x-auto">
        <table class="table-auto w-full border-collapse border border-gray-300">
            <thead>
                <tr class="bg-gray-100">
                    <th class="border p-2">Nama</th>
                </tr>
            </thead>
            <tbody>
                {#each Array.from($groupedOrders.keys()) as nama}
                    <tr class="border cursor-pointer bg-gray-100" on:click={() => toggleDetails(nama)}>
                        <td class="border p-2 font-bold">{nama}</td>
                    </tr>

                    {#if $openOrderName === nama}
                        <tr>
                            <td colspan="1" class="border p-4 bg-white">
                                {#if $groupedOrders.get(nama)?.length > 0}
                                    {#each $groupedOrders.get(nama) as order, i}
                                        {#if i === 0}
                                            <p><strong>WhatsApp:</strong> {order.whatsapp}</p>
                                            <p><strong>Pesan:</strong> {order.pesan}</p>
                                            <p><strong>Catatan:</strong> {order.catatan}</p>
                                            <p class="mt-4"><strong>Pesanan:</strong></p>
                                            <div class="flex flex-wrap gap-4 mt-2"></div>
                                        {/if}

                                        <div class="border p-2 rounded shadow">
                                            <p><strong>Produk:</strong> {order.produk.id}</p>
                                            <p><strong>Harga:</strong> {order.harga}</p>
                                            <p><strong>Total:</strong> {order.total_pesanan}</p>
                                        </div>

                                        {#if i === $groupedOrders.get(nama).length - 1}
                                            <div>    
                                                <p class="mt-4"><strong>Total Harga:</strong> 
                                                    {$groupedOrders.get(nama).reduce((sum: number, o: Pesanan) => sum + o.harga, 0)}
                                                </p>                                                
                                            </div>
                                        {/if}
                                    {/each}
                                {/if}
                            </td>
                        </tr>
                    {/if}
                {/each}
            </tbody>
        </table>
    </div>
</main>