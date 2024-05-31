import React from "react";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import dayjs from "dayjs";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = dayjsLocalizer(dayjs);

function CalenderComponent({ onDateClick, entries }) {
  const events = Object.keys(entries).flatMap((date) =>
    entries[date].map((entry, index) => ({
      title: entry.heading,
      start: new Date(date),
      end: new Date(date),
      allDay: true,
      id: `${date}-${index}`,
    }))
  );

  const handleSelectEvent = (event) => {
    onDateClick(event.start);
  };

  const eventStyleGetter = (event) => {
    const style = {
      backgroundColor: "#C3A8E1",
      borderRadius: "5px",
      opacity: 0.8,
      color: "white",
      border: "0px",
      display: "block",
    };
    return {
      style: style,
    };
  };

  return (
    <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
      selectable
      onSelectSlot={(slotInfo) => onDateClick(slotInfo.start)}
      onSelectEvent={handleSelectEvent}
      eventPropGetter={eventStyleGetter}
    />
  );
}

export default CalenderComponent;
