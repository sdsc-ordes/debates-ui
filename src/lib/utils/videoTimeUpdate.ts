import type { Subtitle, TimeUpdateParameters } from "$lib/interfaces/subtitle.interface";

export function onVideoTimeUpdate(
    currentTime: number,
    subtitles: Subtitle[],
    activeSubtitleIndex: number,
): TimeUpdateParameters {
    const currentSubtitle = subtitles.find(sub => currentTime >= sub.start && currentTime <= sub.end);
    if (currentSubtitle) {
        const currentSubtitleIndex = currentSubtitle.index
        const currentSegmentNr = currentSubtitle.segment_nr
        return {
            currentSubtitleIndex: currentSubtitleIndex,
            currentSegmentIndex: currentSegmentNr,
            currentSpeakerIndex: 6,
        }
    } else if (activeSubtitleIndex >= 0) {
        const previousSubtitle = subtitles[activeSubtitleIndex];
        return {
            currentSubtitleIndex: previousSubtitle.index - 1,
            currentSegmentIndex: previousSubtitle.segment_nr,
            currentSpeakerIndex: 6,
        }
    } else {
        return {
            currentSubtitleIndex: -1,
            currentSegmentIndex: -1,
            currentSpeakerIndex: 6,
        }
    }
}
