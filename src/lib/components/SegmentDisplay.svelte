<script lang="ts">
    import type { Subtitle } from "$lib/interfaces/subtitle.interface";
    export let subtitles: Subtitle[] = [];
</script>

<p>
    {#each subtitles as subtitle, index}
        {subtitle.content}
    {/each}
</p>
