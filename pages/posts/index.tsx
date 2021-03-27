import { GetStaticProps } from "next";
import AllPosts from "../../components/posts/all-posts";
import { Post } from "../../models/post";
import { getAllPosts } from "../../lib/posts-util";

interface AllPostsPageProps {
  posts: Post[];
}

function AllPostsPage({ posts }: AllPostsPageProps) {
  return <AllPosts posts={posts} />;
}

export default AllPostsPage;

export const getStaticProps: GetStaticProps<AllPostsPageProps> = async () => {
  const allPosts = getAllPosts();

  return {
    props: { posts: allPosts },
  };
};
