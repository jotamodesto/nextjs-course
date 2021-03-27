import { GetStaticProps } from "next";
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
