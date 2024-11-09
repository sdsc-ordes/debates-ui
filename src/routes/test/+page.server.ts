// +page.server.ts
import { fetchMedia } from "$lib/utils/fetchMedia";
import type { MediaSources } from "$lib/interfaces/videoplayer.interface";

export async function load({ params }) {
    const s3Prefix = "HRC_20220328";
    const mediaSources: MediaSources = await fetchMedia(s3Prefix);
    console.log("Fetched mediaSources:", mediaSources);

    // Make sure it's directly returned in an object
    return {
        mediaSources
    };
}

