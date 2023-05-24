<svelte:options accessors />

<script>
    import { fly } from "svelte/transition";
    import { createEventDispatcher } from "svelte";
    import logo from "../Images/logo.png";
    import { showSlider, navSelections } from './clickOutside.js'

    import Button from "../GeneralComponents/Button.svelte";

    //slider list of menu
    let selections = ["Dashboard", "List of registered voters", "Barangay ID", "Barangay Certificate", "Barangay Clearance", "Complaints"]; 

    //value grabber from menu
    const getValue = (data) => {
        navSelections.set(data);
        showSlider.set(false);
    }

    //close slider
    const back = () => {
        showSlider.set(false);
    }  


</script>
{#if $showSlider}
    <div class="bg-purple-500 absolute min-w-[20vw] top-0 bottom-0 border-slate-400 border-2" in:fly={{x:-200, duration:1000}}>
        
        <div class="p-4 flex justify-center items-center">
            <img src={logo} alt="loading" class="w-40"/>
        </div>

        {#each selections as value}
        <div class="">
            <p class="p-4 hover:bg-slate-400 sm:text-2xl cursor-pointer transition-all hover:scale-105 active:scale-95"
            class:active={$navSelections === value}
            on:keydown={() => {}}
            on:click={() => {getValue(value)}}

            >{value}</p>
        </div>
        {/each}
        
        <div class="mt-5">
            <Button TITLE="Close" on:click={back}/>
        </div>
        
    </div>

    
{/if}

<style>
    .active{
        background-color: aquamarine;
    }
</style>