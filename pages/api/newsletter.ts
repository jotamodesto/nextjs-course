import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";

import { connectDB, insertDocument } from "../../helper/db-util";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "POST": {
      const email = req.body.email as string;

      if (!email || !email.includes("@")) {
        res.status(422).json({ message: "Invalid e-mail address" });
        return;
      }

      let client: MongoClient;
      try {
        client = await connectDB();
      } catch (error) {
        res.status(500).json({ message: "Connecting to the database failed" });
        return;
      }

      try {
        await insertDocument(client, "newsletter", { email });

        res.status(201).json({ message: "E-mail registered", email });
      } catch (error) {
        res.status(500).json({ message: "Inserting data failed" });
      } finally {
        client.close();
      }

      break;
    }
    default:
      res.status(204).send("");
      break;
  }
}

export default handler;
