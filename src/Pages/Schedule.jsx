import SkyBackground from "../Components/SkyBackground";
import WeekGrid from "../Components/Schedule/WeekGrid";

import { useSchedule } from "../Context/ScheduleContext";

function Schedule() {
  const { classes } = useSchedule();

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

        <p className="text-white mb-4">
          Clases cargadas: {classes.length}
        </p>

        <WeekGrid />
      </main>
    </SkyBackground>
  );
}

export default Schedule;