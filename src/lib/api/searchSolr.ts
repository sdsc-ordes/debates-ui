import { PUBLIC_BACKEND_SERVER } from "$env/static/public";
import type { SolrQuery } from "$lib/interfaces/solr.interface";
const backendUrl = PUBLIC_BACKEND_SERVER

export async function searchSolr(solrQuery: SolrQuery) {
    try {
        // FastAPI endpoint to fetch metadata
        const apiUrl = `${backendUrl}/search-solr`;
        const facetFields: string[] = [
            "debate_schedule", "statement_type", "debate_session", "speaker_name", "speaker_role_tag"];
        const payload = JSON.stringify({
            queryTerm: solrQuery.queryTerm,
            sortBy: solrQuery.sortBy,
            facetFields: facetFields,
            facetFilters: solrQuery.facetFieldValues,
        });
        console.log(payload);

        // Fetch metadata from FastAPI backend
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: payload,
        });

        if (!response.ok) {
            throw new Error(`Error fetching metadata: ${response.statusText}`);
        }

        // Extract JSON from the response
        const data = await response.json();
        return data.raw_response;
    } catch (error) {
        console.error('Error in searchSolr:', error);
        throw error;
    }
}
