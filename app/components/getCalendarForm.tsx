import React, { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "../../lib/database.types";
import FullCalendarPage from "./fullCalendar";

export default async function GoogleCalenderform() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const currentDate = new Date();
  const timeMin = currentDate.toISOString();
  const params = new URLSearchParams({ timeMin });

  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) {
    //セッションがない場合にはauthに飛びます.展望：このセッションを切り出して使えるようにする．
    redirect("/userpage/auth");
  }
  const provider_token = session?.provider_token;
  const events: any | null = await (
    await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/primary/events?${params}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${provider_token}`,
        },
      }
    )
  ).json();

  const eventsData = events?.items?.map(
    (event: { summary: String; start: any; end: any }) => {
      //日付の処理を行う
      const startDateTime = event.start.dateTime
        ? new Date(event.start.dateTime).toLocaleString("ja-JP", {
            timeZone: "Asia/Tokyo",
          })
        : null;
      const startDate = event.start.date ? new Date(event.start.date) : null;
      const endDateTime = event.end.dateTime
        ? new Date(event.end.dateTime).toLocaleString("ja-JP", {
            timeZone: "Asia/Tokyo",
          })
        : null;
      const endDate = event.end.date ? new Date(event.end.date) : null;

      return {
        title: event.summary,
        start: startDateTime ? new Date(startDateTime) : startDate,
        end: endDateTime ? new Date(endDateTime) : endDate,
      };
    }
  );

  return (
    <>
      <p>カレンダー情報</p>

      <FullCalendarPage event={eventsData} />
    </>
  );
}

/*
  <p suppressHydrationWarning={true}>{JSON.stringify(eventsData)}</p>

*/
