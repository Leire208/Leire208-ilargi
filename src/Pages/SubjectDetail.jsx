import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  ArrowLeft,
  BookOpen,
  ClipboardList,
  FileText,
  FlaskConical,
  Info,
  Check,
  Trash2,
  Plus,
  CalendarDays,
  GraduationCap,
} from "lucide-react";

import SkyBackground from "../Components/SkyBackground";
import AddWorkModal from "../Components/Works/AddWorkModal";
import AddGradeModal from "../Components/Subjects/AddGradeModal";
import AddExamModal from "../Components/Exams/AddExamModal";

import { useSubjects } from "../Context/SubjectContext";
import { useTasks } from "../Context/TaskContext";
import { useWorks } from "../Context/WorkContext";
import { useExams } from "../Context/ExamContext";
import { useTheme } from "../Context/ThemeContext";

function SubjectDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    subjects,
    getGradesForSubject,
    getSubjectAverage,
    removeGrade,
  } = useSubjects();

  const { tasks, updateTask } = useTasks();
  const { works, updateWork, removeWork } = useWorks();
  const { exams, updateExam, removeExam } = useExams();
  const { styles } = useTheme();

  const [workModalOpen, setWorkModalOpen] =
    useState(false);

  const [gradeModalOpen, setGradeModalOpen] =
    useState(false);

  const [examModalOpen, setExamModalOpen] =
    useState(false);

  const [showAllTasks, setShowAllTasks] =
    useState(false);

  const [showAllWorks, setShowAllWorks] =
    useState(false);

  const [showAllExams, setShowAllExams] =
    useState(false);

  const subject = subjects.find(
    (item) => item.id === id
  );

  /* ==========================================
     TAREAS
  ========================================== */

  const subjectTasks = useMemo(() => {
    if (!subject) return [];

    return tasks.filter((task) => {
      return (
        task.subjectId === subject.id ||
        task.subject === subject.name
      );
    });
  }, [tasks, subject]);

  const pendingTasks = subjectTasks.filter(
    (task) => !task.completed
  );

  /* ==========================================
     TRABAJOS
  ========================================== */

  const subjectWorks = useMemo(() => {
    if (!subject) return [];

    return works.filter((work) => {
      return (
        work.subjectId === subject.id ||
        work.subject === subject.name
      );
    });
  }, [works, subject]);

  const pendingWorks = subjectWorks.filter(
    (work) => !work.completed
  );

  /* ==========================================
     EXÁMENES
  ========================================== */

  const subjectExams = useMemo(() => {
    if (!subject) return [];

    return exams.filter((exam) => {
      return (
        exam.subjectId === subject.id ||
        exam.subject === subject.name
      );
    });
  }, [exams, subject]);

  const pendingExams = subjectExams.filter(
    (exam) => !exam.completed
  );

  /* ==========================================
     NOTAS
  ========================================== */

  const subjectGrades = subject
    ? getGradesForSubject(subject.id)
    : [];

  const average = subject
    ? getSubjectAverage(subject.id)
    : null;

  /* ==========================================
     ORDENAR TAREAS
  ========================================== */

  const sortedPendingTasks = [...pendingTasks].sort(
    (a, b) => {
      const priorityOrder = {
        high: 0,
        medium: 1,
        low: 2,
      };

      const priorityA =
        priorityOrder[a.priority] ?? 1;

      const priorityB =
        priorityOrder[b.priority] ?? 1;

      if (priorityA !== priorityB) {
        return priorityA - priorityB;
      }

      const dateA =
        a.date ||
        a.dueDate ||
        "9999-12-31";

      const dateB =
        b.date ||
        b.dueDate ||
        "9999-12-31";

      return dateA.localeCompare(dateB);
    }
  );

  /* ==========================================
     ORDENAR TRABAJOS
  ========================================== */

  const sortedWorks = [...subjectWorks].sort(
    (a, b) => {
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1;
      }

      const priorityOrder = {
        high: 0,
        medium: 1,
        low: 2,
      };

      const priorityA =
        priorityOrder[a.priority] ?? 1;

      const priorityB =
        priorityOrder[b.priority] ?? 1;

      if (priorityA !== priorityB) {
        return priorityA - priorityB;
      }

      return (
        (a.dueDate || "9999-12-31").localeCompare(
          b.dueDate || "9999-12-31"
        )
      );
    }
  );

  /* ==========================================
     ORDENAR EXÁMENES
  ========================================== */

  const sortedExams = [...subjectExams].sort(
    (a, b) => {
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1;
      }

      const priorityOrder = {
        high: 0,
        medium: 1,
        low: 2,
      };

      const priorityA =
        priorityOrder[a.priority] ?? 1;

      const priorityB =
        priorityOrder[b.priority] ?? 1;

      if (priorityA !== priorityB) {
        return priorityA - priorityB;
      }

      return (
        (a.date || "9999-12-31").localeCompare(
          b.date || "9999-12-31"
        )
      );
    }
  );

  /* ==========================================
     FUNCIONES
  ========================================== */

  async function toggleTask(task) {
    try {
      await updateTask(task.id, {
        completed: !task.completed,
      });
    } catch (error) {
      console.error(
        "Error actualizando tarea:",
        error
      );
    }
  }

  async function toggleWork(work) {
    try {
      await updateWork(work.id, {
        completed: !work.completed,
      });
    } catch (error) {
      console.error(
        "Error actualizando trabajo:",
        error
      );
    }
  }

  async function toggleExam(exam) {
    try {
      await updateExam(exam.id, {
        completed: !exam.completed,
      });
    } catch (error) {
      console.error(
        "Error actualizando examen:",
        error
      );
    }
  }

  async function handleDeleteWork(workId) {
    const confirmed = window.confirm(
      "¿Quieres eliminar este trabajo?"
    );

    if (!confirmed) return;

    try {
      await removeWork(workId);
    } catch (error) {
      console.error(
        "Error eliminando trabajo:",
        error
      );
    }
  }

  async function handleDeleteGrade(gradeId) {
    const confirmed = window.confirm(
      "¿Quieres eliminar esta nota?"
    );

    if (!confirmed) return;

    try {
      await removeGrade(gradeId);
    } catch (error) {
      console.error(
        "Error eliminando nota:",
        error
      );
    }
  }

  async function handleDeleteExam(examId) {
    const confirmed = window.confirm(
      "¿Quieres eliminar este examen?"
    );

    if (!confirmed) return;

    try {
      await removeExam(examId);
    } catch (error) {
      console.error(
        "Error eliminando examen:",
        error
      );
    }
  }

  function formatDate(date) {
    if (!date) return "";

    const parsed = new Date(
      `${date}T00:00:00`
    );

    if (Number.isNaN(parsed.getTime())) {
      return date;
    }

    return parsed.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "short",
    });
  }

  function getPriorityLabel(priority) {
    if (priority === "high") return "Alta";
    if (priority === "low") return "Baja";

    return "Media";
  }

  function getPriorityClass(priority) {
    if (priority === "high") {
      return `
        bg-red-400/15
        text-red-200
        border-red-300/10
      `;
    }

    if (priority === "low") {
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

  function getExamTypeLabel(type) {
    if (type === "ordinary") {
      return "Ordinario";
    }

    if (type === "extraordinary") {
      return "Extraordinario";
    }

    return "Parcial";
  }

  /* ==========================================
     ASIGNATURA NO ENCONTRADA
  ========================================== */

  if (!subject) {
    return (
      <SkyBackground>
        <main className="min-h-screen max-w-4xl mx-auto px-6 pt-8 pb-40">

          <button
            type="button"
            onClick={() =>
              navigate("/subjects")
            }
            className="
              flex
              items-center
              gap-2
              text-white/70
              hover:text-white
              transition
            "
          >
            <ArrowLeft size={20} />
            Volver
          </button>

          <div className="text-center py-24">
            <p className="text-white/60">
              No se ha encontrado la asignatura.
            </p>
          </div>

        </main>
      </SkyBackground>
    );
  }

  /* ==========================================
     RENDER
  ========================================== */

  return (
    <SkyBackground>

      <main
        className="
          min-h-screen
          max-w-4xl
          mx-auto
          px-6
          pt-8
          pb-40
        "
      >

        {/* VOLVER */}

        <button
          type="button"
          onClick={() =>
            navigate("/subjects")
          }
          className="
            flex
            items-center
            gap-2
            text-white/60
            hover:text-white
            transition
            mb-7
          "
        >
          <ArrowLeft size={20} />

          <span>
            Asignaturas
          </span>
        </button>

        {/* ======================================
            CABECERA
        ====================================== */}

        <section
          className={`
            rounded-[32px]
            p-6
            shadow-xl
            ${styles.card}
          `}
        >

          <div className="flex items-start gap-4">

            <div
              className="
                w-16
                h-16
                rounded-3xl
                flex
                items-center
                justify-center
                shrink-0
                shadow-xl
              "
              style={{
                backgroundColor:
                  subject.color || "#3B82F6",
              }}
            >
              <BookOpen
                size={28}
                className="text-white"
              />
            </div>

            <div className="min-w-0 flex-1">

              <h1
                className="
                  text-3xl
                  font-bold
                  text-white
                  break-words
                "
              >
                {subject.name}
              </h1>

              <p className="text-white/45 text-sm mt-1">

                {subject.semester === "annual"
                  ? "Asignatura anual"
                  : subject.semester === "2"
                  ? "2.º cuatrimestre"
                  : "1.º cuatrimestre"}

              </p>

              {subject.teacher && (
                <p className="text-white/35 text-xs mt-2">
                  {subject.teacher}
                  {subject.classroom
                    ? ` · ${subject.classroom}`
                    : ""}
                </p>
              )}

            </div>

          </div>

          {/* ESTADÍSTICAS */}

          <div
            className="
              grid
              grid-cols-2
              sm:grid-cols-5
              gap-3
              mt-7
            "
          >

            <div className="rounded-2xl bg-white/8 p-4">

              <p className="text-white/35 text-xs">
                Media
              </p>

              <p className="text-white text-2xl font-semibold mt-1">

                {average !== null
                  ? average.toFixed(2)
                  : "—"}

              </p>

            </div>

            <div className="rounded-2xl bg-white/8 p-4">

              <p className="text-white/35 text-xs">
                Pendientes
              </p>

              <p className="text-white text-2xl font-semibold mt-1">
                {pendingTasks.length}
              </p>

            </div>

            <div className="rounded-2xl bg-white/8 p-4">

              <p className="text-white/35 text-xs">
                Trabajos
              </p>

              <p className="text-white text-2xl font-semibold mt-1">
                {pendingWorks.length}
              </p>

            </div>

            <div className="rounded-2xl bg-white/8 p-4">

              <p className="text-white/35 text-xs">
                Exámenes
              </p>

              <p className="text-white text-2xl font-semibold mt-1">
                {pendingExams.length}
              </p>

            </div>

            <div className="rounded-2xl bg-white/8 p-4">

              <p className="text-white/35 text-xs">
                Créditos
              </p>

              <p className="text-white text-2xl font-semibold mt-1">
                {subject.credits || "—"}
              </p>

            </div>

          </div>

        </section>

        {/* ======================================
            NOTAS
        ====================================== */}

        <section className="mt-7">

          <div
            className="
              flex
              items-center
              justify-between
              mb-3
              px-1
            "
          >

            <div>

              <h2 className="text-white font-semibold">
                Notas
              </h2>

              <p className="text-white/35 text-xs mt-0.5">

                {subjectGrades.length === 0
                  ? "Todavía no tienes notas"
                  : `${subjectGrades.length} ${
                      subjectGrades.length === 1
                        ? "nota"
                        : "notas"
                    } · media ponderada`}

              </p>

            </div>

            <button
              type="button"
              onClick={() =>
                setGradeModalOpen(true)
              }
              className="
                w-9
                h-9
                rounded-full
                bg-white
                text-black
                flex
                items-center
                justify-center
                hover:bg-white/90
                active:scale-95
                transition
              "
            >
              <Plus size={18} />
            </button>

          </div>

          <div
            className="
              rounded-3xl
              bg-white/8
              border
              border-white/8
              overflow-hidden
            "
          >

            {/* MEDIA */}

            <div
              className="
                p-5
                flex
                items-center
                justify-between
              "
            >

              <div>

                <p className="text-white/40 text-xs">
                  Media actual
                </p>

                <p className="text-white text-4xl font-bold mt-1">
                  {average !== null
                    ? average.toFixed(2)
                    : "—"}
                </p>

              </div>

              <div
                className="
                  w-14
                  h-14
                  rounded-2xl
                  bg-white/10
                  flex
                  items-center
                  justify-center
                "
              >
                <ClipboardList
                  size={22}
                  className="text-white/50"
                />
              </div>

            </div>

            {/* LISTA DE NOTAS */}

            {subjectGrades.length > 0 && (

              <div className="border-t border-white/8">

                {subjectGrades.map((grade) => (

                  <div
                    key={grade.id}
                    className="
                      px-5
                      py-4
                      flex
                      items-center
                      gap-3
                      border-b
                      border-white/5
                      last:border-b-0
                    "
                  >

                    <div className="flex-1 min-w-0">

                      <p className="text-white text-sm truncate">
                        {grade.name}
                      </p>

                      <p className="text-white/35 text-xs mt-0.5">
                        Peso {grade.weight}%
                      </p>

                    </div>

                    <p className="text-white font-semibold">
                      {Number(
                        grade.grade
                      ).toFixed(1)}
                    </p>

                    <button
                      type="button"
                      onClick={() =>
                        handleDeleteGrade(
                          grade.id
                        )
                      }
                      className="
                        w-8
                        h-8
                        rounded-full
                        flex
                        items-center
                        justify-center
                        text-white/25
                        hover:text-red-300
                        hover:bg-red-400/10
                        transition
                      "
                    >
                      <Trash2 size={15} />
                    </button>

                  </div>

                ))}

              </div>

            )}

            {subjectGrades.length === 0 && (

              <button
                type="button"
                onClick={() =>
                  setGradeModalOpen(true)
                }
                className="
                  w-full
                  border-t
                  border-white/8
                  px-5
                  py-5
                  text-left
                  hover:bg-white/5
                  transition
                "
              >

                <p className="text-white/50 text-sm">
                  Añade tu primera nota
                </p>

                <p className="text-white/25 text-xs mt-1">
                  Por ejemplo: Parcial 1 · 7,5 · 40%
                </p>

              </button>

            )}

          </div>

        </section>

        {/* ======================================
            TAREAS
        ====================================== */}

        <section className="mt-7">

          <div className="flex items-center justify-between mb-3 px-1">

            <div>

              <h2 className="text-white font-semibold">
                Tareas
              </h2>

              <p className="text-white/35 text-xs mt-0.5">

                {pendingTasks.length === 0
                  ? "No tienes tareas pendientes"
                  : `${pendingTasks.length} ${
                      pendingTasks.length === 1
                        ? "tarea pendiente"
                        : "tareas pendientes"
                    }`}

              </p>

            </div>

          </div>

          {pendingTasks.length === 0 ? (

            <div
              className="
                rounded-3xl
                bg-white/8
                border
                border-white/8
                p-6
                text-center
              "
            >

              <Check
                size={25}
                className="
                  mx-auto
                  text-white/30
                  mb-3
                "
              />

              <p className="text-white/45 text-sm">
                No tienes tareas pendientes.
              </p>

            </div>

          ) : (

            <div className="space-y-2">

              {(showAllTasks
                ? sortedPendingTasks
                : sortedPendingTasks.slice(0, 5)
              ).map((task) => (

                <div
                  key={task.id}
                  className="
                    rounded-2xl
                    bg-white/8
                    border
                    border-white/5
                    px-4
                    py-3
                    flex
                    items-center
                    gap-3
                  "
                >

                  <button
                    type="button"
                    onClick={() =>
                      toggleTask(task)
                    }
                    className="
                      w-7
                      h-7
                      rounded-full
                      border
                      border-white/20
                      flex
                      items-center
                      justify-center
                      shrink-0
                      hover:bg-white/10
                      transition
                    "
                  >
                    <Check
                      size={14}
                      className="text-white/40"
                    />
                  </button>

                  <div className="flex-1 min-w-0">

                    <p className="text-white text-sm truncate">
                      {task.title}
                    </p>

                    {(task.date ||
                      task.dueDate) && (

                      <div
                        className="
                          flex
                          items-center
                          gap-1.5
                          mt-1
                        "
                      >

                        <CalendarDays
                          size={12}
                          className="text-white/30"
                        />

                        <p className="text-white/35 text-xs">
                          {formatDate(
                            task.date ||
                            task.dueDate
                          )}
                        </p>

                      </div>

                    )}

                  </div>

                  {task.priority && (

                    <span
                      className={`
                        text-[10px]
                        px-2
                        py-1
                        rounded-full
                        border
                        shrink-0
                        ${getPriorityClass(
                          task.priority
                        )}
                      `}
                    >
                      {getPriorityLabel(
                        task.priority
                      )}
                    </span>

                  )}

                </div>

              ))}

              {sortedPendingTasks.length > 5 && (

                <button
                  type="button"
                  onClick={() =>
                    setShowAllTasks(
                      !showAllTasks
                    )
                  }
                  className="
                    w-full
                    py-3
                    text-white/45
                    text-sm
                    hover:text-white
                    transition
                  "
                >
                  {showAllTasks
                    ? "Mostrar menos"
                    : `Ver todas (${sortedPendingTasks.length})`}
                </button>

              )}

            </div>

          )}

        </section>

        {/* ======================================
            TRABAJOS
        ====================================== */}

        <section className="mt-7">

          <div
            className="
              flex
              items-center
              justify-between
              mb-3
              px-1
            "
          >

            <div>

              <h2 className="text-white font-semibold">
                Trabajos
              </h2>

              <p className="text-white/35 text-xs mt-0.5">

                {pendingWorks.length === 0
                  ? "No tienes trabajos pendientes"
                  : `${pendingWorks.length} ${
                      pendingWorks.length === 1
                        ? "trabajo pendiente"
                        : "trabajos pendientes"
                    }`}

              </p>

            </div>

            <button
              type="button"
              onClick={() =>
                setWorkModalOpen(true)
              }
              className="
                w-9
                h-9
                rounded-full
                bg-white
                text-black
                flex
                items-center
                justify-center
                hover:bg-white/90
                active:scale-95
                transition
              "
            >
              <Plus size={18} />
            </button>

          </div>

          {subjectWorks.length === 0 ? (

            <button
              type="button"
              onClick={() =>
                setWorkModalOpen(true)
              }
              className="
                w-full
                rounded-3xl
                bg-white/8
                border
                border-white/8
                p-7
                text-center
                hover:bg-white/10
                transition
              "
            >

              <div
                className="
                  w-12
                  h-12
                  rounded-2xl
                  bg-white/10
                  mx-auto
                  flex
                  items-center
                  justify-center
                  mb-3
                "
              >

                <FileText
                  size={22}
                  className="text-white/45"
                />

              </div>

              <p className="text-white/55 text-sm">
                No hay trabajos todavía
              </p>

              <p className="text-white/25 text-xs mt-1">
                Pulsa para añadir el primero
              </p>

            </button>

          ) : (

            <div className="space-y-2">

              {(showAllWorks
                ? sortedWorks
                : sortedWorks.slice(0, 5)
              ).map((work) => (

                <div
                  key={work.id}
                  className={`
                    rounded-2xl
                    bg-white/8
                    border
                    border-white/5
                    px-4
                    py-3
                    flex
                    items-center
                    gap-3
                    ${
                      work.completed
                        ? "opacity-50"
                        : ""
                    }
                  `}
                >

                  <button
                    type="button"
                    onClick={() =>
                      toggleWork(work)
                    }
                    className={`
                      w-7
                      h-7
                      rounded-full
                      border
                      flex
                      items-center
                      justify-center
                      shrink-0
                      transition
                      ${
                        work.completed
                          ? "bg-white border-white"
                          : "border-white/20 hover:bg-white/10"
                      }
                    `}
                  >

                    {work.completed && (
                      <Check
                        size={14}
                        className="text-black"
                      />
                    )}

                  </button>

                  <div className="flex-1 min-w-0">

                    <p
                      className={`
                        text-sm
                        truncate
                        ${
                          work.completed
                            ? "text-white/40 line-through"
                            : "text-white"
                        }
                      `}
                    >
                      {work.title}
                    </p>

                    {work.dueDate && (

                      <div
                        className="
                          flex
                          items-center
                          gap-1.5
                          mt-1
                        "
                      >

                        <CalendarDays
                          size={12}
                          className="text-white/30"
                        />

                        <p className="text-white/35 text-xs">
                          Entrega{" "}
                          {formatDate(
                            work.dueDate
                          )}
                        </p>

                      </div>

                    )}

                  </div>

                  {!work.completed &&
                    work.priority && (

                      <span
                        className={`
                          text-[10px]
                          px-2
                          py-1
                          rounded-full
                          border
                          shrink-0
                          ${getPriorityClass(
                            work.priority
                          )}
                        `}
                      >
                        {getPriorityLabel(
                          work.priority
                        )}
                      </span>

                    )}

                  <button
                    type="button"
                    onClick={() =>
                      handleDeleteWork(
                        work.id
                      )
                    }
                    className="
                      w-8
                      h-8
                      rounded-full
                      flex
                      items-center
                      justify-center
                      text-white/25
                      hover:text-red-300
                      hover:bg-red-400/10
                      transition
                    "
                  >
                    <Trash2 size={15} />
                  </button>

                </div>

              ))}

              {sortedWorks.length > 5 && (

                <button
                  type="button"
                  onClick={() =>
                    setShowAllWorks(
                      !showAllWorks
                    )
                  }
                  className="
                    w-full
                    py-3
                    text-white/45
                    text-sm
                    hover:text-white
                    transition
                  "
                >
                  {showAllWorks
                    ? "Mostrar menos"
                    : `Ver todos (${sortedWorks.length})`}
                </button>

              )}

            </div>

          )}

        </section>

        {/* ======================================
            EXÁMENES
        ====================================== */}

        <section className="mt-7">

          <div
            className="
              flex
              items-center
              justify-between
              mb-3
              px-1
            "
          >

            <div>

              <h2 className="text-white font-semibold">
                Exámenes
              </h2>

              <p className="text-white/35 text-xs mt-0.5">

                {pendingExams.length === 0
                  ? "No tienes exámenes pendientes"
                  : `${pendingExams.length} ${
                      pendingExams.length === 1
                        ? "examen pendiente"
                        : "exámenes pendientes"
                    }`}

              </p>

            </div>

            <button
              type="button"
              onClick={() =>
                setExamModalOpen(true)
              }
              className="
                w-9
                h-9
                rounded-full
                bg-white
                text-black
                flex
                items-center
                justify-center
                hover:bg-white/90
                active:scale-95
                transition
              "
            >
              <Plus size={18} />
            </button>

          </div>

          {subjectExams.length === 0 ? (

            <button
              type="button"
              onClick={() =>
                setExamModalOpen(true)
              }
              className="
                w-full
                rounded-3xl
                bg-white/8
                border
                border-white/8
                p-7
                text-center
                hover:bg-white/10
                transition
              "
            >

              <div
                className="
                  w-12
                  h-12
                  rounded-2xl
                  bg-white/10
                  mx-auto
                  flex
                  items-center
                  justify-center
                  mb-3
                "
              >

                <GraduationCap
                  size={22}
                  className="text-white/45"
                />

              </div>

              <p className="text-white/55 text-sm">
                No hay exámenes todavía
              </p>

              <p className="text-white/25 text-xs mt-1">
                Pulsa para añadir el primero
              </p>

            </button>

          ) : (

            <div className="space-y-2">

              {(showAllExams
                ? sortedExams
                : sortedExams.slice(0, 5)
              ).map((exam) => (

                <div
                  key={exam.id}
                  className={`
                    rounded-2xl
                    bg-white/8
                    border
                    border-white/5
                    px-4
                    py-3
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

                  {/* CHECK */}

                  <button
                    type="button"
                    onClick={() =>
                      toggleExam(exam)
                    }
                    className={`
                      w-7
                      h-7
                      rounded-full
                      border
                      flex
                      items-center
                      justify-center
                      shrink-0
                      transition
                      ${
                        exam.completed
                          ? "bg-white border-white"
                          : "border-white/20 hover:bg-white/10"
                      }
                    `}
                  >

                    {exam.completed && (
                      <Check
                        size={14}
                        className="text-black"
                      />
                    )}

                  </button>

                  {/* INFORMACIÓN */}

                  <div className="flex-1 min-w-0">

                    <p
                      className={`
                        text-sm
                        truncate
                        ${
                          exam.completed
                            ? "text-white/40 line-through"
                            : "text-white"
                        }
                      `}
                    >
                      {exam.title}
                    </p>

                    <div
                      className="
                        flex
                        items-center
                        gap-2
                        mt-1
                        flex-wrap
                      "
                    >

                      {exam.date && (

                        <div
                          className="
                            flex
                            items-center
                            gap-1.5
                          "
                        >

                          <CalendarDays
                            size={12}
                            className="text-white/30"
                          />

                          <p className="text-white/35 text-xs">
                            {formatDate(
                              exam.date
                            )}
                          </p>

                        </div>

                      )}

                      <span className="
                        text-[10px]
                        px-2
                        py-0.5
                        rounded-full
                        bg-white/8
                        border
                        border-white/8
                        text-white/40
                      ">
                        {getExamTypeLabel(
                          exam.type
                        )}
                      </span>

                    </div>

                  </div>

                  {/* PRIORIDAD */}

                  {!exam.completed &&
                    exam.priority && (

                      <span
                        className={`
                          text-[10px]
                          px-2
                          py-1
                          rounded-full
                          border
                          shrink-0
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

                  {/* ELIMINAR */}

                  <button
                    type="button"
                    onClick={() =>
                      handleDeleteExam(
                        exam.id
                      )
                    }
                    className="
                      w-8
                      h-8
                      rounded-full
                      flex
                      items-center
                      justify-center
                      text-white/25
                      hover:text-red-300
                      hover:bg-red-400/10
                      transition
                    "
                  >
                    <Trash2 size={15} />
                  </button>

                </div>

              ))}

              {sortedExams.length > 5 && (

                <button
                  type="button"
                  onClick={() =>
                    setShowAllExams(
                      !showAllExams
                    )
                  }
                  className="
                    w-full
                    py-3
                    text-white/45
                    text-sm
                    hover:text-white
                    transition
                  "
                >
                  {showAllExams
                    ? "Mostrar menos"
                    : `Ver todos (${sortedExams.length})`}
                </button>

              )}

            </div>

          )}

        </section>

        {/* ======================================
            INFORMACIÓN
        ====================================== */}

        <section className="mt-7">

          <h2 className="text-white font-semibold mb-3 px-1">
            Información
          </h2>

          <div
            className="
              rounded-3xl
              bg-white/8
              border
              border-white/8
              overflow-hidden
            "
          >

            <div
              className="
                px-5
                py-4
                flex
                items-center
                gap-4
              "
            >

              <div
                className="
                  w-11
                  h-11
                  rounded-2xl
                  bg-white/10
                  flex
                  items-center
                  justify-center
                  shrink-0
                "
              >
                <Info
                  size={20}
                  className="text-white/60"
                />
              </div>

              <div className="flex-1">

                <p className="text-white text-sm">
                  Profesor
                </p>

                <p className="text-white/35 text-xs mt-0.5">
                  {subject.teacher ||
                    "Sin información"}
                </p>

              </div>

            </div>

            <div
              className="
                border-t
                border-white/5
                px-5
                py-4
                flex
                items-center
                gap-4
              "
            >

              <div
                className="
                  w-11
                  h-11
                  rounded-2xl
                  bg-white/10
                  flex
                  items-center
                  justify-center
                  shrink-0
                "
              >
                <BookOpen
                  size={20}
                  className="text-white/60"
                />
              </div>

              <div className="flex-1">

                <p className="text-white text-sm">
                  Aula
                </p>

                <p className="text-white/35 text-xs mt-0.5">
                  {subject.classroom ||
                    "Sin información"}
                </p>

              </div>

            </div>

            <div
              className="
                border-t
                border-white/5
                px-5
                py-4
                flex
                items-center
                gap-4
              "
            >

              <div
                className="
                  w-11
                  h-11
                  rounded-2xl
                  bg-white/10
                  flex
                  items-center
                  justify-center
                  shrink-0
                "
              >
                <FlaskConical
                  size={20}
                  className="text-white/60"
                />
              </div>

              <div className="flex-1">

                <p className="text-white text-sm">
                  Créditos
                </p>

                <p className="text-white/35 text-xs mt-0.5">
                  {subject.credits ||
                    "Sin información"}
                </p>

              </div>

            </div>

          </div>

        </section>

      </main>

      {/* ======================================
          MODAL NOTA
      ====================================== */}

      <AddGradeModal
        open={gradeModalOpen}
        close={() =>
          setGradeModalOpen(false)
        }
        subjectId={subject.id}
      />

      {/* ======================================
          MODAL TRABAJO
      ====================================== */}

      <AddWorkModal
        open={workModalOpen}
        close={() =>
          setWorkModalOpen(false)
        }
        subjectId={subject.id}
      />

      {/* ======================================
          MODAL EXAMEN
      ====================================== */}

      <AddExamModal
        open={examModalOpen}
        close={() =>
          setExamModalOpen(false)
        }
        subjectId={subject.id}
      />

    </SkyBackground>
  );
}

export default SubjectDetail;