<script lang="ts">
    import { createEventDispatcher } from "svelte";

    export let solrUrl: string;
    const dispatch = createEventDispatcher();

    let queryTerm = "";
    let params = {
        indent: "true",
        df: "statement",
        hl: "true",
        q: "",
        facet: "true",
        "facet.field": "speaker_name",
    };

    // Function to handle the search request
    const handleSearch = async () => {
        if (!queryTerm.trim()) {
            console.error("Search term is required");
            return;
        }

        params.q = queryTerm;
        const apiUrl = `${solrUrl}?${new URLSearchParams(params).toString()}`;
        console.log(apiUrl);

        try {
            const response = await fetch(apiUrl, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const json = await response.json();
                console.log(json);
                dispatch("dataFetched", json);
            } else {
                console.error("Error fetching JSON:", response.statusText);
            }
        } catch (error) {
            console.error("Error reading JSON:", error);
        }
    };

    const handleReset = () => {
        queryTerm = "";
        dispatch("dataFetched", null);
    };
</script>

<div class="input-container">
    <input
        id="query-input"
        type="text"
        bind:value={queryTerm}
        placeholder="Enter search term"
    />
    <button id="search-button" on:click={handleSearch}>Search</button>
    <button class="reset-button" on:click={handleReset}>Reset search</button>
</div>

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

    #reset-button:hover {
        text-decoration: underline;
    }
</style>
