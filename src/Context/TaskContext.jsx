import { createContext, useContext, useState } from "react";


const TaskContext = createContext(null);





export function TaskProvider({ children }) {



  const [tasks, setTasks] = useState(()=>{


    try {


      const saved = localStorage.getItem(

        "ilargi-tasks"

      );


      const parsed = saved

        ? JSON.parse(saved)

        : [];



      return parsed.map(task => ({


        id: task.id || Date.now(),


        completed: task.completed || false,


        ...task



      }));



    } catch {


      return [];


    }



  });









  function saveTasks(data){



    setTasks(data);



    localStorage.setItem(

      "ilargi-tasks",

      JSON.stringify(data)

    );



  }









  function addTask(task){



    const newTask = {



      id: Date.now(),



      completed:false,



      ...task



    };






    saveTasks([


      ...tasks,


      newTask



    ]);



  }









  function removeTask(id){



    saveTasks(



      tasks.filter(


        task => task.id !== id


      )


    );



  }









  function updateTask(id,data){



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









  return (



    <TaskContext.Provider



      value={{



        tasks,


        addTask,


        removeTask,


        updateTask



      }}



    >



      {children}



    </TaskContext.Provider>



  );



}









export function useTasks(){



  const context = useContext(TaskContext);



  if(!context){



    throw new Error(

      "useTasks debe usarse dentro de TaskProvider"

    );



  }



  return context;



}