<script lang="ts">
  import type { PageData } from "./$types";
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import { writable } from "svelte/store";
  import { onTimeUpdate, formatTime } from "./videoUtils";
  import { getMediaSources } from "./mediaUtils";
  import { mapSubtitles, mapSpeakers, mapSegments } from ".//mapMongoDbToPage";
  import type { Subtitle } from './subtitle.interface';
  import type { Segment } from './segment.interface';
  import "./page.css";

  export let data: PageData;
  let video: HTMLVideoElement;
  let currentSpeaker = "";
  let subtitles: Writable<Subtitle[]> = writable([]);
  let speakers: Writable<Speaker[]> = writable([]);
  let videoId = $page.url.searchParams.get("video_id");
  let { videoSrc, trackSrc } = getMediaSources(videoId);
  let isVideoPaused = writable(true);
  let currentSubtitleIndex = -1;
  let segments: Segment[] = [];

  onMount(async () => {
    if (data && data.video && data.video[0]) {
      const videoData = data.video[0];
      subtitles.set(mapSubtitles(videoData.subtitles));
      speakers.set(mapSpeakers(videoData.speakers));
      segments = mapSegments(videoData.segments);
      console.log($speakers);
      console.log(segments);
      video.addEventListener("play", () => isVideoPaused.set(false));
      video.addEventListener("pause", () => isVideoPaused.set(true));
    }
  });

  function handleTimeUpdate() {
    const subs = $subtitles;
    const updatedIndex = onTimeUpdate(video.currentTime, subs);
    currentSubtitleIndex = updatedIndex - 1;
  }

  function updateSubtitle(index: number, updatedText: string) {
    subtitles.update((subs) => {
      const updatedSubtitles = [...subs];
      updatedSubtitles[index].text = updatedText;
      return updatedSubtitles;
    });
  }
  $: currentSubtitle = $subtitles[currentSubtitleIndex];
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
  <div class="subtitle-container {currentSubtitleIndex >= 0 ? 'show' : ''}">
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
    {#if currentSubtitle}
      <div>
        <label for={`subtitle-${currentSubtitleIndex}`}>Subtitle:</label>
        <textarea
          id={`subtitle-${currentSubtitleIndex}`}
          bind:value={currentSubtitle.content}
          on:input={(e) => updateSubtitle(currentSubtitleIndex, e.target.value)}
          class="editable-textarea"
          disabled={!$isVideoPaused}
        />
      </div>
    {/if}
  </div>
</div>
