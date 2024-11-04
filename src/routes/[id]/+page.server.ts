import { start_mongo, getDb } from "$lib/mongo/mongo";
import type { PageServerLoad } from "./$types"; // Ensure this is the correct path to your types
import { PUBLIC_MONGO_VIDEO_COLLECTION } from "$env/static/public";

const videoCollection = PUBLIC_MONGO_VIDEO_COLLECTION;

export const load: PageServerLoad = async ({ params }) => {
    try {
        await start_mongo();
        const db = getDb();

        // s3Prefix identifies the video
        const query = params.id ? { s3_prefix: params.id } : {};

        // Get newest metadata of the debate
        const videoData = await db.collection(videoCollection)
            .find(query) // Filter by the query
            .sort({ created_at: -1 }) // Sort by created_at in descending order
            .limit(1) // Limit to 1 document
            .toArray();

        const serializedData: DebateData[] = videoData.map((video) => {
            const { _id, ...rest } = video; // Destructure to exclude _id
            return {
                ...rest,
            };
        });

        return {
            video: serializedData,
        };
    } catch (error) {
        console.error("Error loading collections:", error);
        return {
            video: null,
            error: "Could not load video data",
        };
    }
};

