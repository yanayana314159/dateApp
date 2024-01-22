"use client";

type Props = {
  user_schedule: [{ title: string; start: Date; end: Date }];
  lover_schedule: [{ title: string; start: Date; end: Date }];
};

const convertEvents = (events: any) => {
  const userEvents = [];
  for (const userEvent of events) {
    const title = userEvent.title;
    const startDate = new Date(userEvent.start).toLocaleString("ja-JP", {
      timeZone: "Asia/Tokyo",
    });
    const endDate = new Date(userEvent.end).toLocaleString("ja-JP", {
      timeZone: "Asia/Tokyo",
    });
    userEvents.push({ title, startDate, endDate });
  }
  return userEvents;
  //
};
export default function ScheduleAdjustment(props: Props) {
  const userSchedule = props.user_schedule;
  const loverSchedule = props.lover_schedule;

  //startとendがStringになっているのでDate型に変換して扱いやすいようにする
  console.log(userSchedule);
  //ユーザーの予定をDate型に変換
  const userEvents = convertEvents(userSchedule);
  //恋人の予定をDate型に変換
  const loverEvents = convertEvents(loverSchedule);
  //console.log(userEvents);
  //console.log(loverEvents);

  /*

  for (const userEvent of userSchedule) {
    for (const loverEvent of loverSchedule) {
      if (userEvent.start === loverEvent.start) {
        return (
          <>
            <br />
          </>
        );
      }
    }
  }
  */

  return <></>;
}

/*
<a>{JSON.stringify(user_schedule)}</a>
      <br />
      <a>{JSON.stringify(lover_schedule)}</a>
*/
