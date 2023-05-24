<script>
    //database callse and hooks
    import { auth, db } from "../../db/firebase";
    import { onSnapshot, collection, doc  } from "firebase/firestore";


    let counter = 0;
    const colRef = collection(db, "votersList");
    onSnapshot(colRef, (snapshots) => {
        let counterConvert = 0;
        snapshots.docs.forEach(doc => {
            let fbStoreCount = Number(doc.data().voterCounter);
            counterConvert += fbStoreCount;
        })
        counter = counterConvert;
    })
   

   

</script>

<div class="flex justify-start flex-wrap gap-2 m-10">
    <!--Regitered voters-->
    <div>
        
        <div class="text-xl font-bold text-white absolute p-4 bg-black rounded-lg m-2">{counter}</div>
        <div class="max-w-[250px] min-h-[25vh] bg-purple-500">
            
            <p class="text-xl font-bold p-16 cursor-not-allowed">REGISTERED VOTERS </p>
        </div>
    </div>

    <!--TOTAL ID REQUEST-->
    <div>
        <div class="text-xl font-bold text-white absolute p-4 bg-black rounded-lg m-2">9</div>
        <div class="max-w-[250px] min-h-[25vh] bg-purple-500">
            <p class="text-xl font-bold p-16 cursor-not-allowed">TOTAL ID REQUEST</p>
        </div>
    </div>
    <!--TOTAL CERTIFICATE REQUEST-->
    <div>
        <div class="text-xl font-bold text-white absolute p-4 bg-black rounded-lg m-2">9</div>
        <div class="max-w-[250px] min-h-[25vh] bg-purple-500">
            <p class="text-xl font-bold p-16 cursor-not-allowed">TOTAL CERTIFICATE REQUEST</p>
        </div>
    </div>

    <!--TOTAL CLEARANCE REQUEST-->
    <div>
        <div class="text-xl font-bold text-white absolute p-4 bg-black rounded-lg m-2">9</div>
        <div class="max-w-[250px] min-h-[25vh] bg-purple-500">
            <p class="text-xl font-bold p-16 cursor-not-allowed">TOTAL CLEARANCE REQUEST</p>
        </div>
    </div>

    <!--TOTAL OF COMPLAINT-->
    <div>
        <div class="text-xl font-bold text-white absolute p-4 bg-black rounded-lg m-2">9</div>
        <div class="max-w-[250px] min-h-[25vh] bg-purple-500">
            <p class="text-xl font-bold p-16 cursor-not-allowed">TOTAL OF COMPLAINT</p>
        </div>
    </div>
</div>