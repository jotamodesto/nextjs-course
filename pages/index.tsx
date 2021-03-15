import { useRouter } from "next/router";

import EventList from "../components/events/EventList";
import EventsSearch from "../components/events/EventsSearch";

import { getFeaturedEvents } from "../dummy-data";

function HomePage() {
  const router = useRouter();

  const featuredEvents = getFeaturedEvents();

  function findEventsHandler(year: string, month: string) {
    const fullPath = `/events/${year}/${month}`;

    router.push(fullPath);
  }

  return (
    <>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={featuredEvents} />
    </>
  );
}

export default HomePage;
