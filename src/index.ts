import express from "express";
import routes from "./routes";
import mongoose from "mongoose";
import cors from "cors";
import  removeExpiredCartItems  from "./../src/middlewares/removeExpiredCartItems";


// Database connection
const main = async () => {
  const app = express();

  app.use((req, res, next) => {
    // Configuração do CORS
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization"); // Allow both Content-Type and Authorization headers
    app.use(cors()); // Isso permite o acesso de qualquer origem
    next();
  });
  

  const MONGODB_URL: string = process.env.MONGODB_URL || "mongodb+srv://ike:1KLqDGi6TTdTMkAt@ecommerce-ike.u4hfc3x.mongodb.net/";

  mongoose.connect(MONGODB_URL || "mongodb+srv://ike:1KLqDGi6TTdTMkAt@ecommerce-ike.u4hfc3x.mongodb.net/", { monitorCommands: true });

  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", () => {
    console.log("Banco de dados no ar");
  });

  const port = process.env.PORT || "6452";

  // Chame a função de limpeza de carrinho aqui (após a conexão com o banco de dados)
  await removeExpiredCartItems();

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use("/api", routes);

  app.listen(port, () => console.log("listening on port: " + port));
};

main();
