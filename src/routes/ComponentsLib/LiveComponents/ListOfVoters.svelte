<script>
    import Button from "../GeneralComponents/Button.svelte";
    import Inputs from "../GeneralComponents/Inputs.svelte";

    import { showAdd } from "../BoundComponents/clickOutside";

    //database calls and hooks
    import { auth, db } from "../../db/firebase";
    import { addDoc } from "firebase/firestore";

    //toggle show modal of add voter
    const showAddModal = () => {
        showAdd.set(true);
    }

    //handler for send data of addVoter
    const addVoter = async() => {

    }

</script>

<div class="m-2 sm:max-w-[900px] mx-auto">
    <div class="min-h-[50vh] p-4">
        <div class="max-w-[4rem]">
            <Button TITLE="Add" on:click={showAddModal}/>
        </div>
        
        <!--ADD voters-->
        {#if $showAdd}
        <div class="flex flex-col gap-2 bg-white p-4 max-w-fit mx-auto rounded-lg mt-2 absolute left-0 right-0 border-2 border-slate-200">
            <div class="flex gap-2 justify-center">
                <div class="">
                    <Inputs TITLE="Name:" PLACEHOLDER="Complete Name"/>
                </div>
                <div class="">
                    <Inputs TITLE="PRECINT#:" PLACEHOLDER="Precint Number" TYPE="number"/>
                </div>
                <div class="">
                    <Inputs TITLE="ADDRESS:" PLACEHOLDER="Complete Address"/>
                </div>
            </div>
            
            <div class="flex gap-2">
                <Button TITLE="Submit" on:click={addVoter}/>
                <Button TITLE="Close" on:click={()=>{showAdd.set(false)}}/>
            </div>
            
        </div>
        {/if}
        <!--End of add voters-->

        <div class="">

            <div class="flex gap-2 justify-center items-center">
                <p class="text-xl sm:text-2xl font-bold text-left w-full ">Name</p>
                <p class="text-xl sm:text-2xl font-bold text-left w-full ">Precint#</p>
                <p class="text-xl sm:text-2xl font-bold text-left w-full ">Address</p>
            </div>

            <div class="bg-slate-300 p-4 rounded-lg mt-2">
                <div class="flex gap-2 justify-center items-center">
                    <p class="w-full text-white">Peter, Pan Magic</p>
                    <p class="w-full text-white">65984564322358</p>
                    <p class="w-full text-white">283 Alley 82, Lakas, Pasig, City</p>
                </div>
                <div class="flex gap-2 mt-4">
                    <Button TITLE="Delete"/>
                    <Button TITLE="Edit"/>
                </div>
            </div>
            
        </div>
        
    </div>
</div>