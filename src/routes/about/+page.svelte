<svelte:head>
  <title>Debate with transcript</title>
  <meta name="description" content="Debate with transcript" />
</svelte:head>

<script lang="ts">
  import { onMount } from 'svelte';

  let video: HTMLVideoElement;
  let subtitle = '';
  let currentSpeaker = '';
  let subtitles: { start: number; end: number; text: string, speaker: string }[] = [];
  let speakers: { speaker: string, start: number }[] = [];

  // Function to parse the SRT file into an array of subtitles with start and end times
  function parseSRT(srtContent: string) {
    const regex = /(\d+)\n(\d{2}):(\d{2}):(\d{2}),(\d{3}) --> (\d{2}):(\d{2}):(\d{2}),(\d{3})\n([\s\S]*?)(?=\n\d|\n*$)/g;
    let result;
    let tempSpeakers: { speaker: string, start: number }[] = [];
    let lastSpeaker = ''; // Track the last speaker to only push when it changes
    let parsedSubtitles: { start: number; end: number; text: string, speaker: string }[] = [];

    while ((result = regex.exec(srtContent)) !== null) {
      const start = parseTime(result[2], result[3], result[4], result[5]);
      const end = parseTime(result[6], result[7], result[8], result[9]);
      const text = result[10].replace(/\n/g, ' ');
      const [speaker, content] = parseSpeakerAndText(text); // Split speaker and content
      parsedSubtitles.push({ start, end, text: content, speaker });

      // Only add to speakers list if speaker name changes
      if (speaker !== lastSpeaker) {
        tempSpeakers.push({ speaker, start });
        lastSpeaker = speaker;
      }

      speakers = tempSpeakers; // Reassign the array to trigger reactivity
    }
    return parsedSubtitles;
  }

  // Helper to convert SRT time format to seconds
  function parseTime(hours: string, minutes: string, seconds: string, milliseconds: string) {
    return (+hours) * 3600 + (+minutes) * 60 + (+seconds) + (+milliseconds) / 1000;
  }

  // Helper to split the speaker and the transcript text
  function parseSpeakerAndText(subtitleText: string) {
    const speakerRegex = /^\[(.+?)\]:\s*/;
    const match = subtitleText.match(speakerRegex);
    if (match) {
      const speaker = match[1];
      const text = subtitleText.replace(speakerRegex, ''); // Remove the speaker from the text
      return [speaker, text];
    }
    return ['Unknown', subtitleText];
  }

  // Function to update the current subtitle and speaker
  function updateSubtitle(currentTime: number) {
    const currentSubtitle = subtitles.find(sub => currentTime >= sub.start && currentTime <= sub.end);
    if (currentSubtitle) {
      subtitle = currentSubtitle.text;
      currentSpeaker = currentSubtitle.speaker;
    } else {
      subtitle = '';
      currentSpeaker = '';
    }
  }

  // Load the SRT file
  async function loadSubtitles() {
    const response = await fetch('/input/subtitles.srt');
    const srtText = await response.text();
    subtitles = parseSRT(srtText);
  }

  // Update subtitles when the video time updates
  function onTimeUpdate() {
    updateSubtitle(video.currentTime);
  }

  // Function to jump to a specific time in the video
  function jumpToTime(time: number) {
    video.currentTime = time;
    video.play(); // Optionally start playing after jump
  }

  // Load subtitles on mount
  onMount(loadSubtitles);
</script>

<style>
  .video-container {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
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

  .speaker {
    font-weight: bold;
    margin-bottom: 10px;
  }

  .speakers-list {
    margin-top: 20px;
  }

  .speakers-list button {
    display: block;
    margin-bottom: 10px;
    padding: 5px 10px;
    cursor: pointer;
    font-size: 16px;
  }
</style>

<div class="text-column">
  <h1>Debate with Transcript</h1>

  <div class="video-container">
    <!-- Video Player -->
    <video class="video" bind:this={video} on:timeupdate={onTimeUpdate} controls>
      <source src="/input/video.mp4" type="video/mp4">
      <track src="/input/subtitles.srt" kind="captions" srclang="en" label="english_captions">
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
    <h2>Speakers</h2>
    {#each speakers as { speaker, start }, index}
      <button on:click={() => jumpToTime(start)}>
        {index + 1}. {speaker} - Start at {start.toFixed(2)}s
      </button>
    {/each}
  </div>
</div>