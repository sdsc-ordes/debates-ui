<script lang="ts">
  import type { PageData } from "./$types";
  export let data: PageData;

  $: ({video} = data)
</script>

<svelte:head>
  <title>Test Page</title>
  <meta name="description" content="Testpage" />
</svelte:head>

{#if video}
  <pre>{JSON.stringify(video, null, 2)}</pre>
{/if}
