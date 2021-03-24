import { NextApiRequest, NextApiResponse } from "next";

const comments = [
  {
    id: "c1",
    text: "My comment is amazing",
    name: "Johnatan",
    email: "test@test.com",
  },
  {
    id: "c2",
    text: "My second comment is amazing",
    name: "Jon Doe",
    email: "jon@doe.com",
  },
];

function handler(req: NextApiRequest, res: NextApiResponse) {
  const eventId = req.query.eventId as string;

  switch (req.method) {
    case "GET": {
      res.status(200).json({ comments });

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
        return;
      }

      comments.push({ id: `c${comments.length + 1}`, ...comment });

      res.status(201).json({
        message: `New comment added for event ${eventId}`,
        comments,
      });

      break;
    }
    default:
      res.status(204).send("");
      break;
  }
}

export default handler;
