import db from "$lib/db/mongo";
import type { PageServerLoad } from "./$types";
const videoCollection = import.meta.env.VITE_MONGO_VIDEO_COLLECTION;

export const load: PageServerLoad = async () => {
  try {
    const data = await db.collection(videoCollection).find({}).toArray();
    const serializedData = data.map((video) => ({
      ...video,
      _id: video._id.toString(),
    }));
    return {
      video: serializedData
    }
  } catch (error) {
    console.error('Error loading collections:', error);
  }
};
