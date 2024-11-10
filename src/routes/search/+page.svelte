
<script lang="ts">
  import SearchForm from "$lib/components/SearchForm.svelte";
  import SearchResultContainer from "$lib/components/SearchResultContainer.svelte";
  import type { SolrQuery, SolrResponse } from '$lib/interfaces/solr.interface';
  import { fetchSolrData, createDefaultSolrQuery } from "$lib/solr/solrSearch";
  import { onMount } from "svelte";

  let solrQuery: SolrQuery = createDefaultSolrQuery();

  let searchResult: SolrResponse;

  async function handleSearch() {
    const data = await fetchSolrData(solrQuery);
    if (data) {
      searchResult = data;
    } else {
      console.warn("No data found or an error occurred.");
    }
  }

  function handleReset() {
    solrQuery = createDefaultSolrQuery()
    handleSearch();
  }
  onMount(() => {
    handleReset();
  });
</script>

<svelte:head>
  <title>Political Debates Search</title>
  <meta name="description" content="Political Debates Search" />
</svelte:head>

<SearchForm {solrQuery} on:submit={handleSearch} on:reset={handleReset} />

{#if searchResult}
  <SearchResultContainer {searchResult} {solrQuery} onSearch={handleSearch} />
{/if}

