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

const ExamContext = createContext(null);

export function ExamProvider({ children }) {
  const { currentUser } = useAuth();

  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadExams() {
      if (!currentUser) {
        setExams([]);
        setLoading(false);
        return;
      }

      try {
        const ref = collection(
          db,
          "users",
          currentUser.uid,
          "exams"
        );

        const snapshot = await getDocs(ref);

        const data = snapshot.docs.map((item) => ({
          id: item.id,
          ...item.data(),
        }));

        setExams(data);
      } catch (error) {
        console.error(
          "Error cargando exámenes:",
          error
        );

        setExams([]);
      } finally {
        setLoading(false);
      }
    }

    loadExams();
  }, [currentUser]);

  async function addExam(exam) {
    if (!currentUser) return;

    const ref = collection(
      db,
      "users",
      currentUser.uid,
      "exams"
    );

    const newExam = {
      title: exam.title,
      subjectId: exam.subjectId || "",
      subject: exam.subject || "",
      date: exam.date || "",
      type: exam.type || "partial",
      priority: exam.priority || "medium",
      completed: false,
      createdAt: new Date().toISOString(),
    };

    const result = await addDoc(ref, newExam);

    setExams((prev) => [
      ...prev,
      {
        id: result.id,
        ...newExam,
      },
    ]);
  }

  async function removeExam(id) {
    if (!currentUser) return;

    await deleteDoc(
      doc(
        db,
        "users",
        currentUser.uid,
        "exams",
        id
      )
    );

    setExams((prev) =>
      prev.filter((exam) => exam.id !== id)
    );
  }

  async function updateExam(id, data) {
    if (!currentUser) return;

    await updateDoc(
      doc(
        db,
        "users",
        currentUser.uid,
        "exams",
        id
      ),
      data
    );

    setExams((prev) =>
      prev.map((exam) =>
        exam.id === id
          ? {
              ...exam,
              ...data,
            }
          : exam
      )
    );
  }

  function getExamsForSubject(subjectId) {
    return exams.filter(
      (exam) => exam.subjectId === subjectId
    );
  }

  return (
    <ExamContext.Provider
      value={{
        exams,
        loading,
        addExam,
        removeExam,
        updateExam,
        getExamsForSubject,
      }}
    >
      {!loading && children}
    </ExamContext.Provider>
  );
}

export function useExams() {
  const context = useContext(ExamContext);

  if (!context) {
    throw new Error(
      "useExams debe usarse dentro de ExamProvider"
    );
  }

  return context;
}