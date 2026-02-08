<!-- created by Aaron Meche -->
<script>
    import { goto } from "$app/navigation";
    import { resolve } from "$app/paths";
    import { onMount } from "svelte";
    import { db } from "$lib/data";

    $: {
        if ($db.accessToken) {
            goto("/app")
        }
    }

</script>

<!--  -->

<div class='page'>
    Welcome to Finance. Click <a href={resolve("/app")}>here</a> to begin
</div>

<!--  -->

<style>
	a{
        display: inline-block;
        color: lightblue;
        cursor: pointer;
    }
    a:hover{
        color: lightcoral;
    }
</style>