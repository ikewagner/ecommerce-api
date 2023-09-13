import express from "express";
import routes from "./routes";
import mongoose from "mongoose";


// Database connection

const main = async () => {
  const app = express();

  const MONGODB_URL: string = process.env.MONGODB_URL || 'mongodb+srv://ike:1KLqDGi6TTdTMkAt@ecommerce-ike.u4hfc3x.mongodb.net/';

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
