<!-- created by Aaron Meche -->
<script>
    import { page } from '$app/stores';
    import { db } from "$lib/data"
    import { onMount } from 'svelte';

    let transactions = null;
    let loading = false;
    let error = null;
    let big_balance, little_balance

    let account = {}
    $: {
        const req_account_id = $page.url.searchParams.get('account_id');
        transactions = null
        fetchTransactions($db.accessToken)

        if (req_account_id && $db.accounts) {
            account = $db.accounts.find(acc => acc.account_id === req_account_id) || {};
            console.log(account)
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

    async function fetchTransactions(accessToken) {
        loading = true;
        error = null;

        try {
            const res = await fetch('/api/transactions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                accessToken: accessToken,          // from your auth flow
                // Optional filters:
                // startDate: '2025-01-01',
                // endDate:   '2026-02-04',
                accountIds: [$page.url.searchParams.get('account_id')]
                })
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Failed to fetch transactions');
            }

            if (data.transactions.length > 0) {
                transactions = data.transactions;
            }
            console.log(transactions)
        } catch (err) {
            error = err.message;
            console.error(err);
        } finally {
            loading = false;
        }
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
        {#if transactions}
            <div class="transaction-list">
                <div class="label">Recent Transactions</div>
                {#each transactions as transaction}
                    <div class="item">
                        <div class="about">
                            <div class="date">{transaction.date}</div>
                            <div class="title">{transaction.name}</div>
                        </div>
                        <div class="amount">${formatNumber(transaction.amount)}</div>
                    </div>
                {/each}
            </div>
        {/if}
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

    .transaction-list{
        display: grid;
        gap: 0.25rem;
        margin-top: 2rem;
        border-top: solid 1pt var(--l3);
        padding: 2rem 1rem;
    }

    .transaction-list > .label{
        margin-bottom: 1rem;
        font-size: 20pt;
        font-weight: 600;
    }

    .transaction-list > .item{
        display: grid;
        grid-template-columns: auto min-content;
        align-items: center;
        padding: 1rem;
        background: var(--l1);
        cursor: pointer;
    }

    .transaction-list > .item:hover{
        background: var(--l2);
    }

    .transaction-list .date{
        font-size: 10pt;
        opacity: 0.75;
    }

    .transaction-list .amount{
        font-size: 16pt;
    }
</style>