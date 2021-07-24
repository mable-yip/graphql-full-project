import { default as mongodb } from 'mongodb'
import dotenv from "dotenv";
dotenv.config({ silent: process.env.NODE_ENV === 'production' });

let database;
const initDb = () => {
  mongodb.MongoClient.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error) {
      throw error;
    }
    database = client.db(process.env.DATABASE_NAME);
    console.log("Connected to `" + process.env.DATABASE_NAME + "`!");
  })
}

export const getCollection = (name) => database.collection(name);
initDb();