import { createContext, useContext, useState } from "react";

const TaskContext = createContext();

export function TaskProvider({ children }) {

  const [tasks, setTasks] = useState(() => {

    const saved = localStorage.getItem("ilargi-tasks");

    return saved ? JSON.parse(saved) : [];

  });

  function saveTasks(data) {

    setTasks(data);

    localStorage.setItem(
      "ilargi-tasks",
      JSON.stringify(data)
    );

  }

  function addTask(task) {

    saveTasks([
      ...tasks,
      task
    ]);

  }

  function removeTask(id) {

    saveTasks(
      tasks.filter(task => task.id !== id)
    );

  }

  function updateTask(id, data) {

    saveTasks(

      tasks.map(task =>

        task.id === id

          ? {
              ...task,
              ...data
            }

          : task

      )

    );

  }

  function toggleTask(id) {

    saveTasks(

      tasks.map(task =>

        task.id === id

          ? {
              ...task,
              completed: !task.completed
            }

          : task

      )

    );

  }

  return (

    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        removeTask,
        updateTask,
        toggleTask
      }}
    >

      {children}

    </TaskContext.Provider>

  );

}

export function useTasks() {

  return useContext(TaskContext);

}