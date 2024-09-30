<svelte:head>
  <title>Test Page</title>
  <meta name="description" content="Testpage" />
</svelte:head>

<script lang="ts">
  import SolrSearch from "$lib/SolrSearch.svelte";
  import { writable } from "svelte/store";
  const solrUrl = import.meta.env.VITE_SOLR_URL;

  let result = writable(null);

  const handleDataFetched = ({ detail }) => {
    result.set(detail);
    console.log(detail);
  };
</script>

<SolrSearch {solrUrl} on:dataFetched={handleDataFetched} />


{#if $result}
  <p>
    {$result.responseHeader.params.q}
  </p>
  <pre>{JSON.stringify($result, null, 2)}</pre>
{/if}
