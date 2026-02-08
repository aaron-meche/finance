<!-- created by Aaron Meche -->
<script>
    import { onMount } from 'svelte';
    import { db } from '$lib/data'
    let accounts = [];
    let money_accounts = []
    let credit_accounts = []
    let loading = false;
    let error = "";
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