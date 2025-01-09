
<script lang="ts">
  import SearchForm from "$lib/components/SearchForm.svelte";
  import FacetCounts from "$lib/components/FacetCounts.svelte";
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

<div class="container">
  <div class="row">
    <div class="col-md-4">
      <SearchForm {solrQuery} on:submit={handleSearch} on:reset={handleReset}/>
      <FacetCounts {solrQuery} onSearch={handleSearch} {searchResult} />
    </div>
    {#if searchResult}
      <div class="col-md-8">
        <SearchResultContainer {searchResult} {solrQuery} onSearch={handleSearch} />
      </div>
    {/if}
  </div>
</div>
