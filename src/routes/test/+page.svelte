<script lang="ts">
    import type { MediaSources } from "$lib/interfaces/videoplayer.interface";
    import type { PageData } from "./$types";
    export let data: PageData;
    const mediaSources: MediaSources = data.mediaSources;
    console.log("Client mediaSources:", mediaSources);
    console.log("page data at page", data);
</script>

{#if mediaSources && mediaSources.videoSrc && mediaSources.trackSrc}
    <video controls width="640">
        <source src={mediaSources.videoSrc} type="video/mp4" />
        <track
            src={mediaSources.trackSrc}
            kind="captions"
            srclang="en"
            label="English"
            default
        />
        Your browser does not support the video tag.
    </video>
{:else}
    <p>Loading media...</p>
{/if}
