import { MongoClient, Document, Db } from "mongodb";

class Mongo {
  private static _instance: Mongo;
  private mongoClient: MongoClient;
  private mongoConnectionURI: string = process.env.MONGODB_CONNECTION_URI;

  private constructor() {
    let self = this;
    // Create a new MongoClient
    self.mongoClient = new MongoClient(self.mongoConnectionURI);
  }

  public connect() {
    let self = this;
    //@TODO, check if already connected
    return new Promise(async (resolve, reject) => {
      if (self.mongoClient) {
        await self.mongoClient.connect();
        console.log("MongoClient connected correctly");
        resolve("Connection opened OK");
      } else {
        reject(new Error("Error, mongoClient doesnt exist"));
      }
    });
  }

  public close() {
    let self = this;
    //@TODO, check if already connected
    return new Promise(async (resolve, reject) => {
      if (self.mongoClient) {
        await self.mongoClient.close();
        resolve('Connection closed OK');
      } else {
        reject(new Error("Error, mongoClient doesnt exist"));
      }
    });
  }

  public insertItem(data:Document, collectionName:string){
    let self = this;
    return new Promise(async (resolve, reject) => {
      try{
        const databaseName = process.env.MONGODB_DATABASE_NAME;
        const database: Db = self.mongoClient.db(databaseName);
        const collection = database.collection(collectionName);
        await collection.insertOne(data); //@WATCHOUT
        resolve(data);
      }      
      catch(e){
        console.error(`Error inserting item in collection ${collectionName}`, e);
        reject(e);
      }
    })
  }

  static getInstance() {
    if (this._instance) {
      return this._instance;
    }

    this._instance = new Mongo();
    return this._instance;
  }
}

export default Mongo;
