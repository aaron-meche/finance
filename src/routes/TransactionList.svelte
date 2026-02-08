<!-- created by Aaron Meche -->
<script>
    let { transactions, accounts } = $props()

    function formatNumber(num) {
        if (!num) return 0
        return num.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    }

    // if (transactions) {
    //     transactions.forEach(t => {
    //         console.log(t.name, t.amount, t.personal_finance_category.primary, t)
    //     })
    // }

</script>

<!--  -->

{#if transactions}
    <div class="transaction-list">
        {#each transactions as transaction}
            <div 
                class="item"
                class:positive={transaction.amount > 0} 
                class:negative={transaction.amount < 0}>
                <div class="about">
                    <div class="date">{transaction.type} {transaction.personal_finance_category.primary}</div>
                    {#if accounts}
                        <div class="date">{transaction.date} - {accounts.find(item => item.account_id === transaction.account_id).name}</div>
                    {:else}
                        <div class="date">{transaction.date}</div>
                    {/if}
                    <div class="title">{transaction.name}</div>
                </div>
                <div class="amount">${formatNumber(transaction.amount)}</div>
            </div>
        {/each}
    </div>
{/if}

<!--  -->

<style>
    .transaction-list{
        display: grid;
        gap: 0.25rem;
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
        opacity: 0.9;
        cursor: pointer;
    }

    .transaction-list > .item:hover{
        opacity: 1;
    }

    .transaction-list .date{
        font-size: 10pt;
        opacity: 0.75;
    }

    .transaction-list .amount{
        font-size: 16pt;
    }

    .item.positive{
        background: rgb(2, 67, 2);
    }

    .item.negative{
        background: rgb(67, 12, 2);
    }
</style>