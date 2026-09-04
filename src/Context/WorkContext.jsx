import { createContext, useContext, useEffect, useState } from "react";

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

const WorkContext = createContext(null);

export function WorkProvider({ children }) {
  const { currentUser } = useAuth();

  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadWorks() {
      if (!currentUser) {
        setWorks([]);
        setLoading(false);
        return;
      }

      try {
        const ref = collection(
          db,
          "users",
          currentUser.uid,
          "works"
        );

        const snapshot = await getDocs(ref);

        const data = snapshot.docs.map((item) => ({
          id: item.id,
          ...item.data(),
        }));

        setWorks(data);
      } catch (error) {
        console.error(
          "Error cargando trabajos:",
          error
        );

        setWorks([]);
      } finally {
        setLoading(false);
      }
    }

    loadWorks();
  }, [currentUser]);

  async function addWork(work) {
    if (!currentUser) return;

    const ref = collection(
      db,
      "users",
      currentUser.uid,
      "works"
    );

    const newWork = {
      title: work.title,
      subjectId: work.subjectId || "",
      subject: work.subject || "",
      dueDate: work.dueDate || "",
      priority: work.priority || "medium",
      completed: false,
      createdAt: new Date().toISOString(),
    };

    const result = await addDoc(ref, newWork);

    setWorks((prev) => [
      ...prev,
      {
        id: result.id,
        ...newWork,
      },
    ]);
  }

  async function removeWork(id) {
    if (!currentUser) return;

    await deleteDoc(
      doc(
        db,
        "users",
        currentUser.uid,
        "works",
        id
      )
    );

    setWorks((prev) =>
      prev.filter((work) => work.id !== id)
    );
  }

  async function updateWork(id, data) {
    if (!currentUser) return;

    await updateDoc(
      doc(
        db,
        "users",
        currentUser.uid,
        "works",
        id
      ),
      data
    );

    setWorks((prev) =>
      prev.map((work) =>
        work.id === id
          ? {
              ...work,
              ...data,
            }
          : work
      )
    );
  }

  return (
    <WorkContext.Provider
      value={{
        works,
        loading,
        addWork,
        removeWork,
        updateWork,
      }}
    >
      {!loading && children}
    </WorkContext.Provider>
  );
}

export function useWorks() {
  const context = useContext(WorkContext);

  if (!context) {
    throw new Error(
      "useWorks debe usarse dentro de WorkProvider"
    );
  }

  return context;
}