<script lang="ts">
    import PocketBase from "pocketbase";
    import { onMount } from "svelte";
    import { writable } from "svelte/store";
    import { scale } from "svelte/transition";
    import { fade } from "svelte/transition";
  


   
    let show1 = writable<number>(1)
    let show2 = writable<number>(1)
    let pr1 = writable<number>(1)
    let pr2 = writable<number>(1)
    let pr3 = writable<number>(1)
    let k = ("")
    let m = ("")
    let b2 = writable<number>(1)
    let b1 = writable<number>(1)

    function p1 () {
        pr1.update(value => value === 1 ? 2 : 1);
        pr2.set(1);
        k = ("")
        setTimeout(() => {
            k = ("Kombinasi dari kimbab nasi gulung khas Korea berisi sayuran dan protein, dibalut rumput laut yang disajikan dengan ayam.")
        },500);
        setTimeout(() => {
            b1.set(2)
        }, 500);
    }
    function p2 () {
        pr1.set(1);
        pr2.update(value => value === 1 ? 2 : 1);
        m = ("")
        setTimeout(() => {
            m = ("Roti lembut yang diisi dengan es krim, memberikan perpaduan rasa manis dan tekstur creamy yang menyegarkan.")
        },500);
        setTimeout(() => {
            b2.set(2)
        }, 500);
    }
    function s1 () {
        show1.set(2);
    }
    function ns1 () {
        show1.set(1);
    }
    function s2 () {
        show2.set(2);
    }
    function ns2 () {
        show2.set(1);
    }
    

 
