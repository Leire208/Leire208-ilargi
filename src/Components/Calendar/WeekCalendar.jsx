import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  GraduationCap,
} from "lucide-react";

import { useTheme } from "../../Context/ThemeContext";
import AddClassModal from "../Schedule/AddClassModal";
import EditClassModal from "../Schedule/EditClassModal";

const DAYS = [
  { key: "L", label: "L" },
  { key: "M", label: "M" },
  { key: "X", label: "X" },
  { key: "J", label: "J" },
  { key: "V", label: "V" },
];

const START_HOUR = 0;
const END_HOUR = 24;
const HOUR_HEIGHT = 48;

function WeekCalendar({
  weekStart,
  classes = [],
  exams = [],
  selectedDate,
  setSelectedDate,
}) {
  const { styles } = useTheme();

  const scrollRef = useRef(null);

  const [addOpen, setAddOpen] =
    useState(false);

  const [editOpen, setEditOpen] =
    useState(false);

  const [selectedClass, setSelectedClass] =
    useState(null);

  const [selectedSlot, setSelectedSlot] =
    useState({
      day: null,
      hour: null,
    });

  const [currentTime, setCurrentTime] =
    useState(new Date());

  /*
   * Actualizar hora cada minuto
   */
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () =>
      clearInterval(interval);
  }, []);

  /*
   * Cuando cambia la semana, colocamos
   * el scroll cerca de la hora actual.
   */
  useEffect(() => {
    if (!scrollRef.current) return;

    const today = new Date();

    const currentWeekStart =
      getMonday(today);

    const isCurrentWeek =
      isSameDay(
        weekStart,
        currentWeekStart
      );

    let targetHour = isCurrentWeek
      ? today.getHours()
      : 8;

    targetHour = Math.max(
      START_HOUR,
      Math.min(
        END_HOUR - 1,
        targetHour
      )
    );

    const targetPosition =
      targetHour *
        HOUR_HEIGHT -
      120;

    scrollRef.current.scrollTop =
      Math.max(
        0,
        targetPosition
      );
  }, [weekStart]);

  /*
   * Abrir modal para añadir una clase
   */
  function openAdd(day, hour) {
    const date =
      getDateForDay(
        weekStart,
        getDayIndex(day)
      );

    setSelectedDate(date);

    setSelectedSlot({
      day,
      hour,
    });

    setAddOpen(true);
  }

  /*
   * Abrir modal para editar una clase
   */
  function openEdit(item) {
    setSelectedClass(item);
    setEditOpen(true);
  }

  /*
   * Obtener las clases de un día.
   */
  function getClassesForDay(day) {
    return classes
      .filter((item) => {
        return (
          normalizeDay(item.day) ===
          day
        );
      })
      .map((item) => {
        const startMinutes =
          timeToMinutes(
            item.start
          );

        let endMinutes =
          item.end
            ? timeToMinutes(
                item.end
              )
            : startMinutes + 60;

        if (
          normalizeTime(item.end) ===
            "00:00" &&
          startMinutes > 0
        ) {
          endMinutes = 1440;
        }

        endMinutes = Math.min(
          endMinutes,
          1440
        );

        return {
          ...item,
          startMinutes,
          endMinutes,
        };
      })
      .filter(
        (item) =>
          item.startMinutes >= 0 &&
          item.startMinutes < 1440 &&
          item.endMinutes >
            item.startMinutes
      )
      .sort(
        (a, b) =>
          a.startMinutes -
          b.startMinutes
      );
  }

  /*
   * Obtener los exámenes de un día.
   *
   * El examen solo tiene fecha, por lo que
   * no ocupa una hora dentro del horario.
   */
  function getExamsForDay(date) {
    if (!date) return [];

    return exams
      .filter((exam) => {
        if (!exam.date) {
          return false;
        }

        return isSameDateString(
          exam.date,
          date
        );
      })
      .sort((a, b) => {
        const priorityOrder = {
          high: 0,
          medium: 1,
          low: 2,
        };

        return (
          (priorityOrder[a.priority] ??
            1) -
          (priorityOrder[b.priority] ??
            1)
        );
      });
  }

  /*
   * Posición de la línea de hora actual
   */
  function getCurrentTimePosition() {
    const minutes =
      currentTime.getHours() *
        60 +
      currentTime.getMinutes();

    if (
      minutes < 0 ||
      minutes > 1440
    ) {
      return null;
    }

    return (
      minutes *
      (HOUR_HEIGHT / 60)
    );
  }

  const currentTimePosition =
    getCurrentTimePosition();

  return (
    <>
      <section
        className={`
          rounded-3xl
          shadow-2xl
          overflow-hidden
          ${styles.card}
        `}
      >
        <div
          ref={scrollRef}
          className="
            w-full
            overflow-x-auto
            overflow-y-auto
            max-h-[65vh]
            overscroll-contain
          "
        >
          <div
            className="
              min-w-[760px]
            "
          >
            {/* ================================= */}
            {/* HEADER                             */}
            {/* ================================= */}

            <div
              className="
                grid
                grid-cols-[58px_repeat(5,minmax(130px,1fr))]
                sticky
                top-0
                z-40
                bg-black/30
                backdrop-blur-2xl
                border-b
                border-white/10
              "
            >
              <div />

              {DAYS.map(
                (day, index) => {
                  const date =
                    getDateForDay(
                      weekStart,
                      index
                    );

                  const isSelected =
                    isSameDay(
                      date,
                      selectedDate
                    );

                  const isToday =
                    isSameDay(
                      date,
                      currentTime
                    );

                  const dayExams =
                    getExamsForDay(
                      date
                    );

                  return (
                    <button
                      key={day.key}
                      type="button"
                      onClick={() =>
                        setSelectedDate(
                          date
                        )
                      }
                      className={`
                        relative
                        py-2.5
                        px-1.5
                        text-center
                        border-l
                        border-white/10
                        transition-all
                        duration-200
                        ${
                          isSelected
                            ? "bg-white/[0.12]"
                            : "hover:bg-white/[0.06]"
                        }
                      `}
                    >
                      {isToday && (
                        <span
                          className="
                            absolute
                            top-0
                            left-1/2
                            -translate-x-1/2
                            w-7
                            h-[2px]
                            rounded-full
                            bg-white
                            shadow-[0_0_10px_rgba(255,255,255,0.8)]
                          "
                        />
                      )}

                      <div
                        className={`
                          text-[10px]
                          font-semibold
                          uppercase
                          tracking-wider
                          ${
                            isToday
                              ? "text-white"
                              : "text-white/50"
                          }
                        `}
                      >
                        {day.label}
                      </div>

                      <div
                        className={`
                          mt-0.5
                          text-base
                          font-bold
                          ${
                            isToday
                              ? "text-white"
                              : "text-white/80"
                          }
                        `}
                      >
                        {date.getDate()}
                      </div>

                      {/* ============================== */}
                      {/* EXÁMENES DEL DÍA                */}
                      {/* ============================== */}

                      {dayExams.length >
                        0 && (
                        <div
                          className="
                            mt-2
                            space-y-1
                            text-left
                          "
                        >
                          {dayExams
                            .slice(0, 2)
                            .map(
                              (
                                exam
                              ) => (
                                <div
                                  key={
                                    exam.id
                                  }
                                  className={`
                                    rounded-lg
                                    px-1.5
                                    py-1
                                    border
                                    ${
                                      exam.completed
                                        ? "bg-white/5 border-white/5 opacity-40"
                                        : "bg-white/10 border-white/10"
                                    }
                                  `}
                                >
                                  <div
                                    className="
                                      flex
                                      items-center
                                      gap-1
                                    "
                                  >
                                    <GraduationCap
                                      size={
                                        10
                                      }
                                      className="text-white/60 shrink-0"
                                    />

                                    <span
                                      className={`
                                        text-[9px]
                                        font-semibold
                                        truncate
                                        ${
                                          exam.completed
                                            ? "text-white/40 line-through"
                                            : "text-white/80"
                                        }
                                      `}
                                    >
                                      {exam.title}
                                    </span>
                                  </div>
                                </div>
                              )
                            )}

                          {dayExams.length >
                            2 && (
                            <div className="text-[8px] text-white/35">
                              +
                              {dayExams.length -
                                2}{" "}
                              más
                            </div>
                          )}
                        </div>
                      )}
                    </button>
                  );
                }
              )}
            </div>

            {/* ================================= */}
            {/* BODY 24 HORAS                     */}
            {/* ================================= */}

            <div
              className="
                grid
                grid-cols-[58px_repeat(5,minmax(130px,1fr))]
              "
              style={{
                height:
                  `${24 * HOUR_HEIGHT}px`,
              }}
            >
              {/* ================================= */}
              {/* HORAS                             */}
              {/* ================================= */}

              <div
                className="
                  relative
                  border-r
                  border-white/10
                "
              >
                {Array.from({
                  length: 24,
                }).map(
                  (_, hour) => (
                    <div
                      key={hour}
                      className="
                        absolute
                        left-0
                        right-0
                        text-center
                        text-[10px]
                        font-medium
                        text-white/45
                      "
                      style={{
                        top:
                          hour *
                            HOUR_HEIGHT +
                          4,
                      }}
                    >
                      {String(
                        hour
                      ).padStart(
                        2,
                        "0"
                      )}
                      :00
                    </div>
                  )
                )}

                <div
                  className="
                    absolute
                    left-0
                    right-0
                    text-center
                    text-[10px]
                    font-medium
                    text-white/45
                  "
                  style={{
                    top:
                      24 *
                        HOUR_HEIGHT +
                      4,
                  }}
                >
                  24:00
                </div>
              </div>

              {/* ================================= */}
              {/* DÍAS                              */}
              {/* ================================= */}

              {DAYS.map(
                (
                  day,
                  dayIndex
                ) => {
                  const dayClasses =
                    getClassesForDay(
                      day.key
                    );

                  const date =
                    getDateForDay(
                      weekStart,
                      dayIndex
                    );

                  const isToday =
                    isSameDay(
                      date,
                      currentTime
                    );

                  return (
                    <div
                      key={day.key}
                      className={`
                        relative
                        border-r
                        border-white/10
                        ${
                          isToday
                            ? "bg-white/[0.025]"
                            : ""
                        }
                      `}
                    >
                      {/* ================================= */}
                      {/* LÍNEAS DE CADA HORA                */}
                      {/* ================================= */}

                      {Array.from({
                        length: 24,
                      }).map(
                        (
                          _,
                          hour
                        ) => (
                          <button
                            key={`${day.key}-${hour}`}
                            type="button"
                            onClick={() =>
                              openAdd(
                                day.key,
                                `${String(
                                  hour
                                ).padStart(
                                  2,
                                  "0"
                                )}:00`
                              )
                            }
                            className="
                              absolute
                              left-0
                              right-0
                              z-0
                              border-t
                              border-white/[0.08]
                              hover:bg-white/[0.045]
                              transition-colors
                            "
                            style={{
                              top:
                                hour *
                                HOUR_HEIGHT,
                              height:
                                HOUR_HEIGHT,
                            }}
                            aria-label={`Añadir clase el ${day.label} a las ${String(
                              hour
                            ).padStart(
                              2,
                              "0"
                            )}:00`}
                          />
                        )
                      )}

                      {/* ================================= */}
                      {/* MEDIAS HORAS                      */}
                      {/* ================================= */}

                      {Array.from({
                        length: 24,
                      }).map(
                        (
                          _,
                          hour
                        ) => (
                          <div
                            key={`${day.key}-half-${hour}`}
                            className="
                              absolute
                              left-0
                              right-0
                              z-0
                              border-t
                              border-white/[0.03]
                              pointer-events-none
                            "
                            style={{
                              top:
                                hour *
                                  HOUR_HEIGHT +
                                HOUR_HEIGHT /
                                  2,
                            }}
                          />
                        )
                      )}

                      {/* ================================= */}
                      {/* LÍNEA DE AHORA                    */}
                      {/* ================================= */}

                      {isToday &&
                        currentTimePosition !==
                          null && (
                          <div
                            className="
                              absolute
                              left-0
                              right-0
                              z-20
                              pointer-events-none
                            "
                            style={{
                              top:
                                currentTimePosition,
                            }}
                          >
                            <span
                              className="
                                absolute
                                left-[-4px]
                                top-[-3px]
                                w-1.5
                                h-1.5
                                rounded-full
                                bg-white
                                shadow-[0_0_8px_rgba(255,255,255,0.9)]
                              "
                            />

                            <div
                              className="
                                h-[2px]
                                w-full
                                bg-white/80
                                shadow-[0_0_7px_rgba(255,255,255,0.45)]
                              "
                            />
                          </div>
                        )}

                      {/* ================================= */}
                      {/* CLASES                            */}
                      {/* ================================= */}

                      {dayClasses.map(
                        (item) => {
                          const pixelsPerMinute =
                            HOUR_HEIGHT /
                            60;

                          const top =
                            item.startMinutes *
                            pixelsPerMinute;

                          const duration =
                            item.endMinutes -
                            item.startMinutes;

                          const height =
                            Math.max(
                              duration *
                                pixelsPerMinute,
                              28
                            );

                          return (
                            <button
                              key={
                                item.id
                              }
                              type="button"
                              onClick={(
                                event
                              ) => {
                                event.stopPropagation();

                                openEdit(
                                  item
                                );
                              }}
                              className="
                                absolute
                                left-1
                                right-1
                                z-30
                                rounded-xl
                                px-2.5
                                py-1.5
                                text-left
                                overflow-hidden
                                shadow-lg
                                border
                                border-white/20
                                hover:brightness-110
                                hover:scale-[1.015]
                                hover:shadow-xl
                                transition-all
                                duration-200
                              "
                              style={{
                                top,
                                height,
                                background:
                                  item.color ||
                                  "rgba(96,165,250,0.85)",
                              }}
                              aria-label={`Editar ${
                                item.subjectName ||
                                "clase"
                              }`}
                            >
                              <div
                                className="
                                  absolute
                                  inset-x-0
                                  top-0
                                  h-1/2
                                  bg-white/[0.10]
                                  pointer-events-none
                                "
                              />

                              <div className="relative">
                                <div
                                  className="
                                    text-white
                                    font-semibold
                                    text-xs
                                    leading-tight
                                    truncate
                                  "
                                >
                                  {item.subjectName ||
                                    "Clase"}
                                </div>

                                {height >=
                                  42 && (
                                  <div
                                    className="
                                      text-white/80
                                      text-[10px]
                                      mt-0.5
                                      font-medium
                                    "
                                  >
                                    {
                                      item.start
                                    }
                                    {" – "}
                                    {item.end ||
                                      minutesToTime(
                                        item.startMinutes +
                                          60
                                      )}
                                  </div>
                                )}

                                {height >=
                                  70 &&
                                  item.room && (
                                    <div
                                      className="
                                        text-white/70
                                        text-[9px]
                                        mt-0.5
                                        truncate
                                      "
                                    >
                                      📍{" "}
                                      {
                                        item.room
                                      }
                                    </div>
                                  )}
                              </div>
                            </button>
                          );
                        }
                      )}
                    </div>
                  );
                }
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ================================= */}
      {/* NUEVA CLASE                       */}
      {/* ================================= */}

      <AddClassModal
        open={addOpen}
        close={() => {
          setAddOpen(false);
        }}
        day={selectedSlot.day}
        hour={selectedSlot.hour}
      />

      {/* ================================= */}
      {/* EDITAR CLASE                      */}
      {/* ================================= */}

      <EditClassModal
        open={editOpen}
        close={() => {
          setEditOpen(false);
          setSelectedClass(null);
        }}
        item={selectedClass}
      />
    </>
  );
}

