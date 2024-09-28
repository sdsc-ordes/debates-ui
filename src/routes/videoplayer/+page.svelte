<svelte:head>
  <title>Debate with transcript</title>
  <meta name="description" content="Debate with transcript" />
</svelte:head>

<script lang="ts">
  import { onMount } from 'svelte';
  import './page.css';

  import { parseSRT } from './parseSrt';
  import { updateSubtitle } from './subtilteUtils';

  let video: HTMLVideoElement;
  let subtitle = '';
  let currentSpeaker = '';
  let subtitles: { start: number; end: number; text: string, speaker: string }[] = [];
  let speakers: { speaker: string, start: number }[] = [];
  let chair = ''; // First speaker, which will be treated as the "Chair"
  let chairStatements: { start: number }[] = []; // Track each statement of the chair
  
  let videoSrc = '/input/video.mp4';
  let trackSrc = '/input/subtitles.srt';

  // Load the SRT file
  async function loadSubtitles() {
    const response = await fetch('/input/subtitles.srt');
    const srtText = await response.text();
    const parsedData = parseSRT(srtText);
    subtitles = parsedData.parsedSubtitles;
    speakers = parsedData.tempSpeakers;
    chairStatements = parsedData.tempChairStatements;
    chair = parsedData.chair;
  }

  // Update subtitles when the video time updates
  function onTimeUpdate() {
    const updatedData = updateSubtitle(video.currentTime, subtitles);
    subtitle = updatedData.subtitle;
    currentSpeaker = updatedData.currentSpeaker;
  }

  // Function to jump to a specific time in the video
  function jumpToTime(time: number) {
    video.currentTime = time;
    video.play(); // Optionally start playing after jump
  }

  // Load subtitles on mount
  onMount(loadSubtitles);
</script>


<div class="text-column">
  <h1>Debate with Transcript</h1>

  <div class="video-container">
    <!-- Video Player -->
    <video class="video" bind:this={video} on:timeupdate={onTimeUpdate} controls>
      <source src="{videoSrc}" type="video/mp4">
      <track src="{trackSrc}" kind="captions" srclang="en" label="english_captions">
      Your browser does not support the video tag.
    </video>

    <!-- Subtitle Display -->
    <div class="subtitle-container {subtitle ? 'show' : ''}">
      {#if currentSpeaker}
        <div class="speaker">{currentSpeaker}</div>
      {/if}
      {#if subtitle}
        <div>{subtitle}</div>
      {/if}
    </div>
  </div>

  <!-- List of Speakers with Jump Buttons -->
  <div class="speakers-list">
    <!-- Chair Column -->
    <div>
      <h2>Chair</h2>
      {#each chairStatements as { start }, index}
        <button on:click={() => jumpToTime(start)}>
          Chair Statement {index + 1} - Start at {start.toFixed(2)}s
        </button>
      {/each}
    </div>

    <!-- Speakers Column -->
    <div>
      <h2>Speakers</h2>
      {#each speakers as { speaker, start }, index}
        <button on:click={() => jumpToTime(start)}>
          {index + 1}. {speaker} - Start at {start.toFixed(2)}s
        </button>
      {/each}
    </div>
  </div>
</div>
