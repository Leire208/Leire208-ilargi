import { useState } from "react";

import {
  Plus,
  X,
  CalendarDays,
  BookOpen,
  CheckSquare,
  GraduationCap,
  FileText,
} from "lucide-react";

import AddEventModal from "./Calendar/AddEventModal";
import AddSubjectModal from "./Subjects/AddSubjectModal";
import AddTaskModal from "./Tasks/AddTaskModal";
import AddClassModal from "./Schedule/AddClassModal";
import AddWorkModal from "./Works/AddWorkModal";

import { useLanguage } from "../Context/LanguageContext";

function CreateMenu() {
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState(null);

  const { texts } = useLanguage();

  function closeModal() {
    setModal(null);
  }

  function openModal(type) {
    setModal(type);
    setOpen(false);
  }

  return (
    <>
      <div
        className="
          fixed
          bottom-24
          left-1/2
          -translate-x-1/2
          z-[90]
        "
      >
        {open && (
          <div
            className="
              mb-4
              flex
              flex-col
              gap-3
            "
          >
            {/* NUEVA TAREA */}

            <button
              type="button"
              onClick={() => openModal("task")}
              className="
                rounded-2xl
                bg-white/20
                backdrop-blur-xl
                px-6
                py-3
                text-white
                flex
                items-center
                gap-3
              "
            >
              <CheckSquare />

              {texts.newTask || "Nueva tarea"}
            </button>

            {/* NUEVO TRABAJO */}

            <button
              type="button"
              onClick={() => openModal("work")}
              className="
                rounded-2xl
                bg-white/20
                backdrop-blur-xl
                px-6
                py-3
                text-white
                flex
                items-center
                gap-3
              "
            >
              <FileText />

              Nuevo trabajo
            </button>

            {/* NUEVA ASIGNATURA */}

            <button
              type="button"
              onClick={() => openModal("subject")}
              className="
                rounded-2xl
                bg-white/20
                backdrop-blur-xl
                px-6
                py-3
                text-white
                flex
                items-center
                gap-3
              "
            >
              <BookOpen />

              {texts.newSubject || "Asignatura"}
            </button>

            {/* NUEVA CLASE */}

            <button
              type="button"
              onClick={() => openModal("class")}
              className="
                rounded-2xl
                bg-white/20
                backdrop-blur-xl
                px-6
                py-3
                text-white
                flex
                items-center
                gap-3
              "
            >
              <GraduationCap />

              Nueva clase
            </button>

            {/* NUEVO EVENTO */}

            <button
              type="button"
              onClick={() => openModal("event")}
              className="
                rounded-2xl
                bg-white/20
                backdrop-blur-xl
                px-6
                py-3
                text-white
                flex
                items-center
                gap-3
              "
            >
              <CalendarDays />

              {texts.event || "Evento"}
            </button>
          </div>
        )}

        {/* BOTÓN + */}

        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="
            w-16
            h-16
            rounded-full
            bg-white/20
            backdrop-blur-xl
            text-white
            flex
            items-center
            justify-center
            shadow-xl
          "
        >
          {open ? <X /> : <Plus />}
        </button>
      </div>

      {/* TAREA */}

      <AddTaskModal
        open={modal === "task"}
        close={closeModal}
      />

      {/* TRABAJO */}

      <AddWorkModal
        open={modal === "work"}
        close={closeModal}
      />

      {/* ASIGNATURA */}

      <AddSubjectModal
        open={modal === "subject"}
        close={closeModal}
      />

      {/* CLASE */}

      <AddClassModal
        open={modal === "class"}
        close={closeModal}
        fromCreateMenu
      />

      {/* EVENTO */}

      <AddEventModal
        open={modal === "event"}
        close={closeModal}
      />
    </>
  );
}

export default CreateMenu;