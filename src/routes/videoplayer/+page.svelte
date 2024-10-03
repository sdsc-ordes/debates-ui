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

  onMount(async () => {
    const queryTerm = "*:*";
    const parsedData = await loadSubtitles(Number(startTime), video);
    subtitles = parsedData.parsedSubtitles;
    speakers = parsedData.speakers;

    const data = await fetchSolrData(solrUrl, queryTerm);
    if (data) {
      searchResults.set(data);
      let docs = data.response.docs;
      speakers = mergeSpeakersWithSolrData(docs, speakers);
    } else {
      console.warn("No data found or an error occurred.");
    }
  });

  function mergeSpeakersWithSolrData(docs: any, speakers: any): any {
    if (docs && docs.length === speakers.length) {
      for (let i = 0; i < speakers.length; i++) {
        const solrInfo = docs[i];
        speakers[i] = {
          ...speakers[i],
          role: solrInfo.speaker_role,
          statement: solrInfo.statement,
        };
      }
    } else {
      console.warn("Speakers and Docs data lists are not of equal length.");
    }
    return speakers;
  }

  function handleTimeUpdate() {
    const updatedData = onTimeUpdate(video, subtitles);
    subtitle = updatedData.subtitle;
    currentSpeaker = updatedData.currentSpeaker;
  }

  function toggleStatement(index: number) {
    speakers[index].showStatement = !speakers[index].showStatement;
  }

  function highlightSubtitle(statement: string[], subtitle: string): string {
    console.log(statement);
    console.log(subtitle);
    const joinedStatement = statement.join(" ");
    const highlighted = joinedStatement.replace(
      new RegExp(`(${subtitle})`, "gi"),
      '<span class="highlight">$1</span>',
    );
    console.log(highlighted);
    return highlighted;
  }
</script>

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
        <div class="speaker">
          <label for="speaker">Speaker:</label>
          <input
            id="speaker"
            type="text"
            bind:value={currentSpeaker}
            class="editable-input"
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
          ></textarea>
        </div>
      {/if}
    </div>
  </div>

  <!-- Merged Speakers List -->
  <div class="speakers-list">
    <h2>Speakers</h2>
    {#each speakers as { speaker, role, statement, start, time_start, showStatement }, index}
      <div class="speaker-info">
        <div class="speaker-details">
          <strong>{speaker}</strong>
          {#if role}
            ({role}){/if}
          <span> - {time_start} ({start.toFixed(2)}s)</span>
          <button
            class="option-button"
            on:click={() => jumpToTime(video, start)}
          >
            Play Segment
          </button>
          {#if statement && statement.length > 0}
            <button
              class="option-button"
              on:click={() => toggleStatement(index)}
            >
              {#if showStatement}Hide Statement{:else}Show Statement{/if}
            </button>
          {/if}
        </div>
        {#if showStatement}
          <div class="statement">
            <p>{@html highlightSubtitle(statement, subtitle)}</p>
          </div>
        {/if}
      </div>
    {/each}
  </div>
</div>
