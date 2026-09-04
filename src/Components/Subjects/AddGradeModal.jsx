import { useEffect, useState } from "react";
import { X } from "lucide-react";

import { useTheme } from "../../Context/ThemeContext";
import { useSubjects } from "../../Context/SubjectContext";

function AddGradeModal({
  open,
  close,
  subjectId,
}) {
  const { styles } = useTheme();
  const { addGrade } = useSubjects();

  const [form, setForm] = useState({
    name: "",
    grade: "",
    weight: "",
  });

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!open) return;

    setForm({
      name: "",
      grade: "",
      weight: "",
    });

    setSaving(false);
  }, [open]);

  if (!open) return null;

  function change(e) {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  async function save() {
    const grade = Number(
      String(form.grade).replace(",", ".")
    );

    const weight = Number(
      String(form.weight).replace(",", ".")
    );

    if (!form.name.trim()) {
      alert("Ponle un nombre a la nota.");
      return;
    }

    if (
      !Number.isFinite(grade) ||
      grade < 0 ||
      grade > 10
    ) {
      alert("La nota debe estar entre 0 y 10.");
      return;
    }

    if (
      !Number.isFinite(weight) ||
      weight <= 0 ||
      weight > 100
    ) {
      alert(
        "El porcentaje debe estar entre 1 y 100."
      );
      return;
    }

    try {
      setSaving(true);

      await addGrade({
        subjectId,
        name: form.name.trim(),
        grade,
        weight,
      });

      close();
    } catch (error) {
      console.error(
        "Error guardando nota:",
        error
      );

      alert("No se pudo guardar la nota.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div
      className="
        fixed
        inset-0
        z-[300]
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
          rounded-3xl
          p-6
          shadow-2xl
          ${styles.card}
        `}
      >
        {/* HEADER */}

        <div className="flex items-center justify-between mb-7">
          <h2 className="text-2xl font-bold text-white">
            Nueva nota
          </h2>

          <button
            type="button"
            onClick={close}
            className="
              w-9
              h-9
              rounded-full
              bg-white/10
              text-white
              flex
              items-center
              justify-center
              hover:bg-white/20
              transition
            "
          >
            <X size={19} />
          </button>
        </div>

        {/* NOMBRE */}

        <label className="block text-white/65 text-sm mb-2">
          Nombre
        </label>

        <input
          name="name"
          value={form.name}
          onChange={change}
          placeholder="Ej. Parcial 1"
          className="
            w-full
            rounded-2xl
            bg-white/15
            text-white
            placeholder:text-white/35
            px-4
            py-3
            outline-none
            border
            border-white/5
            focus:bg-white/20
            transition
          "
        />

        {/* NOTA */}

        <label className="block text-white/65 text-sm mb-2 mt-5">
          Nota
        </label>

        <input
          name="grade"
          type="number"
          min="0"
          max="10"
          step="0.1"
          value={form.grade}
          onChange={change}
          placeholder="Ej. 7,5"
          className="
            w-full
            rounded-2xl
            bg-white/15
            text-white
            placeholder:text-white/35
            px-4
            py-3
            outline-none
            border
            border-white/5
            focus:bg-white/20
            transition
          "
        />

        {/* PESO */}

        <label className="block text-white/65 text-sm mb-2 mt-5">
          Peso en la asignatura
        </label>

        <div className="relative">
          <input
            name="weight"
            type="number"
            min="1"
            max="100"
            step="1"
            value={form.weight}
            onChange={change}
            placeholder="Ej. 40"
            className="
              w-full
              rounded-2xl
              bg-white/15
              text-white
              placeholder:text-white/35
              px-4
              py-3
              pr-12
              outline-none
              border
              border-white/5
              focus:bg-white/20
              transition
            "
          />

          <span className="
            absolute
            right-4
            top-1/2
            -translate-y-1/2
            text-white/40
            text-sm
          ">
            %
          </span>
        </div>

        <p className="text-white/35 text-xs mt-2">
          Ejemplo: un examen que vale el 40% lleva un peso
          de 40.
        </p>

        {/* GUARDAR */}

        <button
          type="button"
          onClick={save}
          disabled={saving}
          className="
            w-full
            mt-7
            py-4
            rounded-2xl
            bg-white
            text-black
            font-semibold
            hover:bg-white/90
            active:scale-[0.98]
            disabled:opacity-50
            disabled:cursor-not-allowed
            transition
          "
        >
          {saving
            ? "Guardando..."
            : "Añadir nota"}
        </button>
      </section>
    </div>
  );
}

export default AddGradeModal;