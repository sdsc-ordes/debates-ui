import { PUBLIC_BACKEND_SERVER } from "$env/static/public";
const backendUrl = PUBLIC_BACKEND_SERVER

export async function downloadFile(prefix: string, key: string) {
    try {
        // FastAPI endpoint to download files
        const apiUrl = `${backendUrl}/s3-download`;

        // Request payload for download files
        const payload = JSON.stringify({
            prefix: prefix,
            key: key
        });

        // Download files from FastAPI backend
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: payload,
        });
        if (!response.ok) {
            throw new Error(`Error downloading file: ${response.statusText}`);
        };
    } catch (error) {
        console.error('Error in download file:', error);
        throw error;
    }
}
