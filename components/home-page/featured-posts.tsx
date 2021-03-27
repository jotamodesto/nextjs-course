import { Post } from "../../models/post";
import PostsGrid from "../posts/posts-grid";
import classes from "./featured-posts.module.css";

export interface FeaturedPostsProps {
  posts: Post[];
}

function FeaturedPosts({ posts }: FeaturedPostsProps) {
  return (
    <section className={classes.latest}>
      <h2>Posts em destaque</h2>
      <PostsGrid posts={posts} />
    </section>
  );
}

export default FeaturedPosts;
