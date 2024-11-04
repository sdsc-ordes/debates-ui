<script lang="ts">
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import type { PageData } from "./$types";
  import "./page.css";

  import VideoPlayer from "$lib/components/VideoPlayer.svelte";
  import SegmentDisplay from "$lib/components/SegmentDisplay.svelte";
  import SegmentList from "$lib/components/SegmentList.svelte";
  import SpeakerDisplay from "$lib/components/SpeakerDisplay.svelte";
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
  } from "$lib/interfaces/videoplayer.interface";

  export let data: PageData;

  let subtitles: Subtitle[];
  let speakers: Speaker[];
  let segments: Segment[];

  let startTime: number = Number($page.url.searchParams.get("start") || 0);
  let video: HTMLVideoElement;
  let videoSrc: string;
  let trackSrc: string;

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
    const mediaData = data?.mediaSources;
    if (mediaData) {
      trackSrc = mediaData.trackSrc;
      videoSrc = mediaData.videoSrc;
    }
    console.log(videoData);
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

<div class="video-layout">
  <SegmentList {video} {segments} {speakers} {timeUpdateParameters} />

  <VideoPlayer
    {trackSrc}
    {videoSrc}
    {startTime}
    {subtitles}
    {segments}
    {speakers}
    bind:video
    bind:timeUpdateParameters
  />
</div>

<button class="save-button" on:click={() => saveCorrections()}>
  Save all corrections
</button>

<SpeakerDisplay bind:speakers {timeUpdateParameters} />

<SegmentDisplay {subtitles} {timeUpdateParameters} />
