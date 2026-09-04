import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Plus,
  Pencil,
  Trash2,
  BookOpen,
  ChevronRight,
} from "lucide-react";

import SkyBackground from "../Components/SkyBackground";
import AddSubjectModal from "../Components/Subjects/AddSubjectModal";

import { useSubjects } from "../Context/SubjectContext";
import { useTasks } from "../Context/TaskContext";
import { useTheme } from "../Context/ThemeContext";

function Subjects() {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [editingSubject, setEditingSubject] = useState(null);
  const [filter, setFilter] = useState("all");

  const {
    subjects,
    removeSubject,
    getSubjectAverage,
  } = useSubjects();

  const { tasks } = useTasks();
  const { styles } = useTheme();

  function openCreateModal() {
    setEditingSubject(null);
    setShowModal(true);
  }

  function openEditModal(subject) {
    setEditingSubject(subject);
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
    setEditingSubject(null);
  }

  function getSubjectTasks(subjectId) {
    const subject = subjects.find(
      (item) => item.id === subjectId
    );

    if (!subject) return [];

    return tasks.filter((task) => {
      return (
        task.subjectId === subjectId ||
        task.subject === subject.name
      );
    });
  }

  function getPendingTasks(subjectId) {
    return getSubjectTasks(subjectId).filter(
      (task) => !task.completed
    );
  }

  async function handleDelete(subject) {
    const confirmed = window.confirm(
      `¿Seguro que quieres eliminar "${subject.name}"?`
    );

    if (!confirmed) return;

    try {
      await removeSubject(subject.id);
    } catch (error) {
      console.error(
        "Error eliminando asignatura:",
        error
      );

      alert(
        "No se pudo eliminar la asignatura."
      );
    }
  }

  function openSubject(subject) {
    navigate(`/subjects/${subject.id}`);
  }

  const filteredSubjects = subjects.filter(
    (subject) => {
      if (filter === "all") return true;

      if (filter === "1") {
        return subject.semester === "1";
      }

      if (filter === "2") {
        return subject.semester === "2";
      }

      if (filter === "annual") {
        return subject.semester === "annual";
      }

      return true;
    }
  );

  return (
    <SkyBackground>
      <main
        className="
          min-h-screen
          max-w-5xl
          mx-auto
          px-6
          pt-8
          pb-40
        "
      >
        {/* HEADER */}

        <div
          className="
            flex
            items-center
            justify-between
            mb-8
          "
        >
          <div>
            <h1
              className="
                text-3xl
                font-bold
                text-white
                tracking-tight
              "
            >
              Asignaturas
            </h1>

            <p className="text-white/50 text-sm mt-1">
              Tu espacio académico
            </p>
          </div>

          <button
            type="button"
            onClick={openCreateModal}
            className="
              w-12
              h-12
              rounded-full
              bg-white/15
              backdrop-blur-xl
              border
              border-white/10
              text-white
              flex
              items-center
              justify-center
              hover:bg-white/25
              active:scale-95
              transition
              shadow-lg
            "
            title="Añadir asignatura"
          >
            <Plus size={23} />
          </button>
        </div>

        {/* FILTROS */}

        <div
          className="
            flex
            gap-2
            overflow-x-auto
            scrollbar-none
            mb-7
            pb-1
          "
        >
          <button
            type="button"
            onClick={() => setFilter("all")}
            className={`
              shrink-0
              px-4
              py-2.5
              rounded-full
              text-sm
              font-medium
              transition
              ${
                filter === "all"
                  ? "bg-white text-black"
                  : "bg-white/10 text-white/60 hover:bg-white/15"
              }
            `}
          >
            Todas
          </button>

          <button
            type="button"
            onClick={() => setFilter("1")}
            className={`
              shrink-0
              px-4
              py-2.5
              rounded-full
              text-sm
              font-medium
              transition
              ${
                filter === "1"
                  ? "bg-white text-black"
                  : "bg-white/10 text-white/60 hover:bg-white/15"
              }
            `}
          >
            1.º cuatrimestre
          </button>

          <button
            type="button"
            onClick={() => setFilter("2")}
            className={`
              shrink-0
              px-4
              py-2.5
              rounded-full
              text-sm
              font-medium
              transition
              ${
                filter === "2"
                  ? "bg-white text-black"
                  : "bg-white/10 text-white/60 hover:bg-white/15"
              }
            `}
          >
            2.º cuatrimestre
          </button>

          <button
            type="button"
            onClick={() => setFilter("annual")}
            className={`
              shrink-0
              px-4
              py-2.5
              rounded-full
              text-sm
              font-medium
              transition
              ${
                filter === "annual"
                  ? "bg-white text-black"
                  : "bg-white/10 text-white/60 hover:bg-white/15"
              }
            `}
          >
            Anuales
          </button>
        </div>

        {/* ASIGNATURAS */}

        <section
          className={`
            rounded-[32px]
            p-5
            sm:p-6
            shadow-xl
            ${styles.card}
          `}
        >
          {filteredSubjects.length === 0 ? (
            <div
              className="
                flex
                flex-col
                items-center
                justify-center
                py-16
                text-center
              "
            >
              <div
                className="
                  w-16
                  h-16
                  rounded-3xl
                  bg-white/10
                  flex
                  items-center
                  justify-center
                  mb-4
                "
              >
                <BookOpen
                  size={28}
                  className="text-white/60"
                />
              </div>

              <h2 className="text-white font-semibold text-lg">
                No hay asignaturas
              </h2>

              <p className="text-white/45 text-sm mt-1 max-w-xs">
                Añade tu primera asignatura para
                empezar a organizar todo lo relacionado
                con ella.
              </p>

              <button
                type="button"
                onClick={openCreateModal}
                className="
                  mt-5
                  px-5
                  py-3
                  rounded-2xl
                  bg-white
                  text-black
                  font-semibold
                  text-sm
                  hover:bg-white/90
                  active:scale-95
                  transition
                "
              >
                Añadir asignatura
              </button>
            </div>
          ) : (
            <div
              className="
                grid
                grid-cols-1
                sm:grid-cols-2
                gap-4
              "
            >
              {filteredSubjects.map((subject) => {
                const pendingTasks =
                  getPendingTasks(subject.id);

                const average =
                  getSubjectAverage(subject.id);

                return (
                  <article
                    key={subject.id}
                    className="
                      group
                      relative
                      rounded-[28px]
                      bg-white/8
                      border
                      border-white/8
                      p-5
                      transition-all
                      duration-200
                      hover:bg-white/12
                      hover:border-white/15
                    "
                  >
                    {/* CABECERA */}

                    <div
                      className="
                        flex
                        items-start
                        justify-between
                        gap-4
                      "
                    >
                      <button
                        type="button"
                        onClick={() =>
                          openSubject(subject)
                        }
                        className="
                          flex
                          items-start
                          gap-4
                          text-left
                          flex-1
                          min-w-0
                        "
                      >
                        <div
                          className="
                            w-12
                            h-12
                            rounded-2xl
                            flex
                            items-center
                            justify-center
                            shrink-0
                            shadow-lg
                          "
                          style={{
                            backgroundColor:
                              subject.color ||
                              "#3B82F6",
                          }}
                        >
                          <BookOpen
                            size={21}
                            className="text-white"
                          />
                        </div>

                        <div className="min-w-0 pt-0.5">
                          <h2
                            className="
                              text-white
                              font-semibold
                              text-lg
                              truncate
                            "
                          >
                            {subject.name}
                          </h2>

                          <p className="text-white/40 text-xs mt-1">
                            {subject.semester === "annual"
                              ? "Anual"
                              : subject.semester === "2"
                              ? "2.º cuatrimestre"
                              : "1.º cuatrimestre"}
                          </p>
                        </div>
                      </button>

                      {/* ACCIONES */}

                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() =>
                            openEditModal(subject)
                          }
                          className="
                            w-9
                            h-9
                            rounded-xl
                            bg-white/8
                            text-white/50
                            flex
                            items-center
                            justify-center
                            hover:bg-white/15
                            hover:text-white
                            transition
                          "
                          title="Editar asignatura"
                        >
                          <Pencil size={16} />
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(subject)
                          }
                          className="
                            w-9
                            h-9
                            rounded-xl
                            bg-red-500/8
                            text-red-300/70
                            flex
                            items-center
                            justify-center
                            hover:bg-red-500/15
                            hover:text-red-200
                            transition
                          "
                          title="Eliminar asignatura"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>

                    {/* SEPARADOR */}

                    <div className="h-px bg-white/8 my-5" />

                    {/* ESTADÍSTICAS */}

                    <div
                      className="
                        grid
                        grid-cols-2
                        gap-3
                      "
                    >
                      <div>
                        <p className="text-white/35 text-xs uppercase tracking-wider">
                          Media
                        </p>

                        <p className="text-white/90 text-2xl font-semibold mt-1">
                          {average !== null
                            ? average.toFixed(2)
                            : "—"}
                        </p>
                      </div>

                      <div>
                        <p className="text-white/35 text-xs uppercase tracking-wider">
                          Pendientes
                        </p>

                        <p className="text-white/90 text-2xl font-semibold mt-1">
                          {pendingTasks.length}
                        </p>
                      </div>
                    </div>

                    {/* DATOS EXTRA */}

                    {(subject.teacher ||
                      subject.classroom ||
                      subject.credits) && (
                      <div className="mt-5 space-y-1">
                        {subject.teacher && (
                          <p className="text-white/45 text-sm truncate">
                            👤 {subject.teacher}
                          </p>
                        )}

                        {subject.classroom && (
                          <p className="text-white/40 text-sm truncate">
                            📍 {subject.classroom}
                          </p>
                        )}

                        {subject.credits && (
                          <p className="text-white/40 text-sm">
                            🎓 {subject.credits} créditos
                          </p>
                        )}
                      </div>
                    )}

                    {/* ENTRAR */}

                    <button
                      type="button"
                      onClick={() =>
                        openSubject(subject)
                      }
                      className="
                        w-full
                        mt-5
                        rounded-2xl
                        bg-white/8
                        px-4
                        py-3
                        flex
                        items-center
                        justify-between
                        text-white/65
                        hover:bg-white/15
                        hover:text-white
                        transition
                      "
                    >
                      <span className="text-sm font-medium">
                        Ver asignatura
                      </span>

                      <ChevronRight size={18} />
                    </button>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </main>

      {/* MODAL */}

      <AddSubjectModal
        open={showModal}
        close={closeModal}
        subject={editingSubject}
      />
    </SkyBackground>
  );
}

export default Subjects;