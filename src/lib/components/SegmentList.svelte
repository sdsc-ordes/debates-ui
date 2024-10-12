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

<ul>
  {#each segments as segment, index}
    <li>
      <button
        class="play-button"
        on:click={() => jumpToTime(video, segment.start)}
      >
        {formatTimeForDisplay(segment.start)} - {formatTimeForDisplay(segment.end)}
      </button>      
      <span
        class={segment.segment_nr === timeUpdateParameters.currentSegmentIndex ? "highlighted" : ""}
      >
        {index + 1}. 
        { displaySpeaker(segment.speaker_id, speakers) } 
      </span>
    </li>
  {/each}
</ul>


<style>
  .highlighted {
    color: red;
  }

  .play-button {
    background-color: rgba(0, 0, 0, 0.7);
    padding:2px;
    color: white;
    border: none;
    font-size: 16px;
    cursor: pointer;
  }

  .play-button:hover {
    background-color: rgba(0, 0, 0, 0.9);
  }  
</style>
