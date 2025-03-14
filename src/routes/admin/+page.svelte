<!-- <script lang="ts">
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
</main> -->
<script>
    let showPopup = false;
  </script>
  
  <div class="flex justify-center items-center ">
    <button 
      class="bg-blue-500 text-white px-4 py-2 rounded-md shadow-lg"
      on:click={() => showPopup = true}
    >
      Pesan Sekarang
    </button>
  </div>
  
  {#if showPopup}
    <div class="fixed inset-0 flex justify-center items-center bg-black opacity-50">
      <div class="bg-white p-6 rounded-lg shadow-xl w-80">
        <h2 class="text-lg font-semibold mb-4">Pesan Produk</h2>
        <p class="text-gray-700 mb-4">
          Menu:
       
        </p>
        <a 
          href="https://wa.me/6262312345678?text=Menu%20%3A%0A1.%20Kimbab%20Spicy%20Chicken%20-%2010k%0A2.%20Icebread%20-%205k%0A3.%20Bundling%20-%2012K%0A%0ANama%20%3A%20%0APesanan%20%3A%0A(nb%20%3A%20Tulis%20nama%20produk%20dan%20jumlahnya)"
          target="_blank"
          class="block bg-green-500 text-white text-center py-2 rounded-md mt-2"
        >
          Pesan via WhatsApp
        </a>
        <button 
          class="mt-4 bg-red-500 text-white px-4 py-2 rounded-md w-full"
          on:click={() => showPopup = false}
        >
          Tutup
        </button>
      </div>
    </div>
  {/if}
  