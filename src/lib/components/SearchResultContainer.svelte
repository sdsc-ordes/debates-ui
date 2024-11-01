<script lang="ts">
    import FacetCounts from "$lib/components/FacetCounts.svelte";
    import StatementList from "$lib/components/StatementList.svelte";
    export let searchResult;
  </script>
  <div class="container">
    <FacetCounts facetCounts={searchResult.facet_counts} />
    <StatementList docs={searchResult.response?.docs} query={searchResult.responseHeader.params.q} highlighting={searchResult.highlighting} />
  </div>