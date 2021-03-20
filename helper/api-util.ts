import { FIREBASE_EVENTS } from "./constants";

import { Event } from "../models/event";

export async function getAllEvents() {
  const response = await fetch(FIREBASE_EVENTS);
  const eventsData = await response.json();

  const events = convertEventsToArray(eventsData);
  return events;
}

export async function getFeaturedEvents() {
  const response = await fetch(
    `${FIREBASE_EVENTS}?orderBy="isFeatured"&equalTo=true`
  );
  const eventsData = await response.json();

  const featuredEvents = convertEventsToArray(eventsData);
  return featuredEvents;
}

export async function getEventById(eventId: string) {
  const response = await fetch(
    `${FIREBASE_EVENTS}?orderBy="$key"&equalTo="${eventId}"`
  );
  const eventsData = await response.json();

  const events = convertEventsToArray(eventsData);

  if (events.length > 0) return events[0];

  return null;
}

export async function getFilteredEvents(filter: {
  year: number;
  month: number;
}) {
  const { year, month } = filter;

  const allEvents = await getAllEvents();

  const filteredEvents = allEvents.filter(event => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
}

export function convertEventsToArray(eventsData: any) {
  const events: Event[] = [];
  for (const key in eventsData) {
    events.push({
      ...eventsData[key],
      id: key,
    });
  }

  return events;
}
