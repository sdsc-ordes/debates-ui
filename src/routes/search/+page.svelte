<svelte:head>
  <title>Political Debates Search</title>
  <meta name="description" content="Political Debates Search" />
</svelte:head>

<script lang=ts>
  import { writable } from 'svelte/store';
  import { getFirstNonEmptyStatement, getFullStatement} from './statement-utils';
  import './page.css';

  let showFullStatement = writable(false);

  const toggleFullStatement = () => {
      showFullStatement.update(value => !value);
  };  

  let data = writable(null);
  let queryTerm = "";
  let params = {
      indent: "true",
      df: "statement",
      hl: "true",
      q: "",
      facet: "true",
      "facet.field": "speaker_name",
  };

  // Function to handle the button click and fetch the JSON file
  const handleSearch = async () => {
      if (!queryTerm.trim()) {
          console.error('Search term is required');
          return;
      }

      params.q = queryTerm; // Set the query term in the parameters
      const apiUrl = `http://localhost:8010/solr/debates/select?${new URLSearchParams(params).toString()}`;

      try {
          const response = await fetch(apiUrl, {
              method: "GET",
              headers: {
                  "Content-Type": "application/json"
              }
          });

          if (response.ok) {
              const json = await response.json();
              data.set(json); // Update the store with the fetched data
          } else {
              console.error('Error fetching JSON:', response.statusText);
          }
      } catch (error) {
          console.error('Error reading JSON:', error);
      }
  };

  // Function to reset the search result
  const handleReset = () => {
      queryTerm = ""; // Clear the input field
      data.set(null); // Reset the data
  };
</script>

<div class="container">
  <div class="input-container">
      <input type="text" id="query-input" bind:value={queryTerm} placeholder="Enter search term" />
      <button id="search-button" on:click={handleSearch}>Search</button>
      <button id="reset-button" on:click={handleReset}>Reset search</button>
  </div>
</div>


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
        {#if $data.response && $data.response.docs}
          {#each $data.response.docs as doc}
            <div class="statement">
            <!-- Single line header without labels -->
              <div class="statement-header">
                {doc.date} - {doc.time_start} - {doc.time_end} - {doc.speaker_name} - {doc.segment_id}
              </div>
            <!-- Statement as clickable link -->
            {#if $data.highlighting && $data.highlighting[doc.id]}
              <a href={`/videoplayer?start=${encodeURIComponent(doc.start)}`} 
              class="statement">
                 {@html getFirstNonEmptyStatement($data.highlighting[doc.id].statement)}
              </a> 
              <!-- Toggle button -->
              <button on:click={toggleFullStatement}>
                {#if $showFullStatement}
                  Show Less
                {:else}
                  Show More
                {/if}
              </button>

              <!-- Full Statement -->
              {#if $showFullStatement}
                <p>
                  {@html getFullStatement(doc.statement, $data.highlighting[doc.id].statement)}
                </p>
              {/if}                    
            {:else if doc.statement}
              <a href={`/videoplayer?start=${encodeURIComponent(doc.start)}`} 
                 class="statement">
                {doc.statement[0]}
              </a>
            {/if}
            </div>
          {/each}
        {:else}
          <p>No statements available.</p>
        {/if}
      </div>
    </div>
  {/if}