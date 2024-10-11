<script lang="ts">
    import type { Subtitle, TimeUpdateParameters } from "$lib/interfaces/subtitle.interface";
    export let subtitles: Subtitle[] = [];
    export let timeUpdateParameters: TimeUpdateParameters;
</script>

<p>
    {#each subtitles as subtitle, index}  
      <span class={index === timeUpdateParameters.currentSubtitleIndex ? 'highlighted' : ''}>
        {subtitle.content}
      </span>      
    {/each}
</p>

<style>
    .highlighted {
        color:red;
    }
</style>