import { MongoClient } from "mongodb";

export async function connectDB() {
  const client = await MongoClient.connect(
    `mongodb+srv://dbOwner:JeXBs4hPoNYAcfSu@cluster0.15pj0.mongodb.net/events?retryWrites=true&w=majority`
  );

  return client;
}

export async function insertDocument(
  client: MongoClient,
  collection: string,
  document: any
) {
  const db = client.db();
  return db.collection(collection).insertOne(document);
}

export async function getDocuments(
  client: MongoClient,
  collection: string,
  sort?: any,
  filter?: any
) {
  const db = client.db();

  return db.collection(collection).find(filter).sort(sort).toArray();
}
