import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

import Kafka from "./lib/kafka";
import Mongo from "./lib/mongo";
import Twit from "./model/Twit";

//Load dotenv
dotenv.config();

const app: Express = express();
const port = process.env.HTTP_SERVER_PORT;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, async () => {
  try {
    const onMessage = async function (data: any) {
      console.log("Kafka message received from app.ts");
      var twit: Twit = Twit.fromBuffer(data);
      console.log(twit);
      // Insert Twit into Twits Collection
      await Mongo.getInstance().insertItem(twit, "Twits");
    };
    await Mongo.getInstance().connect();
    console.log("MongoDB server connected OK");
    await Kafka.getInstance().connect(onMessage);
    console.log("Kafka server connected OK");
  } catch (e) {
    console.error("Error initing server", e);
  }
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
