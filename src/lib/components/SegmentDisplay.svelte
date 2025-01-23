<script lang="ts">
  import type { TimeUpdateParameters } from "$lib/interfaces/videoplayer.interface";
  import type { Subtitle } from "$lib/interfaces/backend.interface";
  import { canEdit } from '$lib/stores/auth';
  import { jumpToTime } from "$lib/utils/videoStartUtils";
  export let subtitles: Subtitle[] = [];
  export let subtitles_en: Subtitle[] = [];
  export let timeUpdateParameters: TimeUpdateParameters;
  export let mediaElement: HTMLVideoElement;
  let editSubtitles: boolean = false;

  function updateSubtitle(index: number, updatedText: string) {
    subtitles[index].content = updatedText;
  }

  function toggleEditSubtitles() {
    editSubtitles = !editSubtitles;
  }
</script>

{#if $canEdit}
  <button on:click={toggleEditSubtitles}>
    {editSubtitles ? "Disable Subtitle Editing" : "Enable Subtitle Editing"}
  </button>
{/if}

<div class="side-by-side">
  <div class="text-block">
    <h4>Original</h4>
    <p>
      {#each subtitles as subtitle, index}
        {#if subtitle.segment_nr === timeUpdateParameters.currentSegmentIndex}
          <span
            class={index === timeUpdateParameters.currentSubtitleIndex - 1
              ? "highlighted"
              : ""}
            on:click={() => jumpToTime(mediaElement, subtitle.start)}
          >
            {#if editSubtitles}
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
    <h4>Translation (English)</h4>
    <p>
      {#each subtitles_en as subtitle, index}
        {#if subtitle.segment_nr === timeUpdateParameters.currentSegmentIndex}
          <span
            class={index === timeUpdateParameters.currentSubtitleIndexEn - 1
              ? "highlighted"
              : ""}
            on:click={() => jumpToTime(mediaElement, subtitle.start)}
          >
            {#if editSubtitles}
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
</style>

