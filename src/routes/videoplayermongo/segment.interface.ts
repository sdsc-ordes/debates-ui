export interface Segment {
    speaker_id: string,
    start: number,
    end: number,
    time_start: string,
    time_end: string,    
    first_index: number,
    last_index: number,
    segment_nr: number,
    show_full_content: boolean;
}

export interface SegmentDB {
    speaker_id: string,
    start: number,
    end: number,
    first_index: number,
    last_index: number,
    segment_nr: number,
}
