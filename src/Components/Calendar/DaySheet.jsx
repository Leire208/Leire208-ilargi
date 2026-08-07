import { useMemo, useState } from "react";
import { X, Plus, Trash2, Check } from "lucide-react";

import AddEventModal from "./AddEventModal";

import { useEvents } from "../../Context/EventContext";
import { useTasks } from "../../Context/TaskContext";
import { useLanguage } from "../../Context/LanguageContext";

function DaySheet({

  open,

  close,

  date

}) {

  const [showModal, setShowModal] = useState(false);

  const { events, removeEvent } = useEvents();

  const {

    tasks,

    removeTask,

    updateTask

  } = useTasks();

  const {

    language,

    texts

  } = useLanguage();



  const items = useMemo(() => {

    if (!date) return [];



    const sameDay = (value) => {

      if (!value) return false;

      const d = new Date(value);

      return (

        d.getDate() === date.getDate() &&

        d.getMonth() === date.getMonth() &&

        d.getFullYear() === date.getFullYear()

      );

    };



    const calendarEvents = events

      .filter(event => sameDay(event.date))

      .map(event => ({

        ...event,

        type: "event"

      }));



    const calendarTasks = tasks

      .filter(task => sameDay(task.date))

      .map(task => ({

        ...task,

        type: "task"

      }));



    return [

      ...calendarEvents,

      ...calendarTasks

    ];



  }, [

    events,

    tasks,

    date

  ]);



  if (!open || !date) return null;



  function addEvent() {

    close();

    setTimeout(() => {

      setShowModal(true);

    }, 100);

  }



  function completeTask(task) {

    updateTask(

      task.id,

      {

        completed: !task.completed

      }

    );

  }
  return (

    <>

      <div

        className="
          fixed
          inset-0
          bg-black/40
          backdrop-blur-sm
          z-[80]
          flex
          items-end
        "

        onClick={close}

      >

        <section

          onClick={(e)=>e.stopPropagation()}

          className="
            w-full
            rounded-t-[40px]
            bg-white/10
            backdrop-blur-3xl
            border-t
            border-white/20
            p-8
            max-h-[80vh]
            overflow-y-auto
          "

        >

          <div className="flex justify-between items-center mb-8">

            <h2 className="text-3xl text-white font-bold">

              {

                date.toLocaleDateString(

                  language === "eu"

                    ? "eu-ES"

                    : "es-ES",

                  {

                    weekday:"long",

                    day:"numeric",

                    month:"long"

                  }

                )

              }

            </h2>

            <button onClick={close}>

              <X className="text-white"/>

            </button>

          </div>





          {

            items.length === 0 && (

              <p className="text-white/60 mb-6">

                {texts.noEvents}

              </p>

            )

          }





          {

            items.map(item=>(

              <div

                key={`${item.type}-${item.id}`}

                className="
                  rounded-2xl
                  bg-white/10
                  p-4
                  mb-4
                "

              >

                <div className="flex justify-between items-start">

                  <div>

                    <div className="flex items-center gap-3">

                      <div

                        className="
                          w-4
                          h-4
                          rounded-full
                        "

                        style={{

                          background:

                            item.type === "task"

                              ? item.completed

                                ? "#22c55e"

                                : "#60a5fa"

                              : item.color || "#ffffff"

                        }}

                      />

                      <h3

                        className={`

                          text-white

                          font-semibold

                          ${

                            item.completed

                              ? "line-through opacity-60"

                              : ""

                          }

                        `}

                      >

                        {item.title}

                      </h3>

                    </div>

                    <p className="text-white/60 text-sm mt-2">

                      {

                        item.type === "task"

                          ? "📝 Tarea"

                          : "📅 Evento"

                      }

                    </p>

                    {

                      item.type === "event" && (

                        <p className="text-white/70 mt-2">

                          {item.startTime || "--:--"}

                          {

                            item.endTime &&

                            ` - ${item.endTime}`

                          }

                        </p>

                      )

                    }

                  </div>





                  <div className="flex gap-2">

                    {

                      item.type === "task" && (

                        <button

                          onClick={() => completeTask(item)}

                          className="
                            p-3
                            rounded-xl
                            bg-green-500/20
                            text-green-200
                          "

                        >

                          <Check size={18}/>

                        </button>

                      )

                    }

                    <button

                      onClick={() => {

                        if(item.type==="task"){

                          removeTask(item.id);

                        }else{

                          removeEvent(item.id);

                        }

                      }}

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

                </div>

              </div>

            ))

          }





          <button

            onClick={addEvent}

            className="
              mt-4
              w-full
              py-4
              rounded-2xl
              bg-white/20
              text-white
              font-semibold
              flex
              justify-center
              items-center
              gap-2
            "

          >

            <Plus/>

            {texts.addEvent}

          </button>

        </section>

      </div>





      <AddEventModal

        open={showModal}

        close={() => setShowModal(false)}

        date={date}

      />

    </>

  );

}

export default DaySheet;