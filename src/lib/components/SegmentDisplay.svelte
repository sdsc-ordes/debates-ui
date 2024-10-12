<script lang="ts">
    import type { Subtitle, TimeUpdateParameters } from "$lib/interfaces/videoplayer.interface";
    export let subtitles: Subtitle[] = [];
    export let timeUpdateParameters: TimeUpdateParameters;
    let editSubtitles: boolean = false;
    function updateSubtitle(index: number, updatedText: string) {
      subtitles[index].content =  updatedText;
    }
    function toggleEditSubtitles() {
      editSubtitles = !editSubtitles;
    }        
</script>
<button on:click={toggleEditSubtitles}>
  {editSubtitles ? 'Disable Subtitle Editing' : 'Enable Subtitle Editing'}
</button>

<p>
    {#each subtitles as subtitle, index}  
      {#if subtitle.segment_nr === timeUpdateParameters.currentSegmentIndex}
      <span class={index === timeUpdateParameters.currentSubtitleIndex - 1 ? 'highlighted' : ''}>
        {#if editSubtitles}
        <div>
          <textarea
            id={`subtitle-${index}`}
            bind:value={subtitle.content}
            on:input={(e) =>
              updateSubtitle(index, e.target.value)}
            class="editable-textarea"
          />
        </div>
        {:else}
          {subtitle.content}
        {/if}
      </span>    
      {/if}  
    {/each}
</p>

<style>
    .highlighted {
        color:red;
    }  
    .editable-textarea {
      width: 1000px;
      height: 50px;
    }
</style>