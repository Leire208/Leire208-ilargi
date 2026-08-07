import { useState } from "react";

import SkyBackground from "../Components/SkyBackground";

import CalendarHeader from "../Components/Calendar/CalendarHeader";
import MonthGrid from "../Components/Calendar/MonthGrid";
import DayAgenda from "../Components/Calendar/DayAgenda";

import { useEvents } from "../Context/EventContext";
import { useTasks } from "../Context/TaskContext";



function Calendar() {


  const [currentDate,setCurrentDate] = useState(new Date());


  const [selectedDate,setSelectedDate] = useState(new Date());



  const { events } = useEvents();

  const { tasks } = useTasks();






  function previousMonth(){


    setCurrentDate(


      new Date(

        currentDate.getFullYear(),

        currentDate.getMonth() - 1,

        1

      )


    );


  }







  function nextMonth(){


    setCurrentDate(


      new Date(

        currentDate.getFullYear(),

        currentDate.getMonth() + 1,

        1

      )


    );


  }







  function selectDay(date){


    setSelectedDate(date);


  }







  const calendarItems = [


    ...events,



    ...tasks

      .filter(task=>task.date)

      .map(task=>(


        {

          id:"task-" + task.id,

          title:task.title,

          date:task.date,

          color:"#60a5fa",

          type:"task"

        }


      ))



  ];








  return (



    <SkyBackground>


      <main


        className="
          min-h-screen
          max-w-4xl
          mx-auto
          px-6
          pt-8
          pb-44
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








        <DayAgenda


          date={selectedDate}


          events={events}


          tasks={tasks}


        />






      </main>



    </SkyBackground>


  );


}



export default Calendar;