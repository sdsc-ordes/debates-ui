<script lang="ts">
  import FacetCounts from "$lib/components/FacetCounts.svelte";
  import StatementList from "$lib/components/StatementList.svelte";
  import type { SolrQuery, SolrResponse } from "$lib/interfaces/solr.interface";

  export let searchResult: SolrResponse;
  export let solrQuery: SolrQuery;
  export let onSearch: (solrQuery: SolrQuery) => void;
</script>

<div class="container">
  <FacetCounts {solrQuery} {onSearch} {searchResult} />
  <StatementList
    docs={searchResult.response?.docs}
    query={searchResult.responseHeader.params.q}
    highlighting={searchResult.highlighting}
  />
</div>
