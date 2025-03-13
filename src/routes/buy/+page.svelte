<script lang="ts">
    import PocketBase from "pocketbase";
    import { writable } from "svelte/store";
    import { onMount } from "svelte";


    let pb = new PocketBase("http://localhost:8090");

    // Store untuk menyimpan daftar produk
    let products = writable<product[]>([]);
    let nama = writable("");
    let whatsapp = writable("");

    // Tipe data produk
    type product = {
        id: string;
        produk: string;
        keterangan: string;
        harga: number;
        gambar: string;
        angka: number;
    };

    // Fungsi untuk mengambil produk dari database
    async function fetchProductsByIds() {
        try {
            let records = await pb.collection("nama_produk").getList(1, 3, {
                filter: 'id = "6hb7vv2e3ux661q" || id = "566299v6lb933o1" || id = "ahb7j3846c56u2h"',
            });

            console.log("Produk yang diambil:", records.items);

            // Format data produk
            let formattedProducts: product[] = records.items.map(record => ({
                id: record.id,
                produk: record.produk,
                keterangan: record.keterangan,
                harga: record.harga,
                gambar: pb.files.getUrl(record, record.gambar),
                angka: 0, // Awalnya jumlah pesanan adalah 0
            }));

            products.set(formattedProducts); // Simpan ke store

        } catch (error) {
            console.error("Error fetching products:", error);
        }
    }

    onMount(fetchProductsByIds);

    // Fungsi untuk menambah atau mengurangi jumlah pesanan
    function updateQuantity(id: string, delta: number) {
        products.update(items => {
            return items.map(item => {
                if (item.id === id) {
                    return { ...item, angka: Math.max(0, item.angka + delta) }; // Tidak boleh kurang dari 0
                }
                return item;
            });
        });
    }

    // Fungsi untuk mengirim pesanan ke database
// Fungsi untuk mengirim pesanan ke database
async function submitOrder() {
    // Pastikan nama dan nomor WhatsApp diisi
    if (!$nama || !$whatsapp) {
        alert("Nama dan WhatsApp harus diisi!");
        return;
    }

    // Ambil produk yang memiliki jumlah (angka) lebih dari 0
    let currentOrderItems = $products.filter(item => item.angka > 0);

    // Jika tidak ada produk yang dipesan, hentikan proses
    if (currentOrderItems.length === 0) {
        alert("Anda belum memilih produk!");
        return;
    }

    try {
        // Simpan setiap item pesanan ke database "pesanan"
        for (let item of currentOrderItems) {
            await pb.collection("pesanan").create({
                nama: $nama,                  // Sesuai dengan field "nama"
                whatsapp: $whatsapp,          // Sesuai dengan field "whatsapp"
                produk: item.id,              // Sesuai dengan field "produk" (relasi ke "nama_produk")
                total_pesanan: item.angka,    // Sesuai dengan field "total_pesanan"
                harga: item.harga * item.angka // Sesuai dengan field "harga" (total harga)
            });
        }

        alert("Pesanan berhasil dikirim!");
        
        // Reset jumlah pesanan setelah berhasil dikirim
        products.update(items =>
            items.map(item => ({ ...item, angka: 0 }))
        );

    } catch (error) {
        console.error("Error saat submit pesanan:", error);
        alert("Gagal mengirim pesanan. Coba lagi.");
    }
}


</script>

<div class="min-h-screen bg-[#191B2B] flex flex-col pb-52">
    <!-- Navbar -->
    <div class="fixed navbar bg-[#191B2B] shadow-sm top-0 z-50">
        <p class="font-bold text-md lg:text-2xl text-white ml-5">SAVORA</p>
    </div>

    <!-- Data Diri -->
    <div class="mt-20">
        <div>
            <h3 class="text-white text-center font-bold text-2xl">Pemesanan</h3>
        </div>
        <div class="mt-4 mx-10 space-y-2">
            <div>
                <input type="input" class="input validator outline-1 outline-white bg-transparent text-white" required
                    placeholder="Nama" pattern="[A-Za-z]*" minlength="3" maxlength="30"
                    title="Minimal 3 huruf, tidak boleh angka" bind:value={$nama} />
                <p class="validator-hint text-center">
                    Minimal 3 huruf dan tidak boleh angka
                </p>
            </div>
            <div>
                <input type="tel" class="input validator tabular-nums outline-1 outline-white bg-transparent text-white"
                    required placeholder="Nomor WhatsApp" pattern="[0-9]*" minlength="10" maxlength="13"
                    title="Minimal 10 digit" bind:value={$whatsapp} />
                <p class="validator-hint text-center">Minimal 10 digit</p>
            </div>
            <div>
                <p class="text-white text-center text-[10px]">
                    Harap masukkan data dengan benar. Jika data tidak valid, pesanan tidak akan diproses. Terima kasih.
                </p>
            </div>
        </div>
    </div>

    <!-- Daftar Produk -->
    <div id="pesan" class="flex flex-col justify-center mt-10 space-y-4 mx-auto">
        {#each $products as product}
        <div class="flex items-center space-x-4 p-5 rounded-lg w-96">
            <img src="{product.gambar}" alt="{product.produk}" class="w-24 h-24 object-cover rounded-lg" />

            <div class="flex-1">
                <h2 class="text-xl font-bold text-white">{product.produk}</h2>
                <p class="text-white text-sm mt-2">Rp {product.harga}</p>

                <div class="flex items-center mt-3">
                    <button class=" text-white px-1 py-1 rounded-md"
                        on:click={() => updateQuantity(product.id, -1)}>-</button>
                    <p class="mx-4 text-white text-lg">{product.angka}</p>
                    <button class=" text-white px-1 py-1 rounded-md"
                        on:click={() => updateQuantity(product.id, 1)}>+</button>
                </div>
            </div>
        </div>
        {/each}
    </div>

    <!-- Total Pesanan -->
    <div class="text-center text-white text-md font-bold mt-10">
        Total Pesanan: {$products.reduce((total, item) => total + item.angka, 0)} item
    </div>
  <!-- Total Harga -->
<div class="text-center text-white text-md font-bold mt-2">
    Total Harga: Rp {$products.reduce((total, item) => total + (item.angka * item.harga), 0)}
</div>
    
    <!-- Tombol Submit -->
    <div class="text-center mt-5">
        <button class="bg-blue-500 text-white px-5 py-2 rounded-lg text-lg font-bold" on:click={submitOrder}>
            Submit Order
        </button>
    </div>
</div>
