<script>
    import Button from "../GeneralComponents/Button.svelte";
    import Inputs from "../GeneralComponents/Inputs.svelte";
  
    import {onSnapsComplaint, showComplaintAddModal, compareComplaintValue } from "../BoundComponents/clickOutside";

    //database calls and hooks
    import { auth, db } from "../../db/firebase";
    import { onSnapshot, addDoc, collection, serverTimestamp, increment, doc, deleteDoc, query, orderBy, setDoc } from "firebase/firestore";

    //handler to show add modal
    const toShowAddModal = () => {
        showComplaintAddModal.set(true);
    }
    
    //barangayID varStore
    const complaintVarStore = {
        completeName: "",
        complaint: "",
        actionTaken: "",
        location: "",
        date: "",

    }

    //submit data to database
    const submitData = async() => {
        const colRef = collection(db, "complaints");
        await addDoc(colRef, {
            createdAt: serverTimestamp(),
            completeName: complaintVarStore.completeName.BINDTHIS,
            complaint: complaintVarStore.complaint.BINDTHIS,
            actionTaken: complaintVarStore.actionTaken.BINDTHIS,
            location: complaintVarStore.location.BINDTHIS,
            date: complaintVarStore.date.BINDTHIS,
            complaintCounter: increment(1),
            
        }).then(() => {
            showComplaintAddModal.set(false);
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
        onSnapsComplaint.set(fbData);

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
            completeName: complaintVarStore.completeName.BINDTHIS,
            completeName: complaintVarStore.completeName.BINDTHIS,
            complaint: complaintVarStore.complaint.BINDTHIS,
            actionTaken: complaintVarStore.actionTaken.BINDTHIS,
            location: complaintVarStore.location.BINDTHIS,
            date: complaintVarStore.date.BINDTHIS,
        }, {merge:true})
    }

    //showModalComparison
    const editValueHandler = (data) => {
        compareComplaintValue.set(data);
    }
</script>

<div class="m-2 sm:max-w-[1600px] mx-auto">
    <div class="min-h-[50vh] p-4">
        <div class="max-w-fit">
            <Button TITLE="Add Blotter" on:click={toShowAddModal}/>
        </div>

        <div class="flex  justify-center items-center mt-2">
            <p class="text-xl sm:text-xl font-bold text-left w-full bg-slate-200 p-2 border-2 border-white">Date Recorded</p>
            <p class="text-xl sm:text-xl font-bold text-left w-full bg-slate-200 p-2 border-2 border-white">Complainant Name</p>
            <p class="text-xl sm:text-xl font-bold text-left w-full bg-slate-200 p-2 border-2 border-white">Complaint</p>
            <p class="text-xl sm:text-xl font-bold text-left w-full bg-slate-200 p-2 border-2 border-white">Action Taken</p>
            <p class="text-xl sm:text-xl font-bold text-left w-full bg-slate-200 p-2 border-2 border-white">Location Of Incidence</p>
            <p class="text-xl sm:text-xl font-bold text-left w-full bg-slate-200 p-2 border-2 border-white">Option</p>
        </div>
        
        {#if $showComplaintAddModal}
        <div class="flex flex-col gap-2 bg-white p-4 max-w-fit mx-auto rounded-lg mt-2 absolute left-0 right-0 border-2 border-guiColor z-10">
            <p class="text-xl text-center font-bold p-2 text-slate-500">New Blotter</p>
            <div class="">
                <Inputs TITLE="Complainant Name:" PLACEHOLDER="Complainant Name" bind:this={complaintVarStore.completeName}/>
            </div>

            <div class="flex gap-2">
                <div class="w-full">
                    <Inputs TITLE="Date:" PLACEHOLDER="Date" TYPE="date" bind:this={complaintVarStore.date}/>
                </div>

                <div class="w-full">
                    <Inputs TITLE="Location:" PLACEHOLDER="Location of Incidence" bind:this={complaintVarStore.location}/>
                </div>
            </div>

            <div class="">
                <Inputs TITLE="Complaint:" PLACEHOLDER="Complaint" bind:this={complaintVarStore.complaint}/>
            </div>

            <div class="">
                <Inputs TITLE="Action taken:" PLACEHOLDER="Action taken" bind:this={complaintVarStore.actionTaken}/>
            </div>

            
            <div class="flex gap-2">
                <Button TITLE="Submit" on:click={submitData}/>
                <Button TITLE="Cancel" on:click={()=>{showComplaintAddModal.set(false)}}/>
            </div>
        </div>
        {/if}
        <div class="">
            {#each $onSnapsComplaint as value, i}
            <div class="flex justify-center items-center ">
                <p class="w-full border-2 border-white bg-slate-100 p-2 overflow-x-scroll">{value.date}</p>
                <p class="w-full border-2 border-white bg-slate-100 p-2 overflow-x-scroll">{value.completeName}</p>
                <p class="w-full border-2 border-white bg-slate-100 p-2 overflow-x-scroll">{value.complaint}</p>
                <p class="w-full border-2 border-white bg-slate-100 p-2 overflow-x-scroll">{value.actionTaken}</p>
                <p class="w-full border-2 border-white bg-slate-100 p-2 overflow-x-scroll">{value.location}</p>
                <div class="flex gap-2 w-full p-2">
                    <Button TITLE="Delete" COLOR="bg-redColor" on:click={removeData(value.id)}/>
                    <Button TITLE="Edit" on:click={()=>{editValueHandler(i)}}/>
                </div>
                {#if $compareComplaintValue === i}
                    <div class="">
                        <div class="flex flex-col gap-2 bg-guiColor p-4 max-w-fit mx-auto rounded-lg mt-2 absolute left-0 right-0 border-2 border-slate-200 z-10">
                            <p class="text-xl text-center font-bold p-2 text-slate-500">Modify Values</p>
                            <div class="">
                                <Inputs TITLE="Complete Name:" PLACEHOLDER="Complete Name" bind:this={complaintVarStore.completeName}/>
                            </div>
                
                            <div class="flex justify-center gap-2">
                                <div class="w-full">
                                    <Inputs TITLE="Date:" PLACEHOLDER="Date" TYPE="date" bind:this={complaintVarStore.date}/>
                                </div>
                                <div class="w-full">
                                    <Inputs TITLE="Locaton:" PLACEHOLDER="Locaton Of Incident" bind:this={complaintVarStore.location}/>
                                </div>
                            </div>
                
                            <div class="flex justify-center gap-2">
                                <div class="w-full">
                                    <Inputs TITLE="Complaint:" PLACEHOLDER="Complaint" bind:this={complaintVarStore.complaint}/>
                                </div>
                            
                            </div>
                
                            <div class="">
                                <Inputs TITLE="Action taken:" PLACEHOLDER="Action taken" bind:this={complaintVarStore.actionTaken}/>
                            </div>
                            
                            <div class="flex gap-2">
                                <Button TITLE="Confirm Edit" on:click={updateData(value.id)}/>
                                <Button TITLE="Cancel" on:click={() => {compareComplaintValue.set("")}}/>
                            </div>
                        </div>
                    </div>
                {/if}
            </div>
            {/each}

        </div>
        
    </div>

    
</div>