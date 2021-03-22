import { NextApiRequest, NextApiResponse } from "next";

import { buildFeedbackPath, extractFeedback } from ".";

function handler(req: NextApiRequest, res: NextApiResponse) {
  const feedbackId = req.query.feedbackid as string;

  const filePath = buildFeedbackPath();
  const feedbackData = extractFeedback(filePath);

  const selectedFeedback = feedbackData.find(
    feedback => feedback.id === feedbackId
  );

  res.status(200).json({ feedback: selectedFeedback });
}

export default handler;
