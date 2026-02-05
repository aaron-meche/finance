<!-- created by Aaron Meche -->
<script>
    import { onMount } from 'svelte';
    import { db } from '$lib/data'

    let linkHandler;
    let isLoading = true;
    let errorMsg = '';

    function storeData(input) {
        console.log(input)
        db.update(data => {
            console.log("before", data)
            data.accessToken = input.access_token || "empty"
            data.itemId = input.item_id || "empty"
            console.log("after", data)
            return data
        })
        console.log("done")
        db.subscribe(data => {
            console.log("post", data)
        })
    }

    onMount(async () => {
        try {
            const response = await fetch('/api/link-token', { method: 'POST' });
            if (!response.ok) {
                throw new Error('Failed to fetch link token');
            }
            const data = await response.json();
            const linkToken = data.link_token;

            linkHandler = window.Plaid.create({
                token: linkToken,
                onSuccess: async (public_token, metadata) => {
                    console.log('Success!', public_token, metadata);
                    await fetch('/api/exchange', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ public_token, metadata }),
                    }).then(res => {
                        return res.json()
                    }).then(res => {
                        db.update(data => {
                            data.accessToken = res.access_token || "empty"
                            data.itemId = res.item_id || "empty"
                            return data
                        })
                    }).catch(err => console.error('Exchange fetch failed:', err));
                },
                onExit: (err, metadata) => {
                    console.log('Exited', err, metadata);
                },
            });

            isLoading = false;
        } catch (err) {
            console.error(err);
            errorMsg = 'Failed to initialize Plaid Link';
            isLoading = false;
        }
    });
</script>

<!--  -->

<div class='page'>
    {#if linkHandler}
        <button class="link-account" on:click={() => linkHandler.open()}>
            + Connect Account
        </button> 
    {/if}
</div>

<!--  -->

<style>
    .link-account{
        padding: 1rem 2rem;
        background: var(--l1);
        border: solid 1pt var(--l3);
        border-radius: 100vh;
        cursor: pointer;
    }

    .link-account:hover{
        background: var(--l2);
        color: var(--accent);
        border-color: var(--l4);
    }
</style>