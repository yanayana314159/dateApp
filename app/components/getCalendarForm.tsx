import React, { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "../../lib/database.types";
import FullCalendarPage from "./fullCalendar";
import { error } from "console";
import AuthButtonServer from "./authButtonServer";

const toEventsData = (events: any) => {
  return events?.items?.map(
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
};

export default async function GetCalendarForm() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const currentDate = new Date();
  const timeMin = currentDate.toISOString();
  const params = new URLSearchParams({ timeMin });
  let eventsData = null;
  let errorMessage = null;

  const {
    data: { session },
  } = await supabase.auth.getSession();
  const provider_token = session?.provider_token;

  try {
    const response = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/primary/events?${params}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${provider_token}`,
        },
      }
    );

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(`Failed to fetch events: ${errorResponse.error.message}`);
    }

    const events: any | null = await response.json();
    eventsData = toEventsData(events);
  } catch (e: any) {
    console.error(e);
    errorMessage = e.message;
  }

  return (
    <>
      <p>カレンダー情報</p>

      {eventsData ? (
        <FullCalendarPage event={eventsData} />
      ) : (
        <>
          <p>
            カレンダー情報がありません。ログアウトしてから再度ログインをお願いします。
          </p>
          <br />
          {errorMessage && <p>エラーが発生しました</p>}
          <AuthButtonServer />
        </>
      )}
    </>
  );
}
