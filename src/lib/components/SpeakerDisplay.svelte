<script lang="ts">
    import type { TimeUpdateParameters } from "$lib/interfaces/videoplayer.interface";
    import type { Speaker } from "$lib/interfaces/speaker.interface";
    export let speakers: Speaker[] = [];
    export let timeUpdateParameters: TimeUpdateParameters;
</script>

<p>
    {#each speakers as speaker, index}  
        {#if index === timeUpdateParameters.currentSpeakerIndex}
        { speaker.speaker_id } { speaker.name } { speaker.country } 
        {/if}
    {/each}
</p>
