import {
    PUBLIC_VIDEO_INPUT, PUBLIC_SUBTITLES_INPUT
} from "$env/static/public";
const videoInput = PUBLIC_VIDEO_INPUT;
const subtitlesInput = PUBLIC_SUBTITLES_INPUT;

export function getMediaSources(videoId?: any): { videoSrc: string; trackSrc: string } {
    let videoSrc = `/input/${videoInput}`;
    let trackSrc = `/input/${subtitlesInput}`;

    // Check if video_id exists, and customize return values if needed in the future
    if (videoId) {
        // Placeholder for future customization based on video_id
        // For now, it still returns the default values
    }

    return { videoSrc, trackSrc };
}