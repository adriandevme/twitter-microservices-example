import { text } from "stream/consumers";

class Twit {
  readonly id!: number;
  readonly text!: string;
  readonly edit_history_tweet_ids!: Array<number>;

  public constructor(
    id: number,
    text: string,
    edit_history_tweet_ids: Array<number>
  ) {
    if (id === undefined)
      throw new Error("Error on creating Twit, id param. cannot be undefined");
    if (text === undefined)
      throw new Error(
        "Error on creating Twit, text param. cannot be undefined"
      );
    if (edit_history_tweet_ids === undefined)
      throw new Error(
        "Error on creating Twit, edit_history_tweet_ids param. cannot be undefined"
      );
    this.id! = id as number;
    this.text! = text as string;
    this.edit_history_tweet_ids! = edit_history_tweet_ids as Array<number>;
  }

  static fromBuffer(data: Buffer) {
    let twit: Twit;
    try {
      const rawTwit: any = JSON.parse(data.toString());
      twit = new Twit(rawTwit.id, rawTwit.text, rawTwit.edit_history_tweet_ids);
    } catch (error) {
      console.error("Error converting Twit from Buffer", error);
    }
    return twit;
  }

  public toBuffer(): Buffer {
    let self = this;
    let twitBuffer: Buffer;
    try {
      twitBuffer = Buffer.from(JSON.stringify(self));
    } catch (error) {
      console.error("Error converting Twit to Buffer", error);
    }
    return twitBuffer;
  }
}

export default Twit;
