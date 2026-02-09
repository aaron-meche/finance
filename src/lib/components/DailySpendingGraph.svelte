<!-- created by Aaron Meche -->
<script>
    import { db } from '$lib/data'


    let days = [110, 98, 284, 190, 88, 23, 130]
    let max = Math.max(...days)
</script>

<!--  -->

<div class='wrapper'>
    {#each days as day} 
        <div class="day">
            <div class="bar-space">
                <!-- Height should be 100 * day / max -->
                <div class="value" style:height="{(day / max) * 100}%"></div>
            </div>
            <div class="day-label">Monday</div>
        </div>
    {/each}
</div>

<!--  -->

<style>
    .wrapper{
        height: 20rem;
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        gap: 1rem;
    }

    .day{
        display: grid;
        grid-template-rows: auto min-content;
    }

    .bar-space{
        display: flex;
        align-items: end;
    }

    .bar-space > .value{
        width: 100%;
        background: var(--l5);
        border-radius: 0.5rem;
        transition-duration: 300ms;
    }

    .bar-space > .value:hover{
        background: var(--accent);
    }

    .day-label{
        margin-top: 0.5rem;
        text-align: center;
        font-weight: 500;
        opacity: 0.75;
    }

</style>