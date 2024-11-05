<script lang="ts">
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import type { PageData } from "./$types";
  import "./page.css";
  import { Notifications, acts } from "@tadashi/svelte-notification";
  import VideoPlayer from "$lib/components/VideoPlayer.svelte";
  import SegmentDisplay from "$lib/components/SegmentDisplay.svelte";
  import SegmentList from "$lib/components/SegmentList.svelte";
  import SpeakerDisplay from "$lib/components/SpeakerDisplay.svelte";
  import { getCreatedAtDate, generateUUID } from "$lib/utils/mongoUpdateUtils";
  import { getMediaSources } from "$lib/s3/s3";
  import type {
    TimeUpdateParameters,
    MediaSources,
  } from "$lib/interfaces/videoplayer.interface";
  import type {
    Speaker,
    Segment,
    Subtitle,
    VideoData,
  } from "$lib/interfaces/mongodb.interface";

  export let data: PageData;

  let subtitles: Subtitle[];
  let speakers: Speaker[];
  let segments: Segment[];
  let videoData: VideoData;

  let startTime: number = Number($page.url.searchParams.get("start") || 0);
  let video: HTMLVideoElement;
  let s3Prefix: string = $page.url.pathname.split("/").pop();
  let mediaSources: MediaSources = getMediaSources(s3Prefix);

  let timeUpdateParameters: TimeUpdateParameters = {
    currentSubtitleIndex: -1,
    currentSegmentIndex: -1,
    currentSpeakerIndex: -1,
  };

  function saveCorrections(): void {
    const createdAt = getCreatedAtDate();
    console.log(createdAt);
    let videoDataUpdate: VideoData = videoData;
    videoDataUpdate.created_at = getCreatedAtDate();
    videoDataUpdate.version_id = generateUUID();
    saveVideoData(videoDataUpdate);
  }

  async function saveVideoData(videoData) {
    const response = await fetch(`/${s3Prefix}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(videoData),
    });
    const result = await response.json();
    if (result.success) {
      console.log("Document inserted successfully! ID:", result.id);
      acts.add({mode: 'success', message: '✓ Metadata for the video has been saved!'})
    } else {
      acts.add({mode: 'danger', message: '✓ Metadata for the video could not be saved! An error occurred'},)
      console.error("Error inserting document:", result.error);
    }
  }



  onMount(() => {
    videoData = data?.video?.[0];
    console.log(videoData);
    if (videoData) {
      mediaSources = getMediaSources(videoData.s3_prefix);
      subtitles = videoData.subtitles;
      segments = videoData.segments;
      speakers = videoData.speakers;
      console.log(videoData.debate);
    }
  });
</script>

<svelte:head>
  <title>Test Page</title>
  <meta name="description" content="Testpage" />
  <style>
    :root {
        --tadashi_svelte_notifications_width: 300px;
    }
  </style>
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

<Notifications />

<style>
  button {
      display: block;
      margin: 0.3rem;
      min-width: 150px;
  }
</style>
