import { formatTimeForDisplay } from "$lib/utils/displayUtils";
import type { Subtitle, Speaker, Segment } from '$lib/interfaces/videoplayer.interface';
import type { SubtitleDB, SpeakerDB, SegmentDB } from '$lib/interfaces/mongodb.interface';

export function mapSubtitles(subtitles: SubtitleDB[]): Subtitle[] {
    return subtitles.map((subtitle: SubtitleDB): Subtitle => ({
        index: subtitle.index,
        start: subtitle.start,
        end: subtitle.end,
        content: subtitle.content,
        time_start: formatTimeForDisplay(subtitle.start),
        time_end: formatTimeForDisplay(subtitle.end),
        segment_nr: subtitle.segment_nr,
    }));
}

export function mapSpeakers(speakers: SpeakerDB[]): Speaker[] {
    return speakers.map((speaker: SpeakerDB): Speaker => ({
        speaker_id: speaker.speaker_id,
        name: speaker.name,
        country: speaker.country,
    }));
}

export function mapSegments(segments: SegmentDB[]): Segment[] {
    return segments.map((segment: SegmentDB): Segment => ({
        speaker_id: segment.speaker_id,
        start: segment.start,
        end: segment.end,
        first_index: segment.first_index,
        last_index: segment.last_index,
        time_start: formatTimeForDisplay(segment.start),
        time_end: formatTimeForDisplay(segment.end),
        segment_nr: segment.segment_nr,
        show_full_content: false,
    }));
}
