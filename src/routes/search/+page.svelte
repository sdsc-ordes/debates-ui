<script lang="ts">
  import { writable } from "svelte/store";
  import SolrForm from "$lib/components/SearchForm.svelte";
  import SearchResultContainer from "$lib/components/SearchResultContainer.svelte";
  import type { StatementDisplay } from '$lib/interfaces/searchpage.interface';
  import type { StatementSolr } from '$lib/interfaces/solr.interface';
  import { fetchSolrData } from "$lib/solr/solrSearch";
  import { PUBLIC_SOLR_URL } from "$env/static/public";

  const solrUrl = PUBLIC_SOLR_URL;
  let searchResult: StatementSolr[];

  async function handleSearch(queryTerm: string) {
    const data = await fetchSolrData(solrUrl, queryTerm, false);
    console.log(data);
    if (data) {
      searchResult = data;
    } else {
      console.warn("No data found or an error occurred.");
    }
  }

  function handleReset() {
    searchResult = [];
  }
</script>

<svelte:head>
  <title>Political Debates Search</title>
  <meta name="description" content="Political Debates Search" />
</svelte:head>

<SolrForm on:submit={(e) => handleSearch(e.detail)} on:reset={handleReset} />

{#if searchResult}
  <SearchResultContainer {searchResult} />
{/if}
