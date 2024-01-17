"use client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

type ItemProps = {
  event: any;
};

const FullCalendarPage = ({ event }: ItemProps) => {
  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={event}
      />
    </>
  );
};

export default FullCalendarPage;
