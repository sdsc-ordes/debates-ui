<script lang="ts">
    import type { Segment, TimeUpdateParameters } from "$lib/interfaces/videoplayer.interface";
    import { jumpToTime } from "$lib/utils/videoStartUtils";
    export let segments: Segment[] = [];
    export let timeUpdateParameters: TimeUpdateParameters;
    export let video: HTMLVideoElement;    
</script>

<ul>
    {#each segments as segment, index}  
      <li>
        { index + 1 }. { segment.speaker_id } 
        <button
          class="option-button"
          on:click={() => jumpToTime(video, segment.start)}
        >
          Play Segment
        </button>          
      </li>  
    {/each}
</ul>

<style>
    .highlighted {
        color:red;
    }  
</style>