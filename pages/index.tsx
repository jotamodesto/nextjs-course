import React from "react";
import FeaturedPosts from "../components/home-page/featured-posts";
import Hero from "../components/home-page/hero";

const DUMMY_POSTS = [
  {
    slug: "getting-started-with-next-js",
    title: "Getting started with NextJS",
    image: "getting-started-nextjs.png",
    excerpt:
      "NextJS is the React framework for production - it makes building fullstack React apps and sites a breeze and ships with build-in SSR.",
    date: "2022-02-10",
  },
  {
    slug: "getting-started-with-next-js2",
    title: "Getting started with NextJS",
    image: "getting-started-nextjs.png",
    excerpt:
      "NextJS is the React framework for production - it makes building fullstack React apps and sites a breeze and ships with build-in SSR.",
    date: "2022-02-10",
  },
  {
    slug: "getting-started-with-next-js3",
    title: "Getting started with NextJS",
    image: "getting-started-nextjs.png",
    excerpt:
      "NextJS is the React framework for production - it makes building fullstack React apps and sites a breeze and ships with build-in SSR.",
    date: "2022-02-10",
  },
  {
    slug: "getting-started-with-next-js4",
    title: "Getting started with NextJS",
    image: "getting-started-nextjs.png",
    excerpt:
      "NextJS is the React framework for production - it makes building fullstack React apps and sites a breeze and ships with build-in SSR.",
    date: "2022-02-10",
  },
];

function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedPosts posts={DUMMY_POSTS} />
    </>
  );
}

export default HomePage;
