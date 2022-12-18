import Twit from "../../src/model/Twit";

describe("Twit model", () => {
  describe("constructor", () => {
    it("should create a Twit", () => {
      const id: number = 999999;
      const text: string = "This is a en example";
      const edit_history_tweet_ids: Array<number> = [99999, 88888];
      const twit: Twit = new Twit(id, text, edit_history_tweet_ids);
      expect(twit).toBeInstanceOf(Twit);
    });
  });
  describe("fromBuffer", () => {
    it("should create a Twit from a correct buffer", () => {
      const id: number = 999999;
      const text: string = "This is a en example";
      const edit_history_tweet_ids: Array<number> = [99999, 88888];
      const rawTwit: any = {
        id: id,
        text: text,
        edit_history_tweet_ids: edit_history_tweet_ids,
      };
      const bufferOK = Buffer.from(JSON.stringify(rawTwit));
      const twit: Twit = Twit.fromBuffer(bufferOK);
      expect(twit).toBeInstanceOf(Twit);
      expect(twit.id).toEqual(rawTwit.id);
      expect(twit.text).toEqual(rawTwit.text);
      expect(twit.edit_history_tweet_ids).toEqual(
        rawTwit.edit_history_tweet_ids
      );
    });
    it("should error when creating a buffer from incorrect data", () => {
      const id: number = 999999;
      const text: string = "This is a en example";
      const edit_history_tweet_ids: Array<number> = [99999, 88888];
      const rawTwit: any = {
        idError: id,
        textError: text,
        edit_history_tweet_ids: edit_history_tweet_ids,
      };
      const bufferNotOK = Buffer.from(JSON.stringify(rawTwit));
      let error: Error;
      try {
        const twit = Twit.fromBuffer(bufferNotOK);
      } catch (e) {
        error = e;
      }
      expect(error).not.toBe(null);
    });
  });
  describe("toBuffer", () => {
    it("should convert a Twit to a correct buffer", () => {
      const id: number = 999999;
      const text: string = "This is a en example";
      const edit_history_tweet_ids: Array<number> = [99999, 88888];
      const twit: Twit = new Twit(id, text, edit_history_tweet_ids);
      const twitBuffer: Buffer = twit.toBuffer();
      expect(twitBuffer).toBeInstanceOf(Buffer);
    });
  });
});
