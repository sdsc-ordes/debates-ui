import { MongoClient, Db } from 'mongodb';
import {
    SECRET_MONGO_URL, SECRET_MONGO_DB
} from "$env/static/private";

const mongoUrl = SECRET_MONGO_URL;
const debatesDB = SECRET_MONGO_DB;

let client: MongoClient | null = null;
let db: Db | null = null;

export async function start_mongo(): Promise<Db> {
    if (db) {
        console.log("Reusing existing MongoDB connection");
        return db;
    }

    console.log(`Starting MongoDB connection at ${mongoUrl}`);
    try {
        client = new MongoClient(mongoUrl);
        await client.connect();
        db = client.db(debatesDB);
        console.log(`MongoDB connected successfully to database: ${debatesDB}`);
        return db;
    } catch (err) {
        console.error("MongoDB connection error:", err);
        throw new Error("MongoDB connection failed");
    }
}

export function getDb(): Db {
    if (!db) {
        throw new Error("Database connection is not established yet. Call start_mongo() first.");
    }
    return db;
}
