<script lang="ts">
    import type { TimeUpdateParameters } from "$lib/interfaces/videoplayer.interface";
    import type { Speaker } from "$lib/interfaces/mongodb.interface";
    import { canEdit } from '$lib/stores/auth';
    export let speakers: Speaker[] = [];
    export let timeUpdateParameters: TimeUpdateParameters;
</script>

<p>
  {#each speakers as speaker, index}
    {#if index === timeUpdateParameters.currentSpeakerIndex}
      {#if $canEdit}
        <div class="speaker">
          <label for="speaker-id">({speaker.speaker_id}) Name:</label>
          <input
            id="speaker-name"
            placeholder="name"
            type="text"
            bind:value={speaker.name}
            class="editable-input"
          />
          <label for="speaker-country">Country the speaker represents in the debate:</label>
          <input
            id="speaker-country"
            placeholder="country"
            type="text"
            bind:value={speaker.country}
            class="editable-input"
          />
          <label for="speaker-role">Role of the Speaker in the debate:</label>
          <input
            id="speaker-role"
            placeholder="role"
            type="text"
            bind:value={speaker.role}
            class="editable-input"
          />
        </div>
      {:else}
        <h3>{speaker.speaker_id}: {speaker.name}</h3>
        <p>
          Country the speaker represents in the debate: <strong>{speaker.country}</strong>
        </p>
        <p>
          Role of the Speaker in the debate: <strong>{speaker.role}</strong>
        </p>
      {/if}
    {/if}
  {/each}
</p>
