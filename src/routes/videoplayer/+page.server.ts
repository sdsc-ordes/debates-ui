import { start_mongo } from "$lib/mongo/mongo";
import db from "$lib/mongo/mongo";
import type { PageServerLoad } from "./$types";
const videoCollection = import.meta.env.VITE_MONGO_VIDEO_COLLECTION;
console.log(videoCollection);

export const load: PageServerLoad = async () => {
  try {
    const client = await start_mongo();
    if (!client) {
      throw new Error("MongoDB connection failed");
    }

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
