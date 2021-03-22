import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

export function buildFeedbackPath() {
  return path.join(process.cwd(), "data", "feedback.json");
}

export function extractFeedback(filePath: string) {
  const fileData = fs.readFileSync(filePath, { encoding: "utf8" });
  const data = JSON.parse(fileData);

  return data;
}

function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { email, text } = req.body;

    const newFeedback = { id: new Date().toISOString(), email, text };

    const filePath = buildFeedbackPath();
    const data = extractFeedback(filePath);
    data.push(newFeedback);
    fs.writeFileSync(filePath, JSON.stringify(data));

    res.status(201).json({ message: "Success", feedback: newFeedback });
  } else {
    const filePath = buildFeedbackPath();
    const data = extractFeedback(filePath);
    res.status(200).json({ feedback: data });
  }
}

export default handler;
