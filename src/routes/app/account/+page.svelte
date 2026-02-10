<!-- created by Aaron Meche -->
<script>
    import PlaidConnect from "$lib/components/PlaidConnect.svelte";
    import { db, clearDB } from '$lib/data'
    import { auth } from "$lib/auth";
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";

    let user = {}
    let photoURL = ""
    let displayName = ""
    let email = ""
    $: {
        user = $db.user
    }

    onMount(() => {
        console.log(user)
        photoURL = user?.photoURL
        displayName = user?.displayName
        email = user?.email
    })

    function logout() {
        auth.signOut()
        clearDB()
        goto("/")
    }
</script>

<!--  -->

<div class='page'>
    <div class="account-info">
        <img class="pfp" src={photoURL} alt="">
        <div class="details">
            <div class="display-name">{displayName}</div>
            <div class="email">{email}</div>
        </div>
        <button onclick={logout} class="logout"><i class="fa-solid fa-arrow-right-from-bracket"></i> Log Out</button>
    </div>
</div>

<!--  -->

<style>
    .page{
        padding: 2rem;
    }

    .account-info{
        display: grid;
        grid-template-columns: min-content auto auto;
        gap: 2rem;
        align-items: center;
    }

    .pfp{
        border-radius: 100vh;
    }
    
    .display-name{
        font-size: 24pt;
        font-weight: 600;
    }

    .email{
        font-size: 14pt;
        opacity: 0.75;
    }

    .logout{
        margin-left: auto;
        padding: 1rem 2rem;
        background: rgb(255, 0, 0, 0.2);
        border: solid 1pt rgb(255, 0, 0, 0.4);
        border-radius: 1rem;
        opacity: 0.8;
    }
    
    .logout:hover{
        opacity: 1;
    }

</style>