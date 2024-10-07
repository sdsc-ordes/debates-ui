import type { Subtitle } from "./subtitle.interface";
import type { Speaker } from "./speaker.interface";
import type { Segment } from "./segment.interface";

export function onTimeUpdate(currentTime: number, subtitles: Subtitle[]): number {
    const currentSubtitle = subtitles.find(sub => currentTime >= sub.start && currentTime <= sub.end);
    if (currentSubtitle) {
        return currentSubtitle.index;
    }
    return -1;
}

export function getMatchingSegment(segmentNr: number, segments: Segment[]): Segment {
    const segment = segments.find(seg => seg.segment_nr === segmentNr);
    if (!segment) {
        throw new Error(`Segment with ID ${segmentNr} not found.`);
    }
    return segment;
}

export function getMatchingSpeakerIndex(speakerId: string, speakers: Speaker[]): number {
    const index = speakers.findIndex(speak => speak.speaker_id === speakerId);
    if (index === -1) {
        throw new Error(`Speaker with ID ${speakerId} not found.`);
    }
    return index;
}

export function getSpeakerDisplay(speakerId: string, speakers: Speaker[]): String {
    const speakerIndex = getMatchingSpeakerIndex(speakerId, speakers)
    const speaker = speakers[speakerIndex]
    if (speaker.name) {
        return speaker.name;
    } else {
        return speaker.speaker_id;
    }
}

export function getSegmentContentDisplay(segment: Segment, subtitles: Subtitle[]): string {
    if (!segment.show_full_content) {
        return subtitles[segment.first_index-1].content;
    }
    return concatenateSubtitles(subtitles, segment.first_index, segment.last_index)
}

function concatenateSubtitles(subtitles: Subtitle[], firstIndex: number, lastIndex: number): string {
    if (firstIndex < 0 || lastIndex >= subtitles.length || firstIndex > lastIndex) {
      throw new Error('Invalid indices provided');
    }
  
    return subtitles.slice(firstIndex, lastIndex)
      .map(subtitle => subtitle.content)
      .join(' ');
  }

export function jumpToTime(video: HTMLVideoElement, time: number) {
    video.currentTime = time;
    video.play(); // Optionally start playing after jump
}

export function formatTimeForDisplay(seconds: number): string {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    const hrsStr = String(hrs).padStart(1, "0");
    const minsStr = String(mins).padStart(2, "0");
    const secsStr = String(secs).padStart(2, "0");
    if (hrs) {
        return `${hrsStr}:${minsStr}:${secsStr}`;
    }
    return `${minsStr}:${secsStr}`;
}
