<!-- created by Aaron Meche -->
<script>
    import PlaidConnect from "../../PlaidConnect.svelte";
    import { db } from '$lib/data'

    let access_token, item_id
    db.subscribe(data => {
        access_token = data?.accessToken || "emp"
        item_id = data?.itemId || "emp"
    })
</script>

<!--  -->

<div class='page'>
    <div class="header">Hello, Welcome to finance</div>
    <div>Account data</div>
    <div>access token {access_token}</div>
    <div>item id {item_id}</div>
    <PlaidConnect />
</div>

<!--  -->

<style>
    .page{
        padding: 2rem;
    }

    .page > .header{
        margin-bottom: 1rem;
        font-size: 20pt;
        font-weight: 500;
    }

</style>