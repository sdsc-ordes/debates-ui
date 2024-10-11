<script lang="ts">
    import type { TimeUpdateParameters } from "$lib/interfaces/subtitle.interface";
    import type { Speaker } from "$lib/interfaces/speaker.interface";
    export let speakers: Speaker[] = [];
    export let timeUpdateParameters: TimeUpdateParameters;
</script>

<p>
    {#each speakers as speaker, index}  
        { speaker.speaker_id } { speaker.name } { speaker.country } 
    {/each}
</p>
