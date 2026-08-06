import { CalendarDays } from "lucide-react";

import { useClasses } from "../../Context/ClassContext";
import { useTheme } from "../../Context/ThemeContext";

function TodayTimeline() {

  const { classes } = useClasses();
  const { styles } = useTheme();

  return (

    <section
      className={`
        rounded-3xl
        p-6
        shadow-xl
        ${styles.card}
      `}
    >

      <div className="flex items-center gap-3 mb-6">

        <CalendarDays
          size={22}
          className="text-white"
        />

        <h2 className="text-xl font-semibold text-white">

          Hoy

        </h2>

      </div>

      {

        classes.length === 0 ? (

          <p className="text-white/70">

            No tienes clases para hoy.

          </p>

        ) : (

          <div className="space-y-5">

            {

              classes.map((item) => (

                <div
                  key={item.id}
                  className="flex gap-4"
                >

                  <div className="flex flex-col items-center">

                    <div className="w-3 h-3 rounded-full bg-white"/>

                    <div className="flex-1 w-px bg-white/30 mt-2"/>

                  </div>

                  <div className="pb-2">

                    <p className="text-white font-semibold">

                      {item.subject}

                    </p>

                    <p className="text-white/70 text-sm">

                      {item.time} · Aula {item.room}

                    </p>

                  </div>

                </div>

              ))

            }

          </div>

        )

      }

    </section>

  );

}

export default TodayTimeline;