</script>
    
    <div class="min-h-screen  bg-[#191B2B] flex flex-col pb-52  "
    class:opacity-100={$show2==1&&$show1==1}
    class:opacity-80={$show1==2}
    class:opacity-70={$show2==2}

    >
        <!-- navbar -->
        <div class="fixed navbar bg-[#191B2B] shadow-sm top-0 z-50">
            <p class="font-bold text-md lg:text-2xl text-white ml-5">SAVORA</p>
        </div>
    
        <!-- page -->
        <div class="h-screen z-40" id="page">
            <h1 class="text-5xl lg:text-7xl font-bold text-white text-center pt-26">Savora</h1>
            <h1 class="text-sm lg:text-5xl  text-white text-center pt-7 mx-4">
                Kami menghadirkan Kimbab Spicy Chicken yang menggugah selera dengan isian ayam pedas yang juicy, serta Icebread yang lembut dan menyegarkan, cocok untuk menemani setiap gigitan pedasmu            </h1>

            <div class="flex justify-center my-10">
                <a href="https://api.whatsapp.com/send/?phone=6282331372166&text=Menu+%3A%0A1.+Kimbab+Spicy+Chicken+-+10k%0A2.+Icebread+-+5k%0A3.+Bundling+-+12K%0A%0ANama+%3A+%0APesanan+%3A%0A%28nb+%3A+Tulis+nama+produk+dan+jumlahnya%29&type=phone_number&app_absent=0uy">
                    <button class="bg-[#FF3A27] text-white outline-1 py-[6px] hover:bg-red-600 rounded-xl outline-[#FF3A27] px-12 font-bold text-sm">
                        Buy Now
                    </button>
                </a>
            </div>
            <div class="outline-1 outline-white h-0 mx-10 mt-6">
                <br class=" outline-1 outline-white">
            </div>
            <div class="">
                <p class=" font-bold text-white text-center py-6 text-3xl"> MENU</p>
            </div>
            
            <!-- pemesanan -->
            <section id="pesan" class="flex flex-col space-y-10 ">
                <!-- Kimbab -->
                    <button 
                    class="card bg-[#3B4252]  p-5  h-44 ml-10 transition-all duration-500 ease-in-out "
                    class:w-74={$pr1 === 2}
                    class:w-40={$pr1 === 1}
                    onclick={p1}
                    transition:fade={{ duration: 500 }}>
                    {#if $pr1==1 }  
                    <div class="flex flex-col">
                    <img src="kim.jpg" alt="Kimbab" class="w-28 h-28 object-cover rounded-lg ml-1" />
                    <h2 class=" text-[11px] font-bold text-white mt-3  text-left ml-1">Kimbab Spicy Chicken</h2>
                </div>
                {:else if $pr1==2}
                <div class=" relative flex">
                    <div class="flex flex-col ">
                        <img src="kim.jpg" alt="Kimbab" class="w-28 h-28 object-cover rounded-lg z-50 ml-1 " />
                        <h2 class=" text-[14px] font-bold text-white mt-3  text-left ml-5">Harga : 10k</h2>
                    </div>
                    <div>
                        <div class=" absolute w-40 transition-opacity duration-500 delay-1000" 
                        class:opacity-100={$pr1 == 2} 
                        class:opacity-0={Number($pr1) === 1} 
                        >
                        <p class=" text-[12px] pl-5 pr-3 z-40 text-left text-white "> {k}</p>
                    </div>
                </div>
                <div class=" absolute">
                    {#if $b1==2}
                    <button  class="bg-[#FF3A27] z-50 text-white  py-[4px] hover:bg-red-600 rounded-xl  px-5 font-bold text-sm mt-29 ml-34  " onclick={s1}>
                        Ingredients
                    </button>               
                    {/if}
                </div>
            </div>
            
            {/if}
        </button>
            
                <!-- Icebread -->
                <div class=" relative">
                    
                    <button 
                    class=" absolute card bg-[#3B4252]  p-5 h-44 right-0 mr-10 transition-all duration-500 ease-in-out" 
                    class:w-74={$pr2 === 2}
                    class:w-40={$pr2 === 1}
                    onclick={p2}
                    transition:fade={{ duration: 500 }}
                    >
                    {#if $pr2 == 1 }   
                    
                    <div >
                            <div class="flex flex-col absolute right-0 mr-[22px]">
                                <img src="icebread.jpg" alt=""  class="lg:w-55 lg:h-55 w-28 h-28 object-cover rounded-lg mr-[2px] "/>
                                <h2 class=" text-[14px] font-bold text-white mt-3 text-center mr-[2px] "> Icebread</h2>
                            </div> 
                                                    
                    </div>   
                    {:else if $pr2 == 2}
                        <div class=" flex">
                            
                            <div class="flex flex-col absolute right-0 mr-[22px]">
                                <img src="icebread.jpg" alt=""  class=" w-28 h-28 object-cover rounded-lg mr-[2px]"/>
                                <h2 class=" text-[14px] font-bold text-white mt-3  text-center mr-[2px]">Harga : 5k</h2>
                            </div>        
                            <div>
                                <div class=" absolute w-40 transition-opacity duration-500 " 
                                class:opacity-100={$pr2 == 2} 
                                class:opacity-0={Number($pr2) === 1} 
                                >
                                    <p class=" text-[12px] pr-8 z-40 text-left text-white "> {m}</p>
                                </div>
                            </div> 
                            {#if $b2==2}
                            <button  class="bg-[#FF3A27] z-50 text-white  py-[4px] hover:bg-red-600 rounded-xl px-5 font-bold text-sm mt-29" onclick={s2}>
                                Ingredients
                            </button>               
                            {/if}
                        </div>                               
                                
                    {/if}

                            
                    </button>
                </div>
                
                </section>
        </div>
        <div>
            <div class="outline-1 outline-white h-0 mx-10 mb-6 mt-58">
                <br class=" outline-1 outline-white">
            </div>
            <div class=" text-3xl font-bold text-white  text-center">
                <h2>SPECIAL OFFER</h2>
            </div>
            <div class=" flex justify-center ">
                <div class=" card bg-[#3B4252] h-50 w-78 mt-5 ">
                    <h3 class=" text-center text-white text-md mt-2 font-bold"> Bundling Hemat</h3>
                    <div class=" absolute flex">
                        <div >
                            <img class=" w-[84px] h-[84px] rounded-xl mt-10 ml-5 absolute z-10" src="kim.jpg" alt="">
                            <img class=" w-[84px] h-[84px] rounded-xl z-50 absolute mt-24 ml-20" src="icebread.jpg" alt="">
                        </div>
                        <div>
                            <li class=" text-md text-white font-semibold mt-10 ml-30">Kimbab Spicy Chicken</li>
                            <li class=" text-md text-white font-semibold ml-30">Icebread</li>
                        </div>
                        
                    </div>
                    <div class=" mt-[80px] text-right font-bold mr-8">
                        <p class=" line-through text-white text-xl"> Rp15000</p>
                        <p class=" text-white text-md"> Rp12000</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- POPUP -->
    {#if $show1==2}
    <div class="fixed inset-0 z-50 flex justify-center items-center bg-blend-darken">
        <div class="bg-[#333946] p-6 rounded-lg   w-80">
        <h2 class="text-lg font-semibold text-white text-center mb-4">Ingredients</h2>
        <div class=" text-white">
            <li>Nori</li>
            <li>Ayam</li>
            <li>Beras</li>
            <li>Telur</li>
            <li>Sosis</li>
            <li>Wortel</li>
            <li>Timun</li>
            <li>Tepung Crispy</li>
            <li>Minyak Wijen</li>
            <li>Lada Bubuk</li>
            <li>Cabe Bubuk</li>
            <li>Garam</li>
            <li>Saus Barbeque</li>
            <li>Saus Tomat</li>
            <li>Saus Pedas</li>
        </div>

          <button 
            class="mt-4 bg-red-500 text-white px-4 py-2 rounded-md w-full"
            onclick={ns1}
          >
            Tutup
          </button>
        </div>
      </div>
    {/if}
    {#if $show2==2}
    <div class="fixed inset-0 z-50 flex justify-center items-center bg-blend-darken">
        <div class="bg-[#333946] p-6 rounded-lg   w-80">
        <h2 class="text-lg font-semibold text-white text-center mb-4">Ingredients</h2>
        <div class=" text-white">
            <li>Eskrim</li>
            <li>Roti Tawar</li>
            <li>Cereal</li>
            <li>Misis</li>
            
        </div>

          <button 
            class="mt-4 bg-red-500 text-white px-4 py-2 rounded-md w-full"
            onclick={ns2}
          >
            Tutup
          </button>
        </div>
      </div>
    {/if}
                            
                           