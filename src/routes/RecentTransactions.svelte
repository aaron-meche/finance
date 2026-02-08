<!-- created by Aaron Meche -->
<script>
    import { db } from '$lib/data'
    import TransactionList from './TransactionList.svelte';

    let transactions = []
    let accounts = []
    $: {
        transactions = $db.transactions
        accounts = $db.accounts
    }

    let days = [110, 98, 284, 190, 88, 23, 130]
    let max = Math.max(...days)
</script>

<!--  -->

<div class='wrapper'>
    <TransactionList transactions={transactions} accounts={accounts} />
</div>

<!--  -->

<style>
    

</style>