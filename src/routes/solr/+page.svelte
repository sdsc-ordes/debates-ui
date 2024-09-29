<script>
    import { onMount } from "svelte";
    import { writable } from 'svelte/store';
  
    let data = writable(null);
    let url = '';
  
    // Function to handle the button click and fetch the JSON file
    const handleSearch = async () => {
      if (!url) {
        console.error('Please enter a valid URL.');
        return;
      }
  
      try {
        const response = await fetch(url);
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
  </script>
  
  <style>
    .container {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      max-width: 600px;
      margin: 0 auto;
      padding: 1rem;
    }
  
    #url-input {
      width: 100%;
      padding: 0.5rem;
      font-size: 1rem;
      margin-bottom: 1rem;
    }
  
    .buttons {
      display: flex;
      gap: 0.5rem;
      flex-direction: column;
      width: 100%;
    }
  
    button {
      padding: 0.5rem;
      font-size: 1rem;
      cursor: pointer;
      width: fit-content;
    }
  </style>
  
  <div class="container">
    <label for="url-input">Enter URL:</label>
    <input type="text" id="url-input" bind:value={url} placeholder="Enter URL to fetch data" />
  
    <div class="buttons">
      <button on:click={handleSearch}>Search</button>
      <button on:click={handleReset}>Reset</button>
    </div>
  </div>
  
  {#if $data}
    <pre>{JSON.stringify($data, null, 2)}</pre>
  {/if}
  
