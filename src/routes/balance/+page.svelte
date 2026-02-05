<!-- created by Aaron Meche -->
<script>
    import { onMount } from 'svelte';
    import { db } from '$lib/data'
    let accounts = [];
    let money_accounts = []
    let credit_accounts = []
    let loading = false;
    let error = "";

    let accessToken = null
    db.subscribe(data => {
        accessToken = data.accessToken || undefined
    })

    async function loadAccounts() {
        loading = true;
        error = "";

        try {
            const res = await fetch("/api/accounts", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ accessToken: accessToken })
            });
            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || data.error || "Failed");
            }

            accounts = data.accounts || [];
            db.update(data => {
                data.accounts = accounts
                console.log(accounts)
                return data
            })
            // console.log(accounts)
        } catch (err) {
            error = err.message;
        } finally {
            loading = false;
        }
    }

    onMount(() => {
        if (accessToken) {
            loadAccounts()
        }
    })
</script>

<!--  -->

<div class='page'>
    <div class="account-grid">
        {#each accounts as account}
            <div class="account">
                <div class="name">{account.name}</div>
                <div class="type">{account.subtype}</div>
                <div class="type">{account.type}</div>
                <div class="balance">${account.balances.current}</div>
            </div>
        {/each}
    </div>
</div>

<!--  -->

<style>
    .account-grid{
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
    }
    .account{
        padding: 1rem;
        margin: 1rem;
        background: var(--l1);
        outline: solid 1pt var(--l3);
    }
</style>