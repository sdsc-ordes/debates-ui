<script lang="ts">
    import StatementItem from "$lib/components/StatementItem.svelte";
    import StatementsNotAvailable from "$lib/components/StatementsNotAvailable.svelte";

    export let docs = [];
    export let query;
    export let highlighting;
</script>

<div class="statements">
    {#if docs && docs.length > 0}
        {#each docs as doc}
            <StatementItem {doc} {query} {highlighting} />
        {/each}
    {:else}
        <StatementsNotAvailable />
    {/if}
</div>
