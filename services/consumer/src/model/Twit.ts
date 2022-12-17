import { text } from "stream/consumers";

class Twit {
  private id: number;
  private text: string;
  private edit_history_tweet_ids: Array<number>;

  public constructor(
    id: number,
    text: string,
    edit_history_tweet_ids: Array<number>
  ) {
    let self = this;
    self.id = id;
    self.text = text;
    self.edit_history_tweet_ids = edit_history_tweet_ids;
  }

  static fromBuffer(data: Buffer) {
    const rawTwit: any = JSON.parse(data.toString());
    let twit: Twit;
    try {
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
