<script lang="ts">
  import type { PageData } from "./$types";
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import { writable } from "svelte/store";
  import {
    onTimeUpdate,
    jumpToTime,
    getMatchingSegment,
    getSegmentContentDisplay,
    getMatchingSpeakerIndex,
    getSpeakerDisplay,
  } from "./videoUtils";
  import { getMediaSources } from "./mediaUtils";
  import { mapSubtitles, mapSpeakers, mapSegments } from "$lib/mongo/mapMongoDbToPage";
  import type { Subtitle } from "$lib/interfaces/subtitle.interface";
  import type { Segment } from "$lib/interfaces/segment.interfaces/segment.interface";
  //import "./page.css";

  export let data: PageData;
  let startTime = $page.url.searchParams.get("start") || 0;
  let video: HTMLVideoElement;
  let subtitles: Writable<Subtitle[]> = writable([]);
  let speakers: Writable<Speaker[]> = writable([]);
  let videoId = $page.url.searchParams.get("video_id");
  let { videoSrc, trackSrc } = getMediaSources(videoId);
  let isVideoPaused = writable(true);
  let currentSubtitleIndex = -1;
  let currentSpeakerIndex = -1;
  let segments: Segment[] = [];

  onMount(async () => {
    if (data && data.video && data.video[0]) {
      const videoData = data.video[0];
      subtitles.set(mapSubtitles(videoData.subtitles));
      speakers.set(mapSpeakers(videoData.speakers));
      segments = mapSegments(videoData.segments);
      video.addEventListener("play", () => isVideoPaused.set(false));
      video.addEventListener("pause", () => isVideoPaused.set(true));
    }
    if (startTime) {
      jumpToTime(video, Number(startTime));
    }
  });

  function handleTimeUpdate() {
    const updatedIndex = onTimeUpdate(video.currentTime, $subtitles);
    currentSubtitleIndex = updatedIndex - 1;
    if (currentSubtitleIndex < 0) {
      currentSpeakerIndex = -1;
      return;
    }
    try {
      const currentSegment = getMatchingSegment(
        $subtitles[currentSubtitleIndex].segment_nr,
        segments,
      );
      currentSpeakerIndex = getMatchingSpeakerIndex(
        currentSegment.speaker_id,
        $speakers,
      );
    } catch (error) {
      console.error("Error during time update:", error);
    }
  }

  function updateSubtitle(index: number, updatedText: string) {
    subtitles.update((subs) => {
      const updatedSubtitles = [...subs];
      updatedSubtitles[index].text = updatedText;
      return updatedSubtitles;
    });
  }

  function toggleStatement(index: number) {
    segments[index].show_full_content = !segments[index].show_full_content;
  }

  $: currentSubtitle = $subtitles[currentSubtitleIndex];
  $: currentSpeaker = $speakers[currentSpeakerIndex];
</script>

<svelte:head>
  <title>Test Page</title>
  <meta name="description" content="Testpage" />
</svelte:head>

<div>
  <h1>Debate with Transcript</h1>

  <div class="video-subtitle-container">
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
          <label for="speaker-id">({currentSpeaker.speaker_id}) Name:</label>
          <input
            id="speaker-name"
            placeholder="name"
            type="text"
            bind:value={currentSpeaker.name}
            class="editable-input"
            disabled={!$isVideoPaused}
          />
          <label for="speaker-country">Country (the speaker represents):</label>
          <input
            id="speaker-country"
            placeholder="country"
            type="text"
            bind:value={currentSpeaker.country}
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
            on:input={(e) =>
              updateSubtitle(currentSubtitleIndex, e.target.value)}
            class="editable-textarea"
            disabled={!$isVideoPaused}
          />
        </div>
      {/if}
    </div>
  </div>

  <!-- Segment List -->
  <div class="segment-list">
    {#each segments as segment, index}
      <div class="segment-item">
        {index + 1}.
        <span>{getSpeakerDisplay(segment.speaker_id, $speakers)}</span>
        <span>{segment.time_start} - {segment.time_end}</span>
        <button
          class="option-button"
          on:click={() => jumpToTime(video, segment.start)}
        >
          Play Segment
        </button>
        <button class="option-button" on:click={() => toggleStatement(index)}>
          {#if segment.show_full_content}Hide Statement{:else}Show Statement{/if}
        </button>
        <p>
          {getSegmentContentDisplay(segment, $subtitles)}
        </p>
      </div>
    {/each}
  </div>
</div>

<style>
  .video-subtitle-container {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 2rem;
    margin-bottom: 2rem;
  }

  .video {
    width: 600px;
    border: 1px solid #ddd;
  }

  .subtitle-container {
    width: 400px;
    min-height: 100px;
    padding: 10px;
    font-size: 18px;
    white-space: pre-wrap;
    display: flex;
    flex-direction: column;
    justify-content: center;
    visibility: hidden;
  }

  .subtitle-container.show {
    visibility: visible;
  }

  .segment-item {
    margin-bottom: 1rem;
  }

  .editable-input {
    width: 100%;
    padding: 8px;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  .editable-textarea {
    width: 100%;
    height: 200px;
    padding: 8px;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    resize: vertical;
  }

  #label-speaker-name {
    display: block;
  }

  .option-button {
    font-size: 0.8rem;
    color: #ff3e00;
    background: none;
    border: none;
    cursor: pointer;
    margin-right: 20px;
    padding: 0;
  }
</style>
