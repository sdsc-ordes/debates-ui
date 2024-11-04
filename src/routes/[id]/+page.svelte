<script lang="ts">
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import type { PageData } from "./$types";
  import "./page.css";

  import VideoPlayer from "$lib/components/VideoPlayer.svelte";
  import SegmentDisplay from "$lib/components/SegmentDisplay.svelte";
  import SegmentList from "$lib/components/SegmentList.svelte";
  import SpeakerDisplay from "$lib/components/SpeakerDisplay.svelte";
  import type { MediaSources } from '$lib/interfaces/videoplayer.interface'
  import {
    mapSegments,
    mapSpeakers,
    mapSubtitles,
  } from "$lib/mongo/mapMongoDbToPage";
  import type {
    Subtitle,
    TimeUpdateParameters,
    Speaker,
    Segment, 
    VideoData,
  } from "$lib/interfaces/videoplayer.interface";

  export let data: PageData;

  let subtitles: Subtitle[];
  let speakers: Speaker[];
  let segments: Segment[];
  let mediaSources: MediaSources;
  let trackSrc: string;

  let videoId = "first-video";
  let startTime: number = Number($page.url.searchParams.get("start") || 0);
  let video: HTMLVideoElement;

  let timeUpdateParameters: TimeUpdateParameters = {
    currentSubtitleIndex: -1,
    currentSegmentIndex: -1,
    currentSpeakerIndex: -1,
  };

  function saveCorrections(): void {
    alert(
      "This function will save the corrected video metadata to the database. It is not yet implemented.",
    );
  }

  onMount(() => {
    const videoData = data?.video?.[0];
    const mediaSources = data?.mediaSources; // Access mediaSources here
    console.log(mediaSources);
    if (videoData) {
      subtitles = mapSubtitles(videoData.subtitles);
      segments = mapSegments(videoData.segments);
      speakers = mapSpeakers(videoData.speakers);
    }
  });
</script>

<svelte:head>
  <title>Test Page</title>
  <meta name="description" content="Testpage" />
</svelte:head>


