<script>
    import Button from "../GeneralComponents/Button.svelte";
    import Inputs from "../GeneralComponents/Inputs.svelte";
  
    import {onSnapsClearance, showClearanceAddModal, compareClearanceValue } from "../BoundComponents/clickOutside";

    //database calls and hooks
    import { auth, db } from "../../db/firebase";
    import { onSnapshot, addDoc, collection, serverTimestamp, increment, doc, deleteDoc, query, orderBy, setDoc } from "firebase/firestore";

    //handler to show add modal
    const toShowAddModal = () => {
        showClearanceAddModal.set(true);
    }
    
    //barangayID varStore
    const bgyVarStore = {
        completeName: "",
        address: "",
        birthdate: "",
        lengthOfStay: "",
        purpose: "",

    }

    //submit data to database
    const submitData = async() => {
        const colRef = collection(db, "barangayClearance");
        addDoc(colRef, {
            createdAt: serverTimestamp(),
            completeName: bgyVarStore.completeName.BINDTHIS,
            address: bgyVarStore.address.BINDTHIS,
            birthdate: bgyVarStore.birthdate.BINDTHIS,
            lengthOfStay: bgyVarStore.lengthOfStay.BINDTHIS,
            purpose: bgyVarStore.purpose.BINDTHIS,
            bgyClearanceCounter: increment(1),
            
        }).then(() => {
            showClearanceAddModal.set(false);
        })
    }

    //fetch data from database
    const colRef = collection(db, "barangayClearance");
    const q = query(colRef, orderBy("createdAt", "desc"))
    onSnapshot(q, (snapshots) => {
        let fbData = [];
        snapshots.docs.forEach(doc => {
            let data = {...doc.data(), id: doc.id};
            fbData = [data, ...fbData];
        })
        onSnapsClearance.set(fbData);

    })

    //removeData from database
    const removeData = async(data) => {
        const docRef = doc(colRef, data);
        await deleteDoc(docRef)
        
    }

    //updateData from database
    const updateData = async(data) => {
        const docRef = doc(colRef, data);
        setDoc(docRef, {
            lastUpdated: serverTimestamp(),
            completeName: bgyVarStore.completeName.BINDTHIS,
            address: bgyVarStore.address.BINDTHIS,
            birthdate: bgyVarStore.birthdate.BINDTHIS,
            lengthOfStay: bgyVarStore.lengthOfStay.BINDTHIS,
            purpose: bgyVarStore.purpose.BINDTHIS,
        }, {merge:true})
    }

    //showModalComparison
    const editValueHandler = (data) => {
        compareClearanceValue.set(data);
    }
</script>

