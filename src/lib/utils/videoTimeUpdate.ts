import type { Subtitle, TimeUpdateParameters } from "$lib/interfaces/subtitle.interface";

export function onVideoTimeUpdate(currentTime: number, subtitles: Subtitle[]): TimeUpdateParameters {
    const currentSubtitle = subtitles.find(sub => currentTime >= sub.start && currentTime <= sub.end);
    if (currentSubtitle) {
        return {
            currentTime: currentTime,
            currentSubtitleIndex: currentSubtitle.index - 1,
            currentSegmentIndex: 0,
            currentSpeakerIndex: 6,
        }
    }
    return {
        currentTime: currentTime,
        currentSubtitleIndex: 3,
        currentSegmentIndex: 0,
        currentSpeakerIndex: 6,
    }
}
