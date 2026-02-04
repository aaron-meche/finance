<script lang="ts">
	import '$lib/main.css';
	import favicon from '$lib/assets/favicon.svg';
	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<script src="https://kit.fontawesome.com/5cf062dc93.js" crossorigin="anonymous"></script>
</svelte:head>

<div class="page-line">
	<div class="navstack">
		<a href="/" class="logo"><i class="fa-solid fa-coins"></i> finance</a>

		<div class="section-title">Money Accounts</div>
		<div class="button-section">
			<div class="data account-button">
				Chase Checking ...8908
				<div class="balance">$223.40</div>
			</div>
			<div class="data account-button">
				Chase Checking ...2214
				<div class="balance">$102.90</div>
			</div>
			<div class="data account-button">
				Capital One Savings ...1293				
				<div class="balance">$933.49</div>
			</div>
			<div class="add account-button">+ Add Account</div>
		</div>

		<div class="section-divider"></div>

		<div class="section-title">Credit Accounts</div>
		<div class="button-section">
			<div class="data account-button">
				Chase Sapphire ...2993
				<div class="balance">$9134.40</div>
			</div>
			<div class="data account-button">
				Chase Freedom Flex ...8174
				<div class="balance">$694.23</div>
			</div>
			<div class="data account-button">
				Capital One Platinum ...1293			
				<div class="balance">$223.49</div>
			</div>
			<div class="add account-button">+ Add Account</div>
		</div>
	</div>

	<div class="page-stack">
		<div class="navbar">
			<input type="text" name="Search Bar" id="search_bar" placeholder="Search for something...">
			<div class="buttons">
				<a href="/balance" class="top-button"><i class="fa-regular fa-dollar-sign"></i> Balances</a>
				<a href="/account" class="top-button"><i class="fa-regular fa-user"></i> Account</a>
			</div>
		</div>
		<div class="content">
			{@render children()}
		</div>
	</div>
</div>

<style>
	.page-line{
		display: grid;
		grid-template-columns: min-content auto;
	}

	.navstack{
		height: 100vh;
		width: 22rem;
		border-right: solid 1pt var(--l3);
	}
	.logo{
		padding: 1.5rem;
		font-size: 24pt;
		font-weight: 600;
		cursor: pointer;
	}

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

	.navbar{
		display: grid;
		grid-template-columns: auto min-content;
		padding: 1rem;
		border-bottom: solid 1pt var(--l3);
	}

	#search_bar{
		padding: 0.25rem 1rem;
		margin: 0 0.5rem;
		background: var(--l1);
		outline: solid 1pt var(--l3);
		font-size: 10pt;
		border-radius: 100vh;
	}

	#search_bar:focus{
		background: var(--l2);
		outline-color: var(--l5);
	}

	.buttons{
		display: flex;
		align-items: center;
	}

	.top-button{
		display: inline-flex;
		align-items: center;
		padding: 0.5rem 1.5rem;
		border-radius: 100vh;
		cursor: pointer;
	}

	.top-button > i{
		margin-right: 0.25rem;
	}

	.top-button:hover{
		background: var(--l1);
		color: var(--accent);
		outline: solid 1pt var(--l4);
	}

	.page-stack{
		display: grid;
		grid-template-rows: min-content auto;
	}
</style>