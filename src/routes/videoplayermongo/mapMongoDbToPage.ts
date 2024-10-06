import { formatTime } from "./videoUtils";
import type { Subtitle, SubtitleDB } from './subtitle.interface';

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
