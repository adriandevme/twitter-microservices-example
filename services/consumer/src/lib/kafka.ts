import {
  KafkaClient,
  KafkaClientOptions,
  Consumer,
  ConsumerOptions,
  OffsetFetchRequest,
} from "kafka-node";

class Kafka {
  private static _instance: Kafka;
  private kafkaClient: KafkaClient;
  private kafkaClientOptions: KafkaClientOptions;
  private kafkaConsumerOptions: ConsumerOptions;
  private kafkaConsumerFetchRequest: OffsetFetchRequest;
  private kafkaConsumer: Consumer;

  private constructor() {
    let self = this;
    self.kafkaClientOptions = {
      kafkaHost: process.env.KAFKA_HOST_URL,
      clientId: "producer-client",
      connectRetryOptions: {
        retries: 2,
        minTimeout: 100, //@WARNING
        maxTimeout: 100, //@WARNING
      },
    };
    self.kafkaConsumerOptions = {
      autoCommit: true,
      fetchMaxWaitMs: 1000,
      fetchMaxBytes: 1024 * 1024,
      encoding: "buffer",
    };
    self.kafkaConsumerFetchRequest = {
      topic: process.env.KAFKA_TOPIC_NAME,
    };
  }

  public connect(onMessage: (message: any) => any) {
    let self = this;
    if (!self.kafkaClient) {
      try {
        self.kafkaClient = new KafkaClient(self.kafkaClientOptions);
        self.kafkaConsumer = new Consumer(
          self.kafkaClient,
          [self.kafkaConsumerFetchRequest],
          self.kafkaConsumerOptions
        );
        console.log("Kafka client & consumer instantiated correctly");
        // Event subscribe
        self.kafkaClient.on("error", (error) =>
          console.error("Kafka client error:", error)
        );
        self.kafkaClient.on("socket_error", (error) =>
          console.error("Kafka client error:", error)
        );
        self.kafkaClient.on("connect", () =>
          console.log("Kafka client connection done")
        );
        self.kafkaClient.on("brokersChanged", () =>
          console.log("Kafka client broker changed")
        );
        self.kafkaClient.on("close", () =>
          console.log("Kafka client connection closed")
        );
        self.kafkaClient.on("ready", () =>
          console.log("Kafka client connection ready")
        );
        self.kafkaClient.on("reconnect", () =>
          console.log("Kafka client re-connected")
        );
        self.kafkaConsumer.on("message", async (message: any) => {
          console.log("Kafka message received correctly", message);
          onMessage(message.value); //@WARNING unsafe value
        });
        self.kafkaConsumer.on("error", (error) =>
          console.error("Kafka producer error: ", error)
        );
      } catch (e) {
        console.error("Error starting Kafka client or producer", e);
      }
    } else {
      console.error("Error starting KafkaClient, client already created");
    }
  }

  public close() {}

  static getInstance() {
    if (this._instance) {
      return this._instance;
    }

    this._instance = new Kafka();
    return this._instance;
  }
}

export default Kafka;
