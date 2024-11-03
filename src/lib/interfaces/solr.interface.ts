export interface SolrQuery {
    queryTerm: string,
    sortBy: string,
    facetField: string,
    facetValue: string,
}

// Interface for Solr response header
interface SolrResponseHeader {
    status: number;
    QTime: number;
    params: {
        q: string;
        df: string;
        hl: string;
        indent: string;
        "facet.f": string;
        rows: string;
        facet: string;
    };
}

// Interface for Solr document
export interface SolrDocument {
    speaker_id: string;
    start: number;
    end: number;
    segment_nr: number;
    statement: string[];
    s3_prefix: string;
    version_id: string;
    debate_type: string;
    debate_session: string;
    debate_public: boolean;
    debate_schedule: string;
    id: string;
    _version_: number;
    _root_: string;
}

// Interface for Solr response body
interface SolrResponseBody {
    numFound: number;
    start: number;
    numFoundExact: boolean;
    docs: SolrDocument[];
}

// Interface for Solr facet counts
interface SolrFacetCounts {
    facet_queries: Record<string, number>;
    facet_fields: Record<string, Array<string | number>>;
    facet_ranges: Record<string, any>;
    facet_intervals: Record<string, any>;
    facet_heatmaps: Record<string, any>;
}

// Interface for Solr highlighting
interface SolrHighlighting {
    [docId: string]: {
        [fieldName: string]: string[];
    };
}

// Main Solr response interface
export interface SolrResponse {
    responseHeader: SolrResponseHeader;
    response: SolrResponseBody;
    facet_counts: SolrFacetCounts;
    highlighting: SolrHighlighting;
}

export interface DebateMetadata {
    s3_prefix: string;
    debate_type: string;
    debate_session: string;
    debate_topic?: string;
    debate_public: boolean;
    debate_schedule: string;
}