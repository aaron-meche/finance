<!-- created by Aaron Meche -->
<script>
    import { goto } from "$app/navigation";
    import { resolve } from "$app/paths";
    import { onMount } from "svelte";
    import { db } from "$lib/data";
    import { auth } from "$lib/auth";
    import {
        GoogleAuthProvider,
        signInWithPopup,
        signInWithEmailAndPassword,
        createUserWithEmailAndPassword,
    } from "firebase/auth";

    async function signInWithGoogle() {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
        } catch (err) {
            console.error(err)
        }
    }

    $: {
        if ($db?.user.uid && $db?.accessToken) {
            goto("/app");
        }
        else if ($db?.user.uid) {
            goto("/connect")
        }
    }
</script>

<!--  -->

<div class="page">
    <div class="island">
        <div class="title">Login or Sign Up</div>
        <button on:click={signInWithGoogle}>Sign in with Google</button>
        <!-- <form action="">
            <div class="section">
                <div class="input-label">Email Address</div>
                <input type="text" />
            </div>
            <div class="section">
                <div class="input-label">Password</div>
                <input type="password" />
            </div>
        </form> -->
    </div>
</div>

<!--  -->

<style>
    .page {
        height: 100vh;
        width: 100vw;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .island {
        height: auto;
        width: 30rem;
        max-width: calc(100vw - 8rem);
        margin: auto;
        margin-top: 2rem;
        padding: 2rem;
        outline: solid 1pt var(--l5);
        text-align: center;
        border-radius: 1rem;
    }

    .title {
        margin-bottom: 0.5rem;
        font-size: 20pt;
        font-weight: 600;
    }

    form {
        display: grid;
        gap: 1rem;
        text-align: left;
    }

    .input-label {
        margin-left: 1rem;
        margin-bottom: 0.5rem;
        font-weight: 500;
        opacity: 0.75;
    }

    input {
        width: calc(100% - 2rem);
        padding: 1rem;
        background: var(--l1);
    }
</style>
