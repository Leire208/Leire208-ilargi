import { useEffect, useState } from "react";

import { X, FileText } from "lucide-react";

import { useTheme } from "../../Context/ThemeContext";
import { useSubjects } from "../../Context/SubjectContext";
import { useWorks } from "../../Context/WorkContext";

function AddWorkModal({
  open,
  close,
  subjectId = "",
}) {
  const { styles } = useTheme();
  const { subjects } = useSubjects();
  const { addWork } = useWorks();

  const [title, setTitle] = useState("");
  const [selectedSubject, setSelectedSubject] =
    useState(subjectId);
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] =
    useState("medium");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (open) {
      setTitle("");
      setSelectedSubject(subjectId || "");
      setDueDate("");
      setPriority("medium");
    }
  }, [open, subjectId]);

  if (!open) return null;

  function handleOverlayClick(event) {
    if (event.target === event.currentTarget) {
      close();
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!title.trim()) {
      return;
    }

    setSaving(true);

    try {
      const subject = subjects.find(
        (item) => item.id === selectedSubject
      );

      await addWork({
        title: title.trim(),
        subjectId: selectedSubject,
        subject: subject?.name || "",
        dueDate,
        priority,
      });

      close();
    } catch (error) {
      console.error(
        "Error creando trabajo:",
        error
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div
      onClick={handleOverlayClick}
      className="
        fixed
        inset-0
        z-[120]
        bg-black/40
        backdrop-blur-md
        flex
        items-end
        sm:items-center
        justify-center
        p-4
      "
    >
      <div
        className={`
          w-full
          max-w-lg
          rounded-[32px]
          p-6
          shadow-2xl
          ${styles.card}
        `}
      >
        {/* HEADER */}

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div
              className="
                w-11
                h-11
                rounded-2xl
                bg-white/10
                flex
                items-center
                justify-center
              "
            >
              <FileText
                size={21}
                className="text-white/80"
              />
            </div>

            <div>
              <h2 className="text-white font-semibold text-lg">
                Nuevo trabajo
              </h2>

              <p className="text-white/40 text-xs">
                Añade una entrega
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={close}
            className="
              w-10
              h-10
              rounded-full
              bg-white/8
              text-white/50
              flex
              items-center
              justify-center
              hover:bg-white/15
              hover:text-white
              transition
            "
          >
            <X size={19} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          {/* NOMBRE */}

          <div>
            <label className="block text-white/50 text-xs mb-2">
              Trabajo
            </label>

            <input
              type="text"
              value={title}
              onChange={(event) =>
                setTitle(event.target.value)
              }
              placeholder="Ej. Trabajo final de programación"
              className="
                w-full
                rounded-2xl
                bg-white/8
                border
                border-white/8
                px-4
                py-3.5
                text-white
                placeholder:text-white/25
                outline-none
                focus:border-white/20
                transition
              "
              autoFocus
            />
          </div>

          {/* ASIGNATURA */}

          <div>
            <label className="block text-white/50 text-xs mb-2">
              Asignatura
            </label>

            <select
              value={selectedSubject}
              onChange={(event) =>
                setSelectedSubject(
                  event.target.value
                )
              }
              className="
                w-full
                rounded-2xl
                bg-white/8
                border
                border-white/8
                px-4
                py-3.5
                text-white
                outline-none
                focus:border-white/20
              "
            >
              <option
                value=""
                className="bg-slate-900"
              >
                Sin asignatura
              </option>

              {subjects.map((subject) => (
                <option
                  key={subject.id}
                  value={subject.id}
                  className="bg-slate-900"
                >
                  {subject.name}
                </option>
              ))}
            </select>
          </div>

          {/* FECHA */}

          <div>
            <label className="block text-white/50 text-xs mb-2">
              Fecha de entrega
            </label>

            <input
              type="date"
              value={dueDate}
              onChange={(event) =>
                setDueDate(event.target.value)
              }
              className="
                w-full
                rounded-2xl
                bg-white/8
                border
                border-white/8
                px-4
                py-3.5
                text-white
                outline-none
                focus:border-white/20
              "
            />
          </div>

          {/* PRIORIDAD */}

          <div>
            <label className="block text-white/50 text-xs mb-2">
              Prioridad
            </label>

            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() =>
                  setPriority("low")
                }
                className={`
                  rounded-2xl
                  py-3
                  text-sm
                  transition
                  ${
                    priority === "low"
                      ? "bg-white text-black"
                      : "bg-white/8 text-white/50"
                  }
                `}
              >
                Baja
              </button>

              <button
                type="button"
                onClick={() =>
                  setPriority("medium")
                }
                className={`
                  rounded-2xl
                  py-3
                  text-sm
                  transition
                  ${
                    priority === "medium"
                      ? "bg-white text-black"
                      : "bg-white/8 text-white/50"
                  }
                `}
              >
                Media
              </button>

              <button
                type="button"
                onClick={() =>
                  setPriority("high")
                }
                className={`
                  rounded-2xl
                  py-3
                  text-sm
                  transition
                  ${
                    priority === "high"
                      ? "bg-white text-black"
                      : "bg-white/8 text-white/50"
                  }
                `}
              >
                Alta
              </button>
            </div>
          </div>

          {/* GUARDAR */}

          <button
            type="submit"
            disabled={saving || !title.trim()}
            className="
              w-full
              mt-2
              rounded-2xl
              bg-white
              text-black
              py-3.5
              font-semibold
              disabled:opacity-40
              disabled:cursor-not-allowed
              hover:bg-white/90
              active:scale-[0.98]
              transition
            "
          >
            {saving
              ? "Guardando..."
              : "Crear trabajo"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddWorkModal;