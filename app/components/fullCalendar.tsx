"use client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import jaLocale from "@fullcalendar/core/locales/ja";

type ItemProps = {
  event: any;
};

const FullCalendarPage = ({ event }: ItemProps) => {
  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        eventTimeFormat={{
          hour: "numeric",
          minute: "2-digit",
          omitZeroMinute: false,
          meridiem: "short",
        }}
        handleWindowResize={true}
        displayEventEnd={true}
        locales={[jaLocale]}
        locale="ja"
        allDayText="終日"
        events={event}
      />
    </>
  );
};

export default FullCalendarPage;
