<script lang="ts">
    import type { TimeUpdateParameters } from "$lib/interfaces/videoplayer.interface";
    import type { Speaker } from "$lib/interfaces/backend.interface";
    import { canEdit } from '$lib/stores/auth';
    export let speakers: Speaker[] = [];
    export let timeUpdateParameters: TimeUpdateParameters;
    let editSubtitles = false;

    function toggleEditSubtitles() {
      editSubtitles = !editSubtitles;
    }
    function saveSpeakers(): void {
      editSubtitles = !editSubtitles;
    }
</script>

<p>
  {#each speakers as speaker, index}
    {#if index === timeUpdateParameters.currentSpeakerIndex}
      {#if $canEdit}
        <button class="small-edit-button" on:click={toggleEditSubtitles} aria-label="Edit">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zm2.06-1.19l9.19-9.19 1.75 1.75-9.19 9.19H5.06v-1.75zM22 7.24c0-.39-.15-.78-.44-1.06L18.82 3.44a1.495 1.495 0 0 0-2.12 0L15 5.13l3.75 3.75 1.69-1.69c.28-.28.44-.67.44-1.06z"/>
          </svg>
        </button>
      {/if}
      {#if editSubtitles}
        <div class="speaker">
          {speaker.speaker_id}<br>
          <label for="speaker-id"> Name:</label>
          <input
            id="speaker-name"
            placeholder="name"
            type="text"
            bind:value={speaker.name}
            class="editable-input"
          />
          <br>
          <label for="speaker-tags">Role Tag:</label>
          <input
            id="speaker-tags"
            placeholder="tags"
            type="text"
            bind:value={speaker.role_tag}
            class="editable-input"
          />
        </div>
        <button class="save-button"
          on:click={() => saveSpeakers()}
          aria-label="Save">
          Save speakers
        </button>
      {:else}
        {speaker.speaker_id} {speaker.name} {speaker.role_tag}
      {/if}
    {/if}
  {/each}
</p>

<style>
  .small-edit-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    border: none;
    border-radius: 50%; /* Makes it circular */
    background-color: #f0f0f0; /* Light background */
    color: #333; /* Dark text/icon color */
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Subtle shadow */
    transition: background-color 0.2s, transform 0.2s; /* Smooth interaction effects */
  }

  .small-edit-button:hover {
    background-color: #e0e0e0; /* Slightly darker on hover */
    transform: scale(1.1); /* Slightly larger on hover */
  }

  .small-edit-button:active {
    background-color: #d0d0d0; /* Darker when active */
    transform: scale(0.95); /* Slightly smaller when active */
  }

  .save-button {
    padding: 5px 5px; /* Adjust padding for a rectangular shape */
    background-color: #d0d0d0; /* Primary blue color */
    color: black;
    border: none;
    border-radius: 4px; /* Small rounding for edges */
    font-size: 12px;
    cursor: pointer;
  }

  .save-button:hover {
    background-color: #d0d0d0; /* Darker blue on hover */
  }

  .save-button:active {
    background-color: #d0d0d0; /* Even darker on click */
  }

  .save-button:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.5); /* Focus indicator */
  }
</style>
