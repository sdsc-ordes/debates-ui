<script lang="ts">
  import VideoPlayer from "$lib/components/Videoplayer.svelte";
  import { page } from "$app/stores";
  import { getMediaSources } from "$lib/s3/s3";

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
