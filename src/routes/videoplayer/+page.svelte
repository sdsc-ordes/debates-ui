<script lang="ts">
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import type { PageData } from "./$types";

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

  let videoId = "first-video";
  let startTime: number = Number($page.url.searchParams.get("start") || 0);
  let video: HTMLVideoElement;

  let timeUpdateParameters: TimeUpdateParameters = {
    currentSubtitleIndex: -1,
    currentSegmentIndex: -1,
    currentSpeakerIndex: -1,
  };

  onMount(() => {
    const videoData = data?.video?.[0];
    if (videoData) {
      subtitles = mapSubtitles(videoData.subtitles);
      segments = mapSegments(videoData.segments);
      speakers = mapSpeakers(videoData.speakers);
      console.log(speakers);
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
    {videoId}
    {startTime}
    {subtitles}
    {segments}
    {speakers}
    bind:video
    bind:timeUpdateParameters
  />
</div>

<button class="save-button"> Save all corrections </button>

<SpeakerDisplay bind:speakers {timeUpdateParameters} />

<SegmentDisplay {subtitles} {timeUpdateParameters} />

<style>
  .video-layout {
    display: flex;
    gap: 20px;
  }

  .save-button {
    padding: 0.5rem 1rem;
    width: 300px;
    font-size: 1rem;
    font-weight: bold;
    color: #fff;
    background-color: #ff3e00;
    border: none;
    border-radius: 0 4px 4px 0;
    cursor: pointer;
    transition: background-color 0.3s;
  }
</style>
