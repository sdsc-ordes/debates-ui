<script lang="ts">
  import type { TimeUpdateParameters } from "$lib/interfaces/mediaplayer.interface";
  import type { Speaker } from "$lib/interfaces/backend.interface";
  import { updateSpeakers } from "$lib/api/updateSpeakers";
  import { canEdit } from "$lib/stores/auth";

  export let speakers: Speaker[] = [];
  export let timeUpdateParameters: TimeUpdateParameters;
  export let s3Prefix: string;
  console.log(s3Prefix);
  let editSpeakers = false;

  function toggleEditSpeakers() {
    editSpeakers = !editSpeakers;
  }
  function saveSpeakers(): void {
    updateSpeakers(s3Prefix, speakers)
    editSpeakers = !editSpeakers;
  }
</script>

<div class="card">
  <div class="card-body">
    {#each speakers as speaker}
      {#if speaker.speaker_id === timeUpdateParameters.displaySpeakerId && speaker }
        <div class="card-title-small">{speaker.speaker_id}</div>

        <!-- EDIT -->
        {#if $canEdit }
          <p class="card-subtle">Make edits to the speaker information here.</p>
          {#if editSpeakers}
            <form class="speaker-form">
              <label for="speaker-id" class="input-label">Name</label>
              <input
                id="speaker-name"
                placeholder={speaker.name ? speaker.name : "enter name"}
                type="text"
                bind:value={speaker.name}
                class="editable-input"
              />
              <label for="speaker-tags" class="input-label">Role</label>
              <input
                id="speaker-tags"
                placeholder={speaker.role_tag ? speaker.role_tag : "enter role"}
                type="text"
                bind:value={speaker.role_tag}
                class="editable-input"
              />
            </form>
          {/if}
        <!-- DISPLAY -->
        {:else}
          <div class="speaker-display">
            <label class="input-label">Name</label>
            <div class="display-text">
              {speaker.name || "Name not provided"}
            </div>

            <label class="input-label">Role</label>
            <div class="display-text">
              {speaker.role_tag || "Role not provided"}
            </div>
          </div>
        {/if}
        <!-- BUTTONS -->
        {#if $canEdit && !editSpeakers}
          <div
            style="display: flex;
              align-items: center;
              justify-content: start;
              width: 100%;"
          >
            <button
              class="secondary-button"
              on:click={toggleEditSpeakers}
              aria-label="Edit"
              >Edit
            </button>
          </div>
        {:else if editSpeakers}
          <div
            style="display: flex;
              align-items: center;
              justify-content: space-between;
              width: 100%;"
          >
            <button
              class="secondary-button"
              on:click={toggleEditSpeakers}
              aria-label="Cancel"
              >Cancel
            </button>
            <button
              class="secondary-button"
              on:click={() => saveSpeakers()}
              aria-label="Save"
            >
              Save
            </button>
          </div>
        {/if}
      {/if}
    {/each}
  </div>
</div>

<style>
  .card {
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    margin-bottom: 1rem;
    margin-top: 1rem;
  }
  .card-body {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .speaker-form,
  .speaker-display {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .input-label {
    font-size: 14px;
    font-weight: 500;
    color: #555;
  }

  .editable-input {
    height: 40px;
    padding: 0 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 14px;
    color: var(--text-color);
    transition:
      border-color 0.3s ease,
      box-shadow 0.3s ease;
  }

  .editable-input:focus {
    border-color: var(--primary-color);
    outline: none;
  }

  .editable-input::placeholder {
    color: gray;
    font-style: italic;
  }
  .display-text {
    height: 40px;
    padding: 0 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 14px;
    color: grey;
    display: flex;
    align-items: center;
  }
</style>
