import { MongoClient } from "mongodb"
const mongoUrl = import.meta.env.VITE_MONGO_URL;
console.log("in mongo db file")
const client = new MongoClient(mongoUrl)
const db = client.db("debates");

export function start_mongo(): Promise<MongoClient> {
    console.log("Starting mongo")
    return client.connect()
}

export default db;

