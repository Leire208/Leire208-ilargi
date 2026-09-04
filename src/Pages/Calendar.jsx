import { useState } from "react";

import SkyBackground from "../Components/SkyBackground";
import CalendarHeader from "../Components/Calendar/CalendarHeader";
import WeekCalendar from "../Components/Calendar/WeekCalendar";
import DayAgenda from "../Components/Calendar/DayAgenda";

import { useEvents } from "../Context/EventContext";
import { useTasks } from "../Context/TaskContext";
import { useSchedule } from "../Context/ScheduleContext";
import { useExams } from "../Context/ExamContext";

function Calendar() {
  const [selectedDate, setSelectedDate] =
    useState(new Date());

  const [weekStart, setWeekStart] =
    useState(getMonday(new Date()));

  const { events, removeAllEvents } =
    useEvents();

  const { tasks } = useTasks();

  const { classes } = useSchedule();

  const { exams } = useExams();

  const [deletingEvents, setDeletingEvents] =
    useState(false);

  function previousWeek() {
    setWeekStart((prev) => {
      const date = new Date(prev);

      date.setDate(
        date.getDate() - 7
      );

      return date;
    });
  }

  function nextWeek() {
    setWeekStart((prev) => {
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

  async function handleDeleteAllEvents() {
    if (events.length === 0) {
      return;
    }

    const confirmed =
      window.confirm(
        `¿Seguro que quieres borrar todos los eventos del calendario?\n\nSe eliminarán ${events.length} evento${events.length === 1 ? "" : "s"} y esta acción no se puede deshacer.`
      );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingEvents(true);

      await removeAllEvents();
    } catch (error) {
      console.error(
        "Error al borrar los eventos:",
        error
      );

      window.alert(
        "No se pudieron borrar todos los eventos. Inténtalo de nuevo."
      );
    } finally {
      setDeletingEvents(false);
    }
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

        {/* ================================= */}
        {/* BORRAR TODOS LOS EVENTOS           */}
        {/* ================================= */}

        {events.length > 0 && (
          <div
            className="
              flex
              justify-end
              mt-3
              mb-3
            "
          >
            <button
              type="button"
              onClick={handleDeleteAllEvents}
              disabled={deletingEvents}
              className="
                px-4
                py-2
                rounded-xl
                bg-red-500/10
                border
                border-red-400/20
                text-red-300
                text-xs
                font-medium
                backdrop-blur-xl
                hover:bg-red-500/20
                hover:border-red-400/30
                transition-all
                duration-200
                disabled:opacity-50
                disabled:cursor-not-allowed
              "
            >
              {deletingEvents
                ? "Borrando..."
                : "🗑️ Borrar todos los eventos"}
            </button>
          </div>
        )}

        <WeekCalendar
          weekStart={weekStart}
          classes={classes}
          events={events}
          tasks={tasks}
          exams={exams}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />

        <DayAgenda
          date={selectedDate}
          events={events}
          tasks={tasks}
          classes={classes}
          exams={exams}
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

  result.setHours(
    0,
    0,
    0,
    0
  );

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