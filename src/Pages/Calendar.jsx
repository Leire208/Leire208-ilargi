import { useMemo, useState } from "react";

import SkyBackground from "../Components/SkyBackground";
import Layout from "../Components/Layout";

import CalendarHeader from "../Components/Calendar/CalendarHeader";
import MonthGrid from "../Components/Calendar/MonthGrid";
import DaySheet from "../Components/Calendar/DaySheet";

import { useEvents } from "../Context/EventContext";
import { useTasks } from "../Context/TaskContext";

function Calendar() {

  const [currentDate, setCurrentDate] = useState(new Date());

  const [selectedDate, setSelectedDate] = useState(new Date());

  const [sheetOpen, setSheetOpen] = useState(false);

  const { events } = useEvents();

  const { tasks } = useTasks();



  const calendarItems = useMemo(() => {

    const taskEvents = tasks.map(task => ({

      id: `task-${task.id}`,

      title: task.title,

      date: task.date,

      color: "#60a5fa",

      type: "task",

      completed: task.completed,

      subject: task.subject

    }));



    const normalEvents = events.map(event => ({

      ...event,

      type: "event"

    }));



    return [

      ...normalEvents,

      ...taskEvents

    ];



  }, [events, tasks]);



  function previousMonth() {

    setCurrentDate(

      new Date(

        currentDate.getFullYear(),

        currentDate.getMonth() - 1,

        1

      )

    );

  }



  function nextMonth() {

    setCurrentDate(

      new Date(

        currentDate.getFullYear(),

        currentDate.getMonth() + 1,

        1

      )

    );

  }



  function selectDay(date) {

    setSelectedDate(date);

    setSheetOpen(true);

  }



  return (

    <SkyBackground>

      <Layout>

        <main

          className="
            min-h-screen
            max-w-4xl
            mx-auto
            px-6
            pt-8
          "

        >

          <CalendarHeader

            currentDate={currentDate}

            previousMonth={previousMonth}

            nextMonth={nextMonth}

          />



          <MonthGrid

            currentDate={currentDate}

            selectedDate={selectedDate}

            setSelectedDate={selectDay}

            events={calendarItems}

          />

        </main>

      </Layout>



      <DaySheet

        open={sheetOpen}

        close={() => setSheetOpen(false)}

        date={selectedDate}

      />

    </SkyBackground>

  );

}

export default Calendar;