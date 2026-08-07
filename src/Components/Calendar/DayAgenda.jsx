import {
  CalendarDays,
  CheckCircle2,
  Trash2
} from "lucide-react";


import { useTheme } from "../../Context/ThemeContext";
import { useTasks } from "../../Context/TaskContext";



function DayAgenda({

  date,

  events = [],

  tasks = []

}) {



  const { styles } = useTheme();


  const { removeTask } = useTasks();






  if(!date) return null;







  const dayEvents = events.filter(event=>{


    const d = new Date(event.date);



    return (

      d.getDate() === date.getDate() &&

      d.getMonth() === date.getMonth() &&

      d.getFullYear() === date.getFullYear()

    );


  });








  const dayTasks = tasks.filter(task=>{


    if(!task.date) return false;



    const d = new Date(task.date);



    return (

      d.getDate() === date.getDate() &&

      d.getMonth() === date.getMonth() &&

      d.getFullYear() === date.getFullYear()

    );


  });









  return (



    <section


      className={`

        mt-6

        rounded-3xl

        p-6

        shadow-xl

        ${styles.card}

      `}


    >






      <h2 className="text-2xl font-bold text-white mb-5 capitalize">


        {date.toLocaleDateString(

          "es-ES",

          {

            weekday:"long",

            day:"numeric",

            month:"long"

          }

        )}


      </h2>









      {

        dayEvents.length === 0 &&

        dayTasks.length === 0 && (


          <p className="text-white/60">

            No hay nada programado 🎉

          </p>


        )

      }









      {


        dayEvents.map(event=>(


          <div


            key={event.id}


            className="
              rounded-2xl
              bg-white/10
              p-4
              mb-3
              flex
              items-center
              gap-3
            "


          >


            <CalendarDays className="text-white"/>


            <div>


              <p className="text-white font-semibold">

                {event.title}

              </p>


              {

                event.startTime && (


                  <p className="text-white/60 text-sm">

                    {event.startTime}

                  </p>


                )

              }


            </div>



          </div>


        ))


      }









      {


        dayTasks.map(task=>(


          <div


            key={task.id}


            className="
              rounded-2xl
              bg-white/10
              p-4
              mb-3
              flex
              items-center
              gap-3
            "


          >




            <CheckCircle2 className="text-white"/>





            <div className="flex-1">


              <p className="text-white font-semibold">

                {task.title}

              </p>


              <p className="text-white/60 text-sm">

                {task.subject || "Tarea"}

              </p>


            </div>






            <button


              onClick={()=>removeTask(task.id)}


              className="
                p-2
                rounded-xl
                bg-red-500/20
                text-red-200
              "


            >


              <Trash2 size={17}/>


            </button>





          </div>


        ))


      }






    </section>


  );


}



export default DayAgenda;