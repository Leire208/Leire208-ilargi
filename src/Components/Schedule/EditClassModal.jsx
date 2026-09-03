import { useEffect, useState } from "react";
import {
  X,
  Trash2,
  Save,
  Loader2,
} from "lucide-react";

import { useSchedule } from "../../Context/ScheduleContext";
import { useTheme } from "../../Context/ThemeContext";

function EditClassModal({
  open,
  close,
  item,
}) {
  const {
    removeClass,
    updateClass,
  } = useSchedule();

  const { styles } = useTheme();

  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [room, setRoom] = useState("");

  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!item) return;

    setStart(item.start || "");

    setEnd(
      item.end ||
        getOneHourLater(item.start)
    );

    setRoom(item.room || "");
  }, [item]);

  if (!open || !item) {
    return null;
  }

  async function save() {
    if (!start || !end) {
      alert(
        "Debes indicar una hora de inicio y una hora de finalización."
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

    try {
      setSaving(true);

      await updateClass(item.id, {
        start,
        end,
        room,
      });

      close();
    } catch (error) {
      console.error(
        "Error actualizando clase:",
        error
      );

      alert(
        "No se han podido guardar los cambios. Revisa la consola."
      );
    } finally {
      setSaving(false);
    }
  }

  async function remove() {
    const confirmed = window.confirm(
      `¿Quieres eliminar "${item.subjectName}" del horario?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeleting(true);

      await removeClass(item.id);

      close();
    } catch (error) {
      console.error(
        "Error eliminando clase:",
        error
      );

      alert(
        "No se ha podido eliminar la clase. Revisa la consola para ver el error de Firebase."
      );
    } finally {
      setDeleting(false);
    }
  }

  return (
    <div
      className="
        fixed
        inset-0
        z-[130]
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
          shadow-2xl
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
              {item.subjectName}
            </h2>

            <p
              className="
                text-white/50
                text-sm
                mt-1
              "
            >
              Editar clase
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

        {/* INFORMACIÓN */}

        <div
          className="
            space-y-4
            text-white/80
          "
        >
          <div
            className="
              rounded-2xl
              bg-white/[0.06]
              border
              border-white/10
              px-4
              py-3
            "
          >
            <p
              className="
                text-white/50
                text-xs
                uppercase
                tracking-wider
              "
            >
              Día
            </p>

            <p
              className="
                text-white
                font-semibold
                mt-1
              "
            >
              {getDayName(item.day)}
            </p>
          </div>

          {/* HORAS */}

          <div
            className="
              grid
              grid-cols-2
              gap-3
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
                  focus:bg-white/15
                  transition
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
                  focus:bg-white/15
                  transition
                "
              />
            </div>
          </div>

          {/* AULA */}

          <div>
            <label
              className="
                block
                text-white/60
                text-xs
                mb-2
              "
            >
              Aula
            </label>

            <input
              value={room}
              onChange={(event) =>
                setRoom(event.target.value)
              }
              placeholder="Ej. 2.14"
              className="
                w-full
                rounded-2xl
                bg-white/10
                border
                border-white/10
                text-white
                placeholder:text-white/35
                px-4
                py-3
                outline-none
                focus:bg-white/15
                transition
              "
            />
          </div>
        </div>

        {/* GUARDAR */}

        <button
          type="button"
          onClick={save}
          disabled={saving || deleting}
          className="
            mt-6
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
            <>
              <Save size={18} />
              Guardar cambios
            </>
          )}
        </button>

        {/* ELIMINAR */}

        <button
          type="button"
          onClick={remove}
          disabled={saving || deleting}
          className="
            mt-3
            w-full
            py-4
            rounded-2xl
            bg-red-500/15
            border
            border-red-300/10
            text-red-100
            font-semibold
            flex
            items-center
            justify-center
            gap-2
            hover:bg-red-500/25
            disabled:opacity-50
            disabled:cursor-not-allowed
            transition
          "
        >
          {deleting ? (
            <>
              <Loader2
                size={18}
                className="animate-spin"
              />
              Eliminando...
            </>
          ) : (
            <>
              <Trash2 size={18} />
              Eliminar clase
            </>
          )}
        </button>
      </section>
    </div>
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

  return names[day] || day;
}

function timeToMinutes(time) {
  if (!time) return 0;

  const [hours, minutes] =
    time.split(":").map(Number);

  return hours * 60 + minutes;
}

function getOneHourLater(time) {
  if (!time) return "01:00";

  const [
    hours,
    minutes,
  ] = time.split(":").map(Number);

  const total =
    hours * 60 + minutes + 60;

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

export default EditClassModal;