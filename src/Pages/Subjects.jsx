import { useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
} from "lucide-react";

import SkyBackground from "../Components/SkyBackground";

import AddSubjectModal from "../Components/Subjects/AddSubjectModal";

import { useSubjects } from "../Context/SubjectContext";
import { useTheme } from "../Context/ThemeContext";

function Subjects() {
  const [showModal, setShowModal] = useState(false);
  const [editingSubject, setEditingSubject] = useState(null);

  const {
    subjects,
    removeSubject,
  } = useSubjects();

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

  return (
    <SkyBackground>

      <main
        className="
          min-h-screen
          max-w-4xl
          mx-auto
          px-6
          pt-8
          pb-36
        "
      >

        {/* HEADER */}

        <div
          className="
            flex
            justify-between
            items-center
            mb-8
          "
        >

          <h1 className="text-3xl font-bold text-white">
            Asignaturas
          </h1>

          <button
            onClick={openCreateModal}
            className="
              w-12
              h-12
              rounded-full
              bg-white/20
              text-white
              flex
              items-center
              justify-center
              hover:bg-white/30
              transition
            "
            title="Añadir asignatura"
          >
            <Plus size={24} />
          </button>

        </div>

        {/* LISTA */}

        <section
          className={`
            rounded-3xl
            p-6
            shadow-xl
            ${styles.card}
          `}
        >

          {subjects.length === 0 && (
            <p className="text-white/70 text-center py-8">
              No tienes asignaturas todavía.
            </p>
          )}

          <div className="space-y-4">

            {subjects.map((subject) => (

              <div
                key={subject.id}
                className="
                  rounded-2xl
                  bg-white/10
                  p-4
                  flex
                  items-center
                  gap-4
                  transition
                  hover:bg-white/15
                "
              >

                {/* COLOR */}

                <div
                  className="
                    w-7
                    h-7
                    rounded-full
                    shrink-0
                    shadow-lg
                  "
                  style={{
                    background:
                      subject.color ||
                      "#3B82F6",
                  }}
                />

                {/* INFORMACIÓN */}

                <div className="flex-1 min-w-0">

                  <h2
                    className="
                      text-white
                      font-semibold
                      truncate
                    "
                  >
                    {subject.name}
                  </h2>

                  {subject.teacher && (
                    <p className="text-white/60 text-sm">
                      {subject.teacher}
                    </p>
                  )}

                  {subject.classroom && (
                    <p className="text-white/50 text-sm">
                      Aula {subject.classroom}
                    </p>
                  )}

                  {subject.credits && (
                    <p className="text-white/50 text-sm">
                      {subject.credits} créditos
                    </p>
                  )}

                  <p className="text-white/40 text-xs mt-1">
                    {subject.semester === "2"
                      ? "2.º cuatrimestre"
                      : "1.º cuatrimestre"}
                  </p>

                </div>

                {/* BOTONES */}

                <div
                  className="
                    flex
                    items-center
                    gap-2
                    shrink-0
                  "
                >

                  <button
                    onClick={() =>
                      openEditModal(subject)
                    }
                    className="
                      w-10
                      h-10
                      rounded-xl
                      bg-white/10
                      text-white/80
                      flex
                      items-center
                      justify-center
                      hover:bg-white/20
                      hover:text-white
                      transition
                    "
                    title="Editar asignatura"
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(subject)
                    }
                    className="
                      w-10
                      h-10
                      rounded-xl
                      bg-red-500/10
                      text-red-300
                      flex
                      items-center
                      justify-center
                      hover:bg-red-500/20
                      hover:text-red-200
                      transition
                    "
                    title="Eliminar asignatura"
                  >
                    <Trash2 size={18} />
                  </button>

                </div>

              </div>

            ))}

          </div>

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