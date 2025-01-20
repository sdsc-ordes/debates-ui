import type {
    TimeUpdateParameters,
} from "$lib/interfaces/videoplayer.interface";
import type {
    Subtitle, Segment, Speaker
} from "$lib/interfaces/mongodb.interface";

export function onVideoTimeUpdate(
    currentTime: number,
    subtitles: Subtitle[],
    subtitles_en: Subtitle[],
    speakers: Speaker[],
    activeSubtitleIndex: number,
    activeSubtitleIndexEn: number,
): TimeUpdateParameters {
    const currentSubtitle = subtitles.find(sub => currentTime >= sub.start && currentTime <= sub.end);
    const currentSubtitleEn = subtitles_en.find(sub => currentTime >= sub.start && currentTime <= sub.end);
    if (currentSubtitle && currentSubtitleEn) {
        const currentSubtitleIndex = currentSubtitle.index
        const currentSubtitleIndexEn = currentSubtitleEn.index
        const currentSpeakerIndex = speakers.findIndex(speak => speak.speaker_id === currentSubtitle.speaker_id);
        const currentSegmentNr = currentSubtitle.segment_nr
        return {
            currentSubtitleIndex: currentSubtitleIndex,
            currentSubtitleIndexEn: currentSubtitleIndexEn,
            currentSegmentIndex: currentSegmentNr,
            currentSpeakerIndex: currentSpeakerIndex,
        }
    } else if (currentSubtitleEn){
        const currentSubtitleIndexEn = currentSubtitleEn.index
        const currentSpeakerIndex = speakers.findIndex(speak => speak.speaker_id === currentSubtitleEn.speaker_id);
        const currentSegmentNr = currentSubtitleEn.segment_nr
        const previousSubtitle = subtitles[activeSubtitleIndex];
        return {
            currentSubtitleIndex: previousSubtitle.index - 1,
            currentSubtitleIndexEn: currentSubtitleIndexEn,
            currentSegmentIndex: currentSegmentNr,
            currentSpeakerIndex: currentSpeakerIndex,
        }
    } else if (currentSubtitle){
        const currentSubtitleIndex = currentSubtitle.index
        const currentSpeakerIndex = speakers.findIndex(speak => speak.speaker_id === currentSubtitle.speaker_id);
        const currentSegmentNr = currentSubtitle.segment_nr
        const previousSubtitleEn = subtitles[activeSubtitleIndexEn];
        return {
            currentSubtitleIndex: currentSubtitleIndex,
            currentSubtitleIndexEn: previousSubtitleEn.index - 1,
            currentSegmentIndex: currentSegmentNr,
            currentSpeakerIndex: currentSpeakerIndex,
        }
    } else if (activeSubtitleIndex >= 0) {
        const currentSpeakerIndex = -1
        const previousSubtitle = subtitles[activeSubtitleIndex];
        const previousSubtitleEn = subtitles_en[activeSubtitleIndexEn];
        return {
            currentSubtitleIndexEn: previousSubtitleEn.index - 1,
            currentSubtitleIndex: previousSubtitle.index - 1,
            currentSegmentIndex: previousSubtitle.segment_nr,
            currentSpeakerIndex: currentSpeakerIndex,
        }
    } else {
        return {
            currentSubtitleIndex: -1,
            currentSubtitleIndexEn: -1,
            currentSegmentIndex: -1,
            currentSpeakerIndex: -1,
        }
    }
}
