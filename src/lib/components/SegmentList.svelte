<script lang="ts">
  import type {
    Segment,
    Speaker,
    TimeUpdateParameters,
  } from "$lib/interfaces/videoplayer.interface";
  import { formatTimeForDisplay } from "$lib/utils/displayUtils";
  import { jumpToTime } from "$lib/utils/videoStartUtils";
  export let segments: Segment[] = [];
  export let speakers: Speaker[] = [];
  export let timeUpdateParameters: TimeUpdateParameters;
  export let video: HTMLVideoElement;
  console.log(speakers)
</script>
<ul>
{#each speakers as speaker, speaker_index}
  <li>{speaker.name} {speaker.speaker_id} {speaker.country}</li>
{/each}
</ul>
<ul>
  {#each segments as segment, index}
    <li>
      { speakers[timeUpdateParameters.currentSpeakerIndex] }
      <button
        class="play-button"
        on:click={() => jumpToTime(video, segment.start)}
      >
        {formatTimeForDisplay(segment.start)} - {formatTimeForDisplay(
          segment.end,
        )}
      </button>      
      <span
        class={segment.segment_nr === timeUpdateParameters.currentSegmentIndex ? "highlighted"
          : ""}
      >
        {index + 1}. {segment.speaker_id}
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
