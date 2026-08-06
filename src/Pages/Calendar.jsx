import { useState } from "react";

import SkyBackground from "../Components/SkyBackground";

import CalendarHeader from "../Components/Calendar/CalendarHeader";
import MonthGrid from "../Components/Calendar/MonthGrid";
import DaySheet from "../Components/Calendar/DaySheet";

import { useEvents } from "../Context/EventContext";


function Calendar() {


  const [currentDate, setCurrentDate] = useState(new Date());


  const [selectedDate, setSelectedDate] = useState(new Date());


  const [sheetOpen, setSheetOpen] = useState(false);



  const { events } = useEvents();






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







  function selectDay(date){


    setSelectedDate(date);


    setSheetOpen(true);


  }








  return (



    <SkyBackground>



      <main

        className="
          min-h-screen
          max-w-4xl
          mx-auto
          px-6
          pt-8
          pb-36
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


          events={events}


        />






      </main>







      <DaySheet


        open={sheetOpen}


        close={()=>setSheetOpen(false)}


        date={selectedDate}


      />







    </SkyBackground>


  );


}



export default Calendar;