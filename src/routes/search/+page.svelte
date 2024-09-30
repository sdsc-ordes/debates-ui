
<svelte:head>
  <title>Political Debates Search</title>
  <meta name="description" content="Political Debates Search" />
</svelte:head>

<script lang="ts">
  import { writable } from "svelte/store";
  import StatementItem from "./StatementItem.svelte";
  import "./page.css";
  import SolrSearch from "$lib/SolrSearch.svelte";

  const solrUrl = import.meta.env.VITE_SOLR_URL;

  let result = writable(null);

  const handleDataFetched = ({ detail }) => {
    result.set(detail);
    console.log(detail);
  };
</script>


<SolrSearch {solrUrl} on:dataFetched={handleDataFetched} />

{#if $result}
  <div class="container">
    <!-- Facet Counts -->
    <div class="facets">
      <h3>Facet Counts</h3>
      {#if $result.facet_counts}
        {#each $result.facet_counts.facet_fields.speaker_name as facet, index}
          {#if index % 2 === 0}
            <div>
              {facet}: {$result.facet_counts.facet_fields.speaker_name[index + 1]}
            </div>
          {/if}
        {/each}
      {:else}
        <p>No facet counts available.</p>
      {/if}
    </div>

    <!-- Statements -->
    <div class="statements">
      {#if $result && $result.response && $result.response.docs}
        {#each $result.response.docs as doc}
          <StatementItem {doc} highlighting={$result.highlighting} />
        {/each}
      {:else}
        <p>No statements available.</p>
      {/if}
    </div>
  </div>
{/if}
