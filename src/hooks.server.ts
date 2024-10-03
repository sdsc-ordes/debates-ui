console.log("Importing Mongo module");
import { start_mongo } from "./lib/db/mongo";

console.log("In the hook");
start_mongo()
  .then((): void => {
    console.log("Mongo started");
  })
  .catch((e) => {
    console.error("Mongo connection error:", e);
  });

console.log("Hook script complete");
const mongoUrl = import.meta.env.VITE_MONGO_URL;
console.log(mongoUrl);
