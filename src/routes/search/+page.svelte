<svelte:head>
  <title>Political Debates Search</title>
  <meta name="description" content="Political Debates Search" />
</svelte:head>

<script>
    import { Search, Button } from 'flowbite-svelte';
    import { onMount } from "svelte";
    import { writable } from 'svelte/store';
  
    let data = writable(null);
  
    // Function to handle the button click and fetch the JSON file
    const handleSearch = async () => {
      try {
        const response = await fetch('/input/result.json');
        if (response.ok) {
          const json = await response.json();
          data.set(json);
        } else {
          console.error('Error fetching JSON:', response.statusText);
        }
      } catch (error) {
        console.error('Error reading JSON:', error);
      }
    };
    // Function to reset the search result
    const handleReset = () => {
        data.set(null);
    };    
    const solrUrl = import.meta.env.VITE_SOLR_API_URL;
    console.log('Solr Url:', solrUrl);    

    onMount(async () => {
        fetch("https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Bourbon")
        //fetch("http://debates_solr:8983/solr/debates/select?df=statement&hl=true&indent=true&q.op=OR&q=racism")
        .then(response => response.json())
        .then(data => {
            console.log(data);
        }).catch(error => {
            console.log(error);
            return [];
        });
    }); 
//{#if $data}
//<pre>{JSON.stringify($data, null, 2)}</pre>
//{/if}
</script>


<style>
.container {
    display: flex;
    gap: 20px;
}
.facets {
    width: 25%;
    padding: 10px;
    border: 1px solid #ccc;
}
.statements {
    width: 75%;
    padding: 10px;
    border: 1px solid #ccc;
}
.statement-header {
    font-weight: bold;
    margin-bottom: 5px;
}
</style>
  
<button on:click={handleSearch}>Search</button>
<button on:click={handleReset}>Reset</button>

{#if $data}
<div class="container">
    <!-- Facet Counts -->
    <div class="facets">
        <h3>Facet Counts</h3>
        {#if $data.facet_counts}
        {#each $data.facet_counts.facet_fields.speaker_name as facet, index}
            {#if index % 2 === 0}
            <div>
                {facet}: {$data.facet_counts.facet_fields.speaker_name[index + 1]}
            </div>
            {/if}
        {/each}
        {:else}
        <p>No facet counts available.</p>
        {/if}
    </div>

    <!-- Statements -->
    <div class="statements">
        <h3>Statements</h3>
        {#if $data.response && $data.response.docs}
          {#each $data.response.docs as doc}
            <div class="statement">
              <div class="statement-header">
                <div hidden>Id: {doc.id}</div>
                <div>Date: {doc.date}</div>
                <div>Time Start: {doc.time_start}</div>
                <div>Time End: {doc.time_end}</div>
                <div>Speaker: {doc.speaker_name}</div>
                <div>Segment ID: {doc.segment_id}</div>
              </div>
              {#if $data.highlighting && $data.highlighting[doc.id]}
                <!-- Render highlighted statements -->
                <div class="statement-body">
                  {#each $data.highlighting[doc.id].statement as highlightedStatement}
                    <p>{@html highlightedStatement}</p>
                  {/each}
                </div>
              {:else if doc.statement}
                <!-- Render original statements if no highlighting available -->
                <div class="statement-body">
                  {#each doc.statement as statement}
                    <p>{statement}</p>
                  {/each}
                </div>
              {/if}
            </div>
          {/each}
        {:else}
          <p>No statements available.</p>
        {/if}
      </div>
    </div>
  {/if}