<script lang="ts">
  import type { SolrQuery } from "$lib/interfaces/solr.interface";
  import { displayIsoDate } from "$lib/utils/displayUtils";
  export let searchResult;
  export let solrQuery: SolrQuery;
  export let onSearch: (solrQuery: SolrQuery) => void; // Function to trigger search

  const displayFunctions: { [key: string]: (label: string) => string } = {
    debate_schedule: (label) => displayIsoDate(label),
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

{#if searchResult && searchResult.facet_counts}
  <div class="filters">
    {#each getFacetFields(searchResult.facet_counts.facet_fields) as field}
      <h4 class="facet-title">{field.key}</h4>
      <div class="facets">
        {#each field.facets as facet}
          {#if facet.count}
            <div class="facet-row">
              <button
                class="facet-item {isActive(field.key, facet.label)
                  ? 'active'
                  : ''}"
                on:click={() => handleFacetClick(field.key, facet.label)}
              >
                {getDisplayFunction(field.key)(facet.label)}
              </button>
              <small class="card-subtle">{facet.count}</small>
              {#if isActive(field.key, facet.label)}
                <button
                  class="option-button"
                  type="button"
                  on:click={() => handleFacetClick("", "")}
                >
                  <i class="fa fa-xmark"></i>
                </button>
              {/if}
            </div>
          {/if}
        {/each}
      </div>
    {/each}
  </div>
{:else}
  <p>No facet counts available.</p>
{/if}

<style>
  .filters {
    margin-top: 1rem;
    padding: 1rem;
    border-radius: 12px;
  }

  .facets {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding-left: 1rem;
  }

  .facet-row {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .facet-title {
    font-family: var(--body-font);
    font-size: 16px;
    margin-top: 1rem;
    margin-bottom: 0.5rem;
    text-transform: lowercase;
    color: var(--primary-color);
  }

  .facet-item {
    color: var(--primary-color);
    border: none;
    padding: 5px 10px;
    border-radius: 10px;
    cursor: pointer;
    transition: background-color 0.3s;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .facet-item.active {
    background-color: var(--primary-color);
    color: var(--on-primary);
  }
</style>
