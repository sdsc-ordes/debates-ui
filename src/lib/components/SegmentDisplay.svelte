<script lang="ts">
  import type { TimeUpdateParameters } from "$lib/interfaces/videoplayer.interface";
  import type { Subtitle } from "$lib/interfaces/backend.interface";
  import { canEdit } from '$lib/stores/auth';
  import { jumpToTime } from "$lib/utils/videoStartUtils";
  export let subtitles: Subtitle[] = [];
  export let subtitles_en: Subtitle[] = [];
  export let timeUpdateParameters: TimeUpdateParameters;
  export let mediaElement: HTMLVideoElement;
  let editSubtitlesTranscription: boolean = false;
  let editSubtitlesTranslation: boolean = false;

  function updateSubtitle(index: number, updatedText: string) {
    subtitles[index].content = updatedText;
  }

  function toggleEditSubtitlesTranscription() {
    editSubtitlesTranscription = !editSubtitlesTranscription;
  }
  function toggleEditSubtitlesTranslation() {
    editSubtitlesTranslation = !editSubtitlesTranslation;
  }
  function saveSubtitle$Transcription(): void {
    editSubtitlesTranscription = !editSubtitlesTranscription;
  }
  function saveSubtitle$Translation(): void {
    editSubtitlesTranslation = !editSubtitlesTranslation;
  }
</script>

<div class="side-by-side">
  <div class="text-block">
    Transcription
    {#if $canEdit}
      <button class="small-edit-button" on:click={toggleEditSubtitlesTranscription} aria-label="Edit">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
          <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zm2.06-1.19l9.19-9.19 1.75 1.75-9.19 9.19H5.06v-1.75zM22 7.24c0-.39-.15-.78-.44-1.06L18.82 3.44a1.495 1.495 0 0 0-2.12 0L15 5.13l3.75 3.75 1.69-1.69c.28-.28.44-.67.44-1.06z"/>
        </svg>
      </button>
      <button class="save-button"
        on:click={() => saveSubtitle$Transcription()}
        aria-label="Save">
        Save speakers
      </button>
    {/if}
    <p>
      {#each subtitles as subtitle, index}
        {#if subtitle.segment_nr === timeUpdateParameters.currentSegmentIndex}
          <span
            class={index === timeUpdateParameters.currentSubtitleIndex - 1
              ? "highlighted"
              : ""}
            on:click={() => jumpToTime(mediaElement, subtitle.start)}
          >
            {#if editSubtitlesTranscription}
              <div>
                <textarea
                  id={`subtitle-${index}`}
                  bind:value={subtitle.content}
                  on:input={(e) => updateSubtitle(index, e.target.value)}
                  class="editable-textarea"
                />
              </div>
            {:else}
              {subtitle.content}
            {/if}
          </span>
        {/if}
      {/each}
    </p>
  </div>
  <div class="text-block">
    Translation (English)
    {#if $canEdit}
      <button class="small-edit-button" on:click={toggleEditSubtitlesTranslation} aria-label="Edit">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
          <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zm2.06-1.19l9.19-9.19 1.75 1.75-9.19 9.19H5.06v-1.75zM22 7.24c0-.39-.15-.78-.44-1.06L18.82 3.44a1.495 1.495 0 0 0-2.12 0L15 5.13l3.75 3.75 1.69-1.69c.28-.28.44-.67.44-1.06z"/>
        </svg>
      </button>
      <button class="save-button"
        on:click={() => saveSubtitle$Translation()}
        aria-label="Save">
        Save speakers
      </button>
    {/if}
    <p>
      {#each subtitles_en as subtitle, index}
        {#if subtitle.segment_nr === timeUpdateParameters.currentSegmentIndex}
          <span
            class={index === timeUpdateParameters.currentSubtitleIndexEn - 1
              ? "highlighted"
              : ""}
            on:click={() => jumpToTime(mediaElement, subtitle.start)}
          >
            {#if editSubtitlesTranslation}
              <div>
                <textarea
                  id={`subtitle-${index}`}
                  bind:value={subtitle.content}
                  on:input={(e) => updateSubtitle(index, e.target.value)}
                  class="editable-textarea"
                />
              </div>
            {:else}
              {subtitle.content}
            {/if}
          </span>
        {/if}
      {/each}
    </p>
  </div>
</div>

<style>
  .side-by-side {
    display: flex;
    gap: 20px; /* Adds space between the two text blocks */
  }

  .text-block {
    flex: 1; /* Ensures equal width for both text blocks */
    display: flex;
    flex-direction: column; /* Stacks the header and paragraph */
  }

  .highlighted {
    color: red;
  }

  .editable-textarea {
    width: 100%;
    height: 50px;
  }

  h4 {
    margin-bottom: 10px; /* Adds space between the header and content */
  }

  p {
    margin: 0;
    padding: 0;
    word-wrap: break-word; /* Ensures long text wraps inside the block */
  }

  .small-edit-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    border: none;
    border-radius: 50%; /* Makes it circular */
    background-color: #f0f0f0; /* Light background */
    color: #333; /* Dark text/icon color */
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Subtle shadow */
    transition: background-color 0.2s, transform 0.2s; /* Smooth interaction effects */
  }

  .small-edit-button:hover {
    background-color: #e0e0e0; /* Slightly darker on hover */
    transform: scale(1.1); /* Slightly larger on hover */
  }

  .small-edit-button:active {
    background-color: #d0d0d0; /* Darker when active */
    transform: scale(0.95); /* Slightly smaller when active */
  }

  .save-button {
    padding: 5px 5px; /* Adjust padding for a rectangular shape */
    background-color: #d0d0d0; /* Primary blue color */
    color: black;
    border: none;
    border-radius: 4px; /* Small rounding for edges */
    font-size: 12px;
    cursor: pointer;
  }

  .save-button:hover {
    background-color: #d0d0d0; /* Darker blue on hover */
  }

  .save-button:active {
    background-color: #d0d0d0; /* Even darker on click */
  }

  .save-button:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.5); /* Focus indicator */
  }
</style>

