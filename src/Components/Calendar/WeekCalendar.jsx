import { useEffect, useState } from "react";

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

/*
 * Calendario más compacto que el horario.
 * 24 horas × 48px = 1152px.
 */
const HOUR_HEIGHT = 48;

function WeekCalendar({
  weekStart,
  classes = [],
  selectedDate,
  setSelectedDate,
}) {
  const { styles } = useTheme();

  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedClass, setSelectedClass] =
    useState(null);

  const [selectedSlot, setSelectedSlot] = useState({
    day: null,
    hour: null,
  });

  const [currentTime, setCurrentTime] =
    useState(new Date());

  /*
   * Actualiza la hora cada minuto para mantener
   * actualizada la línea de "ahora".
   */
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  function openAdd(day, hour) {
    const date = getDateForDay(
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

  function openEdit(item) {
    setSelectedClass(item);
    setEditOpen(true);
  }

  function getClassesForDay(day) {
    return classes
      .filter((item) => item.day === day)
      .map((item) => {
        const startMinutes =
          timeToMinutes(item.start);

        const endMinutes = item.end
          ? timeToMinutes(item.end)
          : startMinutes + 60;

        return {
          ...item,
          startMinutes,
          endMinutes,
        };
      })
      .filter(
        (item) =>
          item.endMinutes > item.startMinutes &&
          item.startMinutes < 1440
      )
      .sort(
        (a, b) =>
          a.startMinutes - b.startMinutes
      );
  }

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
          className="
            overflow-x-auto
            overflow-y-auto
            max-h-[65vh]
          "
        >
          <div className="min-w-[760px]">

            {/* ============================= */}
            {/* HEADER                         */}
            {/* ============================= */}

            <div
              className="
                grid
                grid-cols-[58px_repeat(5,minmax(130px,1fr))]
                sticky
                top-0
                z-30
                bg-black/25
                backdrop-blur-2xl
                border-b
                border-white/10
              "
            >
              <div />

              {DAYS.map((day, index) => {
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

                return (
                  <button
                    key={day.key}
                    type="button"
                    onClick={() =>
                      setSelectedDate(date)
                    }
                    className={`
                      relative
                      py-2.5
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
                    {/* Día actual */}

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
                  </button>
                );
              })}
            </div>

            {/* ============================= */}
            {/* BODY 24 HORAS                  */}
            {/* ============================= */}

            <div
              className="
                grid
                grid-cols-[58px_repeat(5,minmax(130px,1fr))]
              "
              style={{
                height: `${24 * HOUR_HEIGHT}px`,
              }}
            >

              {/* ============================= */}
              {/* HORAS                          */}
              {/* ============================= */}

              <div
                className="
                  relative
                  border-r
                  border-white/10
                "
              >
                {Array.from({
                  length: 24,
                }).map((_, hour) => (
                  <div
                    key={hour}
                    className="
                      absolute
                      left-0
                      right-0
                      text-center
                      text-[10px]
                      font-medium
                      text-white/40
                    "
                    style={{
                      top:
                        hour *
                          HOUR_HEIGHT +
                        4,
                    }}
                  >
                    {String(hour).padStart(
                      2,
                      "0"
                    )}
                    :00
                  </div>
                ))}

                <div
                  className="
                    absolute
                    left-0
                    right-0
                    text-center
                    text-[10px]
                    font-medium
                    text-white/40
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

              {/* ============================= */}
              {/* DÍAS                          */}
              {/* ============================= */}

              {DAYS.map((day, dayIndex) => {
                const dayClasses =
                  getClassesForDay(day.key);

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

                    {/* =========================== */}
                    {/* HORAS                        */}
                    {/* =========================== */}

                    {Array.from({
                      length: 24,
                    }).map((_, hour) => (
                      <button
                        key={`${day.key}-${hour}`}
                        type="button"
                        onClick={() =>
                          openAdd(
                            day.key,
                            `${String(hour).padStart(
                              2,
                              "0"
                            )}:00`
                          )
                        }
                        className="
                          absolute
                          left-0
                          right-0
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
                        ).padStart(2, "0")}:00`}
                      />
                    ))}

                    {/* =========================== */}
                    {/* MEDIAS HORAS                 */}
                    {/* =========================== */}

                    {Array.from({
                      length: 24,
                    }).map((_, hour) => (
                      <div
                        key={`${day.key}-half-${hour}`}
                        className="
                          absolute
                          left-0
                          right-0
                          border-t
                          border-white/[0.03]
                          pointer-events-none
                        "
                        style={{
                          top:
                            hour *
                              HOUR_HEIGHT +
                            HOUR_HEIGHT / 2,
                        }}
                      />
                    ))}

                    {/* =========================== */}
                    {/* LÍNEA DE AHORA               */}
                    {/* =========================== */}

                    {isToday &&
                      getCurrentTimePosition(
                        currentTime
                      ) !== null && (
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
                              getCurrentTimePosition(
                                currentTime
                              ),
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

                    {/* =========================== */}
                    {/* CLASES                       */}
                    {/* =========================== */}

                    {dayClasses.map((item) => {
                      const pixelsPerMinute =
                        HOUR_HEIGHT / 60;

                      const top =
                        item.startMinutes *
                        pixelsPerMinute;

                      const duration =
                        item.endMinutes -
                        item.startMinutes;

                      const height = Math.max(
                        duration *
                          pixelsPerMinute,
                        28
                      );

                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            openEdit(item);
                          }}
                          className="
                            absolute
                            left-1
                            right-1
                            z-10
                            rounded-xl
                            px-2
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
                          aria-label={`Editar ${item.subjectName}`}
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
                                text-[11px]
                                leading-tight
                                truncate
                              "
                            >
                              {item.subjectName}
                            </div>

                            {height >= 42 && (
                              <div
                                className="
                                  text-white/80
                                  text-[9px]
                                  mt-0.5
                                  font-medium
                                "
                              >
                                {item.start}
                                {" – "}
                                {item.end ||
                                  minutesToTime(
                                    item.startMinutes +
                                      60
                                  )}
                              </div>
                            )}

                            {height >= 70 &&
                              item.room && (
                                <div
                                  className="
                                    text-white/70
                                    text-[9px]
                                    mt-0.5
                                    truncate
                                  "
                                >
                                  📍 {item.room}
                                </div>
                              )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ============================= */}
      {/* NUEVA CLASE                   */}
      {/* ============================= */}

      <AddClassModal
        open={addOpen}
        close={() => {
          setAddOpen(false);
        }}
        day={selectedSlot.day}
        hour={selectedSlot.hour}
      />

      {/* ============================= */}
      {/* EDITAR CLASE                  */}
      {/* ============================= */}

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

function getDateForDay(monday, dayIndex) {
  const date = new Date(monday);

  date.setDate(
    monday.getDate() + dayIndex
  );

  return date;
}

function getDayIndex(day) {
  const index = DAYS.findIndex(
    (item) => item.key === day
  );

  return index === -1 ? 0 : index;
}

function timeToMinutes(time) {
  if (!time) return 0;

  const [hours, minutes] =
    time.split(":").map(Number);

  return hours * 60 + minutes;
}

function minutesToTime(minutes) {
  const normalized =
    ((minutes % 1440) + 1440) % 1440;

  const hours =
    Math.floor(normalized / 60);

  const mins =
    normalized % 60;

  return `${String(hours).padStart(
    2,
    "0"
  )}:${String(mins).padStart(2, "0")}`;
}

function getCurrentTimePosition(date) {
  const minutes =
    date.getHours() * 60 +
    date.getMinutes();

  if (minutes < 0 || minutes > 1440) {
    return null;
  }

  return minutes * (HOUR_HEIGHT / 60);
}

function isSameDay(first, second) {
  if (!first || !second) {
    return false;
  }

  return (
    first.getDate() === second.getDate() &&
    first.getMonth() === second.getMonth() &&
    first.getFullYear() ===
      second.getFullYear()
  );
}

export default WeekCalendar;