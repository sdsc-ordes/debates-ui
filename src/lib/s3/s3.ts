import {
  PUBLIC_VIDEO_INPUT, PUBLIC_SUBTITLES_INPUT
} from "$env/static/public";
const videoInput = PUBLIC_VIDEO_INPUT;
const subtitlesInput = PUBLIC_SUBTITLES_INPUT;
import type { MediaSources } from "$lib/interfaces/videoplayer.interface";

export function getMediaSources(videoId?: any): MediaSources {
  let mediaSources: MediaSources = {
    videoSrc: `/input/${videoInput}`,
    trackSrc: `/input/${subtitlesInput}`,
  };
  // Check if video_id exists, and customize return values if needed in the future
  if (videoId) {
    // Placeholder for future customization based on video_id
    // For now, it still returns the default values
  }

  return mediaSources;
}