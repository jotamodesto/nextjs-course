import { GetStaticProps } from "next";
import { useState } from "react";
import { buildFeedbackPath, extractFeedback } from "../api/feedback";

function FeedbackPage(props) {
  const [feedback, setFeedback] = useState<any>();

  async function loadFeedbackHandler(id: string) {
    const response = await fetch(`/api/feedback/${id}`);
    const data = await response.json();

    setFeedback(data.feedback);
  }

  return (
    <>
      {feedback && <p>{feedback.email}</p>}
      <ul>
        {props.feedbackItems.map(item => (
          <li key={item.id}>
            {item.text}
            <button onClick={loadFeedbackHandler.bind(null, item.id)}>
              Show details
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default FeedbackPage;

export const getStaticProps: GetStaticProps = async () => {
  const filePath = buildFeedbackPath();
  const data = extractFeedback(filePath);

  return {
    props: { feedbackItems: data },
  };
};
