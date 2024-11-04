import { PUBLIC_SOLR_URL } from "$env/static/public";
import type { SolrQuery } from "$lib/interfaces/solr.interface";
const solrUrl = PUBLIC_SOLR_URL;

export async function fetchSolrData(solrQuery: SolrQuery) {
    console.log("NEW SEARCH")
    const params = {
        indent: "true",
        df: "statement",
        hl: solrQuery.queryTerm ? "true" : "false",
        q: solrQuery.queryTerm || "*:*",
        facet: "true",
        rows: 100,
    };
    console.log("sorlQuery", solrQuery);
    const facetFields = ["debate_schedule"];
    let searchParams = new URLSearchParams(params);

    facetFields.forEach(field => searchParams.append("facet.field", field));
    searchParams.append("hl.snippets", "10")

    if (solrQuery.facetField && solrQuery.facetValue) {
        searchParams.append("fq", `${solrQuery.facetField}: "${solrQuery.facetValue}"`,)
    }
    const apiUrl = `${solrUrl}?${searchParams.toString()}`;

    console.log("apiUrl", apiUrl);
    try {
        const response = await fetch(apiUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error(`Error fetching JSON: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`Error fetching Solr data: ${error.message}`);
        return null;
    }
}

export function createDefaultSolrQuery(): SolrQuery {
    return {
        queryTerm: "",
        sortBy: "",
        facetField: "",
        facetValue: "",
    };
}
