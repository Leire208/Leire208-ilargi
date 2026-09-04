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

const SubjectContext = createContext(null);

export function SubjectProvider({ children }) {
  const { currentUser } = useAuth();

  const [subjects, setSubjects] = useState([]);
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      if (!currentUser) {
        setSubjects([]);
        setGrades([]);
        setLoading(false);
        return;
      }

      try {
        const subjectsRef = collection(
          db,
          "users",
          currentUser.uid,
          "subjects"
        );

        const gradesRef = collection(
          db,
          "users",
          currentUser.uid,
          "grades"
        );

        const [subjectsSnapshot, gradesSnapshot] =
          await Promise.all([
            getDocs(subjectsRef),
            getDocs(gradesRef),
          ]);

        const subjectsData = subjectsSnapshot.docs.map(
          (item) => ({
            id: item.id,
            ...item.data(),
          })
        );

        const gradesData = gradesSnapshot.docs.map(
          (item) => ({
            id: item.id,
            ...item.data(),
          })
        );

        setSubjects(subjectsData);
        setGrades(gradesData);
      } catch (error) {
        console.error(
          "Error cargando asignaturas y notas:",
          error
        );

        setSubjects([]);
        setGrades([]);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [currentUser]);

  // -----------------------------
  // ASIGNATURAS
  // -----------------------------

  async function addSubject(subject) {
    if (!currentUser) return;

    const ref = collection(
      db,
      "users",
      currentUser.uid,
      "subjects"
    );

    const newSubject = {
      name: subject.name,
      teacher: subject.teacher || "",
      classroom: subject.classroom || "",
      color: subject.color || "#60a5fa",
      credits: subject.credits || "",
      semester: subject.semester || "1",
    };

    const result = await addDoc(ref, newSubject);

    setSubjects((prev) => [
      ...prev,
      {
        id: result.id,
        ...newSubject,
      },
    ]);
  }

  async function removeSubject(id) {
    if (!currentUser) return;

    await deleteDoc(
      doc(
        db,
        "users",
        currentUser.uid,
        "subjects",
        id
      )
    );

    setSubjects((prev) =>
      prev.filter((item) => item.id !== id)
    );

    // Eliminamos también sus notas.
    const subjectGrades = grades.filter(
      (grade) => grade.subjectId === id
    );

    await Promise.all(
      subjectGrades.map((grade) =>
        deleteDoc(
          doc(
            db,
            "users",
            currentUser.uid,
            "grades",
            grade.id
          )
        )
      )
    );

    setGrades((prev) =>
      prev.filter((grade) => grade.subjectId !== id)
    );
  }

  async function updateSubject(id, data) {
    if (!currentUser) return;

    await updateDoc(
      doc(
        db,
        "users",
        currentUser.uid,
        "subjects",
        id
      ),
      data
    );

    setSubjects((prev) =>
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

  // -----------------------------
  // NOTAS
  // -----------------------------

  async function addGrade(grade) {
    if (!currentUser) return;

    const ref = collection(
      db,
      "users",
      currentUser.uid,
      "grades"
    );

    const newGrade = {
      subjectId: grade.subjectId,
      name: grade.name,
      grade: Number(grade.grade),
      weight: Number(grade.weight),
      createdAt: new Date().toISOString(),
    };

    const result = await addDoc(ref, newGrade);

    setGrades((prev) => [
      ...prev,
      {
        id: result.id,
        ...newGrade,
      },
    ]);
  }

  async function removeGrade(id) {
    if (!currentUser) return;

    await deleteDoc(
      doc(
        db,
        "users",
        currentUser.uid,
        "grades",
        id
      )
    );

    setGrades((prev) =>
      prev.filter((grade) => grade.id !== id)
    );
  }

  function getGradesForSubject(subjectId) {
    return grades.filter(
      (grade) => grade.subjectId === subjectId
    );
  }

  function getSubjectAverage(subjectId) {
    const subjectGrades =
      getGradesForSubject(subjectId);

    if (subjectGrades.length === 0) {
      return null;
    }

    let total = 0;
    let totalWeight = 0;

    subjectGrades.forEach((grade) => {
      const value = Number(grade.grade);
      const weight = Number(grade.weight);

      if (
        Number.isFinite(value) &&
        Number.isFinite(weight) &&
        weight > 0
      ) {
        total += value * weight;
        totalWeight += weight;
      }
    });

    if (totalWeight === 0) {
      return null;
    }

    return total / totalWeight;
  }

  return (
    <SubjectContext.Provider
      value={{
        subjects,
        grades,
        loading,

        addSubject,
        removeSubject,
        updateSubject,

        addGrade,
        removeGrade,
        getGradesForSubject,
        getSubjectAverage,
      }}
    >
      {!loading && children}
    </SubjectContext.Provider>
  );
}

export function useSubjects() {
  const context = useContext(SubjectContext);

  if (!context) {
    throw new Error(
      "useSubjects debe usarse dentro de SubjectProvider"
    );
  }

  return context;
}