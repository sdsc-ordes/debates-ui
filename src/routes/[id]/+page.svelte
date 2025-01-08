<script lang="ts">
  import { page } from "$app/stores";
  import type { PageData } from "./$types";
  import "./page.css";
  import { Notifications, acts } from "@tadashi/svelte-notification";
  import VideoPlayer from "$lib/components/VideoPlayer.svelte";
  import SegmentDisplay from "$lib/components/SegmentDisplay.svelte";
  import SegmentList from "$lib/components/SegmentList.svelte";
  import SpeakerDisplay from "$lib/components/SpeakerDisplay.svelte";
  import { getCreatedAtDate, generateUUID } from "$lib/utils/mongoUpdateUtils";
  import { canEdit } from '$lib/stores/auth';
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

  let s3Prefix: string = $page.url.pathname.split("/").pop();
  export let data: PageData;
  let videoData: VideoData = data?.video?.[0];
  let mediaSources: MediaSources = data?.mediaSources;
  let subtitles: Subtitle[] = videoData.subtitles;
  let segments: Segment[] = videoData.segments;
  let speakers: Speaker[] = videoData.speakers;

  let startTime: number = Number($page.url.searchParams.get("start") || 0);
  let video: HTMLVideoElement;

  let timeUpdateParameters: TimeUpdateParameters = {
    currentSubtitleIndex: -1,
    currentSegmentIndex: -1,
    currentSpeakerIndex: -1,
  };

  function saveCorrections(): void {
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
{#if $canEdit}
  <button class="save-button" on:click={() => saveCorrections()}>
    Save all corrections
  </button>
{/if}

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
