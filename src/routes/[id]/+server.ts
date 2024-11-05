import { start_mongo, getDb } from "$lib/mongo/mongo";
import { PUBLIC_MONGO_VIDEO_COLLECTION } from "$env/static/public";
import type { RequestHandler } from "@sveltejs/kit";

const videoCollection = PUBLIC_MONGO_VIDEO_COLLECTION;

export const POST: RequestHandler = async ({ request }) => {
    await start_mongo();
    const db = getDb();
    const data = await request.json();

    try {
        // Insert the new video data
        const result = await db.collection(videoCollection).insertOne(data);

        return new Response(JSON.stringify({ success: true, id: result.insertedId }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.error("Error inserting video data:", error);
        console.error("Complete error response:", JSON.stringify(error, null, 2));
        return new Response(JSON.stringify({ success: false, error: "Failed to insert video data" }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
};
