import {
  PUBLIC_VIDEO_INPUT, PUBLIC_SUBTITLES_INPUT
} from "$env/static/public";
import { MediaSources } from  "$lib/interfaces/videoplayer.interface";

export function getMediaSources(s3Prefix: string): MediaSources {
  let videoSrc: string = ''
  let trackSrc: string = ''
  if (s3Prefix === 'HRC_20220328') {
    videoSrc = "HRC_20220328/HRC_20220328.mp4";
    trackSrc = "HRC_20220328/HRC_20220328.srt";
  }
  if (s3Prefix === 'HRC_20220929') {
    videoSrc = "HRC_20220929/HRC_20220929.mp4";
    trackSrc = "HRC_20220929/HRC_20220929.srt";
  }
  return { videoSrc, trackSrc };
}
