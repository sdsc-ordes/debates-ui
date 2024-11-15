import type { MediaSources } from "$lib/interfaces/videoplayer.interface";
import { PUBLIC_BACKEND_SERVER } from "$env/static/public";
const backendUrl = PUBLIC_BACKEND_SERVER

export async function fetchMedia(s3Prefix: string): MediaSources {
    try {
        // FastAPI endpoint to retrieve signed URLs
        const apiUrl = `${backendUrl}/get-media-urls`;  // Adjust to match your FastAPI server's address

        // Request payload for signed URLs
        const payload = JSON.stringify({ prefix: s3Prefix, expiration: 3600 });
        console.log("payload", payload)
        console.log(apiUrl);
        // Fetch signed URL from FastAPI backend
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: payload,
        });

        if (!response.ok) {
            throw new Error(`Error fetching signed URL: ${response.statusText}`);
        }
        console.log("in fetchMedia: response", response);
        // Extract JSON from the response
        const data = await response.json();
        const mediaSources = {
            videoSrc: data.video_url,
            trackSrc: data.subtitle_url,
          }
        console.log("in fetchMedia:mediaSources", mediaSources);
        return mediaSources;
    } catch (error) {
        console.error('Error in fetchMedia:', error);
        throw error;
    }
}
