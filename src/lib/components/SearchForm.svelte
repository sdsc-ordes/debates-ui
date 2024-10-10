<script lang="ts">
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();
    let queryTerm = "";

    function handleSubmit(e: Event) {
        e.preventDefault();
        dispatch("submit", queryTerm);
    }

    function handleReset() {
        queryTerm = "";
        dispatch("reset");
    }
</script>

<style>
    #query-input {
        flex: 1;
        padding: 0.5rem;
        font-size: 1rem;
        border: 1px solid #ccc;
        border-radius: 4px 0 0 4px;
    }

    #search-button {
        padding: 0.5rem 1rem;
        font-size: 1rem;
        font-weight: bold;
        color: #fff;
        background-color: #ff3e00;
        border: none;
        border-radius: 0 4px 4px 0;
        cursor: pointer;
        transition: background-color 0.3s;
    }

    .option-button {
        margin-top: 0.5rem;
        font-size: 0.9rem;
        color: #ff3e00;
        background: none;
        border: none;
        cursor: pointer;
        text-align: left;
        margin-left: 2rem;
    }
</style>

<form on:submit|preventDefault={handleSubmit}>
    <input id="query-input" type="text" bind:value={queryTerm} placeholder="Enter search term" />
    <button id="search-button" type="submit">Search</button>
    <button class="option-button" type="button" on:click={handleReset}>Reset</button>
</form>
