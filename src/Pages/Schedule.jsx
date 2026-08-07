import SkyBackground from "../Components/SkyBackground";
import WeekGrid from "../Components/Schedule/WeekGrid";

function Schedule() {

  return (

    <SkyBackground>

      <main

        className="
          min-h-screen
          max-w-6xl
          mx-auto
          px-6
          pt-8
          pb-48
        "

      >

        <h1 className="text-3xl font-bold text-white mb-8">

          Horario

        </h1>

        <WeekGrid/>

      </main>

    </SkyBackground>

  );

}

export default Schedule;