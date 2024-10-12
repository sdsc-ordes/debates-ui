import type { 
    Subtitle, Segment, TimeUpdateParameters, 
    Speaker
} from "$lib/interfaces/videoplayer.interface";

export function onVideoTimeUpdate(
    currentTime: number,
    subtitles: Subtitle[],
    segments: Segment[],
    speakers: Speaker[],
    activeSubtitleIndex: number,
): TimeUpdateParameters {
    const currentSubtitle = subtitles.find(sub => currentTime >= sub.start && currentTime <= sub.end);
    if (currentSubtitle) {
        const currentSubtitleIndex = currentSubtitle.index
        const currentSegmentNr = currentSubtitle.segment_nr
        const currentSegment = getMatchingSegment(currentSegmentNr, segments);
        const currentSpeakerIndex = getMatchingSpeakerIndex(
            currentSegment.speaker_id, speakers);        
        return {
            currentSubtitleIndex: currentSubtitleIndex,
            currentSegmentIndex: currentSegmentNr,
            currentSpeakerIndex: currentSpeakerIndex,
        }
    } else if (activeSubtitleIndex >= 0) {
        const previousSubtitle = subtitles[activeSubtitleIndex];
        const currentSegment = getMatchingSegment(
            previousSubtitle.segment_nr, segments);
        const currentSpeakerIndex = getMatchingSpeakerIndex(
            currentSegment.speaker_id, speakers);
        return {
            currentSubtitleIndex: previousSubtitle.index - 1,
            currentSegmentIndex: previousSubtitle.segment_nr,
            currentSpeakerIndex: currentSpeakerIndex,
        }
    } else {
        return {
            currentSubtitleIndex: -1,
            currentSegmentIndex: -1,
            currentSpeakerIndex: -1,
        }
    }
}

function getMatchingSegment(segmentNr: number, segments: Segment[]): Segment {
    const segment = segments.find(seg => seg.segment_nr === segmentNr);
    if (!segment) {
        throw new Error(`Segment with ID ${segmentNr} not found.`);
    }
    return segment;
}

function getMatchingSpeakerIndex(speakerId: string, speakers: Speaker[]): number {
    const index = speakers.findIndex(speak => speak.speaker_id === speakerId);
    if (index === -1) {
        throw new Error(`Speaker with ID ${speakerId} not found.`);
    }
    return index;
}
