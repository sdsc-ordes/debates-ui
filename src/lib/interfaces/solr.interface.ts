export interface SolrStatement {
    speaker_id: string,
    start: number,
    end: number,
    segment_nr: number,
    statement: string[],
    s3_prefix: string,
    version_id: string,
    debate_type: string,
    debate_session: string,
    debate_public: boolean,
    debate_schedule: string,
}

export interface SolrQuery {
    query: string,
    sort: boolean,
    filterField: string,
    filterValue: string,
}
