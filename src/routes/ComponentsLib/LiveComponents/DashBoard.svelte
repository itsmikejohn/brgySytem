<script>
    //database callse and hooks
    import { auth, db } from "../../db/firebase";
    import { onSnapshot, collection, doc  } from "firebase/firestore";


    //listofvoters count
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
   
    
    //barangay requst id count
    let counter2 = 0
    const colRef2 = collection(db, "barangayID");
    onSnapshot(colRef2, (snapshots) => {
        let counterConvert = 0;
        snapshots.docs.forEach(doc => {
            let fbStoreCount = Number(doc.data().barangayCounter);
            counterConvert += fbStoreCount;
        })
        counter2 = counterConvert;
    })
    
    //barangay certificate count
    let counter3 = 0;
    const colRef3 = collection(db, "barangayCertificate");
    onSnapshot(colRef3, (snapshots) => {
        let counterConvert = 0;
        snapshots.docs.forEach(doc => {
            let fbStoreCount = Number(doc.data().bgyCertificateCounter);
            counterConvert += fbStoreCount;
        })
        counter3 = counterConvert;
    })


    //barangay clearance count
    let counter4 = 0;
    const colRef4 = collection(db, "barangayClearance");
    onSnapshot(colRef4, (snapshots) => {
        let counterConvert = 0;
        snapshots.docs.forEach(doc => {
            let fbStoreCount = Number(doc.data().bgyClearanceCounter);
            counterConvert += fbStoreCount;
        })
        counter4 = counterConvert;
    })


    //complaint count
    let counter5 = 0;
    const colRef5 = collection(db, "complaints");
    onSnapshot(colRef5, (snapshots) => {
        let counterConvert = 0;
        snapshots.docs.forEach(doc => {
            let fbStoreCount = Number(doc.data().complaintCounter);
            counterConvert += fbStoreCount;
        })
        counter5 = counterConvert;
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
        <div class="text-xl font-bold text-white absolute p-4 bg-black rounded-lg m-2">{counter2}</div>
        <div class="max-w-[250px] min-h-[25vh] bg-purple-500">
            <p class="text-xl font-bold p-16 cursor-not-allowed">TOTAL BARANGAY ID REQUEST</p>
        </div>
    </div>
    <!--TOTAL CERTIFICATE REQUEST-->
    <div>
        <div class="text-xl font-bold text-white absolute p-4 bg-black rounded-lg m-2">{counter3}</div>
        <div class="max-w-[250px] min-h-[25vh] bg-purple-500">
            <p class="text-xl font-bold p-16 cursor-not-allowed">TOTAL BARANGAY CERTIFICATE REQUEST</p>
        </div>
    </div>

    <!--TOTAL CLEARANCE REQUEST-->
    <div>
        <div class="text-xl font-bold text-white absolute p-4 bg-black rounded-lg m-2">{counter4}</div>
        <div class="max-w-[250px] min-h-[25vh] bg-purple-500">
            <p class="text-xl font-bold p-16 cursor-not-allowed">TOTAL CLEARANCE REQUEST</p>
        </div>
    </div>

    <!--TOTAL OF COMPLAINT-->
    <div>
        <div class="text-xl font-bold text-white absolute p-4 bg-black rounded-lg m-2">{counter5}</div>
        <div class="max-w-[250px] min-h-[25vh] bg-purple-500">
            <p class="text-xl font-bold p-16 cursor-not-allowed">TOTAL OF COMPLAINT</p>
        </div>
    </div>
</div>