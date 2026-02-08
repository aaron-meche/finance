<!-- created by Aaron Meche -->
<script>
    import { page } from '$app/stores';
    import { db } from "$lib/data"
    import { onMount } from 'svelte';
    import TransactionList from '../../TransactionList.svelte';

    let transactions = null;
    let loading = false;
    let error = null;
    let big_balance, little_balance

    let account = {}
    $: {
        const req_account_id = $page.url.searchParams.get('account_id');
        transactions = $db.transactions?.filter(item => item.account_id === req_account_id)

        if (req_account_id && $db.accounts) {
            account = $db.accounts.find(acc => acc.account_id === req_account_id) || {};
            if (account.type == "depository" && account.balances?.available) {
                big_balance = formatNumber(account.balances?.available)
                little_balance = formatNumber(account.balances?.current)
            } else if (account.type == "depository") {
                big_balance = formatNumber(account.balances?.current)
                little_balance = null
            } else if (account.type == "credit") {
                big_balance = formatNumber(account.balances?.current)
                little_balance = formatNumber(account.balances?.available)
            }
        }
    }

    function formatNumber(num) {
        if (!num) return 0
        return num.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    }
</script>

<!-- {
    "account_id": "oVEkvbDZxXCwwBZolxBgtxjGw6N4gdfGPeNRk",
    "balances": {
        "available": 100,
        "current": 110,
        "iso_currency_code": "USD",
        "limit": null,
        "unofficial_currency_code": null
    },
    "holder_category": "personal",
    "mask": "0000",
    "name": "Plaid Checking",
    "official_name": "Plaid Gold Standard 0% Interest Checking",
    "subtype": "checking",
    "type": "depository"
} -->

<!--  -->

<div class="page">
    {#if account}
        <!-- Account Information -->
        <div class="account-name">{account.name}</div>
        <div class="account-type">{account.subtype} Account</div>
        <div class="obj">
            <div class="big-value">${big_balance}</div>
            <div class="label">Current Balance</div>
        </div>
        <div class="data-grid">
            {#if little_balance}
                <div class="obj">
                    <div class="value">${little_balance}</div>
                    <div class="label">Present Balance</div>
                </div>
            {/if}
            {#if account.type == "credit"}
                <div class="obj">
                    <div class="value">${formatNumber(account.balances?.limit)}</div>
                    <div class="label">Credit Limit</div>
                </div>
            {/if}
        </div>
        <!-- Transaction Information -->
        <div class="section-label">Recent Transactions</div>
        <TransactionList transactions={transactions} />
    {/if}
</div>

<!--  -->

<style>
    .page{
        padding: 2rem;
    }

    .account-name{
        font-size: 24pt;
        font-weight: 600;
        text-align: center;
    }

    .account-type{
        font-size: 16pt;
        font-weight: 400;
        opacity: 0.75;
        text-transform: capitalize;
        text-align: center;
    }

    .data-grid{
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
    }

    .obj{
        padding: 1rem;
    }

    .obj > .big-value{
        font-size: 24pt;
        font-weight: 600;
    }

    .obj > .value {
        font-size: 16pt;
        font-weight: 500;
    }

    .obj > .label{
        font-size: 12pt;
        font-weight: 400;
        opacity: 0.75;
    }

    .section-label{
        margin-top: 2rem;
        margin-left: 1rem;
        margin-bottom: 0.5rem;
        font-size: 14pt;
        font-weight: 500;
        opacity: 0.75;
    }
</style>