import {
  CalendarDays,
  BookOpen,
  CheckCircle2,
  Trash2,
  GraduationCap,
  Check,
} from "lucide-react";

import { useTheme } from "../../Context/ThemeContext";
import { useTasks } from "../../Context/TaskContext";
import { useSchedule } from "../../Context/ScheduleContext";
import { useEvents } from "../../Context/EventContext";
import { useExams } from "../../Context/ExamContext";

function DayAgenda({
  date,
  events = [],
  tasks = [],
  classes = [],
  exams = [],
}) {
  const { styles } = useTheme();

  const { removeTask } =
    useTasks();

  const { removeClass } =
    useSchedule();

  const { removeEvent } =
    useEvents();

  const {
    updateExam,
    removeExam,
  } = useExams();

  if (!date) return null;

  const scheduleDay =
    getScheduleDay(date);

  const dayClasses = classes
    .filter(
      (item) =>
        normalizeDay(item.day) ===
        scheduleDay
    )
    .sort(
      (a, b) =>
        timeToMinutes(
          a.start
        ) -
        timeToMinutes(
          b.start
        )
    );

  const dayEvents =
    events.filter(
      (event) => {
        if (!event.date) {
          return false;
        }

        const d =
          new Date(
            `${event.date}T00:00:00`
          );

        return isSameDay(
          d,
          date
        );
      }
    );

  const dayTasks =
    tasks.filter(
      (task) => {
        if (!task.date) {
          return false;
        }

        const d =
          new Date(
            `${task.date}T00:00:00`
          );

        return isSameDay(
          d,
          date
        );
      }
    );

  const dayExams =
    exams
      .filter(
        (exam) =>
          exam.date &&
          isSameDateString(
            exam.date,
            date
          )
      )
      .sort((a, b) => {
        const priorityOrder = {
          high: 0,
          medium: 1,
          low: 2,
        };

        if (
          a.completed !==
          b.completed
        ) {
          return a.completed
            ? 1
            : -1;
        }

        return (
          (priorityOrder[
            a.priority
          ] ?? 1) -
          (priorityOrder[
            b.priority
          ] ?? 1)
        );
      });

  const isEmpty =
    dayClasses.length === 0 &&
    dayEvents.length === 0 &&
    dayTasks.length === 0 &&
    dayExams.length === 0;

  async function handleRemoveClass(
    item
  ) {
    const confirmed =
      window.confirm(
        `¿Quieres eliminar "${item.subjectName}" del horario?`
      );

    if (!confirmed) return;

    try {
      await removeClass(
        item.id
      );
    } catch (error) {
      console.error(
        "Error eliminando clase:",
        error
      );

      alert(
        `No se ha podido eliminar la clase.\n\n${
          error?.message ||
          error
        }`
      );
    }
  }

  async function handleRemoveEvent(
    event
  ) {
    const confirmed =
      window.confirm(
        `¿Quieres eliminar "${event.title}" del calendario?`
      );

    if (!confirmed) return;

    try {
      await removeEvent(
        event.id
      );
    } catch (error) {
      console.error(
        "Error eliminando evento:",
        error
      );

      alert(
        `No se ha podido eliminar el evento.\n\n${
          error?.message ||
          error
        }`
      );
    }
  }

  async function handleToggleExam(
    exam
  ) {
    try {
      await updateExam(
        exam.id,
        {
          completed:
            !exam.completed,
        }
      );
    } catch (error) {
      console.error(
        "Error actualizando examen:",
        error
      );
    }
  }

  async function handleRemoveExam(
    exam
  ) {
    const confirmed =
      window.confirm(
        `¿Quieres eliminar "${exam.title}"?`
      );

    if (!confirmed) return;

    try {
      await removeExam(
        exam.id
      );
    } catch (error) {
      console.error(
        "Error eliminando examen:",
        error
      );

      alert(
        `No se ha podido eliminar el examen.\n\n${
          error?.message ||
          error
        }`
      );
    }
  }

  function getExamTypeLabel(
    type
  ) {
    if (
      type === "ordinary"
    ) {
      return "Ordinario";
    }

    if (
      type ===
      "extraordinary"
    ) {
      return "Extraordinario";
    }

    return "Parcial";
  }

  function getPriorityLabel(
    priority
  ) {
    if (
      priority === "high"
    ) {
      return "Alta";
    }

    if (
      priority === "low"
    ) {
      return "Baja";
    }

    return "Media";
  }

  function getPriorityClass(
    priority
  ) {
    if (
      priority === "high"
    ) {
      return `
        bg-red-400/15
        text-red-200
        border-red-300/10
      `;
    }

    if (
      priority === "low"
    ) {
      return `
        bg-white/8
        text-white/45
        border-white/8
      `;
    }

    return `
      bg-amber-300/10
      text-amber-100
      border-amber-200/10
    `;
  }

  return (
    <section
      className={`
        mt-6
        rounded-3xl
        p-6
        shadow-xl
        ${styles.card}
      `}
    >
      <h2
        className="
          text-2xl
          font-bold
          text-white
          mb-5
          capitalize
        "
      >
        {date.toLocaleDateString(
          "es-ES",
          {
            weekday: "long",
            day: "numeric",
            month: "long",
          }
        )}
      </h2>

      {isEmpty && (
        <p className="text-white/60">
          No hay nada programado 🎉
        </p>
      )}

      {/* ============================== */}
      {/* EXÁMENES                        */}
      {/* ============================== */}

      {dayExams.length > 0 && (
        <div className="mb-5">
          <p
            className="
              text-white/50
              text-xs
              uppercase
              tracking-wider
              mb-3
            "
          >
            Exámenes
          </p>

          {dayExams.map(
            (exam) => (
              <div
                key={exam.id}
                className={`
                  rounded-2xl
                  bg-white/10
                  p-4
                  mb-3
                  flex
                  items-center
                  gap-3
                  ${
                    exam.completed
                      ? "opacity-50"
                      : ""
                  }
                `}
              >
                <button
                  type="button"
                  onClick={() =>
                    handleToggleExam(
                      exam
                    )
                  }
                  className={`
                    w-10
                    h-10
                    rounded-xl
                    border
                    flex
                    items-center
                    justify-center
                    shrink-0
                    transition
                    ${
                      exam.completed
                        ? "bg-white border-white"
                        : "bg-white/5 border-white/15 hover:bg-white/10"
                    }
                  `}
                  aria-label={
                    exam.completed
                      ? "Marcar como pendiente"
                      : "Marcar como realizado"
                  }
                >
                  {exam.completed ? (
                    <Check
                      size={18}
                      className="text-black"
                    />
                  ) : (
                    <GraduationCap
                      size={19}
                      className="text-white/60"
                    />
                  )}
                </button>

                <div className="flex-1 min-w-0">
                  <p
                    className={`
                      text-white
                      font-semibold
                      truncate
                      ${
                        exam.completed
                          ? "line-through text-white/40"
                          : ""
                      }
                    `}
                  >
                    {exam.title}
                  </p>

                  {exam.subject && (
                    <p
                      className="
                        text-white/50
                        text-sm
                        mt-0.5
                        truncate
                      "
                    >
                      {exam.subject}
                    </p>
                  )}

                  <div
                    className="
                      flex
                      items-center
                      gap-2
                      mt-2
                      flex-wrap
                    "
                  >
                    <span
                      className="
                        text-[10px]
                        px-2
                        py-1
                        rounded-full
                        bg-white/8
                        border
                        border-white/8
                        text-white/45
                      "
                    >
                      {getExamTypeLabel(
                        exam.type
                      )}
                    </span>

                    {!exam.completed &&
                      exam.priority && (
                        <span
                          className={`
                            text-[10px]
                            px-2
                            py-1
                            rounded-full
                            border
                            ${getPriorityClass(
                              exam.priority
                            )}
                          `}
                        >
                          {getPriorityLabel(
                            exam.priority
                          )}
                        </span>
                      )}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    handleRemoveExam(
                      exam
                    )
                  }
                  className="
                    p-2
                    rounded-xl
                    bg-red-500/20
                    text-red-200
                    hover:bg-red-500/30
                    transition
                    shrink-0
                  "
                  aria-label={`Eliminar ${exam.title}`}
                >
                  <Trash2
                    size={17}
                  />
                </button>
              </div>
            )
          )}
        </div>
      )}

      {/* ============================== */}
      {/* CLASES                         */}
      {/* ============================== */}

      {dayClasses.length > 0 && (
        <div className="mb-5">
          <p
            className="
              text-white/50
              text-xs
              uppercase
              tracking-wider
              mb-3
            "
          >
            Horario
          </p>

          {dayClasses.map(
            (item) => (
              <div
                key={item.id}
                className="
                  rounded-2xl
                  bg-white/10
                  p-4
                  mb-3
                  flex
                  items-center
                  gap-3
                "
              >
                <div
                  className="
                    w-10
                    h-10
                    rounded-xl
                    flex
                    items-center
                    justify-center
                    shrink-0
                  "
                  style={{
                    background:
                      item.color ||
                      "#60a5fa",
                  }}
                >
                  <BookOpen
                    className="text-white"
                    size={19}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <p
                    className="
                      text-white
                      font-semibold
                      truncate
                    "
                  >
                    {item.subjectName}
                  </p>

                  <p
                    className="
                      text-white/60
                      text-sm
                    "
                  >
                    {item.start}
                    {" – "}
                    {item.end ||
                      "1 hora"}
                  </p>

                  {item.room && (
                    <p
                      className="
                        text-white/50
                        text-xs
                        mt-1
                      "
                    >
                      📍{" "}
                      {item.room}
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() =>
                    handleRemoveClass(
                      item
                    )
                  }
                  className="
                    p-2
                    rounded-xl
                    bg-red-500/20
                    text-red-200
                    hover:bg-red-500/30
                    transition
                    shrink-0
                  "
                  aria-label={`Eliminar ${item.subjectName}`}
                >
                  <Trash2
                    size={17}
                  />
                </button>
              </div>
            )
          )}
        </div>
      )}

      {/* ============================== */}
      {/* EVENTOS                        */}
      {/* ============================== */}

      {dayEvents.length > 0 && (
        <div className="mb-5">
          <p
            className="
              text-white/50
              text-xs
              uppercase
              tracking-wider
              mb-3
            "
          >
            Eventos
          </p>

          {dayEvents.map(
            (event) => (
              <div
                key={event.id}
                className="
                  rounded-2xl
                  bg-white/10
                  p-4
                  mb-3
                  flex
                  items-center
                  gap-3
                "
              >
                <CalendarDays
                  className="text-white shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <p
                    className="
                      text-white
                      font-semibold
                      truncate
                    "
                  >
                    {event.title}
                  </p>

                  {event.startTime && (
                    <p
                      className="
                        text-white/60
                        text-sm
                      "
                    >
                      {event.startTime}

                      {event.endTime &&
                        ` – ${event.endTime}`}
                    </p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() =>
                    handleRemoveEvent(
                      event
                    )
                  }
                  className="
                    p-2
                    rounded-xl
                    bg-red-500/20
                    text-red-200
                    hover:bg-red-500/30
                    transition
                    shrink-0
                  "
                  aria-label={`Eliminar ${event.title}`}
                >
                  <Trash2
                    size={17}
                  />
                </button>
              </div>
            )
          )}
        </div>
      )}

      {/* ============================== */}
      {/* TAREAS                         */}
      {/* ============================== */}

      {dayTasks.length > 0 && (
        <div>
          <p
            className="
              text-white/50
              text-xs
              uppercase
              tracking-wider
              mb-3
            "
          >
            Tareas
          </p>

          {dayTasks.map(
            (task) => (
              <div
                key={task.id}
                className="
                  rounded-2xl
                  bg-white/10
                  p-4
                  mb-3
                  flex
                  items-center
                  gap-3
                "
              >
                <CheckCircle2
                  className="text-white shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <p
                    className="
                      text-white
                      font-semibold
                      truncate
                    "
                  >
                    {task.title}
                  </p>

                  <p
                    className="
                      text-white/60
                      text-sm
                    "
                  >
                    {task.subject ||
                      "Tarea"}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    removeTask(
                      task.id
                    )
                  }
                  className="
                    p-2
                    rounded-xl
                    bg-red-500/20
                    text-red-200
                    hover:bg-red-500/30
                    transition
                    shrink-0
                  "
                  aria-label="Eliminar tarea"
                >
                  <Trash2
                    size={17}
                  />
                </button>
              </div>
            )
          )}
        </div>
      )}
    </section>
  );
}

/* ================================= */
/* HELPERS                           */
/* ================================= */

function getScheduleDay(
  date
) {
  const day =
    date.getDay();

  const map = {
    1: "L",
    2: "M",
    3: "X",
    4: "J",
    5: "V",
  };

  return map[day] || null;
}

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

function timeToMinutes(
  time
) {
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

export default DayAgenda;