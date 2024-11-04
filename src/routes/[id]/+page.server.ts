import { start_mongo, getDb } from "$lib/mongo/mongo";
import { getMediaSources, checkVideoAccess } from '$lib/server/s3Client';
import type { PageServerLoad } from "./$types"; // Ensure this is the correct path to your types
import { PUBLIC_MONGO_VIDEO_COLLECTION } from "$env/static/public";

const videoCollection = PUBLIC_MONGO_VIDEO_COLLECTION;

export const load: PageServerLoad = async ({ params }) => {
    const videoId = params.id;
    if (!videoId) {
        throw new Error('Video ID is required');
    }
    // Usage
    const videoUrl = 'http://minio-instance:9000/debates/HRC_20220328/HRC_20220328.mp4';
    checkVideoAccess(videoUrl);

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

        // Serialize MongoDB ObjectIds
        const serializedData = videoData.map((video) => ({
            ...video,
            _id: video._id.toString(),
        }));

        const mediaSources = await getMediaSources(videoId);
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

