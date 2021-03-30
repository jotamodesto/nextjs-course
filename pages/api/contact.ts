import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";
import { Message } from "../../models/message";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { email, name, message } = req.body;

    if (
      !email ||
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !message ||
      message.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input." });
      return;
    }

    const newMessage: Message = { email, name, message };

    let client: MongoClient;
    const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.15pj0.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`;
    try {
      client = await MongoClient.connect(connectionString);
    } catch (error) {
      res.status(500).json({
        message: "Could not connect to database",
        error: error.message,
      });
      return;
    }

    const db = client.db();
    try {
      const result = await db.collection("messages").insertOne(newMessage);
      newMessage._id = result.insertedId;
    } catch (error) {
      res.status(500).json({ message: "Não consegui enviar sua mensagem 😞!" });
      return;
    } finally {
      client.close();
    }

    res.status(201).json({ message: "Recebi sua mensagem 😀!", newMessage });
  }
}

export default handler;
