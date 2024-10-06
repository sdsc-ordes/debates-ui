import { formatTime } from "./videoUtils";
import type { Subtitle, SubtitleDB } from './subtitle.interface';
import type { Speaker, SpeakerDB } from './speaker.interface';

export function mapSubtitles(subtitles: SubtitleDB[]): Subtitle[] {
    return subtitles.map((subtitle: SubtitleDB): Subtitle => ({
        index: subtitle.index,
        start: subtitle.start,
        end: subtitle.end,
        content: subtitle.content,
        time_start: formatTime(subtitle.start),
        time_end: formatTime(subtitle.end),
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
        time_start: formatTime(segment.start),
        time_end: formatTime(segment.end),
        segment_nr: segment.segment_nr,
    }));
}
