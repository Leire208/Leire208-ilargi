import { Clock3, MapPin } from "lucide-react";

import { useClasses } from "../../Context/ClassContext";
import { useLanguage } from "../../Context/LanguageContext";
import { useTheme } from "../../Context/ThemeContext";

function NextClassCard() {

  const { classes } = useClasses();
  const { texts } = useLanguage();
  const { styles } = useTheme();

  const nextClass =
    classes.length > 0
      ? classes[0]
      : null;

  return (

    <section
      className={`
        rounded-3xl
        p-6
        shadow-2xl
        ${styles.card}
      `}
    >

      <div className="flex items-center gap-4">

        <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">

          <Clock3 size={28} className="text-white"/>

        </div>

        <div>

          <p className="text-white/70 text-sm">

            {texts.nextClass}

          </p>

          <h2 className="text-2xl font-bold text-white">

            {
              nextClass
                ? nextClass.subject
                : texts.noClasses
            }

          </h2>

        </div>

      </div>

      {

        nextClass && (

          <>

            <div className="mt-8 flex justify-between items-center">

              <div>

                <p className="text-white/70 text-sm">

                  Hora

                </p>

                <h3 className="text-xl text-white font-semibold">

                  {nextClass.time}

                </h3>

              </div>

              <div className="text-right">

                <p className="text-white/70 text-sm">

                  Aula

                </p>

                <div className="flex items-center gap-2 justify-end">

                  <MapPin
                    size={18}
                    className="text-white/80"
                  />

                  <span className="text-xl text-white font-semibold">

                    {nextClass.room}

                  </span>

                </div>

              </div>

            </div>

          </>

        )

      }

    </section>

  );

}

export default NextClassCard;