export interface SubtitleDB {
    index: number
    start: number,
    end: number,
    content: string,
    segment_nr: number,
}

export interface SpeakerDB {
    speaker_id: string,
    name: string,
    country: string,
}

export interface SegmentDB {
    speaker_id: string,
    start: number,
    end: number,
    first_index: number,
    last_index: number,
    segment_nr: number,
}
