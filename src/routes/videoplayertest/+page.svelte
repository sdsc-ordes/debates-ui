<script lang="ts"> 
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import type { PageData } from "./$types";  

  import VideoPlayer from "$lib/components/VideoPlayer.svelte";
  import SegmentDisplay from "$lib/components/SegmentDisplay.svelte";
  import { mapSubtitles } from "$lib/mongo/mapMongoDbToPage";
  import type { Subtitle, TimeUpdateParameters } from "$lib/interfaces/subtitle.interface";

  export let data: PageData;

  let subtitles: Subtitle[];

  let videoId = "first-video";
  let startTime = $page.url.searchParams.get("start") || 0;

  let timeUpdateParameters: TimeUpdateParameters = {
    currentTime: startTime,
    currentSubtitleIndex: 3,
    currentSegmentIndex: 0,
    currentSpeakerIndex: 6,
  };

  onMount(() => {
    const videoData = data?.video?.[0];
    if (videoData) {
      subtitles= mapSubtitles(videoData.subtitles);
    }
  });  
</script>

<svelte:head>
  <title>Test Page</title>
  <meta name="description" content="Testpage" />
</svelte:head>

<div class="parameters">
  {timeUpdateParameters.currentTime}
  {timeUpdateParameters.currentSubtitleIndex}
</div>

<!-- Use the VideoPlayer component -->
<VideoPlayer
  {videoId}
  bind:timeUpdateParameters
/>

<SegmentDisplay 
  {subtitles}
/>
