import db from "$lib/db/mongo";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  try {
    const data = await db.collection("segments").find({}).toArray();
    console.log('data', data);
  } catch (error) {
    console.error('Error loading collections:', error);
  }
};
