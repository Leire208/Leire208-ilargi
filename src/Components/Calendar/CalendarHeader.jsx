import {
  ChevronLeft,
  ChevronRight
} from "lucide-react";

import { useLanguage } from "../../Context/LanguageContext";


function CalendarHeader({

  weekStart,
  previousWeek,
  nextWeek,
  goToday

}) {

  const { language } =
    useLanguage();


  const locale =
    language === "eu"
      ? "eu-ES"
      : "es-ES";


  const weekEnd =
    new Date(weekStart);


  weekEnd.setDate(
    weekEnd.getDate() + 6
  );


  const startText =
    weekStart.toLocaleDateString(
      locale,
      {
        day: "numeric",
        month: "short"
      }
    );


  const endText =
    weekEnd.toLocaleDateString(
      locale,
      {
        day: "numeric",
        month: "short",
        year: "numeric"
      }
    );


  return (

    <header
      className="
        flex
        flex-col
        sm:flex-row
        sm:items-center
        sm:justify-between
        gap-4
        mb-6
      "
    >

      <div
        className="
          flex
          items-center
          justify-between
          gap-3
        "
      >

        <button
          onClick={previousWeek}
          className="
            w-11
            h-11
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
          aria-label="Semana anterior"
        >

          <ChevronLeft size={21} />

        </button>


        <div
          className="
            text-center
            min-w-0
          "
        >

          <h1
            className="
              text-xl
              sm:text-2xl
              font-bold
              text-white
              capitalize
            "
          >

            {startText} — {endText}

          </h1>

        </div>


        <button
          onClick={nextWeek}
          className="
            w-11
            h-11
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
          aria-label="Semana siguiente"
        >

          <ChevronRight size={21} />

        </button>

      </div>


      <button
        onClick={goToday}
        className="
          self-center
          sm:self-auto
          px-5
          py-2.5
          rounded-full
          bg-white/10
          backdrop-blur-xl
          text-white
          text-sm
          font-semibold
          hover:bg-white/20
          transition
        "
      >

        {language === "eu"
          ? "Gaur"
          : "Hoy"}

      </button>

    </header>

  );

}


export default CalendarHeader;