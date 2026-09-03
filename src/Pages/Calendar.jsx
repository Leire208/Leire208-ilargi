import { useState } from "react";

import SkyBackground from "../Components/SkyBackground";
import CalendarHeader from "../Components/Calendar/CalendarHeader";
import WeekCalendar from "../Components/Calendar/WeekCalendar";
import DayAgenda from "../Components/Calendar/DayAgenda";

import { useEvents } from "../Context/EventContext";
import { useTasks } from "../Context/TaskContext";
import { useSchedule } from "../Context/ScheduleContext";


function Calendar() {

  const [selectedDate, setSelectedDate] =
    useState(new Date());

  const [weekStart, setWeekStart] =
    useState(getMonday(new Date()));


  const { events } = useEvents();
  const { tasks } = useTasks();
  const { classes } = useSchedule();


  function previousWeek() {

    setWeekStart(prev => {

      const date = new Date(prev);

      date.setDate(
        date.getDate() - 7
      );

      return date;

    });

  }


  function nextWeek() {

    setWeekStart(prev => {

      const date = new Date(prev);

      date.setDate(
        date.getDate() + 7
      );

      return date;

    });

  }


  function goToday() {

    const today = new Date();

    setWeekStart(
      getMonday(today)
    );

    setSelectedDate(today);

  }


  return (

    <SkyBackground>

      <main
        className="
          min-h-screen
          max-w-6xl
          mx-auto
          px-4
          sm:px-6
          pt-6
          pb-44
        "
      >

        <CalendarHeader
          weekStart={weekStart}
          previousWeek={previousWeek}
          nextWeek={nextWeek}
          goToday={goToday}
        />


        <WeekCalendar
          weekStart={weekStart}
          classes={classes}
          events={events}
          tasks={tasks}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />


        <DayAgenda
          date={selectedDate}
          events={events}
          tasks={tasks}
          classes={classes}
        />

      </main>

    </SkyBackground>

  );

}


/* -------------------------------- */
/* Helpers */
/* -------------------------------- */

function getMonday(date) {

  const result = new Date(date);

  result.setHours(0, 0, 0, 0);

  const day = result.getDay();

  const difference =
    day === 0
      ? -6
      : 1 - day;

  result.setDate(
    result.getDate() + difference
  );

  return result;

}


export default Calendar;