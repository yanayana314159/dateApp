// FullCalendarReservationPage.js
import React, { useEffect, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import jaLocale from "@fullcalendar/core/locales/ja";

type ItemProps = {
  event: any;
};

const FullCalendarReservationPage = ({ event }: ItemProps) => {
  const calendarRef = useRef<FullCalendar>(null);

  useEffect(() => {
    const currentCalendar = calendarRef.current;

    if (currentCalendar) {
      // FullCalendar コンポーネントが初期化された後の処理
      const api = currentCalendar.getApi();
      //const calendarEl = api.el;

      // ここで calendarEl を使用できます
      //console.log(calendarEl);

      // 例えば、カレンダーの高さを変更する場合
      // calendarEl.style.height = "500px";
    }
  }, [calendarRef]);

  return (
    <>
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin]}
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
        // 15分ごとのslot
        slotDuration={"00:15"}
        // 1時間ごとにラベルを表示
        slotLabelInterval={"01:00"}
        locale="ja"
        allDayText="終日"
        events={event}
      />
    </>
  );
};

export default FullCalendarReservationPage;
