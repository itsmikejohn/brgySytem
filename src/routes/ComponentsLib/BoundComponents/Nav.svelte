<script>
    
    import Button from "../GeneralComponents/Button.svelte"
    import NavSlider from "./NavSlider.svelte";
    import { showSlider, navSelections } from "./clickOutside";

    //live components
    import DashBoard from "../LiveComponents/DashBoard.svelte";

    //database calls and hooks
    import { auth } from "../../db/firebase";
    import { signOut } from "firebase/auth";

    //slide menu
    const showSliderMenu = () => {
        showSlider.set(true);
    }

    //logout user from system
    const logout = async() => {
        await signOut(auth).then(()=>{
            localStorage.removeItem("uid");
        })
    }
</script>

<div class="">
    <div class=" bg-purple-500 flex gap-2 items-center p-2">
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
            <p class="font-bold sm:text-2xl">{$navSelections}</p>
        </div>

        <div class="w-[100px]">
            <Button TITLE="Logout" on:click={logout}/>
        </div>
    </div>
    {#if $navSelections === "Dashboard"}
    <DashBoard />
    {/if}
   
</div>

<NavSlider />