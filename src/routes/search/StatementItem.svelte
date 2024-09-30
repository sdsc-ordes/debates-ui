<script lang="ts">
    import { writable } from 'svelte/store';
    import { getFirstNonEmptyStatement, getFullStatement } from './statement-utils';
  
    export let doc;
    export let highlighting;
  
    let showFullStatement = writable(false);
  
    const toggleFullStatement = () => {
      showFullStatement.update(value => !value);
    };
  </script>
  
  <div class="statement">
    <!-- Single line header without labels -->
    <div class="statement-header">
      {doc.date} - {doc.time_start} - {doc.time_end} - {doc.speaker_name} - {doc.segment_id}
    </div>
  
    <!-- Statement as clickable link -->
    {#if highlighting && highlighting[doc.id]}
      <a href={`/videoplayer?start=${encodeURIComponent(doc.start)}`} class="statement">
        {@html getFirstNonEmptyStatement(highlighting[doc.id].statement)}
      </a>
      <!-- Toggle button -->
      <button on:click={toggleFullStatement}>
        {#if $showFullStatement}
          Show Less
        {:else}
          Show More
        {/if}
      </button>
  
      <!-- Full Statement -->
      {#if $showFullStatement}
        <p>{@html getFullStatement(doc.statement, highlighting[doc.id].statement)}</p>
      {/if}
    {:else if doc.statement}
      <a href={`/videoplayer?start=${encodeURIComponent(doc.start)}`} class="statement">
        {doc.statement[0]}
      </a>
    {/if}
  </div>
  