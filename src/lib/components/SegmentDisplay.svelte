<script lang="ts">
    import type { Subtitle, TimeUpdateParameters } from "$lib/interfaces/subtitle.interface";
    export let subtitles: Subtitle[] = [];
    export let timeUpdateParameters: TimeUpdateParameters;
</script>

<p>subtitle: {timeUpdateParameters.currentSubtitleIndex}</p>
<p>segment: {timeUpdateParameters.currentSegmentIndex}</p>

<p>
    {#each subtitles as subtitle, index}  
      {#if subtitle.segment_nr === timeUpdateParameters.currentSegmentIndex}
      <span class={index === timeUpdateParameters.currentSubtitleIndex ? 'highlighted' : ''}>
        {subtitle.segment_nr}{subtitle.content}
      </span>    
      {/if}  
    {/each}
</p>

<style>
    .highlighted {
        color:red;
    }
    .display {
        display:none;
    }    
</style>