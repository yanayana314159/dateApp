import { string } from "yargs";

export default function calculateFreeTime(events: any) {
  // 取得したカレンダーから空き時間を2進数形式で抽出
  const bitEmptyTimeOfDays = calculateEmptyTimeOfDays(events);

  // Date形式に戻す
  const emptyTimeOfDays = changeBitToDate(bitEmptyTimeOfDays);
  // 出力
  const freeTime = displayDays(emptyTimeOfDays);

  return freeTime;

  // 日毎に、空き時間が「10:00-11:30,14:15-15:45」のような形式で出力される
}

/**
 * 空き日程をbit形式で返却
 */

function calculateEmptyTimeOfDays(events: { start: Date; end: Date }[]) {
  const bitDays: [string, string] = [];

  events.map((event) => {
    const bitDay = changeDateToBit(event);
    const { key, value }: { key: string; value: string } = bitDay;

    if (bitDays[key] !== undefined) {
      // 論理和を取る
      // 追記：BigInt型にキャストして演算を行う
      bitDays[key] =
        "0b" +
        (BigInt(bitDays[key]) | BigInt(value)).toString(2).padStart(56, "0");
    } else {
      bitDays[key] = value;
    }
  });

  return bitDays;
}

/**
 * bit形式に変換
 * @return {"key": key, "value": value}, key = 日付, value = bit
 * bit定義 → 15分区切りで表現、0 = 予定なし、1 = 予定あり
 * 例（_は実際には含まれない）：11:00-12:15予定あり → 「0000_0000_1111_1000_0000_0000_0000_0000_0000_0000_0000」
 * 4 * 11 = 44bit→56bit
 */
function changeDateToBit(event: { start: Date; end: Date }) {
  const start = event.start;
  const end = event.end;

  // 対象の時間
  const clockIn = new Date(
    start.getFullYear(),
    start.getMonth(),
    start.getDate(),
    9,
    0
  );
  const clockOut = new Date(
    start.getFullYear(),
    start.getMonth(),
    start.getDate(),
    23,
    0
  );

  let dateBit: string = "0b";
  let checkDuration = new Date(clockIn);

  for (let i = 0; i < 56; i++) {
    if (start <= checkDuration && checkDuration < end) {
      dateBit += "1";
    } else {
      dateBit += "0";
    }

    if (checkDuration >= clockOut) {
      break;
    }
    checkDuration.setMinutes(checkDuration.getMinutes() + 15);
  }

  const dateKey: string = getDateLabel(start);
  return { key: dateKey, value: dateBit };
}

/**
 * Bit形式の日付をDate型に戻す
 * @return {<日付> : {"start": <日時>, "end": <日時>}[]}[]
 */
function changeBitToDate(bitDays: [string, string]) {
  const freeTimes = {};

  Object.keys(bitDays).forEach((key) => {
    // 先頭の「0b」除去
    const dateBit = bitDays[key].replace(/^0b/, "");

    // 範囲の始点を設定
    const clockIn = new Date(key);
    clockIn.setHours(9);
    clockIn.setMinutes(0);

    let start;
    let end;
    const freeDurations = [];
    for (let i = 0; i < dateBit.length; i++) {
      const bit = dateBit.charAt(i);
      if (!start) {
        if (bit === "0") {
          start = new Date(clockIn);
          start.setMinutes(start.getMinutes() + 15 * i);
        }
      } else {
        if (bit === "1" || i === dateBit.length - 1) {
          if (bit === "1") {
            end = new Date(clockIn);
            end.setMinutes(end.getMinutes() + 15 * i);
          } else {
            end = new Date(clockIn);
            end.setMinutes(end.getMinutes() + 15 * (i + 1));
          }
          freeDurations.push({
            start: getDateTimeLabel(start),
            end: getDateTimeLabel(end),
          });
          // リセット
          start = undefined;
          end = undefined;
        }
      }
    }
    freeTimes[key] = freeDurations;
  });

  return freeTimes;
}

/**
 * 日時をシートに表示
 * @param days {<日付> : {"start": <日時>, "end": <日時>}[]}[]
 */
function displayDays(days) {
  const freeTime = [];
  Object.keys(days).forEach((key, i) => {
    let value = "";
    days[key].forEach((e) => {
      value += `${e.start}-${e.end}` + ",";
    });
    // 出力
    freeTime.push(value.slice(0, -1));
  });
  return freeTime;
}

/**
 * YYYY/MM/DDを返す
 */
function getDateLabel(date) {
  return `${date.getFullYear()}/${("0" + (date.getMonth() + 1)).slice(-2)}/${(
    "0" + date.getDate()
  ).slice(-2)}`;
}

/**
 * hh:mmを返す
 */
function getTimeLabel(date) {
  return `${("0" + date.getHours()).slice(-2)}:${(
    "0" + date.getMinutes()
  ).slice(-2)}`;
}

/**
 * YYYY/MM/DD hh:mmを返す
 */
function getDateTimeLabel(date) {
  return `${date.getFullYear()}/${("0" + (date.getMonth() + 1)).slice(-2)}/${(
    "0" + date.getDate()
  ).slice(-2)} ${("0" + date.getHours()).slice(-2)}:${(
    "0" + date.getMinutes()
  ).slice(-2)}`;
}
