import db from "$lib/db/mongo";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  try {
    const data = await db.collection("segments").find({}).toArray();
    const serializedData = data.map((segment) => ({
      ...segment,
      _id: segment._id.toString(),
    }));
    return {
      segments: serializedData
    }
  } catch (error) {
    console.error('Error loading collections:', error);
  }
};
