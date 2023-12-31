import express from "express";
import mongoose from "mongoose";
import { MessageController, BotController } from "./controllers/index.js";
import cors from "cors";
import startBot from "./bot.js";
import { botValidation } from "./validations.js";

mongoose
  .connect(
    "mongodb+srv://Aldiyar:1234@testapp.sirg43g.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("DB OK");
  })
  .catch((err) => console.log("DB ERROR", err));

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.json());
app.post("/startbot", startBot);

app.get("/", (req, res) => {
  res.send("Connected!");
});

app.post("/message", MessageController.createMessage);
app.get("/message/:id", MessageController.getMessage);

app.post("/bot", botValidation, BotController.createBot);
app.post("/setmanagers", botValidation, BotController.setManager);
app.get("/bot/:id", BotController.getBot);

app.listen(8080, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Server works!");
});
