import dayjs, { Dayjs } from "dayjs";

export const formatDateUTC = (date: Dayjs | null) => {
  return dayjs.tz(dayjs(date).utc().format(), dayjs.tz.guess()).format();
};
