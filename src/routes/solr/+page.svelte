<script>
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
  </script>
  
  <style>
    .container {
      display: flex;
      flex-direction: column;
      max-width: 600px;
      margin: 0 auto;
      padding: 1rem;
    }
  
    .input-container {
      display: flex;
      align-items: center;
      margin-bottom: 0.5rem;
    }
  
    #url-input {
      flex: 1;
      padding: 0.5rem;
      font-size: 1rem;
      border: 1px solid #ccc;
      border-radius: 4px 0 0 4px;
    }
  
    #search-button {
      padding: 0.5rem 1rem;
      font-size: 1rem;
      font-weight: bold;
      color: #fff;
      background-color: #ff3e00;
      border: none;
      border-radius: 0 4px 4px 0;
      cursor: pointer;
      transition: background-color 0.3s;
    }

    #reset-button {
      margin-top: 0.5rem;
      font-size: 0.9rem;
      color: #ff3e00;
      background: none;
      border: none;
      cursor: pointer;
      text-align: left;
      margin-left: 2rem;
    }
  
    #reset-button:hover {
      text-decoration: underline;
    }
  </style>
  
  <div class="container">
    <div class="input-container">
      <input type="text" id="url-input" bind:value={url} placeholder="Enter URL to fetch data" />
      <button id="search-button" on:click={handleSearch}>Search</button>
      <button id="reset-button" on:click={handleReset}>Reset search</button>
    </div>
    
  </div>
  
  {#if $data}
    <pre>{JSON.stringify($data, null, 2)}</pre>
  {/if}  
