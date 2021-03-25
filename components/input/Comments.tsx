import { useContext, useEffect, useState } from "react";

import NotificationContext from "../../store/NotificationContext";
import CommentList from "./CommentList";
import NewComment from "./NewComment";
import classes from "./Comments.module.css";
import { EventComment } from "../../models/event";

export interface CommentsProps {
  eventId: string | number;
}

function Comments(props: CommentsProps) {
  const { eventId } = props;

  const { showNotification, hideNotification } = useContext(
    NotificationContext
  );
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<EventComment[]>([]);

  useEffect(() => {
    async function fetchComments() {
      showNotification({
        title: "Loading...",
        message: "Loading comments",
        status: "pending",
      });

      try {
        const response = await fetch(`/api/event-comment/${eventId}`);

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Something went wrong!");
        }

        const data = await response.json();

        hideNotification();
        setComments(data.comments);
      } catch (error) {
        showNotification({
          title: "Error!",
          message: error.message || "Something went wrong!",
          status: "error",
        });
      }
    }

    if (showComments) fetchComments();
  }, [showComments]);

  function toggleCommentsHandler() {
    setShowComments(prevStatus => !prevStatus);
  }

  async function addCommentHandler(commentData: EventComment) {
    showNotification({
      title: "Loading...",
      message: "Sending comment",
      status: "pending",
    });

    try {
      const response = await fetch(`/api/event-comment/${eventId}`, {
        method: "POST",
        body: JSON.stringify({ comment: commentData }),
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong!");
      }

      const data = await response.json();
      setComments(currentComments => [data.comment, ...currentComments]);
      showNotification({
        title: "Success!",
        message: "Your comment is available",
        status: "success",
      });
    } catch (error) {
      showNotification({
        title: "Error!",
        message: error.message || "Something went wrong!",
        status: "error",
      });
    }
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
