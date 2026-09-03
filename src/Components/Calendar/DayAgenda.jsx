import {
  CalendarDays,
  BookOpen,
  CheckCircle2,
  Trash2
} from "lucide-react";


import { useTheme } from "../../Context/ThemeContext";
import { useTasks } from "../../Context/TaskContext";


function DayAgenda({

  date,

  events = [],

  tasks = [],

  classes = []

}) {

  const { styles } = useTheme();

  const { removeTask } = useTasks();



  if (!date) return null;



  const scheduleDay =
    getScheduleDay(date);



  const dayClasses =
    classes

      .filter(
        item =>
          item.day === scheduleDay
      )

      .sort(
        (a, b) =>
          timeToMinutes(a.start) -
          timeToMinutes(b.start)
      );



  const dayEvents =
    events.filter(event => {

      const d =
        new Date(event.date);


      return (

        d.getDate() ===
          date.getDate() &&

        d.getMonth() ===
          date.getMonth() &&

        d.getFullYear() ===
          date.getFullYear()

      );

    });



  const dayTasks =
    tasks.filter(task => {

      if (!task.date) return false;


      const d =
        new Date(task.date);


      return (

        d.getDate() ===
          date.getDate() &&

        d.getMonth() ===
          date.getMonth() &&

        d.getFullYear() ===
          date.getFullYear()

      );

    });



  const isEmpty =

    dayClasses.length === 0 &&

    dayEvents.length === 0 &&

    dayTasks.length === 0;



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

      <h2 className="
        text-2xl
        font-bold
        text-white
        mb-5
        capitalize
      ">

        {date.toLocaleDateString(

          "es-ES",

          {

            weekday: "long",

            day: "numeric",

            month: "long"

          }

        )}

      </h2>



      {isEmpty && (

        <p className="
          text-white/60
        ">

          No hay nada programado 🎉

        </p>

      )}



      {dayClasses.length > 0 && (

        <div className="mb-5">

          <p className="
            text-white/50
            text-xs
            uppercase
            tracking-wider
            mb-3
          ">

            Horario

          </p>


          {dayClasses.map(item => (

            <div

              key={item.id}

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

              <div

                className="
                  w-10
                  h-10
                  rounded-xl
                  flex
                  items-center
                  justify-center
                  shrink-0
                "

                style={{

                  background:
                    item.color ||
                    "#60a5fa"

                }}

              >

                <BookOpen
                  className="text-white"
                  size={19}
                />

              </div>



              <div className="flex-1 min-w-0">

                <p className="
                  text-white
                  font-semibold
                  truncate
                ">

                  {item.subjectName}

                </p>


                <p className="
                  text-white/60
                  text-sm
                ">

                  {item.start}

                  {" – "}

                  {item.end ||
                    "1 hora"}

                </p>


                {item.room && (

                  <p className="
                    text-white/50
                    text-xs
                    mt-1
                  ">

                    📍 {item.room}

                  </p>

                )}

              </div>

            </div>

          ))}

        </div>

      )}



      {dayEvents.length > 0 && (

        <div className="mb-5">

          <p className="
            text-white/50
            text-xs
            uppercase
            tracking-wider
            mb-3
          ">

            Eventos

          </p>


          {dayEvents.map(event => (

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

              <CalendarDays
                className="text-white"
              />


              <div>

                <p className="
                  text-white
                  font-semibold
                ">

                  {event.title}

                </p>


                {event.startTime && (

                  <p className="
                    text-white/60
                    text-sm
                  ">

                    {event.startTime}

                    {event.endTime &&
                      ` – ${event.endTime}`}

                  </p>

                )}

              </div>

            </div>

          ))}

        </div>

      )}



      {dayTasks.length > 0 && (

        <div>

          <p className="
            text-white/50
            text-xs
            uppercase
            tracking-wider
            mb-3
          ">

            Tareas

          </p>


          {dayTasks.map(task => (

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

              <CheckCircle2
                className="text-white"
              />


              <div className="flex-1">

                <p className="
                  text-white
                  font-semibold
                ">

                  {task.title}

                </p>


                <p className="
                  text-white/60
                  text-sm
                ">

                  {task.subject ||
                    "Tarea"}

                </p>

              </div>



              <button

                onClick={() =>
                  removeTask(task.id)
                }

                className="
                  p-2
                  rounded-xl
                  bg-red-500/20
                  text-red-200
                "

              >

                <Trash2 size={17} />

              </button>

            </div>

          ))}

        </div>

      )}

    </section>

  );

}



function getScheduleDay(date) {

  const day =
    date.getDay();


  const map = {

    1: "L",

    2: "M",

    3: "X",

    4: "J",

    5: "V"

  };


  return map[day] || null;

}



function timeToMinutes(time) {

  if (!time) return 0;


  const [hours, minutes] =
    time.split(":").map(Number);


  return hours * 60 + minutes;

}


export default DayAgenda;