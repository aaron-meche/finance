<!-- created by Aaron Meche -->
<script>
    import { resolve } from '$app/paths';
    
    let { account } = $props()

</script>

<!--  -->
<a href={resolve("/spotlight?account_id=" + account.account_id)}>
    <div class="data account-button">
        {account.name}
        <div class="balance">${account.balances.current}</div>
    </div>
</a>

<!--  -->

<style>
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
</style>