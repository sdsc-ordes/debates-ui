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
</script>

{#if facetCounts}
    <div class="facets">
        <h3>Facet Counts</h3>
        {#each getFacetFields(facetCounts.facet_fields) as field}
            <h4>{field.key}</h4>
            {#each field.facets as facet}
                {#if facet.count}
                    <div>
                        {facet.label}: {facet.count}
                    </div>
                {/if}
            {/each}
        {/each}
    </div>
{:else}
    <p>No facet counts available.</p>
{/if}
