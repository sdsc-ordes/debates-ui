<script lang="ts">
  import { page } from "$app/stores";
  import type { PageData } from "./$types";
  import "./page.css";
  import { Notifications, acts } from "@tadashi/svelte-notification";
  import VideoPlayer from "$lib/components/VideoPlayer.svelte";
  import SegmentDisplay from "$lib/components/SegmentDisplay.svelte";
  import DebateHeader from "$lib/components/DebateHeader.svelte";
  import FileDownload from "$lib/components/FileDownload.svelte";
  import SegmentList from "$lib/components/SegmentList.svelte";
  import SpeakerDisplay from "$lib/components/SpeakerDisplay.svelte";
  import { getCreatedAtDate, generateUUID } from "$lib/utils/mongoUpdateUtils";
  import { canEdit } from "$lib/stores/auth";
  import type {
    TimeUpdateParameters,
  } from "$lib/interfaces/videoplayer.interface";
  import type {
    Speaker,
    Segment,
    Subtitle,
    Debate,
    SignedUrls,
  } from "$lib/interfaces/backend.interface";

  export let data: PageData;
  let signedUrls: SignedUrls = data?.signedUrls;
  let debate: Debate = data?.debate;
  console.log(debate);
  let subtitles: Subtitle[] = data?.subtitles;
  let subtitles_en: Subtitle[] = data?.subtitles_en;
  let segments: Segment[] = data?.segments;
  console.log(debate);
  let speakers: Speaker[] = data?.speakers;
  const mediaUrl = signedUrls.signedMediaUrl;
  const media = data.media;
  const downloadUrls = signedUrls.signedUrls;

  let startTime: number = Number($page.url.searchParams.get("start") || 0);
  let mediaElement: HTMLVideoElement;

  let timeUpdateParameters: TimeUpdateParameters = {
    currentSubtitleIndex: -1,
    currentSubtitleIndexEn: -1,
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
      acts.add({
        mode: "success",
        message: "✓ Metadata for the video has been saved!",
      });
    } else {
      acts.add({
        mode: "danger",
        message:
          "✓ Metadata for the video could not be saved! An error occurred",
      });
      console.error("Error inserting document:", result.error);
    }
  }
</script>

<svelte:head>
  <title>VideoPlayer Page</title>
  <meta name="description" content="Videoplayer" />
  <style>
    :root {
      --tadashi_svelte_notifications_width: 300px;
    }
  </style>
</svelte:head>

<DebateHeader { debate } />

<div class="video-layout">
  <div class="col-md-3">
    <SegmentList {mediaElement} {segments} {speakers} {timeUpdateParameters} />
  </div>
  <div class="col-md-3">
    <SpeakerDisplay bind:speakers {timeUpdateParameters} />
    {#if $canEdit}
      <button class="save-button" on:click={() => saveCorrections()}>
        Save all corrections
      </button>
    {/if}
  </div>

  <div class="col-md-6">

    <VideoPlayer
      {startTime}
      {subtitles}
      {subtitles_en}
      {speakers}
      {mediaUrl}
      {media}
      bind:mediaElement
      bind:timeUpdateParameters
    />
  </div>
</div>

<FileDownload {downloadUrls} />

{#if $canEdit}
  <button class="save-button" on:click={() => saveCorrections()}>
    Save all corrections
  </button>
{/if}

<SegmentDisplay {subtitles} {subtitles_en} {timeUpdateParameters} {mediaElement} />

<Notifications />

<style>
  button {
    display: block;
    margin: 0.3rem;
  }
</style>
