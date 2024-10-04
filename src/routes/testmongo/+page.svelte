<script lang="ts">
  import type { PageData } from "./$types";
  export let data: PageData;

  $: ({segments} = data)
</script>

<svelte:head>
  <title>Test Page</title>
  <meta name="description" content="Testpage" />
</svelte:head>

{#if segments}
  <pre>{JSON.stringify(segments, null, 2)}</pre>
{/if}
