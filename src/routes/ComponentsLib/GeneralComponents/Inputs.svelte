<svelte:options accessors />

<script>


    export let PLACEHOLDER = "Overide placeholder";
    export let bindThis = "";
    export let title = "Overide title";
    export let TYPE = "text";

</script>


{#if TYPE === "text"}
    <p class="p-2 font-bold">{title}</p>
    <input type="text" placeholder={PLACEHOLDER} bind:value={bindThis} 
    class="w-full h-10 bg-slate-100 p-2 focus:outline-none "/>
{:else if TYPE === "email"}
    <p class="p-2 font-bold">{title}</p>
    <input type="email" placeholder={PLACEHOLDER} bind:value={bindThis} 
    class="w-full h-10 bg-slate-100 p-2 focus:outline-none "/>
{:else if TYPE === "password"}
    <p class="p-2 font-bold">{title}</p>
    <input type="password" placeholder={PLACEHOLDER} bind:value={bindThis} 
    class="w-full h-10 bg-slate-100 p-2 focus:outline-none "/>
{/if}