import { text } from "stream/consumers";

class Twit {
  readonly id: number;
  readonly text: string;
  readonly edit_history_tweet_ids: Array<number>;

  public constructor(
    id: number,
    text: string,
    edit_history_tweet_ids: Array<number>
  ) {
    this.id = id as number;
    this.text = text as string;
    this.edit_history_tweet_ids = edit_history_tweet_ids as Array<number>;
  }

  static fromBuffer(data: Buffer) {
    let twit: Twit;
    try {
      const rawTwit: any = JSON.parse(data.toString());
      twit = new Twit(rawTwit.id, rawTwit.text, rawTwit.edit_history_tweet_ids);
    } catch (e) {
      console.log("Error casting Twit from buffer", e);
    }
    return twit;
  }

  public toBuffer(): Buffer {
    let self = this;
    let twitBuffer: Buffer;
    try {
      twitBuffer = Buffer.from(JSON.stringify(self));
    } catch (error) {
      console.error("Error converting Twit to Buffer");
    }
    return twitBuffer;
  }
}

export default Twit;
