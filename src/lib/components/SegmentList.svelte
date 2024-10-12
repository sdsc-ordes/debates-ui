<script lang="ts">
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
</script>

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

<style>
  .highlighted {
    color: red;
  }
  .play-button {
    padding: 0.2rem;
    font-size: 1rem;
    font-weight: bold;
    border: none;
    border-radius: 0 4px 4px 0;
    cursor: pointer;
    transition: background-color 0.3s;
  }
</style>
