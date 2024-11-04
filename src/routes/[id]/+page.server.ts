import { start_mongo, getDb } from "$lib/mongo/mongo";
import type { PageServerLoad } from "./$types"; // Ensure this is the correct path to your types
import { PUBLIC_MONGO_VIDEO_COLLECTION } from "$env/static/public";
import { getMediaSources } from '$lib/s3/s3Client';
import type { MediaSources } from '$lib/interfaces/videoplayer.interface'

const videoCollection = PUBLIC_MONGO_VIDEO_COLLECTION;

export const load: PageServerLoad = async ({ params }) => {
    try {
        await start_mongo();
        const db = getDb();
        const s3Prefix = params.id;
        if (!s3Prefix) {
            throw new Error('id parameter for video is required');
        }

        // s3Prefix identifies the video
        const query = { s3_prefix: s3Prefix };

        // Get newest metadata of the debate
        const videoData = await db.collection(videoCollection)
            .find(query) // Filter by the query
            .sort({ created_at: -1 }) // Sort by created_at in descending order
            .limit(1) // Limit to 1 document
            .toArray();

        // Serialize MongoDB ObjectIds
        const serializedData = videoData.map((video) => ({
            ...video,
            _id: video._id.toString(),
        }));


        // Usage
        let mediaSources: MediaSources = getMediaSources(s3Prefix);
        console.log(mediaSources);

        return {
            video: serializedData,
            mediaSources,
        };
    } catch (error) {
        console.error("Error loading collections:", error);
        return {
            video: null,
            error: "Could not load video data",
        };
    }
};

