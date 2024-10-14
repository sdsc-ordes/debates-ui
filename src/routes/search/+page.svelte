<script lang="ts">
  import { writable } from "svelte/store";
  import StatementItem from "$lib/components/StatementItem.svelte";
  import FacetCounts from "$lib/components/FacetCounts.svelte";
  import "./page.css";
  import SolrForm from "$lib/components/SearchForm.svelte";
  import { fetchSolrData } from "$lib/solr/solrSearch";

  const solrUrl = import.meta.env.VITE_SOLR_URL;
  let searchResults = writable(null);

  async function handleSearch(queryTerm: string) {
    const data = await fetchSolrData(solrUrl, queryTerm, false);
    if (data) {
      searchResults.set(data);
    } else {
      console.warn("No data found or an error occurred.");
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
    <FacetCounts facetCounts={$searchResults.facet_counts} />    

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
