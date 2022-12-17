import {
  KafkaClient,
  KafkaClientOptions,
  HighLevelProducer,
  ProduceRequest,
} from "kafka-node";

class Kafka {
  private static _instance: Kafka;
  private kafkaClient: KafkaClient;
  private kafkaProducer: HighLevelProducer;
  private kafkaClientOptions: KafkaClientOptions = {
    kafkaHost: process.env.KAFKA_HOST_URL,
    clientId: "producer-client",
    connectRetryOptions: {
      retries: 2,
      minTimeout: 100, //@WARNING
      maxTimeout: 100, //@WARNING
    },
  };

  private constructor() {}

  public connect() {
    let self = this;
    if (!self.kafkaClient) {
      try {
        self.kafkaClient = new KafkaClient(self.kafkaClientOptions);
        self.kafkaProducer = new HighLevelProducer(self.kafkaClient);
        console.log("Kafka client instantiated correctly");
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
        self.kafkaProducer.on("ready", () => console.log("Kafka producer ready"));
        self.kafkaProducer.on("error", (error) =>
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

  public sendMessage(topic: string, data: Buffer) {
    return new Promise((resolve, reject) => {
      let self = this;
      const payload: ProduceRequest = {
        topic: process.env.KAFKA_TOPIC_NAME,
        messages: data,
        attributes: 1,
      };

      self.kafkaProducer.send([payload], (error, data) => {
        if (error) reject(error);
        else {
            console.log('Data sent correctly to kafka', data);
            resolve(data);
        }
      });
    });
  }

  static getInstance() {
    if (this._instance) {
      return this._instance;
    }

    this._instance = new Kafka();
    return this._instance;
  }
}

export default Kafka;