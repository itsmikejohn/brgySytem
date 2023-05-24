<script>
    import Button from "../GeneralComponents/Button.svelte"
    import NavSlider from "./NavSlider.svelte";
    import { showSlider } from "./clickOutside";

    const showSliderMenu = () => {
        showSlider.set(true);
    }

</script>

<div class="">
    <div class=" bg-purple-500 flex gap-5 items-center p-2">
        <div class="">
            <div class="max-w-fit p-4 flex flex-col gap-2 rounded-full hover:bg-slate-400 cursor-pointer"
            on:keydown={() => {}}
            on:click={showSliderMenu}
            >
                <div class="w-6 border-b-black border-b-2"></div>
                <div class="w-6 border-b-black border-b-2"></div>
                <div class="w-6 border-b-black border-b-2"></div>
            </div>
        </div>
        
        <div class="w-full">
            <p class="font-bold sm:text-2xl">Dashboard</p>
        </div>

        <div class="w-full mx-2 flex">
            <div class="w-full">
                
            </div>
            <div class="w-full">
                <Button title="Logout"/>
            </div>
            
        </div>
    </div>
</div>

<NavSlider />