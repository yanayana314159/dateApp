"use client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridDay from "@fullcalendar/timegrid";
import jaLocale from "@fullcalendar/core/locales/ja";

type ItemProps = {
  event: any;
};

const FullCalendarReservationPage = ({ event }: ItemProps) => {
  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridWeek"
        eventTimeFormat={{
          hour: "numeric",
          minute: "2-digit",
          omitZeroMinute: false,
          meridiem: "short",
        }}
        handleWindowResize={true}
        displayEventEnd={true}
        locales={[jaLocale]}
        slotLabelFormat={{
          hour: "numeric",
          minute: "2-digit",
          omitZeroMinute: false,
          meridiem: "short",
        }}
        locale="ja"
        allDayText="終日"
        events={event}
      />
    </>
  );
};

export default FullCalendarReservationPage;
