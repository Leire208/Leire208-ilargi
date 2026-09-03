import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";

import { db } from "../Firebase/firebase";
import { useAuth } from "./AuthContext";

const ScheduleContext = createContext(null);

export function ScheduleProvider({ children }) {
  const { currentUser } = useAuth();

  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  /*
   * Escucha Firebase en tiempo real.
   *
   * Esto hace que Horario y Calendario compartan
   * exactamente las mismas clases.
   */
  useEffect(() => {
    if (!currentUser) {
      setClasses([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    const ref = collection(
      db,
      "users",
      currentUser.uid,
      "schedule"
    );

    const unsubscribe = onSnapshot(
      ref,
      (snapshot) => {
        const data = snapshot.docs
          .map((item) => ({
            id: item.id,
            ...item.data(),
          }))
          .sort((a, b) => {
            const dayOrder = {
              L: 1,
              M: 2,
              X: 3,
              J: 4,
              V: 5,
            };

            const dayDifference =
              (dayOrder[a.day] || 99) -
              (dayOrder[b.day] || 99);

            if (dayDifference !== 0) {
              return dayDifference;
            }

            return (
              timeToMinutes(a.start) -
              timeToMinutes(b.start)
            );
          });

        setClasses(data);
        setLoading(false);
      },
      (error) => {
        console.error(
          "Error escuchando el horario:",
          error
        );

        setClasses([]);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [currentUser]);

  /*
   * Añadir clase
   */
  async function addClass(item) {
    if (!currentUser) {
      throw new Error(
        "No hay ningún usuario autenticado."
      );
    }

    const ref = collection(
      db,
      "users",
      currentUser.uid,
      "schedule"
    );

    const newClass = {
      day: item.day,
      start: item.start,
      end:
        item.end ||
        getOneHourLater(item.start),
      subjectId: item.subjectId,
      subjectName: item.subjectName,
      color:
        item.color ||
        "#60a5fa",
      room:
        item.room ||
        "",
    };

    await addDoc(ref, newClass);

    /*
     * NO hacemos setClasses aquí.
     *
     * onSnapshot actualizará automáticamente
     * el estado cuando Firebase confirme
     * la nueva clase.
     */
  }

  /*
   * Eliminar clase
   */
  async function removeClass(id) {
    if (!currentUser) {
      throw new Error(
        "No hay ningún usuario autenticado."
      );
    }

    if (!id) {
      throw new Error(
        "La clase no tiene un ID válido."
      );
    }

    await deleteDoc(
      doc(
        db,
        "users",
        currentUser.uid,
        "schedule",
        id
      )
    );

    /*
     * onSnapshot actualizará automáticamente
     * Horario y Calendario.
     */
  }

  /*
   * Editar clase
   */
  async function updateClass(id, data) {
    if (!currentUser) {
      throw new Error(
        "No hay ningún usuario autenticado."
      );
    }

    if (!id) {
      throw new Error(
        "La clase no tiene un ID válido."
      );
    }

    await updateDoc(
      doc(
        db,
        "users",
        currentUser.uid,
        "schedule",
        id
      ),
      data
    );

    /*
     * onSnapshot actualizará automáticamente
     * ambos sitios.
     */
  }

  return (
    <ScheduleContext.Provider
      value={{
        classes,
        loading,
        addClass,
        removeClass,
        updateClass,
      }}
    >
      {!loading && children}
    </ScheduleContext.Provider>
  );
}

export function useSchedule() {
  const context =
    useContext(ScheduleContext);

  if (!context) {
    throw new Error(
      "useSchedule debe usarse dentro de ScheduleProvider"
    );
  }

  return context;
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
  if (!time) return "09:00";

  const [hours, minutes] =
    time.split(":").map(Number);

  const total =
    hours * 60 +
    minutes +
    60;

  const finalHours =
    Math.floor(total / 60) % 24;

  const finalMinutes =
    total % 60;

  return [
    String(finalHours).padStart(2, "0"),
    String(finalMinutes).padStart(2, "0"),
  ].join(":");
}

export default ScheduleContext;