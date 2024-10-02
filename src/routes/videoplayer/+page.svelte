<script lang="ts">
  import { onMount } from "svelte";
  import "./page.css";
  import { page } from "$app/stores";
  import { writable } from "svelte/store";
  import { fetchSolrData } from "$lib/solrSearch";
  import { loadSubtitles, onTimeUpdate, jumpToTime } from "./videoUtils";
  import { getMediaSources } from "./mediaUtils";

  const solrUrl = import.meta.env.VITE_SOLR_URL;

  let searchResults = writable(null);

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
  let speakers: { speaker: string; start: number; time_start: string }[] = [];
  let startTime = $page.url.searchParams.get("start") || 0;
  let videoId = $page.url.searchParams.get("video_id");
  let { videoSrc, trackSrc } = getMediaSources(videoId);
  let solrData = writable(null);

  onMount(async () => {
    const queryTerm = "*:*";
    const parsedData = await loadSubtitles(Number(startTime), video);
    subtitles = parsedData.parsedSubtitles;
    speakers = parsedData.speakers;
    const data = await fetchSolrData(solrUrl, queryTerm);
    if (data) {
      searchResults.set(data);
      solrData.set(mapSolrData(data));
    } else {
      console.warn("No data found or an error occurred.");
    }
  });

  function mapSolrData(data: any): any {
    return data.response.docs.reduce(
      (
        acc: Record<string, { role: string; statement: string[] }>,
        doc: any,
      ) => {
        acc[doc.speaker_name] = {
          role: doc.speaker_role,
          statement: doc.statement,
        };
        return acc;
      },
      {},
    );
  }

  function handleTimeUpdate() {
    const updatedData = onTimeUpdate(video, subtitles);
    subtitle = updatedData.subtitle;
    currentSpeaker = updatedData.currentSpeaker;
  }
</script>

<svelte:head>
  <title>Debate with transcript</title>
  <meta name="description" content="Debate with transcript" />
</svelte:head>
<pre>{JSON.stringify($solrData, null, 2)}</pre>
<div class="text-column">
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
        <div class="speaker">{currentSpeaker}</div>
      {/if}
      {#if subtitle}
        <div>{subtitle}</div>
      {/if}
    </div>
  </div>

  <div class="speakers-list">
    <h2>Speakers</h2>
    {#each speakers as { speaker, start, time_start }}
      <button on:click={() => jumpToTime(video, start)}>
        {speaker}
        {time_start} ({start.toFixed(2)}s)
      </button>
    {/each}
  </div>
  <pre>{JSON.stringify($solrData, null, 2)}</pre>
</div>
