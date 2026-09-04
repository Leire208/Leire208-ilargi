import { useEffect, useMemo, useRef, useState } from "react";
import { X, Loader2, ChevronDown } from "lucide-react";

import { useTheme } from "../../Context/ThemeContext";
import { useSubjects } from "../../Context/SubjectContext";
import { useSchedule } from "../../Context/ScheduleContext";

function AddClassModal({
  open,
  close,
  day,
  hour,
  fromCreateMenu = false,
}) {
  const { styles } = useTheme();
  const { subjects } = useSubjects();
  const { addClass } = useSchedule();

  const openedFromCalendar =
    !fromCreateMenu && Boolean(day);

  const [selectedDay, setSelectedDay] = useState(day || "");
  const [subjectId, setSubjectId] = useState("");
  const [room, setRoom] = useState("");

  const [start, setStart] = useState(hour || "");
  const [end, setEnd] = useState("");

  const [saving, setSaving] = useState(false);

  const [startHour, setStartHour] = useState(
    hour ? Number(hour.split(":")[0]) : 9
  );

  const [startMinute, setStartMinute] = useState(
    hour ? Number(hour.split(":")[1]) : 0
  );

  const [endHour, setEndHour] = useState(
    hour
      ? Number(getOneHourLater(hour).split(":")[0])
      : 10
  );

  const [endMinute, setEndMinute] = useState(
    hour
      ? Number(getOneHourLater(hour).split(":")[1])
      : 0
  );

  useEffect(() => {
    if (!open) return;

    const initialStart = hour || "";

    const initialEnd =
      getOneHourLater(initialStart);

    setSelectedDay(day || "");
    setSubjectId("");
    setRoom("");
    setStart(initialStart);
    setEnd(initialEnd);
    setSaving(false);

    setStartHour(
      initialStart
        ? Number(initialStart.split(":")[0])
        : 9
    );

    setStartMinute(
      initialStart
        ? Number(initialStart.split(":")[1])
        : 0
    );

    setEndHour(
      initialEnd
        ? Number(initialEnd.split(":")[0])
        : 10
    );

    setEndMinute(
      initialEnd
        ? Number(initialEnd.split(":")[1])
        : 0
    );
  }, [open, day, hour]);

  useEffect(() => {
    if (!open) return;

    const newStart = formatTime(
      startHour,
      startMinute
    );

    setStart(newStart);

    // Desde el +, el final se coloca automáticamente
    // una hora después del inicio.
    if (!openedFromCalendar) {
      const newEnd = getOneHourLater(newStart);

      setEnd(newEnd);

      setEndHour(
        Number(newEnd.split(":")[0])
      );

      setEndMinute(
        Number(newEnd.split(":")[1])
      );
    }
  }, [
    startHour,
    startMinute,
    openedFromCalendar,
    open,
  ]);

  useEffect(() => {
    if (!open || !openedFromCalendar) return;

    setEnd(
      formatTime(
        endHour,
        endMinute
      )
    );
  }, [
    endHour,
    endMinute,
    openedFromCalendar,
    open,
  ]);

  const days = useMemo(
    () => [
      {
        value: "L",
        short: "Lun",
        full: "Lunes",
      },
      {
        value: "M",
        short: "Mar",
        full: "Martes",
      },
      {
        value: "X",
        short: "Mié",
        full: "Miércoles",
      },
      {
        value: "J",
        short: "Jue",
        full: "Jueves",
      },
      {
        value: "V",
        short: "Vie",
        full: "Viernes",
      },
    ],
    []
  );

  if (!open) return null;

  async function save() {
    if (saving) return;

    if (!selectedDay) {
      alert("Selecciona un día.");
      return;
    }

    const subject = subjects.find(
      (item) => item.id === subjectId
    );

    if (!subject) {
      alert("Selecciona una asignatura.");
      return;
    }

    if (!start || !end) {
      alert(
        "Debes indicar inicio y fin."
      );
      return;
    }

    if (
      timeToMinutes(end) <=
      timeToMinutes(start)
    ) {
      alert(
        "La hora de finalización debe ser posterior a la hora de inicio."
      );
      return;
    }

    const newClass = {
      day: selectedDay,
      start,
      end,
      subjectId: subject.id,
      subjectName: subject.name,
      color:
        subject.color ||
        "#60a5fa",
      room: room.trim(),
    };

    try {
      setSaving(true);

      await addClass(newClass);

      close();
    } catch (error) {
      console.error(
        "ADD CLASS ERROR:",
        error
      );

      alert(
        `No se pudo guardar la clase.\n\nCódigo: ${
          error?.code ||
          "sin código"
        }\n\nMensaje: ${
          error?.message ||
          error
        }`
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div
      className="
        fixed
        inset-0
        z-[120]
        bg-black/50
        backdrop-blur-md
        flex
        items-center
        justify-center
        px-4
        py-6
      "
      onClick={close}
    >
      <section
        onClick={(event) =>
          event.stopPropagation()
        }
        className={`
          w-full
          max-w-md
          max-h-[92vh]
          overflow-y-auto
          rounded-[32px]
          p-6
          ${styles.card}
        `}
      >
        {/* HEADER */}
        <div
          className="
            flex
            items-start
            justify-between
            mb-7
          "
        >
          <div>
            <h2
              className="
                text-2xl
                font-bold
                text-white
                tracking-tight
              "
            >
              Nueva clase
            </h2>

            <p
              className="
                text-white/45
                text-sm
                mt-1
              "
            >
              {selectedDay
                ? getDayName(selectedDay)
                : "Añade una clase a tu horario"}
            </p>
          </div>

          <button
            type="button"
            onClick={close}
            className="
              w-10
              h-10
              rounded-full
              bg-white/10
              flex
              items-center
              justify-center
              hover:bg-white/20
              active:scale-95
              transition
            "
          >
            <X
              className="text-white"
              size={19}
            />
          </button>
        </div>

        {/* DÍA */}
        {!openedFromCalendar && (
          <div className="mb-7">
            <div
              className="
                flex
                items-center
                justify-between
                mb-3
              "
            >
              <span
                className="
                  text-white/60
                  text-xs
                  font-medium
                  uppercase
                  tracking-wider
                "
              >
                Día
              </span>

              <span className="text-white/35 text-xs">
                Selecciona uno
              </span>
            </div>

            <div
              className="
                grid
                grid-cols-5
                gap-2
              "
            >
              {days.map((item) => {
                const selected =
                  selectedDay ===
                  item.value;

                return (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() =>
                      setSelectedDay(
                        item.value
                      )
                    }
                    className={`
                      relative
                      h-[68px]
                      rounded-2xl
                      flex
                      flex-col
                      items-center
                      justify-center
                      transition-all
                      duration-200
                      active:scale-95
                      ${
                        selected
                          ? "bg-white text-black shadow-lg"
                          : "bg-white/8 text-white/65 hover:bg-white/14"
                      }
                    `}
                  >
                    <span
                      className={`
                        text-xs
                        font-medium
                        ${
                          selected
                            ? "text-black/45"
                            : "text-white/40"
                        }
                      `}
                    >
                      {item.short}
                    </span>

                    <span
                      className={`
                        text-lg
                        font-semibold
                        mt-0.5
                        ${
                          selected
                            ? "text-black"
                            : "text-white"
                        }
                      `}
                    >
                      {item.value}
                    </span>

                    {selected && (
                      <span
                        className="
                          absolute
                          bottom-2
                          w-1
                          h-1
                          rounded-full
                          bg-black
                        "
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ASIGNATURA */}
        <div className="mb-7">
          <label
            className="
              block
              text-white/60
              text-xs
              font-medium
              uppercase
              tracking-wider
              mb-3
            "
          >
            Asignatura
          </label>

          <div className="relative">
            <select
              value={subjectId}
              onChange={(event) =>
                setSubjectId(
                  event.target.value
                )
              }
              className="
                appearance-none
                w-full
                rounded-2xl
                bg-white/8
                border
                border-white/10
                text-white
                px-4
                py-4
                pr-11
                outline-none
                focus:bg-white/12
                focus:border-white/20
                transition
              "
            >
              <option
                value=""
                className="text-black"
              >
                Selecciona asignatura
              </option>

              {subjects.map(
                (subject) => (
                  <option
                    key={subject.id}
                    value={subject.id}
                    className="text-black"
                  >
                    {subject.name}
                  </option>
                )
              )}
            </select>

            <ChevronDown
              size={18}
              className="
                absolute
                right-4
                top-1/2
                -translate-y-1/2
                text-white/45
                pointer-events-none
              "
            />
          </div>
        </div>

        {/* HORARIOS */}
        <div className="mb-7">
          <div
            className="
              flex
              items-center
              justify-between
              mb-3
            "
          >
            <span
              className="
                text-white/60
                text-xs
                font-medium
                uppercase
                tracking-wider
              "
            >
              Horario
            </span>

            <span
              className="
                text-white/35
                text-xs
              "
            >
              Desliza para elegir
            </span>
          </div>

          <div
            className="
              grid
              grid-cols-2
              gap-3
            "
          >
            {/* INICIO */}
            <TimeWheel
              label="Inicio"
              hour={startHour}
              minute={startMinute}
              onHourChange={setStartHour}
              onMinuteChange={
                setStartMinute
              }
            />

            {/* FIN */}
            <TimeWheel
              label="Fin"
              hour={endHour}
              minute={endMinute}
              onHourChange={setEndHour}
              onMinuteChange={
                setEndMinute
              }
              disabled={!openedFromCalendar}
            />
          </div>

          {/* RESUMEN */}
          <div
            className="
              mt-3
              rounded-2xl
              bg-white/6
              border
              border-white/8
              px-4
              py-3
              flex
              items-center
              justify-center
              gap-3
            "
          >
            <span className="text-white font-semibold">
              {start || "--:--"}
            </span>

            <span className="text-white/25">
              →
            </span>

            <span className="text-white font-semibold">
              {end || "--:--"}
            </span>
          </div>
        </div>

        {/* AULA */}
        <div className="mb-7">
          <label
            className="
              block
              text-white/60
              text-xs
              font-medium
              uppercase
              tracking-wider
              mb-3
            "
          >
            Aula
          </label>

          <input
            value={room}
            onChange={(event) =>
              setRoom(
                event.target.value
              )
            }
            placeholder="Ej. Aula 204"
            className="
              w-full
              rounded-2xl
              bg-white/8
              border
              border-white/10
              text-white
              placeholder:text-white/30
              px-4
              py-4
              outline-none
              focus:bg-white/12
              focus:border-white/20
              transition
            "
          />
        </div>

        {/* GUARDAR */}
        <button
          type="button"
          onClick={save}
          disabled={saving}
          className="
            w-full
            py-4
            rounded-2xl
            bg-white
            text-black
            font-semibold
            flex
            items-center
            justify-center
            gap-2
            hover:bg-white/90
            active:scale-[0.98]
            disabled:opacity-50
            disabled:cursor-not-allowed
            transition
          "
        >
          {saving ? (
            <>
              <Loader2
                size={18}
                className="animate-spin"
              />
              Guardando...
            </>
          ) : (
            "Añadir clase"
          )}
        </button>
      </section>
    </div>
  );
}

/* =====================================================
   TIME WHEEL
===================================================== */

function TimeWheel({
  label,
  hour,
  minute,
  onHourChange,
  onMinuteChange,
  disabled = false,
}) {
  const hoursRef = useRef(null);
  const minutesRef = useRef(null);

  const hours = Array.from(
    { length: 24 },
    (_, index) => index
  );

  const minutes = Array.from(
    { length: 12 },
    (_, index) => index * 5
  );

  useEffect(() => {
    if (!hoursRef.current) return;

    scrollToValue(
      hoursRef.current,
      hour
    );
  }, [hour]);

  useEffect(() => {
    if (!minutesRef.current) return;

    scrollToValue(
      minutesRef.current,
      Math.round(minute / 5) * 5
    );
  }, [minute]);

  function handleHourScroll() {
    if (!hoursRef.current) return;

    const element =
      hoursRef.current;

    const index = Math.round(
      element.scrollTop / 42
    );

    const safeIndex = Math.max(
      0,
      Math.min(
        hours.length - 1,
        index
      )
    );

    onHourChange(
      hours[safeIndex]
    );
  }

  function handleMinuteScroll() {
    if (!minutesRef.current) return;

    const element =
      minutesRef.current;

    const index = Math.round(
      element.scrollTop / 42
    );

    const safeIndex = Math.max(
      0,
      Math.min(
        minutes.length - 1,
        index
      )
    );

    onMinuteChange(
      minutes[safeIndex]
    );
  }

  return (
    <div
      className={`
        rounded-3xl
        bg-white/7
        border
        border-white/10
        overflow-hidden
        ${
          disabled
            ? "opacity-80"
            : ""
        }
      `}
    >
      <div
        className="
          px-4
          pt-4
          pb-2
          text-white/45
          text-xs
          font-medium
        "
      >
        {label}
      </div>

      <div
        className="
          relative
          h-[170px]
          flex
          items-center
          justify-center
        "
      >
        {/* Línea superior */}
        <div
          className="
            absolute
            left-3
            right-3
            top-[63px]
            h-px
            bg-white/10
            pointer-events-none
            z-10
          "
        />

        {/* Línea inferior */}
        <div
          className="
            absolute
            left-3
            right-3
            top-[105px]
            h-px
            bg-white/10
            pointer-events-none
            z-10
          "
        />

        {/* SOMBRA SUPERIOR */}
        <div
          className="
            absolute
            top-0
            left-0
            right-0
            h-12
            bg-gradient-to-b
            from-black/15
            to-transparent
            pointer-events-none
            z-20
          "
        />

        {/* SOMBRA INFERIOR */}
        <div
          className="
            absolute
            bottom-0
            left-0
            right-0
            h-12
            bg-gradient-to-t
            from-black/20
            to-transparent
            pointer-events-none
            z-20
          "
        />

        {/* HORAS */}
        <Wheel
          ref={hoursRef}
          values={hours}
          selected={hour}
          onScroll={handleHourScroll}
          disabled={disabled}
        />

        <span
          className="
            text-white/30
            text-lg
            font-medium
            mx-1
            z-30
            pointer-events-none
          "
        >
          :
        </span>

        {/* MINUTOS */}
        <Wheel
          ref={minutesRef}
          values={minutes}
          selected={minute}
          onScroll={handleMinuteScroll}
          disabled={disabled}
        />
      </div>
    </div>
  );
}

/* =====================================================
   WHEEL
===================================================== */

const Wheel = ({
  values,
  selected,
  onScroll,
  disabled,
}, ref) => {
  return (
    <div
      ref={ref}
      onScroll={onScroll}
      className="
        h-[126px]
        w-[58px]
        overflow-y-auto
        snap-y
        snap-mandatory
        scrollbar-none
        overscroll-contain
        z-30
      "
      style={{
        scrollbarWidth: "none",
        scrollBehavior: "smooth",
      }}
    >
      <div className="h-[42px]" />

      {values.map((value) => {
        const isSelected =
          value === selected;

        return (
          <button
            key={value}
            type="button"
            disabled={disabled}
            onClick={() => {
              if (disabled) return;

              onScroll?.({
                currentTarget: {
                  scrollTop:
                    value * 42,
                },
              });
            }}
            className={`
              h-[42px]
              w-full
              flex
              items-center
              justify-center
              snap-center
              text-lg
              tabular-nums
              transition-all
              duration-200
              ${
                isSelected
                  ? "text-white font-semibold scale-110"
                  : "text-white/25"
              }
            `}
          >
            {String(value).padStart(
              2,
              "0"
            )}
          </button>
        );
      })}

      <div className="h-[42px]" />
    </div>
  );
};

function scrollToValue(
  element,
  value
) {
  if (!element) return;

  requestAnimationFrame(() => {
    element.scrollTop =
      value * 42;
  });
}

function formatTime(
  hour,
  minute
) {
  return `${String(hour).padStart(
    2,
    "0"
  )}:${String(minute).padStart(
    2,
    "0"
  )}`;
}

function timeToMinutes(time) {
  if (!time) return 0;

  const [
    hours,
    minutes,
  ] = time
    .split(":")
    .map(Number);

  return (
    hours * 60 +
    minutes
  );
}

function getOneHourLater(time) {
  if (!time) return "";

  const [
    hours,
    minutes,
  ] = time
    .split(":")
    .map(Number);

  const total =
    hours * 60 +
    minutes +
    60;

  const normalized =
    total % 1440;

  const finalHours =
    Math.floor(
      normalized / 60
    );

  const finalMinutes =
    normalized % 60;

  return formatTime(
    finalHours,
    finalMinutes
  );
}

function getDayName(day) {
  const names = {
    L: "Lunes",
    M: "Martes",
    X: "Miércoles",
    J: "Jueves",
    V: "Viernes",
  };

  return (
    names[day] ||
    day ||
    ""
  );
}

export default AddClassModal;