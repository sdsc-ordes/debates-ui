<script lang="ts">
    import type { TimeUpdateParameters } from "$lib/interfaces/videoplayer.interface";
    import type { Speaker } from "$lib/interfaces/speaker.interface";
    export let speakers: Speaker[] = [];
    export let timeUpdateParameters: TimeUpdateParameters;
</script>

<p>
    {#each speakers as speaker, index}  
        {#if index === timeUpdateParameters.currentSpeakerIndex}
        <div class="speaker">
            <label for="speaker-id">({speaker.speaker_id}) Name:</label>
            <input
              id="speaker-name"
              placeholder="name"
              type="text"
              bind:value={speaker.name}
              class="editable-input"
            />
            <label for="speaker-country">Country (the speaker represents):</label>
            <input
              id="speaker-country"
              placeholder="country"
              type="text"
              bind:value={speaker.country}
              class="editable-input"
            />
          </div>        
        {/if}
    {/each}
</p>
