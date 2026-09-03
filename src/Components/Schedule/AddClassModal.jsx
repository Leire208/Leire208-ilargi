import { useEffect, useState } from "react";
import { X, Loader2 } from "lucide-react";

import { useTheme } from "../../Context/ThemeContext";
import { useSubjects } from "../../Context/SubjectContext";
import { useSchedule } from "../../Context/ScheduleContext";

function AddClassModal({
  open,
  close,
  day,
  hour,
}) {
  const { styles } = useTheme();
  const { subjects } = useSubjects();
  const { addClass } = useSchedule();

  const [subjectId, setSubjectId] = useState("");
  const [room, setRoom] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!open) return;

    console.log("MODAL ABIERTO");
    console.log("DÍA:", day);
    console.log("HORA:", hour);

    setSubjectId("");
    setRoom("");
    setStart(hour || "");
    setEnd(getOneHourLater(hour));
    setSaving(false);
  }, [open, hour, day]);

  if (!open) return null;

  async function save() {
    console.log("========== GUARDAR ==========");
    console.log("1. BOTÓN GUARDAR PULSADO");
    console.log("subjectId:", subjectId);
    console.log("start:", start);
    console.log("end:", end);
    console.log("day:", day);
    console.log("subjects:", subjects);

    if (saving) {
      console.log("2. YA SE ESTÁ GUARDANDO");
      return;
    }

    const subject = subjects.find(
      (item) => item.id === subjectId
    );

    console.log(
      "3. SUBJECT ENCONTRADO:",
      subject
    );

    if (!subject) {
      console.log(
        "4. ERROR: NO HAY ASIGNATURA"
      );

      alert("Selecciona una asignatura.");
      return;
    }

    if (!start || !end) {
      console.log(
        "4. ERROR: FALTA UNA HORA"
      );

      alert(
        "Debes indicar una hora de inicio y de finalización."
      );
      return;
    }

    if (
      timeToMinutes(end) <=
      timeToMinutes(start)
    ) {
      console.log(
        "4. ERROR: HORARIO INCORRECTO"
      );

      alert(
        "La hora de finalización debe ser posterior a la hora de inicio."
      );
      return;
    }

    const newClass = {
      day,
      start,
      end,
      subjectId: subject.id,
      subjectName: subject.name,
      color:
        subject.color ||
        "#60a5fa",
      room: room.trim(),
    };

    console.log(
      "5. CLASE PREPARADA:",
      newClass
    );

    try {
      setSaving(true);

      console.log(
        "6. LLAMANDO A addClass()..."
      );

      await addClass(newClass);

      console.log(
        "7. addClass() TERMINÓ CORRECTAMENTE"
      );

      console.log(
        "8. CERRANDO MODAL..."
      );

      close();

      console.log(
        "9. MODAL CERRADO"
      );

    } catch (error) {
      console.error(
        "========== ERROR =========="
      );

      console.error(
        "ERROR GUARDANDO LA CLASE:",
        error
      );

      console.error(
        "MESSAGE:",
        error?.message
      );

      console.error(
        "CODE:",
        error?.code
      );

      alert(
        `No se ha podido guardar la clase.\n\n${
          error?.message || error
        }`
      );

    } finally {
      setSaving(false);

      console.log(
        "10. FIN DEL PROCESO DE GUARDADO"
      );
    }
  }

  return (
    <div
      className="
        fixed
        inset-0
        z-[120]
        bg-black/40
        backdrop-blur-sm
        flex
        items-center
        justify-center
        px-6
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
          rounded-3xl
          p-6
          ${styles.card}
        `}
      >

        {/* CABECERA */}

        <div
          className="
            flex
            justify-between
            items-center
            mb-6
          "
        >
          <div>
            <h2
              className="
                text-2xl
                font-bold
                text-white
              "
            >
              Nueva clase
            </h2>

            <p
              className="
                text-white/50
                text-sm
                mt-1
              "
            >
              {getDayName(day)}
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
              transition
            "
            aria-label="Cerrar"
          >
            <X
              className="text-white"
              size={20}
            />
          </button>
        </div>

        {/* ASIGNATURA */}

        <select
          value={subjectId}
          onChange={(event) =>
            setSubjectId(event.target.value)
          }
          className="
            w-full
            mb-4
            rounded-2xl
            bg-white/10
            border
            border-white/10
            text-white
            px-4
            py-3
            outline-none
          "
        >
          <option
            value=""
            className="text-black"
          >
            Selecciona asignatura
          </option>

          {subjects.map((subject) => (
            <option
              key={subject.id}
              value={subject.id}
              className="text-black"
            >
              {subject.name}
            </option>
          ))}
        </select>

        {/* HORAS */}

        <div
          className="
            grid
            grid-cols-2
            gap-3
            mb-4
          "
        >
          <div>
            <label
              className="
                block
                text-white/60
                text-xs
                mb-2
              "
            >
              Inicio
            </label>

            <input
              type="time"
              value={start}
              onChange={(event) =>
                setStart(event.target.value)
              }
              className="
                w-full
                rounded-2xl
                bg-white/10
                border
                border-white/10
                text-white
                px-4
                py-3
                outline-none
              "
            />
          </div>

          <div>
            <label
              className="
                block
                text-white/60
                text-xs
                mb-2
              "
            >
              Fin
            </label>

            <input
              type="time"
              value={end}
              onChange={(event) =>
                setEnd(event.target.value)
              }
              className="
                w-full
                rounded-2xl
                bg-white/10
                border
                border-white/10
                text-white
                px-4
                py-3
                outline-none
              "
            />
          </div>
        </div>

        {/* AULA */}

        <input
          value={room}
          onChange={(event) =>
            setRoom(event.target.value)
          }
          placeholder="Aula"
          className="
            w-full
            mb-6
            rounded-2xl
            bg-white/10
            border
            border-white/10
            text-white
            placeholder:text-white/35
            px-4
            py-3
            outline-none
          "
        />

        {/* GUARDAR */}

        <button
          type="button"
          onClick={save}
          disabled={saving}
          className="
            w-full
            py-4
            rounded-2xl
            bg-white/15
            text-white
            font-semibold
            flex
            items-center
            justify-center
            gap-2
            hover:bg-white/25
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
            "Guardar"
          )}
        </button>
      </section>
    </div>
  );
}

/* ================================= */
/* HELPERS                           */
/* ================================= */

function timeToMinutes(time) {
  if (!time) return 0;

  const [hours, minutes] =
    time.split(":").map(Number);

  return hours * 60 + minutes;
}

function getOneHourLater(time) {
  if (!time) return "";

  const [hours, minutes] =
    time.split(":").map(Number);

  const total =
    hours * 60 +
    minutes +
    60;

  const normalized =
    total % 1440;

  const finalHours =
    Math.floor(normalized / 60);

  const finalMinutes =
    normalized % 60;

  return [
    String(finalHours).padStart(2, "0"),
    String(finalMinutes).padStart(2, "0"),
  ].join(":");
}

function getDayName(day) {
  const names = {
    L: "Lunes",
    M: "Martes",
    X: "Miércoles",
    J: "Jueves",
    V: "Viernes",
  };

  return names[day] || day || "";
}

export default AddClassModal;