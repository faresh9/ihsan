// src/components/CalendarView/index.js
import { useEffect, useState } from "react";
import ChevronLeftIcon from "@heroicons/react/24/solid/ChevronLeftIcon";
import ChevronRightIcon from "@heroicons/react/24/solid/ChevronRightIcon";
import moment from "moment";
import { CALENDAR_EVENT_STYLE } from "./util";

const THEME_BG = CALENDAR_EVENT_STYLE;

function CalendarView({ calendarEvents, addNewEvent, openDayDetail, onDeleteEvent }) {
  const today = moment().startOf('day');
  const weekdays = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const colStartClasses = [
    "",
    "col-start-2",
    "col-start-3",
    "col-start-4",
    "col-start-5",
    "col-start-6",
    "col-start-7",
  ];

  const [firstDayOfMonth, setFirstDayOfMonth] = useState(moment().startOf('month'));
  const [events, setEvents] = useState([]);
  const [currMonth, setCurrMonth] = useState(() => moment(today).format("MMM-yyyy"));

  useEffect(() => {
    setEvents(calendarEvents);
  }, [calendarEvents]);

  const allDaysInMonth = () => {
    let start = moment(firstDayOfMonth).startOf('week');
    let end = moment(firstDayOfMonth).endOf('month').endOf('week');
    const days = [];
    let day = start;

    while (day <= end) {
      days.push(day.toDate());
      day = day.clone().add(1, 'd');
    }
    return days;
  };

  const getEventsForCurrentDate = (date) => {
    let filteredEvents = events.filter((e) => moment(date).isSame(moment(e.date), 'day'));
    if (filteredEvents.length > 2) {
      let originalLength = filteredEvents.length;
      filteredEvents = filteredEvents.slice(0, 2);
      filteredEvents.push({ title: `${originalLength - 2} more`, theme: "MORE" });
    }
    return filteredEvents;
  };

  const openAllEventsDetail = (date, theme) => {
    if (theme !== "MORE") return;
    let filteredEvents = events.filter((e) => moment(date).isSame(moment(e.date), 'day')).map((e) => ({ title: e.title, theme: e.theme }));
    openDayDetail({ filteredEvents, title: moment(date).format("D MMM YYYY") });
  };

  const isToday = (date) => moment(date).isSame(moment(), 'day');
  const isDifferentMonth = (date) => moment(date).month() !== moment(firstDayOfMonth).month();

  const getPrevMonth = () => {
    const firstDayOfPrevMonth = moment(firstDayOfMonth).add(-1, 'M').startOf('month');
    setFirstDayOfMonth(firstDayOfPrevMonth);
    setCurrMonth(moment(firstDayOfPrevMonth).format("MMM-yyyy"));
  };

  const getCurrentMonth = () => {
    const firstDayOfCurrMonth = moment().startOf('month');
    setFirstDayOfMonth(firstDayOfCurrMonth);
    setCurrMonth(moment(firstDayOfCurrMonth).format("MMM-yyyy"));
  };

  const getNextMonth = () => {
    const firstDayOfNextMonth = moment(firstDayOfMonth).add(1, 'M').startOf('month');
    setFirstDayOfMonth(firstDayOfNextMonth);
    setCurrMonth(moment(firstDayOfNextMonth).format("MMM-yyyy"));
  };

  return (
    <div className="w-full bg-base-100 p-4 rounded-lg">
      <div className="flex items-center justify-between">
        <div className="flex justify-normal gap-2 sm:gap-4">
          <p className="font-semibold text-xl w-48">
            {moment(firstDayOfMonth).format("MMMM yyyy")}<span className="text-xs ml-2">Beta</span>
          </p>
          <button className="btn btn-square btn-sm btn-ghost" onClick={getPrevMonth}><ChevronLeftIcon className="w-5 h-5" /></button>
          <button className="btn btn-sm btn-ghost normal-case" onClick={getCurrentMonth}>Current Month</button>
          <button className="btn btn-square btn-sm btn-ghost" onClick={getNextMonth}><ChevronRightIcon className="w-5 h-5" /></button>
        </div>
        <div>
          <button className="btn btn-sm btn-ghost btn-outline normal-case" onClick={() => addNewEvent(moment())}>Add New Event</button>
        </div>
      </div>
      <div className="w-full grid grid-cols-7 mt-4">
        {weekdays.map((weekday, idx) => (
          <div key={idx} className="py-2">
            <p className="uppercase text-sm text-center">{weekday}</p>
          </div>
        ))}
      </div>
      <div className="w-full grid grid-cols-7 gap-y-1">
        {allDaysInMonth().map((day, idx) => (
          <div key={idx} className={`h-24 border border-base-300 p-1 flex flex-col ${idx < 7 ? colStartClasses[moment(day).day()] : ""}`}>
            <div className="flex justify-between items-center">
              <p
                className={`inline-block flex items-center justify-center h-8 w-8 rounded-full mx-1 mt-1 text-sm cursor-pointer hover:bg-base-300 ${isToday(day) && "bg-blue-100"} ${isDifferentMonth(day) && "text-slate-400"}`}
                onClick={() => addNewEvent(day)}
              >
                {moment(day).format("D")}
              </p>
            </div>
            {getEventsForCurrentDate(day).map((event, i) => (
              <div
                key={i}
                className={`inline-flex items-center p-1 mt-1 rounded-lg text-xs cursor-pointer truncate text-white ${THEME_BG[event.theme]}`}
                onClick={() => openAllEventsDetail(day, event.theme)}
              >
                <span className="flex-grow truncate">{event.title}</span>
                {event.theme !== "MORE" && (
                  <button className="btn btn-xs btn-circle btn-outline ml-1" onClick={(e) => { e.stopPropagation(); onDeleteEvent(event.id); }}>✕</button>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CalendarView;
