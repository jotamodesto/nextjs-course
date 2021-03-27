import PostsGrid from "./posts-grid";
import classes from "./all-posts.module.css";
import { Post } from "../../models/post";

export interface AllPostsProps {
  posts: Post[];
}

function AllPosts({ posts }: AllPostsProps) {
  return (
    <section className={classes.posts}>
      <h1>Todas as postagens</h1>
      <PostsGrid posts={posts} />
    </section>
  );
}

export default AllPosts;
