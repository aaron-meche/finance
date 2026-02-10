<script>
	import '$lib/main.css';
	import favicon from '$lib/assets/icon.png';
	import { resolve } from '$app/paths';
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { db } from '$lib/data'
	let { children } = $props();

	onMount(() => {
        if ($db?.user?.uid && $db?.accessToken) {
            goto("/app");
        }
        else if ($db?.user?.uid) {
            goto("/connect")
        }
		else {
			console.log("User not found. Routing to /connect")
		}
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