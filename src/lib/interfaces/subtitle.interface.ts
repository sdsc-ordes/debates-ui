export interface Subtitle {
    index: number
    start: number,
    end: number,
    time_start: string,
    time_end: string,
    content: string,
    segment_nr: number,
}

export interface SubtitleDB {
    index: number
    start: number,
    end: number,
    content: string,
    segment_nr: number,
}

export interface TimeUpdateParameters {
    currentTime: number;
    currentSubtitleIndex: number,
    currentSegmentIndex: number,
    currentSpeakerIndex: number,
}
