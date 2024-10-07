<script lang="ts">
    import { writable } from "svelte/store";
    import {
        getFirstNonEmptyStatement,
    } from "./statement-utils";
    import { formatTimeForDisplay, displayIsoDate } from "$lib/displayUtils";

    export let doc;
    export let query;
    export let highlighting;

    let expandedStatements = writable({});

    const toggleFullStatement = (docId: any) => {
        expandedStatements.update((state) => {
            return {
                ...state,
                [docId]: !state[docId],
            };
        });
    };

    const navigateToVideoPlayer = () => {
        window.location.href = `/videoplayer?start=${encodeURIComponent(doc.start)}&q=${encodeURIComponent(query)}`;
    };

    function replaceWithHighlightedVersion(
        statements: string[],
        highlighting: string[],
    ) {
        const updatedStatements = [...statements];

        highlighting.forEach((highlighted) => {
            if (highlighted === "") return;

            // Remove <em> tags to get the unhighlighted part
            const regex = /<\/?em>/g;
            const unhighlighted = highlighted.replace(regex, "");

            // Find and replace only the matching parts of each statement
            updatedStatements.forEach((statement, index) => {
                if (statement.includes(unhighlighted.trim())) {
                    const highlightedRegex = new RegExp(
                        unhighlighted.trim(),
                        "g",
                    );
                    updatedStatements[index] = statement.replace(
                        highlightedRegex,
                        (match) => highlighted,
                    );
                }
            });
        });

        return updatedStatements;
    }
</script>

<div class="statement">
    <span>{displayIsoDate(doc.date)}</span>
    <span>{doc.segment_id}.</span>
    <span>{formatTimeForDisplay(doc.start)} - {formatTimeForDisplay(doc.end)}</span><br>
    <span>{doc.speaker_name}:</span>
    <button class="option-button" on:click={() => navigateToVideoPlayer(doc, query)}>
        Play Segment
    </button> 
    <button class="option-button" on:click={() => toggleFullStatement(doc.id)}>
        {#if $expandedStatements[doc.id]}
            Show Less
        {:else}
            Show More
        {/if}
    </button>     

    {#if $expandedStatements[doc.id]}
        <p>
            {@html replaceWithHighlightedVersion(
                doc.statement,
                highlighting[doc.id].statement,
            )}
        </p>
    {:else}
        <p>{@html getFirstNonEmptyStatement(highlighting[doc.id].statement)}</p>
    {/if}
</div>
