<script>
    import Button from "../GeneralComponents/Button.svelte";
    import Inputs from "../GeneralComponents/Inputs.svelte";

    import { showAdd, onSnaps, compareValue } from "../BoundComponents/clickOutside";

    //database calls and hooks
    import { auth, db } from "../../db/firebase";
    import { addDoc, collection, serverTimestamp, onSnapshot, query, orderBy, increment, deleteDoc, doc, setDoc } from "firebase/firestore";

    //toggle show modal of add voter
    const showAddModal = () => {
        showAdd.set(true);
    }

    //handler for send data of addVoter
    const listOfVotersStore = {
        completeName: "",
        precintNum: "",
        completeAddress: "",
    }
    const addVoter = async() => {
       const colRef = collection(db, "votersList");
       await addDoc(colRef, {
            createdAt: serverTimestamp(),
            completeName: listOfVotersStore.completeName.BINDTHIS,
            precintNumber: listOfVotersStore.precintNum.BINDTHIS,
            completeAddress: listOfVotersStore.completeAddress.BINDTHIS,
            voterCounter: increment(1),
       }).then(() => {
            listOfVotersStore.completeName.BINDTHIS = "";
            listOfVotersStore.precintNum.BINDTHIS = "";
            listOfVotersStore.completeAddress.BINDTHIS = "";
       })
    }

    //database loop data
    const colRef = collection(db, "votersList");
    const q = query(colRef, orderBy("createdAt", "desc"))
    onSnapshot(q, (snapshots) => {
        let fbData = [];
        snapshots.docs.forEach(doc => {
            let data = {...doc.data(), id: doc.id}
            fbData = [data, ...fbData];
        })
        onSnaps.set(fbData);
    })

    //database remove data
    const removeData = async(data) => {
        const docRef = doc(colRef, data);
        await deleteDoc(docRef);
    }

    //database update data
    const updateData = async(data) => {
        const docRef = doc(colRef, data)
        setDoc(docRef, {
            lastUpdated: serverTimestamp(),
            completeName: listOfVotersStore.completeName.BINDTHIS,
            precintNumber: listOfVotersStore.precintNum.BINDTHIS,
            completeAddress: listOfVotersStore.completeAddress.BINDTHIS,
        }, {merge:true}).then(() => {
            listOfVotersStore.completeName.BINDTHIS = "";
            listOfVotersStore.precintNum.BINDTHIS = "";
            listOfVotersStore.completeAddress.BINDTHIS = "";
        })

    }

    //showEditModal
    const showEditModal = (i) => {
        compareValue.set(i)
    }

    
</script>

<div class="m-2 sm:max-w-[1200px] mx-auto">
    <div class="min-h-[50vh] p-4">
        <div class="max-w-fit mb-2">
            <Button TITLE="Add Voter" on:click={showAddModal}/>
        </div>
        
        <!--ADD voters-->
        {#if $showAdd}
        <div class="flex flex-col gap-2 bg-guiColor p-4 max-w-fit mx-auto rounded-lg mt-2 absolute left-0 right-0 border-2 border-slate-200">
            <p class="text-xl text-center font-bold p-2 text-slate-500">Add New Voter</p>
            <div class="flex gap-2 justify-center">
                <div class="">
                    <Inputs TITLE="Name:" PLACEHOLDER="Complete Name" bind:this={listOfVotersStore.completeName}/>
                </div>
                <div class="">
                    <Inputs TITLE="PRECINT#:" PLACEHOLDER="Precint Number" TYPE="number" bind:this={listOfVotersStore.precintNum}/>
                </div>
                <div class="">
                    <Inputs TITLE="ADDRESS:" PLACEHOLDER="Complete Address" bind:this={listOfVotersStore.completeAddress}/>
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

            <div class="flex  justify-center items-center">
                <p class="text-xl sm:text-2xl font-bold text-left w-full bg-slate-200 p-2 border-2 border-white">Name</p>
                <p class="text-xl sm:text-2xl font-bold text-left w-full bg-slate-200 p-2 border-2 border-white">Precint#</p>
                <p class="text-xl sm:text-2xl font-bold text-left w-full bg-slate-200 p-2 border-2 border-white">Address</p>
                <p class="text-xl sm:text-2xl font-bold text-left w-full bg-slate-200 p-2 border-2 border-white">Option</p>

                
                

            </div>
            {#each $onSnaps as value , i}
                <div class="">
                    <div class="flex justify-center items-center ">
                        <p class="w-full border-2 border-white bg-slate-100 p-2 overflow-x-scroll">{value.completeName}</p>
                        <p class="w-full border-2 border-white bg-slate-100 p-2 overflow-x-scroll">{value.precintNumber}</p>
                        <p class="w-full border-2 border-white bg-slate-100 p-2 overflow-x-scroll">{value.completeAddress}</p>
                        <div class="flex gap-2 w-full p-2 bg-slate-100">
                            <Button TITLE="Delete" COLOR="bg-redColor" on:click={()=>{removeData(value.id)}}/>
                            <Button TITLE="Edit" on:click={()=>{showEditModal(i)}}/>
                        </div>
                        
                    </div>
                 

                    {#if $compareValue === i}
                    <div class="flex flex-col bg-guiColor gap-2 p-4 max-w-fit mx-auto rounded-lg mt-2 absolute left-0 right-0 border-2 border-slate-200 z-10">
                        <p class="text-xl text-center font-bold p-2 text-slate-500">Modify Values</p>
                        <div class="flex gap-2 justify-center">
                            <div class="">
                                <Inputs TITLE="Name:" PLACEHOLDER="Complete Name" bind:this={listOfVotersStore.completeName}/>
                            </div>
                            <div class="">
                                <Inputs TITLE="PRECINT#:" PLACEHOLDER="Precint Number" TYPE="number" bind:this={listOfVotersStore.precintNum}/>
                            </div>
                            <div class="">
                                <Inputs TITLE="ADDRESS:" PLACEHOLDER="Complete Address" bind:this={listOfVotersStore.completeAddress}/>
                            </div>
                        </div>
                        
                        <div class="flex gap-2">
                            <Button TITLE="Confirm Edit" on:click={() => {updateData(value.id)}}/>
                            <Button TITLE="Close" on:click={showEditModal}/>
                        </div>
                        
                    </div>
                    {/if}
                </div>
            {/each}
        </div>
        
    </div>
</div>
