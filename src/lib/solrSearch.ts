export async function fetchSolrData(solrUrl: string, queryTerm: string) {
    if (!queryTerm.trim()) {
        throw new Error("Search term is required");
    }

    const params = {
        indent: "true",
        df: "statement",
        hl: "true",
        q: queryTerm,
        facet: "true",
    };
    
    const facetFields = ["speaker_name", "countries", "speaker_role"];
    const searchParams = new URLSearchParams(params);
    
    // Add each facet field individually
    facetFields.forEach(field => searchParams.append("facet.field", field));
    searchParams.append("hl.snippets", "10")
    
    const apiUrl = `${solrUrl}?${searchParams.toString()}`;
    console.log(apiUrl);

    const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error(`Error fetching JSON: ${response.statusText}`);
    }

    return response.json();
}