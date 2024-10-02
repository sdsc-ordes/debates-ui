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
      mergeSpeakersWithSolrData();
    } else {
      console.warn("No data found or an error occurred.");
    }
  });

  function mapSolrData(data: any): any {
    return data.response.docs.reduce(
      (
        acc: Record<string, { role: string; statement: string[] }>,
        doc: any
      ) => {
        acc[doc.speaker_name] = {
          role: doc.speaker_role,
          statement: doc.statement,
        };
        return acc;
      },
      {}
    );
  }

  function mergeSpeakersWithSolrData() {
    const solrDataValue = $solrData;
    speakers = speakers.map((speaker) => {
      const solrInfo = solrDataValue[speaker.speaker];
      if (solrInfo) {
        return {
          ...speaker,
          role: solrInfo.role,
          statement: solrInfo.statement,
        };
      }
      return speaker;
    });
  }

  function handleTimeUpdate() {
    const updatedData = onTimeUpdate(video, subtitles);
    subtitle = updatedData.subtitle;
    currentSpeaker = updatedData.currentSpeaker;
  }

  function toggleStatement(index: number) {
    speakers[index].showStatement = !speakers[index].showStatement;
  }
</script>

<svelte:head>
  <title>Debate with transcript</title>
  <meta name="description" content="Debate with transcript" />
</svelte:head>

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

  <!-- Merged Speakers List -->
  <div class="speakers-list">
    <h2>Speakers</h2>
    {#each speakers as { speaker, role, statement, start, time_start, showStatement }, index}
      <div class="speaker-info">
        <button on:click={() => jumpToTime(video, start)}>
          <strong>{speaker}</strong> {#if role}({role}){/if}
          <span> - {time_start} ({start.toFixed(2)}s)</span>
        </button>
        {#if statement && statement.length > 0}
          <button class="show_statement_button" on:click={() => toggleStatement(index)}>
            {#if showStatement}Hide Statement{:else}Show Statement{/if}
          </button>
          {#if showStatement}
            <div class="statement">
              <p>{statement.join(" ")}</p>
            </div>
          {/if}
        {/if}
      </div>
    {/each}
  </div>
</div>
