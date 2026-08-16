import { useEffect, useState } from "react";
import { X } from "lucide-react";

import { useTheme } from "../../Context/ThemeContext";
import { useSubjects } from "../../Context/SubjectContext";

import ColorPicker from "./ColorPicker";

function AddSubjectModal({
  open,
  close,
  subject = null,
}) {
  const { styles } = useTheme();
  const { addSubject, updateSubject } = useSubjects();

  const emptyForm = {
    name: "",
    teacher: "",
    classroom: "",
    credits: "",
    semester: "1",
    color: "#3B82F6",
  };

  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const editing = Boolean(subject);

  useEffect(() => {
    if (!open) return;

    if (subject) {
      setForm({
        name: subject.name || "",
        teacher: subject.teacher || "",
        classroom: subject.classroom || "",
        credits: subject.credits || "",
        semester: subject.semester || "1",
        color: subject.color || "#3B82F6",
      });
    } else {
      setForm(emptyForm);
    }
  }, [open, subject]);

  if (!open) return null;

  function change(e) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function save() {
    if (!form.name.trim()) {
      alert("Ponle un nombre a la asignatura.");
      return;
    }

    try {
      setSaving(true);

      const data = {
        name: form.name.trim(),
        teacher: form.teacher.trim(),
        classroom: form.classroom.trim(),
        credits: form.credits,
        semester: form.semester,
        color: form.color,
      };

      if (editing) {
        await updateSubject(subject.id, data);
      } else {
        await addSubject(data);
      }

      close();
    } catch (error) {
      console.error("Error guardando asignatura:", error);
      alert("No se pudo guardar la asignatura.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div
      className="
        fixed
        inset-0
        z-[200]
        bg-black/50
        backdrop-blur-md
        flex
        items-center
        justify-center
        px-6
        py-8
      "
      onClick={close}
    >
      <section
        onClick={(e) => e.stopPropagation()}
        className={`
          w-full
          max-w-md
          max-h-[90vh]
          overflow-y-auto
          rounded-3xl
          p-6
          shadow-2xl
          ${styles.card}
        `}
      >
        {/* HEADER */}

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl text-white font-bold">
            {editing
              ? "Editar asignatura"
              : "Nueva asignatura"}
          </h2>

          <button
            onClick={close}
            className="
              w-9
              h-9
              rounded-full
              bg-white/10
              flex
              items-center
              justify-center
              hover:bg-white/20
              transition
            "
          >
            <X
              className="text-white"
              size={20}
            />
          </button>
        </div>

        {/* NOMBRE */}

        <label className="block text-white/70 text-sm mb-2">
          Nombre
        </label>

        <input
          name="name"
          value={form.name}
          onChange={change}
          placeholder="Ej. Matemáticas"
          className="
            w-full
            mb-4
            rounded-2xl
            bg-white/20
            text-white
            placeholder:text-white/40
            px-4
            py-3
            outline-none
            focus:bg-white/25
            transition
          "
        />

        {/* PROFESOR */}

        <label className="block text-white/70 text-sm mb-2">
          Profesor
        </label>

        <input
          name="teacher"
          value={form.teacher}
          onChange={change}
          placeholder="Nombre del profesor"
          className="
            w-full
            mb-4
            rounded-2xl
            bg-white/20
            text-white
            placeholder:text-white/40
            px-4
            py-3
            outline-none
            focus:bg-white/25
            transition
          "
        />

        {/* AULA */}

        <label className="block text-white/70 text-sm mb-2">
          Aula
        </label>

        <input
          name="classroom"
          value={form.classroom}
          onChange={change}
          placeholder="Ej. Aula 204"
          className="
            w-full
            mb-4
            rounded-2xl
            bg-white/20
            text-white
            placeholder:text-white/40
            px-4
            py-3
            outline-none
            focus:bg-white/25
            transition
          "
        />

        {/* CRÉDITOS */}

        <label className="block text-white/70 text-sm mb-2">
          Créditos
        </label>

        <input
          name="credits"
          value={form.credits}
          onChange={change}
          placeholder="Ej. 6"
          className="
            w-full
            mb-4
            rounded-2xl
            bg-white/20
            text-white
            placeholder:text-white/40
            px-4
            py-3
            outline-none
            focus:bg-white/25
            transition
          "
        />

        {/* CUATRIMESTRE */}

        <label className="block text-white/70 text-sm mb-2">
          Cuatrimestre
        </label>

        <select
          name="semester"
          value={form.semester}
          onChange={change}
          className="
            w-full
            mb-5
            rounded-2xl
            bg-white/20
            text-white
            px-4
            py-3
            outline-none
            transition
          "
        >
          <option
            value="1"
            className="text-black"
          >
            1.º cuatrimestre
          </option>

          <option
            value="2"
            className="text-black"
          >
            2.º cuatrimestre
          </option>
        </select>

        {/* COLOR */}

        <ColorPicker
          value={form.color}
          onChange={(color) =>
            setForm((prev) => ({
              ...prev,
              color,
            }))
          }
        />

        {/* GUARDAR */}

        <button
          onClick={save}
          disabled={saving}
          className="
            w-full
            mt-7
            py-4
            rounded-2xl
            bg-white/20
            text-white
            font-semibold
            hover:bg-white/30
            disabled:opacity-50
            disabled:cursor-not-allowed
            transition
          "
        >
          {saving
            ? "Guardando..."
            : editing
            ? "Guardar cambios"
            : "Crear asignatura"}
        </button>
      </section>
    </div>
  );
}

export default AddSubjectModal;