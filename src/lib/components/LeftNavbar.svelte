<!-- created by Aaron Meche -->
<script>
    import { resolve } from '$app/paths';
    import { db } from '$lib/data'
    import AccountListItem from '$lib/components/AccountListItem.svelte';
	import LeftNavbarSection from './LeftNavbarSection.svelte';

	function formatNumber(num) {
        if (!num) return 0
        return num.toLocaleString('en-US')
    }

	let accounts = []
	let money_accounts, credit_accounts, loan_accounts, invest_accounts
	let money_acc_bal = 0
	let credit_acc_bal = 0
	let loan_acc_bal = 0	
	let invest_acc_bal = 0

	$: {
		money_acc_bal = 0,
		credit_acc_bal = 0
		loan_acc_bal = 0		
		invest_acc_bal = 0

		accounts = $db.accounts || []
		money_accounts = accounts.filter(item => item.type == "depository")
		credit_accounts = accounts.filter(item => item.type == "credit")
		loan_accounts = accounts.filter(item => item.type == "loan")		
		invest_accounts = accounts.filter(item => item.type == "investment")

		money_accounts.forEach(acc => { money_acc_bal += acc.balances.current })
		credit_accounts.forEach(acc => { credit_acc_bal += acc.balances.current })
		loan_accounts.forEach(acc => { loan_acc_bal += acc.balances.current })		
		invest_accounts.forEach(acc => { invest_acc_bal += acc.balances.current })

	}

</script>

<!--  -->

<a href={resolve("/app")} class="logo"><i class="fa-solid fa-coins"></i> finance</a>

<LeftNavbarSection title="Money Accounts" accounts={money_accounts} balance={money_acc_bal} />

<div class="section-divider"></div>

<LeftNavbarSection title="Credit Accounts" accounts={credit_accounts} balance={credit_acc_bal} />

<div class="section-divider"></div>

<LeftNavbarSection title="Loan Accounts" accounts={loan_accounts} balance={loan_acc_bal} />

<div class="section-divider"></div>

<LeftNavbarSection title="Investment Accounts" accounts={invest_accounts} balance={invest_acc_bal} />

<!--  -->

<style>
    .logo{
		padding: 2rem;
		font-size: 24pt;
		font-weight: 600;
		cursor: pointer;
	}

	.logo i { margin-right: 0.5rem; }

	.section-divider{
		height: 2rem;
	}

	.section-top-bar{
		display: grid;
		grid-template-columns: auto min-content min-content;
		gap: 0.5rem;
		margin-inline: 2rem;
		margin-bottom: 0.5rem;
		padding-bottom: 0.5rem;
		border-bottom: solid 1pt var(--l6);
		font-weight: 600;
		opacity: 0.5;
		cursor: pointer;
	}

	.section-top-bar:hover{
		opacity: 1;
	}

	.button-section{
		margin-inline: 1rem;
	}
	
	.account-button{
		padding: 0.5rem 1rem;
		border-radius: 100vh;
		opacity: 0.8;
		cursor: pointer;
	}

	.account-button:hover{
		background: var(--l1);
		outline: solid 1pt var(--l4);
		opacity: 1;
	}

	.data.account-button{
		display: grid;
		grid-template-columns: auto min-content;
	}

	.data.account-button .balance{
		font-size: 10pt;
		opacity: 0.5;
	}
	
	.add.account-button{
		color: var(--accent);
		outline-color: var(--accent);
	}
</style>