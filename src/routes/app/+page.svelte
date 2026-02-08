<!-- created by Aaron Meche -->
<script>
    import DailySpendingGraph from "../DailySpendingGraph.svelte";
    import RecentTransactions from "../RecentTransactions.svelte";

</script>

<!--  -->

<div class="page">
    <div class="top-section">
        <div class="label">Net Worth</div>
        <div class="big-value">+ $ 15,583</div>
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

    .big-value{
        font-size: 36pt;
        font-weight: 600;
    }

    .top-section > .label{
        font-size: 24pt;
        font-weight: 300;
        opacity: 0.75;
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