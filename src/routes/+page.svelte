<script lang="ts">
    import PocketBase from "pocketbase";
    import { onMount } from "svelte";
    import { writable } from "svelte/store";
    import { scale } from "svelte/transition";
    import { fade } from "svelte/transition";
    
    let pb = new PocketBase("http://localhost:8090");
    
    // Store untuk menyimpan produk
    let products = writable<product[]>([]);
    
    // Tipe data produk
    type product = {
        id: string;
        produk: string;
    };
    
    let pr1 = writable<number>(1)
    let pr2 = writable<number>(1)
    let k = ("")
    let m = ("")

    function p1 () {
        pr1.update(value => value === 1 ? 2 : 1);
        pr2.set(1);
        k = ("")
        setTimeout(() => {
            k = ("Kombinasi dari kimbab nasi gulung khas Korea berisi sayuran dan protein, dibalut rumput laut yang disajikan dengan ayam berbumbu pedas.")
        },400);
    }
    function p2 () {
        pr1.set(1);
        pr2.update(value => value === 1 ? 2 : 1);
        m = ("")
        setTimeout(() => {
            m = ("Mojito adalah minuman segar asal Kuba yang terbuat dari campuran air soda, perasan jeruk nipis, daun mint, gula, dan es batu.")
        },400);
    }
 

    // Fungsi untuk mengambil produk berdasarkan ID tertentu
    async function fetchProductsByIds() {
        try {
            let records = await pb.collection("nama_produk").getList(1, 3, {
                filter: 'id = "6hb7vv2e3ux661q" || id = "566299v6lb933o1" || id = "ahb7j3846c56u2h"',
            });
    
            console.log("Produk yang diambil:", records.items);
    
            // Pastikan tipe `product` sesuai dengan yang kita harapkan
            let formattedProducts: product[] = records.items.map(record => ({
                id: record.id,
                produk: record.produk, // Pastikan properti ini ada di database
            }));
    
            products.set(formattedProducts); // Simpan ke store
    
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    }
    
    
    onMount(fetchProductsByIds);

</script>
    
    <div class="min-h-screen bg-[#191B2B] flex flex-col pb-52 ">
        <!-- navbar -->
        <div class="fixed navbar bg-[#191B2B] shadow-sm top-0 z-50">
            <p class="font-bold text-md lg:text-2xl text-white ml-5">SAVORA</p>
        </div>
    
        <!-- page -->
        <div class="h-screen z-40" id="page">
            <h1 class="text-5xl lg:text-7xl font-bold text-white text-center pt-26">P52RA</h1>
            <h1 class="text-md lg:text-5xl  text-white text-center pt-7 mx-4">
                Proyek Penguatan Profil Pelajar Pancasila dan Profil Pelajar Rahmatan Lil Alamin
            </h1>

            <div class="flex justify-center mt-10">
                <a href="buy">
                    <button class="bg-[#FF3A27] text-white outline-1 py-[4px] hover:bg-red-600 rounded-xl outline-[#FF3A27] px-10 font-bold text-sm">
                        Buy Now
                    </button>
                </a>
            </div>
            <div class="outline-1 outline-white h-0 mx-10 mt-6">
                <br class=" outline-1 outline-white">
            </div>
            <div class="">
                <p class=" font-bold text-white text-center py-6 text-xl"> MENU</p>
            </div>
            
            <!-- pemesanan -->
            <section id="pesan" class="flex flex-col lg:mt-20 space-y-10 ">
                <!-- Kimbab -->
                <button 
                    class="card bg-[#3B4252]  p-5  h-40 ml-10 transition-all duration-500 ease-in-out "
                    class:w-74={$pr1 === 2}
                    class:w-36={$pr1 === 1}
                    
                    onclick={p1}
                    transition:fade={{ duration: 500 }}                >
                {#if $pr1==1 }  
                <div class="flex flex-col">
                    <img src="kimbab.jpg" alt="Kimbab" class="w-24 h-24 object-cover rounded-lg" />
                    <h2 class=" text-[10px] font-bold text-white mt-3 lg:mt-2 text-left">Kimbab Spicy Chicken</h2>
                </div>
                {:else if $pr1==2}
                <div class=" relative flex">
                    <div class="flex flex-col ">
                        <img src="kimbab.jpg" alt="Kimbab" class="w-24 h-24 object-cover rounded-lg z-50" />
                        <h2 class=" text-[10px] font-bold text-white mt-3 lg:mt-2 text-left">Kimbab Spicy Chicken</h2>
                    </div>
                    <div>
                        <div class=" absolute w-40 transition-opacity duration-500 delay-1000" 
                        class:opacity-100={$pr1 == 2} 
                        class:opacity-0={Number($pr1) === 1} 
                        >
                            <p class=" text-[12px] pl-2 z-40 text-left text-white "> {k}</p>
                        </div>
                    </div>
                </div>
                
                {/if}
                </button>
            
                <!-- Mojito -->
                <div class=" relative">
                    
                    <button 
                    class=" absolute card bg-[#3B4252] lg:w-[300px] p-5 lg:h-76 h-40 right-0 mr-10 transition-all duration-500 ease-in-out" 
                    class:w-74={$pr2 === 2}
                    class:w-36={$pr2 === 1}
                    onclick={p2}
                    transition:fade={{ duration: 500 }}
                    >
                    {#if $pr2 == 1 }   
                    
                    <div >
                            <div class="flex flex-col absolute right-0 mr-[22px]">
                                <img src="mojito.jpg" alt=""  class="lg:w-55 lg:h-55 w-25 h-25 object-cover rounded-lg "/>
                                <h2 class="lg:text-2xl text-[10px] font-bold text-white mt-3 lg:mt-2 text-center "> Mojito</h2>
                            </div> 
                                                    
                    </div>   
                    {:else if $pr2 == 2}
                        <div class=" flex">
                            
                            <div class="flex flex-col absolute right-0 mr-[22px]">
                                <img src="mojito.jpg" alt=""  class="lg:w-55 lg:h-55 w-25 h-25 object-cover rounded-lg "/>
                                <h2 class="lg:text-2xl text-[10px] font-bold text-white mt-3 lg:mt-2 text-center "> Mojito</h2>
                            </div>        
                            <div>
                                <div class=" absolute w-40 transition-opacity duration-500 " 
                                class:opacity-100={$pr2 == 2} 
                                class:opacity-0={Number($pr2) === 1} 
                                >
                                    <p class=" text-[12px] pr-3 z-40 text-left text-white "> {m}</p>
                                </div>
                            </div>                   
                        </div>                               
                                
                    {/if}

                            
                    </button>
                </div>
                </section>
        </div>
    </div>
                            
                            <!-- <div id="pesan" class="flex justify-center mt-20">
        <div class="card bg-[#3B4252] w-[900px] p-5 h-72  ">
            <div class="flex flex-row justify-evenly space-x-28 pt-8">
                {#if $products.length > 0}
                {#each $products as product}
                <div class="flex flex-col items-center">
                    <img src="favicon.png" alt={product.produk} class="w-20 h-20 object-cover rounded-lg"/>
                    <h2 class="text-2xl font-bold text-white mt-2">{product.produk}</h2>
                </div>
                {/each}
                {:else}
                <p class="text-white text-center">Loading produk...</p>
                {/if}
            </div>
            <div class="flex justify-center mt-10">
                <a href="#pesan">
                    <button class="bg-[#FF3A27] text-white outline-1 p-[8px] rounded-4xl outline-[#FF3A27] px-16 font-bold text-xl">
                        Buy Now
                    </button>
                </a>
            </div>
        </div>
    </div> -->