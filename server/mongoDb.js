import { default as mongodb } from 'mongodb'

const CONNECTION_URL = `mongodb+srv://hoypqn4:amLP5483@cluster0.6iqab.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
const DATABASE_NAME = "class-record-system"

let database;
const initDb = () => {
  mongodb.MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error) {
      throw error;
    }
    database = client.db(DATABASE_NAME);
    console.log("Connected to `" + DATABASE_NAME + "`!");
  })
}

export const getCollection = (name) => database.collection(name);
initDb();