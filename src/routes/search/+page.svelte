<script lang="ts">
  import { writable } from "svelte/store";
  import StatementItem from "./StatementItem.svelte";
  import "./page.css";
  import SolrForm from "$lib/SearchForm.svelte";
  import { fetchSolrData } from "$lib/solrSearch";

  const solrUrl = import.meta.env.VITE_SOLR_URL;
  let searchResults = writable(null);

  async function handleSearch(queryTerm: string) {
    try {
      const data = await fetchSolrData(solrUrl, queryTerm);
      searchResults.set(data);
    } catch (error) {
      console.error(error.message);
    }
  }

  function handleReset() {
    searchResults.set(null);
  }
</script>

<svelte:head>
  <title>Political Debates Search</title>
  <meta name="description" content="Political Debates Search" />
</svelte:head>

<SolrForm on:submit={(e) => handleSearch(e.detail)} on:reset={handleReset} />

{#if $searchResults}
  <div class="container">
    <!-- Facet Counts -->
    <div class="facets">
      <h3>Facet Counts</h3>
      {#if $searchResults.facet_counts}
        {#each $searchResults.facet_counts.facet_fields.speaker_name as facet, index}
          {#if index % 2 === 0}
            <div>
              {facet}: {$searchResults.facet_counts.facet_fields.speaker_name[
                index + 1
              ]}
            </div>
          {/if}
        {/each}
      {:else}
        <p>No facet counts available.</p>
      {/if}
    </div>

    <!-- Statements -->
    <div class="statements">
      {#if $searchResults && $searchResults.response && $searchResults.response.docs}
        {#each $searchResults.response.docs as doc}
          <StatementItem
            {doc}
            query={$searchResults.responseHeader.params.q}
            highlighting={$searchResults.highlighting}
          />
        {/each}
      {:else}
        <p>No statements available.</p>
      {/if}
    </div>
  </div>
{/if}
