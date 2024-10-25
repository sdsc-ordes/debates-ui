import { start_mongo, getDb } from "$lib/mongo/mongo";
import type { PageServerLoad } from "./$types";
import { PUBLIC_MONGO_VIDEO_COLLECTION } from "$env/static/public";

const videoCollection = PUBLIC_MONGO_VIDEO_COLLECTION;

export const load: PageServerLoad = async () => {
  try {
    await start_mongo();
    const db = getDb();
    console.log(db);
    console.log("Collection Name:", videoCollection);
    const data = await db.collection(videoCollection).find({}).toArray();
    console.log(data);
    const serializedData = data.map((video) => ({
      ...video,
      _id: video._id.toString(),
    }));
    return {
      video: serializedData,
    };
  } catch (error) {
    console.error("Error loading collections:", error);
    return {
      video: [],
      error: "Could not load video data",
    };
  }
};