<div class="m-2 sm:max-w-[1200px] mx-auto">
    <div class="min-h-[50vh] p-4">
        <div class="max-w-fit">
            <Button TITLE="Add Barangay Clearance" on:click={toShowAddModal}/>
        </div>

        <div class="flex  justify-center items-center mt-2">
            <p class="text-xl sm:text-2xl font-bold text-left w-full bg-slate-200 p-2 border-2 border-white">Name</p>
            <p class="text-xl sm:text-2xl font-bold text-left w-full bg-slate-200 p-2 border-2 border-white">Address</p>
            <p class="text-xl sm:text-2xl font-bold text-left w-full bg-slate-200 p-2 border-2 border-white">Birthdate</p>
            <p class="text-xl sm:text-2xl font-bold text-left w-full bg-slate-200 p-2 border-2 border-white">Length of stay</p>
            <p class="text-xl sm:text-2xl font-bold text-left w-full bg-slate-200 p-2 border-2 border-white">Purpose</p>
            <p class="text-xl sm:text-2xl font-bold text-left w-full bg-slate-200 p-2 border-2 border-white">Option</p>
        </div>
        
        {#if $showClearanceAddModal}
        <div class="flex flex-col gap-2 bg-white p-4 max-w-fit mx-auto rounded-lg mt-2 absolute left-0 right-0 border-2 border-guiColor z-10">
            <p class="text-xl text-center font-bold p-2 text-slate-500">New Barangay Clearance</p>
            <div class="">
                <Inputs TITLE="Complete Name:" PLACEHOLDER="Complete Name" bind:this={bgyVarStore.completeName}/>
            </div>

            <div class="flex justify-center gap-2">
                <div class="">
                     <Inputs TITLE="Length of stay" PLACEHOLDER="Length of stay" bind:this={bgyVarStore.lengthOfStay}/>
                </div>
                <div class="">
                    <Inputs TITLE="Purpose" PLACEHOLDER="purpose" bind:this={bgyVarStore.purpose}/>
                </div>
            </div>

            <div class="flex justify-center gap-2">
                <div class="w-full">
                     <Inputs TITLE="Birthdate:" TYPE="date" bind:this={bgyVarStore.birthdate}/>
                </div>
              
            </div>

            <div class="">
                <Inputs TITLE="Complete Address:" PLACEHOLDER="Complete Address" bind:this={bgyVarStore.address}/>
            </div>
            
            <div class="flex gap-2">
                <Button TITLE="Submit" on:click={submitData}/>
                <Button TITLE="Cancel" on:click={()=>{showClearanceAddModal.set(false)}}/>
            </div>
        </div>
        {/if}
        <div class="">
            {#each $onSnapsClearance as value, i}
            <div class="flex justify-center items-center ">
                <p class="w-full border-2 border-white bg-slate-100 p-2 overflow-x-scroll">{value.completeName}</p>
                <p class="w-full border-2 border-white bg-slate-100 p-2 overflow-x-scroll">{value.address}</p>
                <p class="w-full border-2 border-white bg-slate-100 p-2 overflow-x-scroll">{value.birthdate}</p>
                <p class="w-full border-2 border-white bg-slate-100 p-2 overflow-x-scroll">{value.lengthOfStay}</p>
                <p class="w-full border-2 border-white bg-slate-100 p-2 overflow-x-scroll">{value.purpose}</p>
                <div class="flex gap-2 w-full p-2 bg-slate-100">
                    <Button TITLE="Delete" COLOR="bg-redColor" on:click={removeData(value.id)}/>
                    <Button TITLE="Edit" on:click={()=>{editValueHandler(i)}}/>
                </div>
                {#if $compareClearanceValue === i}
                    <div class="">
                        <div class="flex flex-col gap-2 bg-guiColor p-4 max-w-fit mx-auto rounded-lg mt-2 absolute left-0 right-0 border-2 border-slate-200 z-10">
                            <p class="text-xl text-center font-bold p-2 text-slate-500">Modify Values</p>
                            <div class="">
                                <Inputs TITLE="Complete Name:" PLACEHOLDER="Complete Name" bind:this={bgyVarStore.completeName}/>
                            </div>
                
                            <div class="flex justify-center gap-2">
                                <div class="">
                                    <Inputs TITLE="Length of stay" PLACEHOLDER="Length of stay" bind:this={bgyVarStore.lengthOfStay}/>
                                </div>
                                <div class="">
                                    <Inputs TITLE="Purpose" PLACEHOLDER="purpose" bind:this={bgyVarStore.purpose}/>
                                </div>
                            </div>
                
                            <div class="flex justify-center gap-2">
                                <div class="w-full">
                                    <Inputs TITLE="Birthdate:" TYPE="date" bind:this={bgyVarStore.birthdate}/>
                                </div>
                            
                            </div>
                
                            <div class="">
                                <Inputs TITLE="Complete Address:" PLACEHOLDER="Complete Address" bind:this={bgyVarStore.address}/>
                            </div>
                            
                            <div class="flex gap-2">
                                <Button TITLE="Confirm Edit" on:click={updateData(value.id)}/>
                                <Button TITLE="Cancel" on:click={() => {compareClearanceValue.set("")}}/>
                            </div>
                        </div>
                    </div>
                {/if}
            </div>
            {/each}

        </div>
        
    </div>

    
</div>