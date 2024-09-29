export function getMediaSources(videoId?: any): { videoSrc: string; trackSrc: string } {
    // Default values
    let videoSrc = '/input/video.mp4';
    let trackSrc = '/input/subtitles.srt';
  
    // Check if video_id exists, and customize return values if needed in the future
    if (videoId) {
      // Placeholder for future customization based on video_id
      // For now, it still returns the default values
    }
  
    return { videoSrc, trackSrc };
  }