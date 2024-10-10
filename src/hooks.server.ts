import { start_mongo } from "./lib/mongo/mongo";

start_mongo()
  .then((): void => {
    console.log("Mongo started");
  })
  .catch((e) => {
    console.error("Mongo connection error:", e);
  });
