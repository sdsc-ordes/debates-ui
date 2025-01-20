<script lang="ts">
    import type { SignedUrl } from "$lib/interfaces/backend.interface";

    export let downloadUrls: SignedUrl[] = [];

    let selectedFileUrl = downloadUrls[0]?.url;

    $: signedUrl = selectedFileUrl || null;

    function handleDownload() {
        if (signedUrl) {
            const link = document.createElement("a");
            link.href = signedUrl;
            link.setAttribute("download", getFilenameFromUrl(signedUrl));
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }

    function getFilenameFromUrl(url: string): string {
        // Extract the filename from the URL
        const parts = url.split("/");
        return parts[parts.length - 1] || "download";
    }
</script>

<!-- UI Layout -->
<div>
    <span>Select and Download a File</span>

    <form on:submit|preventDefault>
        <!-- Dropdown for file selection -->
        <select bind:value={selectedFileUrl}>
            <option value="" disabled>Select a file</option>
            {#each downloadUrls as file}
                <option value={file.url}>{file.label}</option>
            {/each}
        </select>
    </form>

    <!-- Download button -->
    <button type="button" on:click={handleDownload} disabled={!signedUrl}>
        Download
    </button>

</div>


