import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "POST": {
      const email = req.body.email as string;

      if (!email || !email.includes("@")) {
        res.status(422).json({ message: "Invalid e-mail address" });
        return;
      }

      const client = new MongoClient(
        `mongodb+srv://dbOwner:JeXBs4hPoNYAcfSu@cluster0.15pj0.mongodb.net/newsletter?retryWrites=true&w=majority`
      );
      await client.connect();
      const db = client.db("newsletter");
      await db.collection("emails").insertOne({ email });
      client.close();

      res.status(201).json({ message: "E-mail registered", email });
      break;
    }
    default:
      res.status(204).send("");
      break;
  }
}

export default handler;