/* ================================= */
/* HELPERS                           */
/* ================================= */

function normalizeDay(day) {
  if (
    day === null ||
    day === undefined
  ) {
    return "";
  }

  const value = String(day)
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(
      /[\u0300-\u036f]/g,
      ""
    );

  const mapping = {
    l: "L",
    lunes: "L",
    monday: "L",
    "1": "L",
    "0": "L",

    m: "M",
    martes: "M",
    tuesday: "M",
    "2": "M",

    x: "X",
    miercoles: "X",
    wednesday: "X",
    "3": "X",

    j: "J",
    jueves: "J",
    thursday: "J",
    "4": "J",

    v: "V",
    viernes: "V",
    friday: "V",
    "5": "V",
  };

  return mapping[value] || "";
}

function normalizeTime(time) {
  if (!time) return "";

  const value =
    String(time).trim();

  const parts =
    value.split(":");

  if (parts.length !== 2) {
    return value;
  }

  const hours =
    Number(parts[0]);

  const minutes =
    Number(parts[1]);

  if (
    Number.isNaN(hours) ||
    Number.isNaN(minutes)
  ) {
    return value;
  }

  return `${String(
    hours
  ).padStart(
    2,
    "0"
  )}:${String(
    minutes
  ).padStart(
    2,
    "0"
  )}`;
}

