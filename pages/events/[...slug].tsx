import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import useSWR from "swr";

import { getFilteredEvents, convertEventsToArray } from "../../helper/api-util";
import { FIREBASE_EVENTS } from "../../helper/constants";
import { Event } from "../../models/event";

import EventList from "../../components/events/EventList";
import ResultsTitle from "../../components/events/ResultsTitle";
import Button from "../../components/ui/Button";
import ErrorAlert from "../../components/ui/ErrorAlert";

export interface FilteredEventsProps {
  filteredEvents: Event[];
  date: { year: number; month: number };
  hasError?: boolean;
}

function FilteredEventsPage() {
  const { query } = useRouter();

  const [events, setEvents] = useState<Event[]>();

  const filteredData = query.slug as string[];

  const { data, error } = useSWR(FIREBASE_EVENTS);

  useEffect(() => {
    if (data) {
      const convertedEvents = convertEventsToArray(data);

      setEvents(convertedEvents);
    }
  }, [data]);

  if (!events) {
    return <p className="center">Loading...</p>;
  }

  const [year, month] = filteredData;
  const numYear = +year;
  const numMonth = +month;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12 ||
    error
  ) {
    return (
      <>
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show all events</Button>
        </div>
      </>
    );
  }

  const filteredEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === numYear &&
      eventDate.getMonth() === numMonth - 1
    );
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <>
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show all events</Button>
        </div>
      </>
    );
  }

  const date = new Date(numYear, numMonth - 1);

  return (
    <>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </>
  );
}

export default FilteredEventsPage;

// export const getServerSideProps: GetServerSideProps = async context => {
//   const { params } = context;

//   const filterData = params.slug as string[];

//   const [filteredYear, filteredMonth] = filterData;
//   const numYear = parseInt(filteredYear, 10);
//   const numMonth = parseInt(filteredMonth, 10);

//   if (
//     isNaN(numYear) ||
//     isNaN(numMonth) ||
//     numYear > 2030 ||
//     numYear < 2021 ||
//     numMonth < 1 ||
//     numMonth > 12
//   ) {
//     return {
//       props: { hasError: true },
//     };
//   }

//   const filteredEvents = await getFilteredEvents({
//     year: numYear,
//     month: numMonth,
//   });

//   return {
//     props: { filteredEvents, date: { year: numYear, month: numMonth } },
//   };
// };
