import { EventComment } from "../../models/event";
import classes from "./CommentList.module.css";

export interface CommentListProps {
  comments: EventComment[];
}

function CommentList({ comments }: CommentListProps) {
  return (
    <ul className={classes.comments}>
      {comments.map(comment => (
        <li key={comment._id}>
          <p>{comment.text}</p>
          <div>
            By <address>{comment.name}</address>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default CommentList;
