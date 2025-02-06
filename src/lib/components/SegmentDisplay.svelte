<script lang="ts">
  import type { TimeUpdateParameters } from "$lib/interfaces/mediaplayer.interface";
  import { type Subtitle, SubtitleTypeEnum, type Segment } from "$lib/interfaces/metadata.interface";
  import { canEdit } from "$lib/stores/auth";
  import { jumpToTime } from "$lib/utils/mediaStartUtils";
  import { updateSubtitles } from "$lib/api/browser/updateSubtitles";
  export let subtitles: Subtitle[] = [];
  export let subtitles_en: Subtitle[] = [];
  export let timeUpdateParameters: TimeUpdateParameters;
  export let mediaElement: HTMLVideoElement;
  export let s3Prefix: string;

  let editSubtitlesTranscription: boolean = false;
  let editSubtitlesTranslation: boolean = false;

  const transcript = SubtitleTypeEnum.Transcript;
  const translation = SubtitleTypeEnum.Translation;

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
    updateSubtitles(s3Prefix, timeUpdateParameters.displaySegmentNr, subtitles, transcript)
    editSubtitlesTranscription = !editSubtitlesTranscription;
  }
  function saveSubtitle$Translation(): void {
    updateSubtitles(s3Prefix, timeUpdateParameters.displaySegmentNr, subtitles_en, translation)
    editSubtitlesTranslation = !editSubtitlesTranslation;
  }
</script>

<div class="side-by-side">
  <div class="text-block">
    <div
      style="display: flex;
    align-items: center;
    justify-content: start;
    gap: 1rem;
    width: 100%;"
    >
      <div class="card-title-small">Transcription</div>
      {#if $canEdit && !editSubtitlesTranscription}
        <button
          class="secondary-button"
          on:click={toggleEditSubtitlesTranscription}
          aria-label="Edit"
          >Edit
        </button>
      {:else if editSubtitlesTranscription}
        <button
          class="secondary-button"
          on:click={toggleEditSubtitlesTranscription}
          aria-label="Cancel"
          >Cancel
        </button>
        <button
          class="secondary-button"
          on:click={() => saveSubtitle$Transcription()}
          aria-label="Save"
        >
          Save
        </button>
      {/if}
    </div>
    <p>
      {#each subtitles as subtitle, index}
        {#if subtitle.segment_nr === timeUpdateParameters.displaySegmentNr}
          <span
            class={index === timeUpdateParameters.displaySubtitleIndex - 1
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
                  class={`editable-textarea ${
                    index === timeUpdateParameters.displaySubtitleIndex - 1 ? "highlighted-textarea" : ""
                  }`}
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
    <div
      style="display: flex;
    align-items: center;
    justify-content: start;
    gap: 1rem;
    width: 100%;"
    >
      <div class="card-title-small">Translation</div>
      {#if $canEdit && !editSubtitlesTranslation}
        <button
          class="secondary-button"
          on:click={toggleEditSubtitlesTranslation}
          aria-label="Edit"
          >Edit
        </button>
      {:else if editSubtitlesTranslation}
        <button
          class="secondary-button"
          on:click={toggleEditSubtitlesTranslation}
          aria-label="Cancel"
          >Cancel
        </button>
        <button
          class="secondary-button"
          on:click={() => saveSubtitle$Translation()}
          aria-label="Save"
        >
          Save
        </button>
      {/if}
    </div>
    <p>
      {#each subtitles_en as subtitle, index}
        {#if subtitle.segment_nr === timeUpdateParameters.displaySegmentNr}
          <span
            class={index === timeUpdateParameters.displaySubtitleEnIndex - 1
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
                  class={`editable-textarea ${
                    index === timeUpdateParameters.displaySubtitleEnIndex - 1 ? "highlighted-textarea" : ""
                  }`}
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
    gap: 20px;
    max-height: 300px;
    padding: 0.5rem;
  }

  .text-block {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .text-block p {
    overflow-y: auto;
  }

  .highlighted {
    color: var(--secondary-color);
  }

  .editable-textarea {
    width: 100%;
    height: 50px;
  }

  .highlighted-textarea {
    border: 2px solid var(--secondary-color);
  }

  p {
    margin: 0;
    padding: 0;
    word-wrap: break-word;
  }

</style>
