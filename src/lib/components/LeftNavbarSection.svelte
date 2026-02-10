<!-- created by Aaron Meche -->
<script>
    import { db } from "$lib/data";
    import { AccountSelectionCardinality } from "plaid";
    import AccountListItem from "./AccountListItem.svelte";
    let { title, accounts, balance } = $props()

    function formatNumber(num) {
        if (!num) return 0
        return num.toLocaleString('en-US')
    }

    let extended = $state(true)

    function toggleExtended() {
        extended = extended ? false : true
    }

</script>

<!--  -->

<button onclick={toggleExtended} class="section-top-bar">
	<div class="section-title">{title}</div>
	<div class="section-balance">${formatNumber(balance)}</div>
    {#if extended}
	    <i class="fa-solid fa-chevron-down"></i>
    {:else}
	    <i class="fa-solid fa-chevron-up"></i>
    {/if}
</button>
<div style:display={extended ? "block" : "none"} class="button-section">
    {#each accounts as account}
		<AccountListItem account={account} />
    {/each}
</div>

<!--  -->

<style>
    button{
        display: block;
        width: calc(100% - 4rem);
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
		opacity: 0.75;
        color: var(--accent)
	}

	.button-section{
		margin-inline: 1rem;
	}
</style>