<script lang="ts">
  import type { SolrQuery } from "$lib/interfaces/solr.interface";
  import { displayIsoDate } from "$lib/utils/displayUtils";
  export let searchResult;
  export let solrQuery: SolrQuery;
  export let onSearch: (solrQuery: SolrQuery) => void; // Function to trigger search
  let facetCounts = searchResult.facet_counts;
  console.log(facetCounts);

  const displayFunctions: { [key: string]: (label: string) => string } = {
    debate_schedule: (label) => displayIsoDate(label)
  };

  // Default display function if no specific function is found for a facet field
  const defaultDisplayFunction = (label: string) => label;

  function getDisplayFunction(fieldKey: string): (label: string) => string {
    return displayFunctions[fieldKey] || defaultDisplayFunction;
  }

  // Helper function to get facet values as key-value pairs
  const getFacetFields = (facetFields) => {
    let fields = [];
    for (const [key, values] of Object.entries(facetFields)) {
      let facets = [];
      for (let i = 0; i < values.length; i += 2) {
        facets.push({ label: values[i], count: values[i + 1] });
      }
      fields.push({ key, facets });
    }
    return fields;
  };

  // Function to handle facet clicks
  function handleFacetClick(facetField: string, facetValue: string) {
    // Update solrQuery with selected facet
    solrQuery.facetField = facetField;
    solrQuery.facetValue = facetValue;
    // Trigger search with updated solrQuery
    onSearch(solrQuery);
  }
  function isActive(facetField: string, facetLabel: string): boolean {
    return (
      facetField === solrQuery.facetField && facetLabel === solrQuery.facetValue
    );
  }
</script>

{#if searchResult.facet_counts}
  <div class="facets">
    {#each getFacetFields(searchResult.facet_counts.facet_fields) as field}
      <h4 class="facet-title">{field.key}</h4>
      {#each field.facets as facet}
        {#if facet.count}
          <button
            class="facet-item {isActive(field.key, facet.label)
              ? 'active'
              : ''}"
            on:click={() => handleFacetClick(field.key, facet.label)}
          >
            {getDisplayFunction(field.key)(facet.label)}
          </button>
          <button class="facet-item" on:click={() => handleFacetClick("", "")}>
            <span>x</span>
          </button>
          : <span>{facet.count}</span>
        {/if}
      {/each}
    {/each}
  </div>
{:else}
  <p>No facet counts available.</p>
{/if}

<style>
  .facets {
    margin-top: 1rem;
    padding: 1rem;
    border-radius: 8px;
  }

  .facet-title {
    font-size: 0.8rem;
    margin-top: 1rem;
    margin-bottom: 0.5rem;
    text-transform: capitalize;
    color: grey;
  }

  .facet-item {
    font-size: 1rem;
    margin-left: 0.7rem;
    color: grey;
  }

  .facet-item span {
    font-weight: bold;
    margin-left: 0.5rem;
  }

  button.active {
    font-weight: bold;
    text-decoration: underline;
    background: lightblue;
  }
</style>
