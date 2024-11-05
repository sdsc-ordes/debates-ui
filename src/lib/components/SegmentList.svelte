<script lang="ts">
  import type {
    TimeUpdateParameters,
  } from "$lib/interfaces/videoplayer.interface";
  import type {
    Segment,
    Speaker,
  } from "$lib/interfaces/mongodb.interface";
  import { formatTimeForDisplay } from "$lib/utils/displayUtils";
  import { jumpToTime } from "$lib/utils/videoStartUtils";
  import { displaySpeaker } from "$lib/utils/displayUtils";

  export let segments: Segment[] = [];
  export let speakers: Speaker[] = [];
  export let timeUpdateParameters: TimeUpdateParameters;
  export let video: HTMLVideoElement;
  let currentIndex = timeUpdateParameters.currentSegmentIndex;
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
        {@html displaySpeaker(segment.speaker_id, speakers) }
      </span>
    </li>
  {/each}
</ol>
</div>

<style>
  .highlighted {
    color: red;
  }
  .play-button {
    padding: 0.2rem;
    font-size: 1rem;
  }
  .scrollable-container {
    max-height: 300px;
    overflow-y: auto;
    border: 1px solid #ccc;
    padding: 0.5rem;
  }  
</style>
