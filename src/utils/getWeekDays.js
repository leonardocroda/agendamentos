import moment from "moment";

export const getWeekDays = (currentDate = moment()) => {
  const weekStart = currentDate.clone().startOf("week");

  const days = Array.from(Array(7))
    .map((day, index) => index)
    .map((day) =>
      moment(weekStart).add(day, "days").set("minutes", 0).set("seconds", 0)
    )
    .map((momentObj) => ({
      date: momentObj.date(),
      weekDayName: momentObj.format("ddd"),
      isToday: momentObj.calendar().startsWith("Today"),
      fullDate: momentObj.format("YYYY-MM-DD"),
    }));

  return days;
};
