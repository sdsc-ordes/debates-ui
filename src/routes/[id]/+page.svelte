<script lang="ts">
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import type { PageData } from "./$types";
  import "./page.css";

  import VideoPlayer from "$lib/components/VideoPlayer.svelte";
  import SegmentDisplay from "$lib/components/SegmentDisplay.svelte";
  import SegmentList from "$lib/components/SegmentList.svelte";
  import SpeakerDisplay from "$lib/components/SpeakerDisplay.svelte";
  import { getMediaSources } from "$lib/s3/s3";

  import {
    mapSegments,
    mapSpeakers,
    mapSubtitles,
  } from "$lib/mongo/mapMongoDbToPage";
  import type {
    Subtitle,
    TimeUpdateParameters,
    Segment,
    MediaSources,
  } from "$lib/interfaces/videoplayer.interface";
  import type {
    Speaker,
  } from "$lib/interfaces/mongodb.interface";

  export let data: PageData;

  let subtitles: Subtitle[];
  let speakers: Speaker[];
  let segments: Segment[];

  let startTime: number = Number($page.url.searchParams.get("start") || 0);
  let video: HTMLVideoElement;
  let s3Prefix: string = $page.url.pathname.split("/").pop();
  let mediaSources:MediaSources = getMediaSources(s3Prefix);

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
    console.log(videoData);
    if (videoData) {
      mediaSources = getMediaSources(videoData.s3_prefix)
      subtitles = mapSubtitles(videoData.subtitles);
      segments = mapSegments(videoData.segments);
      speakers = videoData.speakers;
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
    {startTime}
    {subtitles}
    {segments}
    {speakers}
    bind:video
    bind:mediaSources
    bind:timeUpdateParameters
  />
</div>

<button class="save-button" on:click={() => saveCorrections()}>
  Save all corrections
</button>

<SpeakerDisplay bind:speakers {timeUpdateParameters} />

<SegmentDisplay {subtitles} {timeUpdateParameters} />
