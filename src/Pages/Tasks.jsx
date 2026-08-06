import { useState } from "react";
import { Check, Trash2, Plus } from "lucide-react";

import SkyBackground from "../Components/SkyBackground";

import { useTasks } from "../Context/TaskContext";
import { useTheme } from "../Context/ThemeContext";
import { useLanguage } from "../Context/LanguageContext";

import AddTaskModal from "../Components/Tasks/AddTaskModal";



function Tasks(){



  const { tasks, removeTask, updateTask } = useTasks();


  const { styles } = useTheme();


  const { texts } = useLanguage();




  const [open,setOpen] = useState(false);







  function complete(task){


    updateTask(

      task.id,

      {

        completed: !task.completed

      }

    );


  }








  function deleteTask(id){


    console.log("ELIMINANDO TAREA:", id);


    removeTask(id);


  }









  return (



    <SkyBackground>



      <main

        className="
          min-h-screen
          max-w-4xl
          mx-auto
          px-6
          pt-8
          pb-40
        "

      >





        <div className="flex justify-between items-center mb-8">



          <h1 className="text-3xl font-bold text-white">


            {texts.tasks}


          </h1>






          <button


            onClick={()=>setOpen(true)}


            className="
              w-12
              h-12
              rounded-full
              bg-white/20
              text-white
              flex
              items-center
              justify-center
            "


          >


            <Plus/>


          </button>





        </div>









        <section


          className={`

            rounded-3xl

            p-6

            shadow-xl

            ${styles.card}

          `}


        >






          {

            tasks.length === 0 && (


              <p className="text-white/60">


                {texts.noTasks}


              </p>


            )

          }










          <div className="space-y-4">






            {

              tasks.map(task=>(



                <div


                  key={task.id}


                  className="
                    flex
                    items-center
                    justify-between
                    rounded-2xl
                    bg-white/10
                    p-4
                  "


                >








                  <button


                    onClick={()=>complete(task)}


                    className={`

                      w-10

                      h-10

                      rounded-full

                      flex

                      items-center

                      justify-center


                      ${
                        task.completed

                        ? "bg-green-400/40"

                        : "bg-white/10"

                      }

                    `}


                  >


                    <Check className="text-white"/>


                  </button>









                  <div className="flex-1 px-4">



                    <h2


                      className={`

                        text-white

                        font-semibold


                        ${
                          task.completed

                          ? "line-through opacity-50"

                          : ""

                        }

                      `}


                    >


                      {task.title}


                    </h2>







                    {

                      task.subject && (



                        <p className="text-white/60 text-sm">


                          📚 {task.subject}


                        </p>


                      )


                    }







                    {

                      task.date && (


                        <p className="text-white/50 text-xs mt-1">


                          📅 {task.date}


                        </p>


                      )


                    }





                  </div>









                  <button


                    onClick={()=>deleteTask(task.id)}


                    className="
                      p-3
                      rounded-xl
                      bg-red-500/20
                      text-red-200
                    "


                  >


                    <Trash2 size={18}/>


                  </button>







                </div>



              ))



            }







          </div>








        </section>









      </main>









      <AddTaskModal


        open={open}


        close={()=>setOpen(false)}


      />






    </SkyBackground>



  );


}



export default Tasks;