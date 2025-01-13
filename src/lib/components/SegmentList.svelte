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
</script>
<div class="scrollable-container">
  <ol>
    {#each segments as segment, index}
      <li>
        <div class="card text-center {segment.segment_nr ===
            timeUpdateParameters.currentSegmentIndex
              ? "current"
              : "other"}"
        on:click={() => jumpToTime(video, segment.start)}
        role="button"
        tabindex="0"
        on:keydown={(e) =>
          (e.key === "Enter" || e.key === " ") &&
          jumpToTime(video, segment.start)}
        >
          <div class="card-body">
            <h5 class="card-title">{@html displaySpeaker(segment.speaker_id, speakers)}</h5>
            <div class="date-time-item">
              <i class="fa fa-clock" aria-hidden="true"></i>
              <small class="card-subtle"
                >{formatTimeForDisplay(segment.start)} - {formatTimeForDisplay(
                  segment.end,
                )}</small
              >
            </div>
          </div>
        </div>
      </li>
    {/each}
  </ol>
</div>

<style>
    .fa {
	font-size: 1rem;
	color: var(--on-primary);
}
.card-subtle {
	color: var(--on-primary);
}
  .current {
    color: var(--on-primary);
    background-color: var(--primary-dark-color);
  }

  .scrollable-container {
    max-height: 300px;
    overflow-y: auto;
    padding: 0.5rem;
  }
</style>
