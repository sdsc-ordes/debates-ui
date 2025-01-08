<script lang="ts">
    import { getFirstNonEmptyStatement } from "../utils/statement-utils";
    import { formatTimeForDisplay, displayIsoDate } from "$lib/utils/displayUtils";

    export let doc;
    export let query;
    export let highlighting;

    // Replacing writable store with a simple object
    let expandedStatements: Record<string, boolean> = {};

    const toggleFullStatement = (docId: string) => {
        // Directly modify the expandedStatements object
        expandedStatements[docId] = !expandedStatements[docId];
    };

    const navigateToVideoPlayer = () => {
        window.location.href = `/${encodeURIComponent(doc.s3_prefix)}?start=${encodeURIComponent(doc.start)}`;
    };

    function replaceWithHighlightedVersion(
        statements: string[],
        highlighting?: string[],
    ) {
        if (!highlighting || highlighting.length === 0) return statements;

        return statements.map((statement) => {
            for (const highlighted of highlighting) {
                if (highlighted === "") continue;

                const unhighlighted = highlighted.replace(/<\/?em>/g, "");
                const highlightedRegex = new RegExp(unhighlighted.trim(), "g");
                statement = statement.replace(highlightedRegex, () => highlighted);
            }
            return statement;
        });
    }
</script>

<div class="statement">
    <hr/>
    <div class="card">
        <div class="card-body">
          <h5 class="card-title">{doc.debate_type} {doc.debate_session}</h5>
          <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
          <div class="datetime-container">
            <div class="date-time-item">
              <i class="fa fa-calendar" aria-hidden="true"></i>
              <small class="text-muted">{displayIsoDate(doc.debate_schedule)}</small>
            </div>
            <div class="date-time-item">
              <i class="fa fa-clock" aria-hidden="true"></i>
              <small class="text-muted">{formatTimeForDisplay(doc.start)} - {formatTimeForDisplay(doc.end)}</small>
            </div>
          </div>
        </div>
      </div>
    <!-- <span>{displayIsoDate(doc.debate_schedule)}</span>
    <span>{doc.debate_type}</span>
    <span>{doc.debate_session}</span>
    <span>{formatTimeForDisplay(doc.start)} - {formatTimeForDisplay(doc.end)}</span><br> -->
    {#if doc.speaker_name} <span>{doc.speaker_name}:</span>{/if}
    {#if doc.speaker_role} <span>role: {doc.speaker_role}</span>{/if}
    {#if doc.speaker_country} <span>represents: {doc.speaker_country}</span>{/if}
    <button class="option-button" on:click={navigateToVideoPlayer}>
        Play Segment
    </button>
    <button class="option-button" on:click={() => toggleFullStatement(doc.id)}>
        {#if expandedStatements[doc.id]}
            Show Less
        {:else}
            Show More
        {/if}
    </button>
    {#if expandedStatements[doc.id]}
        <p>
        {#if highlighting}
            {@html replaceWithHighlightedVersion(
                doc.statement,
                highlighting?.[doc.id]?.statement
            ).join(" ")}
        {:else}
            { doc.statement.join(" ") }
        {/if}
        </p>
    {:else}
        <p>
        {#if highlighting}
            {@html getFirstNonEmptyStatement(highlighting?.[doc.id]?.statement)}
        {:else}
            { getFirstNonEmptyStatement(doc.statement) }
        {/if}
        </p>
    {/if}
</div>

<style>
    .datetime-container {
      display: flex;
      gap: 1rem; /* Space between date and time sections */
      align-items: center; /* Align items vertically in the center */
    }
  
    .date-time-item {
      display: flex;
      align-items: center;
      gap: 0.5rem; /* Space between icon and text */
    }
  
    .fa {
      font-size: 1rem;
      color: grey;
    }
  
    .text-muted {
      font-size: 0.875rem; /* Adjust font size for muted text */
    }
  </style>