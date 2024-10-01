<script lang="ts">
    export let facetCounts;
  
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
  
    // Helper function to format facet field titles
    const formatTitle = (title) => {
      return title
        .replace(/_/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());
    };
  </script>
  
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
  </style>
  
  {#if facetCounts}
    <div class="facets">
      {#each getFacetFields(facetCounts.facet_fields) as field}
        <h4 class="facet-title">{formatTitle(field.key)}</h4>
        {#each field.facets as facet}
          {#if facet.count}
            <div class="facet-item">
              {facet.label}: <span>{facet.count}</span>
            </div>
          {/if}
        {/each}
      {/each}
    </div>
  {:else}
    <p>No facet counts available.</p>
  {/if}
  
