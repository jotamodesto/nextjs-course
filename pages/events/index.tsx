import { GetStaticProps } from "next";
import { useRouter } from "next/router";

import { getAllEvents } from "../../helper/api-util";
import { Event } from "../../models/event";

import EventsSearch from "../../components/events/EventsSearch";
import EventList from "../../components/events/EventList";

export interface AllEventsProps {
  events: Event[];
}

function AllEventsPage({ events }: AllEventsProps) {
  const router = useRouter();

  function findEventsHandler(year: string, month: string) {
    const fullPath = `/events/${year}/${month}`;

    router.push(fullPath);
  }

  return (
    <>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </>
  );
}

export default AllEventsPage;

export const getStaticProps: GetStaticProps = async () => {
  const events = await getAllEvents();

  return { props: { events }, revalidate: 60 };
};
