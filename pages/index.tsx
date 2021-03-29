import { GetStaticProps } from "next";
import Head from "next/head";
import React from "react";
import FeaturedPosts from "../components/home-page/featured-posts";
import Hero from "../components/home-page/hero";

interface HomePageProps {
  posts: Post[];
}

import { getFeaturedPosts } from "../lib/posts-util";
import { Post } from "../models/post";

function HomePage({ posts }: HomePageProps) {
  return (
    <>
      <Head>
        <title>Blog do Johnatan</title>
        <meta
          name="description"
          content="Eu falo sobre programação e desenvolvimento web"
        />
      </Head>
      <Hero />
      <FeaturedPosts posts={posts} />
    </>
  );
}

export default HomePage;

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  const featuredPosts = getFeaturedPosts();

  return {
    props: { posts: featuredPosts },
  };
};
