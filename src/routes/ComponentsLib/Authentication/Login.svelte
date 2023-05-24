<script>
    import loginLogo from "../Images/loginLogo.jpg";
    import Inputs from "../GeneralComponents/Inputs.svelte";
    import Button from "../GeneralComponents/Button.svelte";

    //database calls and hooks
    import {auth, db} from "../../db/firebase";
    import {signInWithEmailAndPassword} from "firebase/auth";

    //loginStorages
    const loginStore = {
        email: "",
        password: "",
        showLoading: false,
        showErrorDOMmsg: "",
    }

    //login to system
    const login = async() => {
        loginStore.showLoading.LOADING = true;
        await signInWithEmailAndPassword(auth, loginStore.email.BINDTHIS, loginStore.password.BINDTHIS).then((userCred) => {
            localStorage.setItem("uid", userCred.user.uid);
            loginStore.showLoading.LOADING = false;
        }).catch(error => {
            loginStore.showLoading.LOADING = false;
            loginStore.showErrorDOMmsg = error.code;
        })
    }

</script>

<div class="sm:max-w-xl mx-auto">
    <div class="p-10 flex flex-col gap-2 bg-purple-500 m-2 rounded-lg">
        <div class="">
            <img src={loginLogo} alt="loading" class="w-full]"/>
        </div>
        <Inputs TYPE="email" PLACEHOLDER="Email" TITLE="Email" bind:this={loginStore.email}/>
        <Inputs TYPE="password" PLACEHOLDER="Password" TITLE="Password" bind:this={loginStore.password}/>
        <Button TITLE="Login" on:click={login} bind:this={loginStore.showLoading}/>
        <div class="mt-2">
            <p class="text-center text-white">{loginStore.showErrorDOMmsg}</p>
        </div>
    </div>
    
</div>