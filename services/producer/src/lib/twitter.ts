import { ETwitterStreamEvent, TweetStream, TwitterApi } from "twitter-api-v2";

class Twitter {
  private static _instance: Twitter;
  private APIKey: string = process.env.TWITTER_API_BEARER_TOKEN;
  private stream: TweetStream;
  private client: TwitterApi;

  private constructor() {
    this.client = new TwitterApi(this.APIKey);
  }

  public async startStream(onTwit: (data: any) => any) {
    let self = this;
    if (!self.stream) {
      try {
        self.stream = await self.client.v2.sampleStream();
        console.log("Twitter stream created correctly");
        // Enable reconnect feature
        self.stream.autoReconnect = true;

        // Awaits for a tweet
        self.stream.on(
          // Emitted when Node.js {response} emits a 'error' event (contains its payload).
          ETwitterStreamEvent.ConnectionError,
          (err) => console.error("Connection error!", err)
        );

        self.stream.on(
          // Emitted when Node.js {response} is closed by remote or using .close().
          ETwitterStreamEvent.ConnectionClosed,
          () => console.log("Connection has been closed.")
        );

        self.stream.on(
          // Emitted when a Twitter payload (a tweet or not, given the endpoint).
          ETwitterStreamEvent.Data,
          (eventData) => {
            console.log("Twitter has sent something:", eventData);
            onTwit(eventData.data); //@WARNING unsafe access to data property
          }
        );

        self.stream.on(
          // Emitted when a Twitter sent a signal to maintain connection active
          ETwitterStreamEvent.DataKeepAlive,
          () => console.log("Twitter has a keep-alive packet.")
        );
      } catch (e) {
        console.error("Error creating Twitter stream", e);
      }
    } else throw new Error("Error, Twitter stream already inited");
  }

  public async closeStream() {
    let self = this;
    if (self.stream) self.stream.close();
  }

  static getInstance() {
    if (this._instance) {
      return this._instance;
    }

    this._instance = new Twitter();
    return this._instance;
  }
}

//Export
export default Twitter;
