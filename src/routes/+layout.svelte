<script>
	import '$lib/main.css';
	import favicon from '$lib/assets/icon.png';
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
	<script src="https://kit.fontawesome.com/5cf062dc93.js" crossorigin="anonymous"></script>
</svelte:head>

<div class="content">
    {@render children()}
</div>

<style>

</style>