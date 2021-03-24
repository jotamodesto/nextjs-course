import { useEffect, useState } from "react";

import CommentList from "./CommentList";
import NewComment from "./NewComment";
import classes from "./Comments.module.css";
import { EventComment } from "../../models/event";

export interface CommentsProps {
  eventId: string | number;
}

function Comments(props: CommentsProps) {
  const { eventId } = props;

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<EventComment[]>([]);

  useEffect(() => {
    async function fetchComments() {
      const response = await fetch(`/api/event-comment/${eventId}`);
      const data = await response.json();

      setComments(data.comments);
    }

    if (showComments) fetchComments();
  }, [showComments]);

  function toggleCommentsHandler() {
    setShowComments(prevStatus => !prevStatus);
  }

  async function addCommentHandler(commentData: EventComment) {
    const response = await fetch(`/api/event-comment/${eventId}`, {
      method: "POST",
      body: JSON.stringify({ comment: commentData }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();
    setComments(data.comments);
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList comments={comments} />}
    </section>
  );
}

export default Comments;
