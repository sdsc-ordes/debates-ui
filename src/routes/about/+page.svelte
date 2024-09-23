<svelte:head>
	<title>Debate with transcript</title>
	<meta name="description" content="Debate with transcript" />
</svelte:head>

<script lang="ts">
  import { onMount } from 'svelte';

  let video: any;
  let subtitle = '';
  let subtitles: any[];

  // Function to parse the SRT file into an array of subtitles with start and end times
  function parseSRT(srtContent: any) {
    const regex = /(\d+)\n(\d{2}):(\d{2}):(\d{2}),(\d{3}) --> (\d{2}):(\d{2}):(\d{2}),(\d{3})\n([\s\S]*?)(?=\n\d|\n*$)/g;
    let result;
    let parsedSubtitles = [];

    while ((result = regex.exec(srtContent)) !== null) {
      const start = parseTime(result[2], result[3], result[4], result[5]);
      const end = parseTime(result[6], result[7], result[8], result[9]);
      const text = result[10].replace(/\n/g, ' ');
      parsedSubtitles.push({ start, end, text });
    }
    return parsedSubtitles;
  }

  // Helper to convert SRT time format to seconds
  function parseTime(hours: any, minutes: any, seconds: any, milliseconds: any) {
    return (+hours) * 3600 + (+minutes) * 60 + (+seconds) + (+milliseconds) / 1000;
  }

  // Function to update the current subtitle
  function updateSubtitle(currentTime: any) {
    const currentSubtitle = subtitles.find(sub => currentTime >= sub.start && currentTime <= sub.end);
    subtitle = currentSubtitle ? currentSubtitle.text : '';
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

  // Load subtitles on mount
  onMount(loadSubtitles);
</script>

<style>
  .video-container {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .video {
    width: 600px;
    border: 1px solid #ddd;
  }

  .subtitle {
    width: 600px;
    padding: 10px;
    border: 1px solid #ddd;
    background-color: #f9f9f9;
    font-size: 18px;
    white-space: pre-wrap;
    min-height: 100px;
  }
</style>

<div class="text-column">
	<h1>Debate with transcript</h1>

    <div class="video-container">
      <!-- Video Player -->
      <video class="video" bind:this={video} on:timeupdate={onTimeUpdate} controls>
        <source src="/input/video.mp4" type="video/mp4">
        <track src="/input/subtitles.srt" kind="captions" srclang="en" label="english_captions">  
        Your browser does not support the video tag.
      </video>

      <!-- Subtitle Display -->
      <div class="subtitle">
        {subtitle}
      </div>
    </div>
</div>
