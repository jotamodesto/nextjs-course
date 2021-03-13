import { Event } from "../../models/event";
import EventItem from "./EventItem";

import styles from "./EventList.module.css";

export interface EventListProps {
  items: Event[];
}

function EventList({ items }: EventListProps) {
  return (
    <ul className={styles.list}>
      {items.map(event => (
        <EventItem
          key={event.id}
          id={event.id}
          title={event.title}
          location={event.location}
          date={event.date}
          image={event.image}
        />
      ))}
    </ul>
  );
}

export default EventList;
