<script lang="ts"> 
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import type { PageData } from "./$types";  

  import VideoPlayer from "$lib/components/VideoPlayer.svelte";
  import SegmentDisplay from "$lib/components/SegmentDisplay.svelte";
  import SpeakerDisplay from "$lib/components/SpeakerDisplay.svelte";
  import { mapSpeakers, mapSubtitles } from "$lib/mongo/mapMongoDbToPage";
  import type { Subtitle, TimeUpdateParameters } from "$lib/interfaces/subtitle.interface";
  import type { Speaker } from "$lib/interfaces/speaker.interface";

  export let data: PageData;

  let subtitles: Subtitle[];
  let speakers: Speaker[];

  let videoId = "first-video";
  let startTime = $page.url.searchParams.get("start") || 0;

  let timeUpdateParameters: TimeUpdateParameters = {
    currentSubtitleIndex: -1,
    currentSegmentIndex: -1,
    currentSpeakerIndex: -1,
  };

  onMount(() => {
    const videoData = data?.video?.[0];
    if (videoData) {
      subtitles = mapSubtitles(videoData.subtitles);
      speakers = mapSpeakers(videoData.speakers);
      console.log(speakers);
    }
  });  
</script>

<svelte:head>
  <title>Test Page</title>
  <meta name="description" content="Testpage" />
</svelte:head>

<!-- Use the VideoPlayer component -->
<VideoPlayer
  {videoId}
  {subtitles}
  bind:timeUpdateParameters
/>
<SpeakerDisplay
  {speakers}
  {timeUpdateParameters}
/>
<SegmentDisplay 
  {subtitles}
  {timeUpdateParameters}
/>
