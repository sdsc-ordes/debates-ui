<svelte:head>
  <title>Political Debates Search</title>
  <meta name="description" content="Political Debates Search" />
</svelte:head>

<script>
    import { Search, Button } from 'flowbite-svelte';
    import { onMount } from "svelte";

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
</script>

<p>
<Search>
    <Button>Search</Button>
</Search>
</p>