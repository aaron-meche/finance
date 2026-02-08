<script>
	import '$lib/main.css';
	import favicon from '$lib/assets/icon.png';
	import TopNavbar from '../TopNavbar.svelte';
	import LeftNavbar from '../LeftNavbar.svelte';
	import { resolve } from '$app/paths';
	import { db } from '$lib/data'
	let { children } = $props();

	let money_accounts = []
	let credit_accounts = []
	db.subscribe(data => {
		money_accounts = data.money_accounts || []
		credit_accounts = data.credit_accounts || []
	})
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Finance Manager</title>
	<script src="https://kit.fontawesome.com/5cf062dc93.js" crossorigin="anonymous"></script>
</svelte:head>

<div class="page-line">
	<div class="navstack">
		<LeftNavbar />
	</div>

	<div class="page-stack">
		<div class="navbar">
			<TopNavbar />
		</div>
		<div class="content">
			{@render children()}
		</div>
	</div>
</div>

<style>
	.page-line{
		height: 100vh;
		display: grid;
		grid-template-columns: min-content auto;
	}

	.navstack{
		height: 100%;
		width: 22rem;
		border-right: solid 1pt var(--l3);
	}
	
	.navbar{
		display: grid;
		grid-template-columns: 1fr min-content;
		padding: 1rem;
		border-bottom: solid 1pt var(--l3);
	}

	.page-stack{
		display: grid;
		grid-template-rows: min-content 1fr;
		height: 100%;
		overflow: auto;
	}

	.content{
		height: 100%;
		width: 100%;
		overflow-y: auto;
	}
</style>