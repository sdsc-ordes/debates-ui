<script lang="ts">
    import { writable } from "svelte/store";
    import {
        getFirstNonEmptyStatement,
    } from "./statement-utils";

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
    <!-- Single line header without labels -->
    <div class="statement-header">
        {doc.date} - {doc.time_start} - {doc.time_end} - {doc.speaker_name} - {doc.segment_id}
    </div>

    {#if $expandedStatements[doc.id]}
        <!-- Full statement with highlighted version -->
        <p>
            {@html replaceWithHighlightedVersion(
                doc.statement,
                highlighting[doc.id].statement,
            )}
        </p>
    {:else}
        <!-- Short version of the statement -->
        <p>{@html getFirstNonEmptyStatement(highlighting[doc.id].statement)}</p>
    {/if}

    <!-- Toggle button to show full statement -->
    <button class="option-button" on:click={() => toggleFullStatement(doc.id)}>
        {#if $expandedStatements[doc.id]}
            Show Less
        {:else}
            Show More
        {/if}
    </button>

    <!-- Button to navigate to video player -->
    <button class="option-button" on:click={() => navigateToVideoPlayer(doc, query)}>
        Go to Video Player
    </button>
</div>
