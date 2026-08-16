import { useState } from "react";
import { Plus, Pencil } from "lucide-react";

import SkyBackground from "../Components/SkyBackground";
import AddSubjectModal from "../Components/Subjects/AddSubjectModal";

import { useSubjects } from "../Context/SubjectContext";
import { useTheme } from "../Context/ThemeContext";

function Subjects() {
  const [showModal, setShowModal] = useState(false);
  const [editingSubject, setEditingSubject] = useState(null);

  const { subjects } = useSubjects();
  const { styles } = useTheme();

  function createSubject() {
    setEditingSubject(null);
    setShowModal(true);
  }

  function editSubject(subject) {
    setEditingSubject(subject);
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
    setEditingSubject(null);
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

        <div className="flex justify-between items-center mb-8">

          <h1 className="text-3xl font-bold text-white">
            Asignaturas
          </h1>

          <button
            onClick={createSubject}
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
            <p className="text-white/70">
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
                "
              >

                {/* COLOR */}

                <div
                  className="
                    w-6
                    h-6
                    rounded-full
                    shrink-0
                  "
                  style={{
                    backgroundColor: subject.color || "#60a5fa",
                  }}
                />


                {/* INFORMACIÓN */}

                <div className="flex-1 min-w-0">

                  <h2 className="text-white font-semibold truncate">
                    {subject.name}
                  </h2>

                  {subject.teacher && (
                    <p className="text-white/60 text-sm">
                      {subject.teacher}
                    </p>
                  )}

                  {subject.credits && (
                    <p className="text-white/50 text-sm">
                      {subject.credits} créditos
                    </p>
                  )}

                </div>


                {/* EDITAR */}

                <button
                  onClick={() => editSubject(subject)}
                  className="
                    w-10
                    h-10
                    rounded-full
                    bg-white/10
                    text-white/70
                    flex
                    items-center
                    justify-center
                    hover:bg-white/20
                    hover:text-white
                    transition
                    shrink-0
                  "
                  title="Editar asignatura"
                >
                  <Pencil size={18} />
                </button>

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