<!-- created by Aaron Meche -->
<script>
    import { db } from '$lib/data'

    function formatNumber(num) {
        if (!num) return 0
        return num.toLocaleString('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    }

    let accounts = []
    let net_worth = null
    let assets = 0
    let debts = 0
    $: {
        if ($db.accounts) {
            assets = 0
            debts = 0
            $db.accounts.filter(acc => acc.type == "depository").forEach(acc => { assets += acc.balances.current })
            $db.accounts.filter(acc => acc.type == "investment").forEach(acc => { assets += acc.balances.current })
            $db.accounts.filter(acc => acc.type == "credit").forEach(acc => { debts += acc.balances.current })
            $db.accounts.filter(acc => acc.type == "loan").forEach(acc => { debts += acc.balances.current })
            net_worth = formatNumber(assets - debts)
        }
    }
</script>

<!--  -->

<div class='wrapper'>
    <div class="net-worth">
        <div class="label">Net Worth</div>
        <div class="big-value">${net_worth}</div>
    </div>
    <div class="assets breakdown">
        <div class="med-label">Assets</div>
        <div class="med-value">+${formatNumber(assets)}</div>
    </div>
    <div class="debts breakdown">
        <div class="med-label">Debts</div>
        <div class="med-value">-${formatNumber(debts)}</div>
    </div>
</div>

<!--  -->

<style>
    .wrapper{
        display: grid;
        grid-template-columns: 2fr 1fr 1fr;
        gap: 1rem;
    }

    .wrapper .breakdown{
        width: calc(100% - 2rem);
        margin: auto;
        padding: 1rem;
        border-radius: 0.5rem;
    }

    .label{
        font-size: 24pt;
        font-weight: 300;
        opacity: 0.75;
    }

    .med-label{
        font-weight: 300;
        opacity: 0.75;
    }

    .big-value{
        font-size: 36pt;
        font-weight: 700;
    }
    
    .med-value{
        font-size: 20pt;
        font-weight: 600;
    }

    .assets{
        background: linear-gradient(to bottom left, var(--green), rgb(255, 0, 0, 0));
    }

    .debts{
        background: linear-gradient(to top left, var(--red), rgb(255, 0, 0, 0));
    }
</style>