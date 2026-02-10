<!-- created by Aaron Meche -->
<script>
    
    import NetWorthDisplay from "$lib/components/NetWorthDisplay.svelte";
    import DailySpendingGraph from "$lib/components/DailySpendingGraph.svelte";
    import RecentTransactions from "$lib/components/RecentTransactions.svelte";
</script>

<!--  -->

<div class="page">
    <div class="section">
        <NetWorthDisplay />
    </div>

    <div class="section">
        <div class="label">Spending by Day</div>
        <div class="graphic">
            <DailySpendingGraph />
        </div>
    </div>

    <div class="section">
        <div class="label">Recent Transactions</div>
        <RecentTransactions />
    </div>
</div>

<!--  -->

<style>
    .page{
        display: grid;
        gap: 4rem;
        padding: 2rem;
    }

    .section{
        /* background: rgba(185, 185, 185, 0.364); */
    }

    .section > .label{
        margin-left: 1rem;
        margin-bottom: 0.5rem;
        font-size: 14pt;
        font-weight: 500;
        opacity: 0.75;
    }

</style>