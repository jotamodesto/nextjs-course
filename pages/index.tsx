import { GetStaticProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

import { Event } from "../models/event";
import { getFeaturedEvents } from "../helper/api-util";

import EventList from "../components/events/EventList";
import EventsSearch from "../components/events/EventsSearch";
import NewsletterRegistration from "../components/input/NewsletterRegistration";

export interface HomePageProps {
  featuredEvents: Event[];
}

function HomePage({ featuredEvents }: HomePageProps) {
  const router = useRouter();

  function findEventsHandler(year: string, month: string) {
    const fullPath = `/events/${year}/${month}`;

    router.push(fullPath);
  }

  return (
    <>
      <Head>
        <title>NextJS Events</title>
        <meta name="description" content="Find a lot of great events" />
      </Head>
      <EventsSearch onSearch={findEventsHandler} />
      <NewsletterRegistration />
      <EventList items={featuredEvents} />
    </>
  );
}

export default HomePage;

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  const featuredEvents = await getFeaturedEvents();

  return { props: { featuredEvents }, revalidate: 1800 };
};
