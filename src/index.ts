import express from "express";
import routes from "./routes";
import mongoose from "mongoose";
import { MONGODB_URL } from "../src/config";

// Database connection

const main = async () => {
  const app = express();

  mongoose.connect(MONGODB_URL || "", { monitorCommands: true });

  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", () => {
    console.log("DB connected...");
  });

  const port = process.env.PORT || "6452";


  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use('/api', routes);

  app.listen(port, () => console.log("listening on port: " + port));
};

main();
