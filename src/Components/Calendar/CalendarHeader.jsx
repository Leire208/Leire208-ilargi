import { ChevronLeft, ChevronRight } from "lucide-react";

import { useLanguage } from "../../Context/LanguageContext";


function CalendarHeader({

  currentDate,

  previousMonth,

  nextMonth

}) {


  const { language } = useLanguage();



  const month = currentDate.toLocaleDateString(

    language === "eu"

      ? "eu-ES"

      : "es-ES",

    {

      month: "long",

      year: "numeric"

    }

  );



  return (

    <header className="flex justify-between items-center mb-8">


      <button

        onClick={previousMonth}

        className="
          w-12
          h-12
          rounded-full
          bg-white/10
          backdrop-blur-xl
          flex
          items-center
          justify-center
          text-white
          hover:bg-white/20
          transition
        "

      >

        <ChevronLeft/>

      </button>



      <h1

        className="
          text-3xl
          font-bold
          text-white
          capitalize
        "

      >

        {month}

      </h1>



      <button

        onClick={nextMonth}

        className="
          w-12
          h-12
          rounded-full
          bg-white/10
          backdrop-blur-xl
          flex
          items-center
          justify-center
          text-white
          hover:bg-white/20
          transition
        "

      >

        <ChevronRight/>

      </button>


    </header>

  );

}


export default CalendarHeader;