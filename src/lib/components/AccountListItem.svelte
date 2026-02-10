<!-- created by Aaron Meche -->
<script>
    import { resolve } from '$app/paths';
    
    let { account } = $props()

	function formatNumber(num) {
        if (!num) return 0
        return num.toLocaleString('en-US')
    }

</script>

<!--  -->
<a href={resolve("/app/spotlight?account_id=" + account.account_id)}>
    <div class="data account-button">
        {account.name}
        <div class="balance">${formatNumber(Math.floor(account.balances.current))}</div>
    </div>
</a>

<!--  -->

<style>
    .account-button{
		padding: 0.5rem 1rem;
		border-radius: 100vh;
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