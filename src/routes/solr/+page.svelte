<script>
  import { writable } from 'svelte/store';
  import { onMount } from 'svelte';  // Import onMount for lifecycle management
  
  let data = writable(null);
  let url = '';

  // Use the CORS proxy URL here
  const apiUrl = 'http://localhost:8010/solr/debates/select?q=racism&indent=true&hl=true&df=statement';

  // Fetch data when the component mounts
  onMount(async () => {
    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error('Network response was not ok');
      const jsonData = await response.json();
      data.set(jsonData);  // Store the fetched data
      console.log(jsonData);
    } catch (error) {
      console.error('Error fetching from Solr:', error);
    }
  });
</script>

{#if $data}
  <pre>{JSON.stringify($data, null, 2)}</pre>
{/if}
  
