import { MongoClient } from "mongodb"
const mongoUrl = import.meta.env.VITE_MONGO_URL;
const debatesDB = import.meta.env.VITE_MONGO_DB;
const client = new MongoClient(mongoUrl)
const db = client.db(debatesDB);

export function start_mongo(): Promise<MongoClient> {
    console.log("Starting mongo")
    return client.connect()
}

export default db;

