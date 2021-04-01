import { MongoClient } from "mongodb";

export async function connectToDatabase() {
  return MongoClient.connect(
    "mongodb+srv://dbOwner:JeXBs4hPoNYAcfSu@cluster0.15pj0.mongodb.net/auth-demo?retryWrites=true&w=majority"
  );
}
