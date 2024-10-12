export interface Subtitle {
    index: number
    start: number,
    end: number,
    time_start: string,
    time_end: string,
    content: string,
    segment_nr: number,
}

export interface TimeUpdateParameters {
    currentSubtitleIndex: number,
    currentSegmentIndex: number,
    currentSpeakerIndex: number,
}

export interface Speaker {
    speaker_id: string,
    name: string,
    country: string,
}

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
