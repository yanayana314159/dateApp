"use client";

type Props = {
  user_schedule: [{ title: string; start: Date; end: Date }];
  lover_schedule: [{ title: string; start: Date; end: Date }];
};

const convertEvents = (events: any) => {
  const userEvents = [];
  for (const userEvent of events) {
    const title = "";
    const start = new Date(userEvent.start);
    const end = new Date(userEvent.end);
    userEvents.push({ title, start, end });
  }
  return userEvents;
  //
};
export default function ScheduleAdjustment(props: Props) {
  const userSchedule = props.user_schedule;
  const loverSchedule = props.lover_schedule;

  //startとendがStringになっているのでDate型に変換して扱いやすいようにする

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

  return (
    <>
      <a>{JSON.stringify(userEvents)}</a>
    </>
  );
}

/*
<a>{JSON.stringify(user_schedule)}</a>
      <br />
      <a>{JSON.stringify(lover_schedule)}</a>
*/
