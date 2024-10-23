import { MongoClient } from "mongodb";

const mongoUrl = import.meta.env.VITE_MONGO_URL;
const debatesDB = import.meta.env.VITE_MONGO_DB;

console.log("MongoDB URL:", mongoUrl);
console.log("Debates DB:", debatesDB);

const client = new MongoClient(mongoUrl);
const db = client.db(debatesDB); // Make sure the correct DB is selected

export async function start_mongo(): Promise<MongoClient | null> {
    console.log("Starting MongoDB connection");
    try {
        await client.connect();
        console.log("MongoDB connected successfully to database:", debatesDB);
        return client;
    } catch (err) {
        console.error("MongoDB connection error:", err);
        return null; // Return null if connection fails
    }
}

export default db;
