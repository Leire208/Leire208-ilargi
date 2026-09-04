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
  getDocs,
  updateDoc,
} from "firebase/firestore";

import { db } from "../Firebase/firebase";
import { useAuth } from "./AuthContext";

const ScheduleContext = createContext(null);

export function ScheduleProvider({ children }) {
  const { currentUser } = useAuth();

  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadSchedule() {
    if (!currentUser) {
      setClasses([]);
      setLoading(false);
      return;
    }

    try {
      console.log(
        "SCHEDULE: cargando clases..."
      );

      const ref = collection(
        db,
        "users",
        currentUser.uid,
        "schedule"
      );

      const snapshot = await getDocs(ref);

      const data = snapshot.docs.map((item) => ({
        id: item.id,
        ...item.data(),
      }));

      console.log(
        "SCHEDULE: clases encontradas:",
        data
      );

      setClasses(data);
    } catch (error) {
      console.error(
        "SCHEDULE: error cargando clases:",
        error
      );

      setClasses([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadSchedule();
  }, [currentUser]);

  async function addClass(item) {
    if (!currentUser) {
      throw new Error(
        "No hay usuario autenticado."
      );
    }

    const newClass = {
      day: item.day || "",
      start: item.start || "",
      end: item.end || "",
      subjectId: item.subjectId || "",
      subjectName:
        item.subjectName || "",
      color:
        item.color || "#60a5fa",
      room:
        item.room || "",
    };

    console.log(
      "SCHEDULE: preparando guardado",
      newClass
    );

    const ref = collection(
      db,
      "users",
      currentUser.uid,
      "schedule"
    );

    /*
     * Ponemos un límite para que nunca
     * se quede eternamente en "Guardando..."
     */
    const savePromise = addDoc(
      ref,
      newClass
    );

    const timeoutPromise = new Promise(
      (_, reject) => {
        setTimeout(() => {
          reject(
            new Error(
              "Firebase tardó demasiado en guardar la clase."
            )
          );
        }, 10000);
      }
    );

    const result = await Promise.race([
      savePromise,
      timeoutPromise,
    ]);

    console.log(
      "SCHEDULE: clase guardada en Firebase:",
      result.id
    );

    const savedClass = {
      id: result.id,
      ...newClass,
    };

    setClasses((prev) => [
      ...prev,
      savedClass,
    ]);

    console.log(
      "SCHEDULE: clase añadida al estado:",
      savedClass
    );

    return savedClass;
  }

  async function removeClass(id) {
    if (!currentUser) {
      throw new Error(
        "No hay usuario autenticado."
      );
    }

    if (!id) {
      throw new Error(
        "La clase no tiene ID."
      );
    }

    const reference = doc(
      db,
      "users",
      currentUser.uid,
      "schedule",
      id
    );

    await deleteDoc(reference);

    setClasses((prev) =>
      prev.filter(
        (item) => item.id !== id
      )
    );
  }

  async function updateClass(id, data) {
    if (!currentUser) {
      throw new Error(
        "No hay usuario autenticado."
      );
    }

    if (!id) {
      throw new Error(
        "La clase no tiene ID."
      );
    }

    const reference = doc(
      db,
      "users",
      currentUser.uid,
      "schedule",
      id
    );

    await updateDoc(
      reference,
      data
    );

    setClasses((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              ...data,
            }
          : item
      )
    );
  }

  return (
    <ScheduleContext.Provider
      value={{
        classes,
        loading,
        addClass,
        removeClass,
        updateClass,
        loadSchedule,
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

export default ScheduleContext;