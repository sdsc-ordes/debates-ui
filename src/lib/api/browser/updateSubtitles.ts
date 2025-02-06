import { PUBLIC_BACKEND_BROWSER } from "$env/static/public";
import type { Subtitle, SubtitleType } from "$lib/interfaces/metadata.interface";
const backendUrl = PUBLIC_BACKEND_BROWSER

export async function updateSubtitles(
    prefix: string,
    segmentNr: number,
    subtitles: Subtitle[],
    subtitleType: SubtitleType
) {
    try {
        // FastAPI endpoint to update speakers
        const apiUrl = `${backendUrl}/update-subtitles`;

        // Request payload for update speakers
        const payload = JSON.stringify({
            prefix: prefix,
            segmentNr: segmentNr,
            subtitles: subtitles,
            subtitleType: subtitleType,
        });

        // Update speakers on FastApi Backend
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: payload,
        });
        if (!response.ok) {
            throw new Error(`Error saving subtitles: ${response.statusText}`);
        };
    } catch (error) {
        console.error('Error in saving subtitles:', error);
        throw error;
    }
}