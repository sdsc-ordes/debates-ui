import { start_mongo, getDb } from "$lib/mongo/mongo"; // Using your existing MongoDB setup
import type { PageServerLoad } from "./$types";
import { PUBLIC_MONGO_VIDEO_COLLECTION } from "$env/static/public";

const videoCollection = PUBLIC_MONGO_VIDEO_COLLECTION;

export const load: PageServerLoad = async () => {
  try {
    // Ensure that MongoDB connection is started
    await start_mongo();

    // Get the existing database connection
    const db = getDb();

    console.log(db);

    // Log the collection name and check if it's correct
    console.log("Collection Name:", videoCollection);

    // Fetch data from the video collection
    const data = await db.collection(videoCollection).find({}).toArray();

    // Log the data (for debugging purposes)
    console.log(data);

    // Serialize the data for sending back to the client
    const serializedData = data.map((video) => ({
      ...video,
      _id: video._id.toString(), // Convert MongoDB ObjectId to string
    }));

    // Return the video data to the client
    return {
      video: serializedData,
    };
  } catch (error) {
    console.error("Error loading collections:", error);

    // Return an empty array and error message in case of failure
    return {
      video: [],
      error: "Could not load video data",
    };
  }
};