function getDateForDay(
  monday,
  dayIndex
) {
  const date =
    new Date(monday);

  date.setDate(
    monday.getDate() +
      dayIndex
  );

  return date;
}

function getDayIndex(day) {
  const normalized =
    normalizeDay(day);

  const index =
    DAYS.findIndex(
      (item) =>
        item.key ===
        normalized
    );

  return index === -1
    ? 0
    : index;
}

function timeToMinutes(time) {
  if (!time) return 0;

  const normalized =
    normalizeTime(time);

  const [
    hours,
    minutes,
  ] = normalized
    .split(":")
    .map(Number);

  if (
    Number.isNaN(hours) ||
    Number.isNaN(minutes)
  ) {
    return 0;
  }

  return (
    hours * 60 +
    minutes
  );
}

function minutesToTime(minutes) {
  const normalized =
    ((minutes % 1440) +
      1440) %
    1440;

  const hours =
    Math.floor(
      normalized / 60
    );

  const mins =
    normalized % 60;

  return `${String(
    hours
  ).padStart(
    2,
    "0"
  )}:${String(
    mins
  ).padStart(
    2,
    "0"
  )}`;
}

function getMonday(date) {
  const result =
    new Date(date);

  result.setHours(
    0,
    0,
    0,
    0
  );

  const day =
    result.getDay();

  const difference =
    day === 0
      ? -6
      : 1 - day;

  result.setDate(
    result.getDate() +
      difference
  );

  return result;
}

function isSameDay(
  first,
  second
) {
  if (
    !first ||
    !second
  ) {
    return false;
  }

  return (
    first.getDate() ===
      second.getDate() &&
    first.getMonth() ===
      second.getMonth() &&
    first.getFullYear() ===
      second.getFullYear()
  );
}

function isSameDateString(
  dateString,
  date
) {
  if (
    !dateString ||
    !date
  ) {
    return false;
  }

  /*
   * Las fechas de los inputs type="date"
   * vienen como YYYY-MM-DD.
   *
   * Comparamos directamente para evitar
   * problemas de zona horaria.
   */
  const year =
    date.getFullYear();

  const month =
    String(
      date.getMonth() + 1
    ).padStart(2, "0");

  const day =
    String(
      date.getDate()
    ).padStart(2, "0");

  return (
    dateString ===
    `${year}-${month}-${day}`
  );
}

export default WeekCalendar;