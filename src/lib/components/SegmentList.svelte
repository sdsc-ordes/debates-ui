<script lang="ts">
  import type { TimeUpdateParameters } from "$lib/interfaces/videoplayer.interface";
  import type { Segment, Speaker } from "$lib/interfaces/mongodb.interface";
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
        <div
          class="card text-center {segment.segment_nr ===
          timeUpdateParameters.currentSegmentIndex
            ? 'current'
            : 'other'}"
          on:click={() => jumpToTime(video, segment.start)}
          role="button"
          tabindex="0"
          on:keydown={(e) =>
            (e.key === "Enter" || e.key === " ") &&
            jumpToTime(video, segment.start)}
        >
          <div class="card-body">
            <div class="card-title-small" style="color=inherit;">
              {@html displaySpeaker(segment.speaker_id, speakers)}
            </div>
            <div class="date-time-item">
              <i
                class="fa fa-clock {segment.segment_nr ===
                timeUpdateParameters.currentSegmentIndex
                  ? 'current'
                  : 'other'}"
                aria-hidden="true"
              ></i>
              <small
                class="card-subtle {segment.segment_nr ===
                timeUpdateParameters.currentSegmentIndex
                  ? 'current'
                  : 'other'}"
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
  .scrollable-container {
    max-height: 300px;
    overflow-y: auto;
    padding: 0.5rem;
  }
  ol li {
    list-style-type: none;
  }

  .card {
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    margin-bottom: 1rem;
  }
  .card-body {
    display: flex; 
    flex-direction:row; 
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }

  
  
  /* Styles for the current speaker card */
  .card.current {
    color: var(--on-primary);
    background-color: var(--primary-dark-color);
  }
  
  .fa {
    font-size: 1rem;
    color: var(--primary-dark-color);
  }
  .fa.current {
    color: var(--on-primary);
  }

  .card-subtle {
    color: var(--primary-dark-color);
  }
  .card-subtle.current {
    color: var(--on-primary);
  }

</style>
