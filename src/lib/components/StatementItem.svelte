<script lang="ts">
    import { getFirstNonEmptyStatement } from "../utils/statement-utils";
    import { goto } from '$app/navigation';
    import {
        formatTimeForDisplay,
        displayIsoDate,
    } from "$lib/utils/displayUtils";

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
        goto(`/${encodeURIComponent(doc.s3_prefix)}?start=${encodeURIComponent(doc.start)}`);
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
                statement = statement.replace(
                    highlightedRegex,
                    () => highlighted,
                );
            }
            return statement;
        });
    }
</script>

<div class="statement">
    <!-- <hr /> -->
    <div
        class="card"
        on:click={() => navigateToVideoPlayer(doc.id)}
        role="button"
        tabindex="0"
        on:keydown={(e) =>
            (e.key === "Enter" || e.key === " ") &&
            navigateToVideoPlayer(doc.id)}
    >
        <div class="card-body">
            <h5 class="card-title">{doc.debate_type} {doc.debate_session}</h5>
            <p class="card-text truncated">
                {#if highlighting}
                    {@html replaceWithHighlightedVersion(
                        doc.statement,
                        highlighting?.[doc.id]?.statement,
                    ).join(" ")}
                {:else}
                    {doc.statement.join(" ")}
                {/if}
            </p>
            <div class="datetime-container">
                <div class="date-time-item">
                    <i class="fa fa-calendar" aria-hidden="true"></i>
                    <small class="card-subtle"
                        >{displayIsoDate(doc.debate_schedule)}</small
                    >
                </div>
                <div class="date-time-item">
                    <i class="fa fa-clock" aria-hidden="true"></i>
                    <small class="card-subtle"
                        >{formatTimeForDisplay(doc.start)} - {formatTimeForDisplay(
                            doc.end,
                        )}</small
                    >
                </div>
            </div>
        </div>
    </div>
    <!-- <span>{displayIsoDate(doc.debate_schedule)}</span>
    <span>{doc.debate_type}</span>
    <span>{doc.debate_session}</span>
    <span>{formatTimeForDisplay(doc.start)} - {formatTimeForDisplay(doc.end)}</span><br> -->
    <!-- {#if doc.speaker_name} <span>{doc.speaker_name}:</span>{/if}
    {#if doc.speaker_role} <span>role: {doc.speaker_role}</span>{/if}
    {#if doc.speaker_country} <span>represents: {doc.speaker_country}</span>{/if} -->
    <!-- <button class="option-button" on:click={navigateToVideoPlayer}>
        Play Segment
    </button> -->
    <!-- <button class="option-button" on:click={() => toggleFullStatement(doc.id)}>
        {#if expandedStatements[doc.id]}
            Show Less
        {:else}
            Show More
        {/if}
    </button> -->
    <!-- {#if expandedStatements[doc.id]}
        <p>
            {#if highlighting}
                {@html replaceWithHighlightedVersion(
                    doc.statement,
                    highlighting?.[doc.id]?.statement,
                ).join(" ")}
            {:else}
                {doc.statement.join(" ")}
            {/if}
        </p>
    {:else}
        <p>
            {#if highlighting}
                {@html getFirstNonEmptyStatement(
                    highlighting?.[doc.id]?.statement,
                )}
            {:else}
                {getFirstNonEmptyStatement(doc.statement)}
            {/if}
        </p>
    {/if} -->
</div>

<style>
    .datetime-container {
        display: flex;
        gap: 1rem;
        align-items: center;
    }

    .card-text.truncated {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        font-family: var(--body-font);
        font-size: 12px;
        color: var(--text-color);
        line-height: 20px;
    }

    .card:hover {
        box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
    }

    .date-time-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .fa {
        font-size: 1rem;
        color: grey;
    }

    .card-subtle {
	font-family: var(--body-font);
	font-size: 12px;
	color: grey;
	line-height: 16px;
}
</style>
