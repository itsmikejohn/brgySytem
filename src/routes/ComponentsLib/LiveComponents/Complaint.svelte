<script>
    import Button from "../GeneralComponents/Button.svelte";
    import Inputs from "../GeneralComponents/Inputs.svelte";
    import { showAddModal } from "../BoundComponents/clickOutside";
    import Cordion3 from "../GeneralComponents/Cordion3.svelte";

    import {cordionLogic, onSnapsBgyCert } from "../BoundComponents/clickOutside";

    //database calls and hooks
    import { auth, db } from "../../db/firebase";
    import { onSnapshot, addDoc, collection, serverTimestamp, increment, doc, deleteDoc, query, orderBy } from "firebase/firestore";

    //handler to show add modal
    const toShowAddModal = () => {
        showAddModal.set(true);
    }
    
    //barangayID varStore
    const bgyVarStore = {
        completeName: "",
        address: "",
        complaint: "",
        location: "",

    }

    //submit data to database
    const submitData = async() => {
        const colRef = collection(db, "complaints");
        addDoc(colRef, {
            createdAt: serverTimestamp(),
            completeName: bgyVarStore.completeName.BINDTHIS,
            address: bgyVarStore.address.BINDTHIS,
            complaint: bgyVarStore.complaint.BINDTHIS,
            location: bgyVarStore.location.BINDTHIS,
            complaintCounter: increment(1),
            
        }).then(() => {
            showAddModal.set(false);
        })
    }

    //fetch data from database
    const colRef = collection(db, "complaints");
    const q = query(colRef, orderBy("createdAt", "desc"))
    onSnapshot(q, (snapshots) => {
        let fbData = [];
        snapshots.docs.forEach(doc => {
            let data = {...doc.data(), id: doc.id};
            fbData = [data, ...fbData];
        })
        onSnapsBgyCert.set(fbData);

    })

    //removeData from database
    const removeData = async(data) => {
        const docRef = doc(colRef, data);
        await deleteDoc(docRef).then(()=>{
            cordionLogic.set(false);
        })
        
    }

</script>

<div class="m-2 sm:max-w-[900px] mx-auto">
    <div class="min-h-[50vh] p-4">
        <div class="max-w-[4rem]">
            <Button TITLE="Add" on:click={toShowAddModal}/>
        </div>
        {#if $showAddModal}
        <div class="flex flex-col gap-2 bg-white p-4 max-w-fit mx-auto rounded-lg mt-2 absolute left-0 right-0 border-2 border-slate-200 z-10">
            <p class="text-xl text-center font-bold p-2 text-slate-500">Request Barangay ID</p>
            <div class="">
                <Inputs TITLE="Complete Name of complainant:" PLACEHOLDER="Complete Name" bind:this={bgyVarStore.completeName}/>
            </div>

    
            <div class="flex gap-2">
                <div class="">
                <Inputs TITLE="Complete Address:" PLACEHOLDER="Complete Address" bind:this={bgyVarStore.address}/>
                </div>

                <div class="">
                    <Inputs TITLE="Complaint:" PLACEHOLDER="Complaint" bind:this={bgyVarStore.complaint}/>
                </div>
            </div>

            <div class="">
                <Inputs TITLE="Location of incident:" PLACEHOLDER="Where it happen?" bind:this={bgyVarStore.location}/>
                </div>
            
            
            <div class="flex gap-2">
                <Button TITLE="Submit" on:click={submitData}/>
                <Button TITLE="Close" on:click={() => {showAddModal.set(false)}}/>
            </div>
        </div>
        {/if}

        {#each $onSnapsBgyCert as value}
            <div class="mt-2">
                <Cordion3 cName={value.completeName}
                         address={value.address} 
                         complaint={value.complaint}
                         location={value.location}
                         
                         on:click={() => {removeData(value.id)}}
                         />
            </div>
        {/each}
    </div>

    
</div>