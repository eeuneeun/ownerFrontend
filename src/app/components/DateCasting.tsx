import React from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";

type Props = {};

export default function DateCasting(originalDate: string) {
  dayjs.extend(utc);
  dayjs.extend(timezone);

  const formatted = dayjs(originalDate)
    .tz("Asia/Seoul")
    .format("YYYY-MM-DD HH:mm");

  console.log(formatted); // 👉 "2025-08-17 21:43"
  return formatted;
}
