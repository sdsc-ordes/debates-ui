<script lang="ts">
  import { onMount } from "svelte";
  import type {
    Segment,
    Speaker,
    TimeUpdateParameters,
  } from "$lib/interfaces/videoplayer.interface";
  import { formatTimeForDisplay } from "$lib/utils/displayUtils";
  import { jumpToTime } from "$lib/utils/videoStartUtils";
  import { displaySpeaker } from "$lib/utils/displayUtils";

  export let segments: Segment[] = [];
  export let speakers: Speaker[] = [];
  export let timeUpdateParameters: TimeUpdateParameters;
  export let video: HTMLVideoElement;

  let highlightedSegment: HTMLLIElement | null = null;

  function scrollToHighlighted() {
    if (highlightedSegment) {
      highlightedSegment.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  // Run DOM-dependent code only after the component mounts
  onMount(() => {
    $: {
      // Find the <li> element matching the current segment index
      highlightedSegment = Array.from(document.querySelectorAll("li")).find(
        (el, index) =>
          segments[index].segment_nr === timeUpdateParameters.currentSegmentIndex
      ) as HTMLLIElement | null;

      // Scroll to the highlighted segment if it exists
      if (highlightedSegment) {
        scrollToHighlighted();
      }
    }
  });
</script>

<div class="scrollable-container">
  <ol>
    {#each segments as segment, index}
      <li>
        <button
          class="play-button"
          on:click={() => jumpToTime(video, segment.start)}
        >
          {formatTimeForDisplay(segment.start)} - {formatTimeForDisplay(
            segment.end,
          )}
        </button>
        <span
          class={segment.segment_nr === timeUpdateParameters.currentSegmentIndex
            ? "highlighted"
            : ""}
        >
          {displaySpeaker(segment.speaker_id, speakers)}
        </span>
      </li>
    {/each}
  </ol>
</div>

<style>
  .scrollable-container {
    max-height: 300px;
    overflow-y: auto;
    border: 1px solid #ccc;
    padding: 0.5rem;
  }

  .highlighted {
    color: red;
  }

  .play-button {
    padding: 0.2rem;
    font-size: 1rem;
  }
</style>
