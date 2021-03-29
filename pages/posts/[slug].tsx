import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import PostContent from "../../components/posts/post-detail/post-content";
import { getPostData, getPostsFiles } from "../../lib/posts-util";
import { Post } from "../../models/post";

interface PostDetailPageProps {
  post: Post;
}

function PostDetailPage({ post }: PostDetailPageProps) {
  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.excerpt} />
      </Head>
      <PostContent post={post} />
    </>
  );
}

export default PostDetailPage;

export const getStaticProps: GetStaticProps<PostDetailPageProps> = async context => {
  const { params } = context;
  const slug = params.slug as string;

  const postData = getPostData(slug);

  return {
    props: {
      post: postData,
    },
    revalidate: 600,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const postsFiles = getPostsFiles();
  const slugsPaths = postsFiles.map(fileName => {
    const slug = fileName.replace(/\.md$/, "");

    return { params: { slug } };
  });

  return {
    paths: slugsPaths,
    fallback: false,
  };
};
