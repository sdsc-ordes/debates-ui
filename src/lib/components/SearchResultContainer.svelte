<script lang="ts">
  import StatementList from "$lib/components/StatementList.svelte";
  import type { SolrQuery, SolrResponse } from "$lib/interfaces/solr.interface";

  export let searchResult: SolrResponse;
  export let solrQuery: SolrQuery;
</script>

<div class="container">
  <StatementList
    docs={searchResult.response?.docs}
    query={searchResult.responseHeader.params.q}
    highlighting={searchResult.highlighting}
  />
</div>
