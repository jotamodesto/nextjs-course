import { GetStaticPaths, GetStaticProps } from "next";

import { getEventById, getFeaturedEvents } from "../../helper/api-util";
import { Event } from "../../models/event";

import EventSummary from "../../components/event-detail/EventSummary";
import EventLogistics from "../../components/event-detail/EventLogistics";
import EventContent from "../../components/event-detail/EventContent";
import ErrorAlert from "../../components/ui/ErrorAlert";

export interface EventDetailProps {
  event: Event;
}

function EventDetailPage({ event }: EventDetailProps) {
  if (!event) {
    return (
      <>
        <ErrorAlert>
          <p>No event found!</p>
        </ErrorAlert>
      </>
    );
  }

  return (
    <>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </>
  );
}

export default EventDetailPage;

export const getStaticProps: GetStaticProps = async context => {
  const { eventId } = context.params;

  const event = await getEventById(eventId as string);

  return { props: { event }, revalidate: 60 };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const events = await getFeaturedEvents();
  const paths = events.map(event => ({
    params: { eventId: event.id.toString() },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};
