import { useCallback, useEffect, useState } from "react";
import { getWeekDays } from "../../utils/getWeekDays";
import moment from "moment";

export const Calendar = () => {
  const agenda = [
    {
      name: "teste",
      startHour: 10,
      endHour: 11,
      date: "2022-08-23",
      color: "yellow",
    },
    {
      name: "teste 2",
      startHour: 0,
      endHour: 4,
      date: "2022-09-01",
      color: "purple",
    },
  ];

  const [weekDays, setWeekDays] = useState([]);
  const [currentDate, setCurrentDate] = useState(moment().format());
  console.log(weekDays);
  useEffect(() => {
    const days = getWeekDays(moment(currentDate)).reduce((acc, curr, idx) => {
      return [
        ...acc,
        {
          ...curr,
          calendar: agenda.find((compromise) =>
            moment(compromise.date, "YYYY-MM-DD").isSame(
              moment(curr.fullDate, "YYYY-MM-DD")
            )
          ),
        },
      ];
    }, []);

    setWeekDays(days);
  }, [currentDate]);

  const getNextWeek = useCallback(() => {
    setCurrentDate(moment(currentDate).add(7, "days").format());
  }, [currentDate]);

  const getLastWeek = useCallback(() => {
    setCurrentDate(moment(currentDate).subtract(7, "days").format());
  }, [currentDate]);

  const hours = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23,
  ];
  console.log(moment().format());

  return (
    <div>
      <button onClick={getLastWeek}>semana anterior</button>
      <button onClick={getNextWeek}>proxima semana</button>

      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-evenly",
        }}
      >
        <div style={{ display: "block", marginTop: 80 }}>
          {hours.map((hour) => (
            <div
              key={`hour-${hour}`}
              style={{
                height: 40,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <p>{hour}</p>
            </div>
          ))}
        </div>
        {weekDays.map((day, idx) => {
          return (
            <>
              <div
                style={{
                  display: "block",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: 80,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <p
                    key={`week-day-${idx}`}
                    style={
                      day.isToday
                        ? {
                            color: "red",
                          }
                        : {}
                    }
                  >
                    {day.weekDayName}
                  </p>
                  <p
                    key={`date-${idx}`}
                    style={
                      day.isToday
                        ? {
                            color: "red",
                          }
                        : {}
                    }
                  >
                    {day.date}
                  </p>
                </div>

                {hours.map((hour, idx) => {
                  console.log(day?.calendar?.start);
                  return (
                    <span
                      key={`hour-${day.date}-${idx}`}
                      style={{
                        display: "block",
                        width: "100%",
                        height: 40,
                        borderColor: "black",
                        borderWidth: 0.5,
                        borderStyle: "solid",
                        margin: 0,
                        padding: 0,
                        backgroundColor:
                          day?.calendar?.startHour <= hour &&
                          day?.calendar?.endHour >= hour &&
                          day?.calendar?.color,
                      }}
                    />
                  );
                })}
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};
