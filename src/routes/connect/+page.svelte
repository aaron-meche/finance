<!-- created by Aaron Meche -->
<script>
    import PlaidConnect from "$lib/components/PlaidConnect.svelte";
    import { db } from '$lib/data'

    let access_token, item_id
    db.subscribe(data => {
        access_token = data?.accessToken || "emp"
        item_id = data?.itemId || "emp"
    })
</script>

<!--  -->

<div class="page">
    <div class="island">
        <div class="title">Connect Accounts</div>
        <div class="message">Now that you are logged in, lets connect some bank accounts and credit cards to enable financial overview.</div>
        <PlaidConnect />
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

    .message{
        margin-bottom: 1rem;
    }
</style>
