<script lang="ts">
  import SolrForm from "$lib/SearchForm.svelte";
  import { fetchSolrData } from "$lib/solrSearch";
  import { writable } from "svelte/store";

  const solrUrl = import.meta.env.VITE_SOLR_URL;
  let searchResults = writable(null);

  async function handleSearch(queryTerm: string) {
    const data = await fetchSolrData(solrUrl, queryTerm);
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
  <title>Test Page</title>
  <meta name="description" content="Testpage" />
</svelte:head>

<SolrForm on:submit={(e) => handleSearch(e.detail)} on:reset={handleReset} />

{#if $searchResults}
  <pre>{JSON.stringify($searchResults, null, 2)}</pre>
{/if}
