import { ETwitterStreamEvent, TweetStream, TwitterApi } from "twitter-api-v2";
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import Twitter from "./lib/twitter";
import Kafka from "./lib/kafka";
import { Server } from "http";

//Load dotenv
dotenv.config();

const app: Express = express();
const port = process.env.HTTP_SERVER_PORT;
let server: Server;

const closeServer = async function (code: any) {
  console.log("Closing gracefully", code);
  //Secure disconnect from Twitter
  await Twitter.getInstance().closeStream();
  //Secure close Express Server
  if (server) await server.close();
  //Exit
  process.exit();
};

const startServer = async function () {
  const onTwit = async function (twitData: any) {
    const rawTwit = twitData;
    //@TODO cast twit
    const twitBuffer = Buffer.from(JSON.stringify(rawTwit));
    //Send twit to kafka
    const kafkaTopicName = process.env.KAFKA_TOPIC_NAME;
    await Kafka.getInstance().sendMessage(kafkaTopicName, twitBuffer);
  };
  await Twitter.getInstance().startStream(onTwit);
  console.log("Twitter stream started OK");
  await Kafka.getInstance().connect();
  console.log("Kafka server connected OK");
};

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

server = app.listen(port, async () => {
  try {
    await startServer();
  } catch (e) {
    console.error("Error initing Twitter stream", e);
  }
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});

process.on("SIGINT", closeServer);
process.on("SIGUSR1", closeServer);
process.on("SIGUSR2", closeServer);
