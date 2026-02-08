<!-- created by Aaron Meche -->
<script>
    import { resolve } from '$app/paths';
    import { db } from '$lib/data'
    import AccountListItem from './AccountListItem.svelte';

	let accounts = []
	let money_accounts, credit_accounts
	db.subscribe(data => {
		accounts = data.accounts || []
		money_accounts = accounts.filter(item => item.type == "depository")
		credit_accounts = accounts.filter(item => item.type == "credit")
	})

</script>

<!--  -->

<a href={resolve("/app")} class="logo"><i class="fa-solid fa-coins"></i> finance</a>

<div class="section-title">Money Accounts</div>
<div class="button-section">
    {#each money_accounts as account}
		<AccountListItem account={account} />
    {/each}
</div>

<div class="section-divider"></div>

<div class="section-title">Credit Accounts</div>
<div class="button-section">
    {#each credit_accounts as account}
        <AccountListItem account={account} />
    {/each}
</div>

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

	.section-title{
		margin-inline: 2rem;
		margin-bottom: 0.5rem;
		font-size: 12pt;
		font-weight: 500;
		color: gray;
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