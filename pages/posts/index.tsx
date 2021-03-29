import { GetStaticProps } from "next";
import Head from "next/head";
import AllPosts from "../../components/posts/all-posts";
import { Post } from "../../models/post";
import { getAllPosts } from "../../lib/posts-util";

interface AllPostsPageProps {
  posts: Post[];
}

function AllPostsPage({ posts }: AllPostsPageProps) {
  return (
    <>
      <Head>
        <title>Todos os meus posts</title>
        <meta
          name="description"
          content="A lista dos meus posts sobre programação"
        />
      </Head>
      <AllPosts posts={posts} />
    </>
  );
}

export default AllPostsPage;

export const getStaticProps: GetStaticProps<AllPostsPageProps> = async () => {
  const allPosts = getAllPosts();

  return {
    props: { posts: allPosts },
  };
};
