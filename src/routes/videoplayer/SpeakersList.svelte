<script lang="ts">
    import { jumpToTime } from "./videoUtils";

    export let speakers: {
        speaker: string;
        start: number;
        time_start: string;
    }[] = [];
    export let video: HTMLVideoElement;
</script>

<div class="speakers-list">
    <h2>Speakers</h2>
    {#each speakers as { speaker, start, time_start }}
        <button on:click={() => jumpToTime(video, start)}>
            {speaker}
            {time_start} ({start.toFixed(2)}s)
        </button>
    {/each}
</div>

<style>
    .speakers-list {
        margin-top: 20px;
        display: block;
    }

    .speakers-list button {
        display: block;
        margin-bottom: 10px;
        padding: 5px 10px;
        cursor: pointer;
        font-size: 16px;
    }
</style>
