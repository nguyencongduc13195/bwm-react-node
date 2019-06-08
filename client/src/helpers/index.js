import * as moment from "moment";
export const isShared = shared => (shared ? "Shared" : "Entire");
export const capitalLetter = string => {
  const arr = string.split(" ");
  return arr.map(val => val.charAt(0).toUpperCase() + val.slice(1));
};
export const getRangeOfDates = (startAt, endAt, dateFormat = "YYYY/MM/DD") => {
  const tempDates = [];
  const mEndAt = moment(endAt);
  let mStartAt = moment(startAt);
  while (mStartAt < mEndAt) {
    tempDates.push(mStartAt.format(dateFormat));
    mStartAt = mStartAt.add(1, "day");
  }
  tempDates.push(mEndAt.format(dateFormat));
  return tempDates;
};
