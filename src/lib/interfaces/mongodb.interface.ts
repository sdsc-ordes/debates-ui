export interface VideoData {
    s3_prefix: string;
    version_id: string;
    created_at: string;
    debate: {
        schedule: string;
        type: string;
        session: string;
        topic: string;
        public: boolean;
    };
    speakers: Speaker[];
    segments: Segment[];
    subtitles: Subtitle[];
}

export interface Speaker {
    speaker_id: string;
    name: string;
    country: string;
    role: string;
}

export interface Segment {
    speaker_id: string;
    start: number;
    end: number;
    segment_nr: number;
}

export interface Subtitle {
    index: number;
    start: number;
    end: number;
    content: string[];
    segment_nr: number;
}
