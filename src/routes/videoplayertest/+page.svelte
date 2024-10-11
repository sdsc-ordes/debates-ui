<script lang="ts">
  import VideoPlayer from "$lib/components/Videoplayer.svelte";
  import { page } from "$app/stores";
  import type { PageData } from "./$types";  
  import { onMount } from "svelte";
  import { getMediaSources } from "$lib/s3/s3";
  export let data: PageData;

  let videoId = $page.url.searchParams.get("video_id");
  let { videoSrc, trackSrc } = getMediaSources(videoId);

  let parameters: number;
  interface updates {
    index: number;
    content: string;
  }
  let updateParameters: updates = {
    index: 1,
    content: "init",
  };

  onMount(() => {
    const videoData = data?.video?.[0];
    if (videoData) {
      console.log(videoData);
    }
  });  
</script>

<svelte:head>
  <title>Test Page</title>
  <meta name="description" content="Testpage" />
</svelte:head>

<div class="parameters">
  {parameters}
  {updateParameters.index}
  {updateParameters.content}
</div>

<!-- Use the VideoPlayer component -->
<VideoPlayer
  {videoSrc}
  {trackSrc}
  bind:parameters
  bind:updateParameters
/>
