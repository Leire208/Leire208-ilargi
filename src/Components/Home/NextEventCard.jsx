import { CalendarDays, CheckCircle2 } from "lucide-react";

import { useTheme } from "../../Context/ThemeContext";
import { useLanguage } from "../../Context/LanguageContext";

function NextEventCard({ event }) {

  const { styles } = useTheme();
  const { language } = useLanguage();

  const isTask = event?.type === "task";

  return (

    <section

      className={`
        rounded-3xl
        p-6
        shadow-xl
        ${styles.card}
      `}

    >

      <div className="flex items-center gap-3 mb-5">

        {

          isTask

            ? <CheckCircle2 className="text-white"/>

            : <CalendarDays className="text-white"/>

        }

        <h2 className="text-xl font-bold text-white">

          {

            isTask

              ? "Próxima tarea"

              : "Próximo evento"

          }

        </h2>

      </div>

      {

        !event ? (

          <p className="text-white/60">

            Tu agenda está vacía 🎉

          </p>

        ) : (

          <div>

            <h3 className="text-2xl font-bold text-white">

              {event.title}

            </h3>

            {

              event.subject && (

                <p className="text-white/60 mt-2">

                  📚 {event.subject}

                </p>

              )

            }

            {

              event.date && (

                <p className="text-white/70 mt-2">

                  {

                    new Date(event.date).toLocaleDateString(

                      language === "eu"

                        ? "eu-ES"

                        : "es-ES",

                      {

                        weekday: "long",

                        day: "numeric",

                        month: "long"

                      }

                    )

                  }

                </p>

              )

            }

            {

              event.startTime && (

                <p className="text-white/60 mt-1">

                  {event.startTime}

                  {

                    event.endTime &&

                    ` - ${event.endTime}`

                  }

                </p>

              )

            }

            <div

              className="
                mt-5
                flex
                items-center
                gap-3
              "

            >

              <div

                className="
                  w-4
                  h-4
                  rounded-full
                "

                style={{

                  background:

                    isTask

                      ? "#60a5fa"

                      : event.color || "#ffffff"

                }}

              />

              <span className="text-white/70 text-sm">

                {

                  isTask

                    ? "Tarea"

                    : "Evento"

                }

              </span>

            </div>

          </div>

        )

      }

    </section>

  );

}

export default NextEventCard;