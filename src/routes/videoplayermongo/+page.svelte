<script lang="ts">
  import type { PageData } from "./$types";
  export let data: PageData;
  import "./page.css";

  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import { writable } from "svelte/store";
  import { onTimeUpdate } from "./videoUtils";
  import { getMediaSources } from "./mediaUtils";

  let video: HTMLVideoElement;
  let subtitle = "";
  let currentSpeaker = "";
  let subtitles = [];
  let speakers = [];
  let startTime = $page.url.searchParams.get("start") || 0;
  let videoId = $page.url.searchParams.get("video_id");
  let { videoSrc, trackSrc } = getMediaSources(videoId);
  let isVideoPaused = writable(true);

  onMount(async () => {
    if (data && data.video && data.video[0]) {
      const videoData = data.video[0];
      subtitles = videoData.subtitles.map((subtitle) => ({
        index: subtitle.index,
        start: subtitle.start,
        end: subtitle.end,
        text: subtitle.fragment,
        speaker: subtitle.speaker,
        time_start: formatTime(subtitle.start),
        time_end: formatTime(subtitle.end),
      }));
      console.log(subtitles);

      video.addEventListener("play", () => isVideoPaused.set(false));
      video.addEventListener("pause", () => isVideoPaused.set(true));
    }
  });

  function handleTimeUpdate() {
    const updatedData = onTimeUpdate(video, subtitles);
    console.log("Updated Subtitle:", updatedData.subtitle);
    console.log("Updated Speaker:", updatedData.currentSpeaker);
    subtitle = `${updatedData.subtitle}`; // Convert to string to ensure reactivity
    currentSpeaker = `${updatedData.currentSpeaker}`;
    subtitle = updatedData.subtitle;
    currentSpeaker = updatedData.currentSpeaker;
  }

  function formatTime(seconds: number): string {
    const date = new Date(seconds * 1000);
    return date.toISOString().substr(11, 8); // Format as HH:MM:SS
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
