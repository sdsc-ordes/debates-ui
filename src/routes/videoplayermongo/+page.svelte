<script lang="ts">
  import type { PageData } from "./$types";
  export let data: PageData;

  $: ({videoMongo} = data)

  import { onMount } from "svelte";
  import "./page.css";
  import { page } from "$app/stores";
  import { writable } from "svelte/store";
  import { loadSubtitles, onTimeUpdate, jumpToTime } from "./videoUtils";
  import { getMediaSources } from "./mediaUtils";

  let video: HTMLVideoElement;
  let subtitle = "";
  let currentSpeaker = "";
  let subtitles: {
    start: number;
    end: number;
    text: string;
    speaker: string;
    time_start: string;
    time_end: string;
  }[] = [];
  let speakers: {
    speaker: string;
    role?: string;
    statement?: string[];
    start: number;
    time_start: string;
    showStatement?: boolean;
  }[] = [];
  let startTime = $page.url.searchParams.get("start") || 0;
  let videoId = $page.url.searchParams.get("video_id");
  let { videoSrc, trackSrc } = getMediaSources(videoId);
  let isVideoPaused = writable(true); // State to track if video is paused

  onMount(async () => {
    const parsedData = await loadSubtitles(Number(startTime), video);
    subtitles = parsedData.parsedSubtitles;
    speakers = parsedData.speakers;
    video.addEventListener("play", () => isVideoPaused.set(false));
    video.addEventListener("pause", () => isVideoPaused.set(true));
  });

  function handleTimeUpdate() {
    const updatedData = onTimeUpdate(video, subtitles);
    subtitle = updatedData.subtitle;
    currentSpeaker = updatedData.currentSpeaker;
  }

</script>

<svelte:head>
  <title>Test Page</title>
  <meta name="description" content="Testpage" />
</svelte:head>

<h1>Debate with Transcript</h1>

<div class="video-container">
  <!-- Video Player -->
  <video
    class="video"
    bind:this={video}
    on:timeupdate={handleTimeUpdate}
    controls
    autoplay
  >
    <source src={videoSrc} type="video/mp4" />
    <track
      src={trackSrc}
      kind="captions"
      srclang="en"
      label="english_captions"
    />
    Your browser does not support the video tag.
  </video>

  <!-- Subtitle Display -->
  <div class="subtitle-container {subtitle ? 'show' : ''}">
    {#if currentSpeaker}
      <div class="speaker">
        <label for="speaker">Speaker:</label>
        <input
          id="speaker"
          type="text"
          bind:value={currentSpeaker}
          class="editable-input"
          disabled={!$isVideoPaused}
        />
      </div>
    {/if}
    {#if subtitle}
      <div>
        <label for="subtitle">Subtitle:</label>
        <textarea
          id="subtitle"
          bind:value={subtitle}
          class="editable-textarea"
          disabled={!$isVideoPaused}
        />
      </div>
    {/if}
  </div>
</div>