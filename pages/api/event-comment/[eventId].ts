import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";

import {
  connectDB,
  getDocuments,
  insertDocument,
} from "../../../helper/db-util";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const eventId = req.query.eventId as string;

  let client: MongoClient;
  try {
    client = await connectDB();
  } catch (error) {
    res.status(500).json({ message: "Connect to the database failed" });
    return;
  }

  switch (req.method) {
    case "GET": {
      try {
        const documents = await getDocuments(
          client,
          "comments",
          { _id: -1 },
          { eventId }
        );
        res.status(200).json({ comments: documents });
      } catch (error) {
        res.status(500).json({ message: "Getting comments failed" });
      }

      break;
    }
    case "POST": {
      const { comment } = req.body;
      const { email, name, text } = comment;

      if (
        !email.includes("@") ||
        !name ||
        name.trim() === "" ||
        !text ||
        text.trim() === ""
      ) {
        res.status(422).json({ message: "Invalid input." });
        break;
      }

      try {
        const newComment = { eventId, ...comment };
        const result = await insertDocument(client, "comments", newComment);
        newComment._id = result.insertedId;

        res.status(201).json({
          message: `New comment added for event ${eventId}`,
          comment: newComment,
        });
      } catch (error) {
        res.status(500).json({ message: "Insert comment failed" });
      }

      break;
    }
    default:
      res.status(204).send("");
      break;
  }

  client.close();
}

export default handler;
