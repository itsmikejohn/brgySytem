<script>
    import Button from "../GeneralComponents/Button.svelte";
    import Inputs from "../GeneralComponents/Inputs.svelte";
    import ListIcon from "../Images/SVGs/ListIcon.svg";
    import { fly } from "svelte/transition";
    

    import { showPrintModel, formattedDate } from "./stateStore";

    import { showAdd, onSnaps, compareValue } from "../BoundComponents/clickOutside";

    //database calls and hooks
    import { auth, db } from "../../db/firebase";
    import { addDoc, collection, serverTimestamp, onSnapshot, query, orderBy, increment, deleteDoc, doc, setDoc, where } from "firebase/firestore";

    //toggle show modal of add voter
    const showAddModal = () => {
        showAdd.set(true);
    }

    //handler for send data of addVoter
    const listOfVotersStore = {
        completeName: "",
        precintNum: "",
        completeAddress: "",
        kwiri: "",
        trigger: false,
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

    let sample = where("precintNumber", "==", 500)

    //database loop data
    const colRef = collection(db, "votersList");
    let q = query(colRef, orderBy("createdAt", "desc"));


    const handleSearch = () => {
        if(listOfVotersStore.trigger){
            q = query(colRef, orderBy("createdAt", "desc"), where("precintNumber", "==", Number(listOfVotersStore.kwiri)));

            onSnapshot(q, (snapshots) => {
                let fbData = [];
                snapshots.docs.forEach(doc => {
                    let data = {...doc.data(), id: doc.id}
                    fbData = [data, ...fbData];
                })
                onSnaps.set(fbData);
            })

            listOfVotersStore.trigger = false;
        }

    }

    const detectInputs = () => {
        if(listOfVotersStore.kwiri.trim().length < 1){
            let q = query(colRef, orderBy("createdAt", "desc"));
            onSnapshot(q, (snapshots) => {
            let fbData = [];
            snapshots.docs.forEach(doc => {
                let data = {...doc.data(), id: doc.id}
                fbData = [data, ...fbData];
            })
            onSnaps.set(fbData);

            listOfVotersStore.trigger = false;
        })
        }else{
            listOfVotersStore.trigger = true;
        }
    }




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

    //print data to external platforms like pdf etc
    const printFunc = () => {
        print();
    }





    
</script>

<div class="m-2  mx-auto text-xs">
    <div class="min-h-[50vh] p-10">
        <div class=" flex gap-2 items-center mb-2">
            <div class="w-full flex gap-2">
                <div class="">
                    <Button TITLE="Add Voter" on:click={showAddModal}/>
                </div>
    
                <div class="">
                    <Button TITLE="Print" on:click={() => showPrintModel.set(true)}/>
                </div>
            </div>

        
            <div class="flex flex-row-reverse items-center w-full">
                <button class="bg-blue-400 text-white absolute p-2 border-r-2 border-black hover:bg-blue-700 font-bold"
                on:click={handleSearch}
                >Search</button>
                <input type="text" placeholder="Precint Number Only" class="w-[40%] p-2 focus:outline-none border-2 border-black " 
                on:keyup={detectInputs}
                bind:value={listOfVotersStore.kwiri}/>
                
                
            </div>
            
        </div>

        {#if $showPrintModel}
            <div class="fixed bottom-0 top-0 left-0 right-0 bg-white ">

                <div class="mx-auto max-w-[1000px] mt-[20vh] p-10">
                    <div class="fixed bottom-0 right-0 p-10 ">
                        <div class="flex gap-2">
                            <div class="">
                                <Button TITLE="Print Now" on:click={printFunc}/>
                            </div>
                            <div class="">
                                <Button TITLE="Close" on:click={() => showPrintModel.set(false)}/>
                            </div>
                        </div>
                    </div>
                    
                    <div class="mb-5 flex flex-col gap-2  ">
                        <p class=" "><b>Date: </b>{formattedDate}</p>
                        <p class=" "><b>Generated by:</b> Sn3 Barangay System</p>
                    </div>
                    
                    <div class="flex justify-center items-center">
                        <p class="w-full bg-[#272822] text-white p-2 border-2 font-bold">Complete Name</p>
                        <p class="w-full bg-[#272822] text-white p-2 border-2 font-bold">Precint #</p>
                        <p class="w-full bg-[#272822] text-white p-2 border-2 font-bold">Address</p>
                    </div>
                    {#each $onSnaps as val}
                    <div class="flex justify-center items-center">
                        <p class="w-full   p-2 border-2 ">{val.completeName}</p>
                        <p class="w-full   p-2 border-2 ">{val.precintNumber}</p>
                        <p class="w-full   p-2 border-2 ">{val.completeAddress}</p>
                    </div>
                    {/each}
                </div>
            </div>
            
            
        {/if}
        
       
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

        <div class="" in:fly={{x:400, duration:1000}}>

            {#each $onSnaps as value , i}
                <div class="" in:fly={{x:400, duration:1000}}>
                    <div class="flex justify-center items-center ">
                        
                       
                        
                        <p class="w-[20%] font-bold border-b-2 border-white bg-slate-300 p-2 ">Complete Name</p>
                        <p class="w-full border-b-2 border-white bg-slate-100 p-2 ">{value.completeName}</p>

                        <p class="w-[20%] font-bold border-b-2 border-white bg-slate-300 p-2 ">Precint #</p>
                        <p class="w-[20%] border-b-2 border-white bg-slate-100 p-2 ">{value.precintNumber}</p>

                        <p class="w-[20%] font-bold border-b-2 border-white bg-slate-300 p-2 ">Address</p>
                        <p class="w-full border-b-2 border-white bg-slate-100 p-2 ">{value.completeAddress}</p>

                        
                        <div class="flex bg-slate-10 w-[30%]">
                            <button class="bg-red-500 font-bold text-white w-full p-2 hover:bg-red-600 border-b-2 border-white"
                            on:click={()=>{removeData(value.id)}}
                            >Delete</button>

                            <button class="bg-blue-500 font-bold text-white w-full p-2 hover:bg-blue-600 border-b-2 border-white"
                            on:click={()=>{showEditModal(i)}}
                            >Edit</button>
                            
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
