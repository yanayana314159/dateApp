"use client";
import calculateFreeTime from "./calculateFreeTime";
import FullCalendarReservationPage from "./fullCalendarReservation";

type Props = {
  user_schedule: [{ title: string; start: Date; end: Date }];
  lover_schedule: [{ title: string; start: Date; end: Date }];
};

const convertEvents = (userSchedule: any, loverSchedule: any) => {
  const Events = [];
  const today = new Date();
  const deadline = new Date();
  deadline.setDate(today.getDate() + 10);
  console.log(deadline);
  //ユーザーの情報を入れる
  for (const userEvent of userSchedule) {
    const start = new Date(userEvent.start);
    const end = new Date(userEvent.end);
    Events.push({ start, end });
  }
  //恋人の情報を入れる
  for (const loverEvent of loverSchedule) {
    const start = new Date(loverEvent.start);
    const end = new Date(loverEvent.end);
    Events.push({ start, end });
  }
  const sortedEvents = Events.sort(
    (a, b) => a.start.getTime() - b.start.getTime()
  );
  //イベントの始まりがdeadLine(10日後まで)より前で、イベントの終わりが今日以降のイベントを抽出
  const filterEvents = sortedEvents.filter(
    (event) => event.start <= deadline && event.end >= today
  );

  return filterEvents;
  //
};
//////////////////

//////////////////
export default function ScheduleAdjustment(props: Props) {
  const userSchedule = props.user_schedule;
  const loverSchedule = props.lover_schedule;

  //startとendがStringになっているのでDate型に変換して扱いやすいようにする

  //ユーザーの予定をDate型に変換
  const Events = convertEvents(userSchedule, loverSchedule);
  const { freeTime, fullcalendarData } = calculateFreeTime(Events);
  //myFunction(Events);
  //恋人の予定をDate型に変換
  //const loverEvents = convertEvents(loverSchedule);
  //console.log(userEvents);

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
      <div>
        <ul>
          {freeTime.map((date, i) => {
            return <li key={i}>{date}</li>;
          })}
        </ul>
      </div>
    </>
  );
}

/*
<a>{JSON.stringify(user_schedule)}</a>
      <br />
      <a>{JSON.stringify(lover_schedule)}</a>
              <ul>
          {x.map((date, i) => {
            return <li key={i}>{date}</li>;
          })}
        </ul>
               <FullCalendarReservationPage event={fullcalendarData} />
*/
