import React, { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "../../lib/database.types";
import FullCalendarPage from "./fullCalendar";
import { error } from "console";
import AuthButtonServer from "./authButtonServer";

//フォーム送信用のデータ型
type FormData = {
  schedule: string;
};

type Props = {
  user_id: string;
};

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

const postCalendar = async (postCalendarData: FormData, user_id: string) => {
  const res = await fetch(`http://localhost:3000/api/postcalendar/${user_id}`, {
    method: "PUT",
    body: JSON.stringify(postCalendarData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  //console.log(res);
  return res.json;
};

export default async function GetCalendarForm(props: Props) {
  const user_id = props.user_id;
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
    //カレンダーからイベントを取得する処理
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
    //カレンダー情報の処理
    eventsData = toEventsData(events);

    // console.log(eventsData);
    const postCalendarData: FormData = {
      schedule: eventsData,
    };
    //console.log(postCalendarData);
    //console.log(postCalendarData.schedule);
    //イベントデータの送信
    const result = await postCalendar(postCalendarData, user_id);
  } catch (e: any) {
    errorMessage = e.message;
    //console.log(e);
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

/*
  const onSubmit = async (data: FormData) => {
      toast.loading("投稿中です", { id: "1" });
      await postLoverID(data);
      setLover_email(data.lover_email);
      toast.success("投稿に成功しました", { id: "1" });
      router.refresh();
    }
  };

alert(JSON.stringify(data));で
{"lover_email":"jaa37474@gmail.com"}


eventadata=[
  {
    title: 'XXX',
    start: '2021-01-27T00:00:00.000Z',
    end: '2021-01-28T00:00:00.000Z'
  },
  {
    title: 'XXXX',
    start: '2021-05-02T00:00:00.000Z',
    end: '2021-05-03T00:00:00.000Z'
  }
];
*/
