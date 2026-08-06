import {
  X,
  BookOpen,
  CalendarPlus,
  ClipboardPlus
} from "lucide-react";

import { useState } from "react";

import AddSubjectModal from "./Subjects/AddSubjectModal";
import AddTaskModal from "./Tasks/AddTaskModal";
import AddEventModal from "./Calendar/AddEventModal";



function QuickAdd({

  open,

  close

}) {


  const [showSubject, setShowSubject] = useState(false);

  const [showEvent, setShowEvent] = useState(false);

  const [showTask, setShowTask] = useState(false);






  if(!open && !showSubject && !showEvent && !showTask) return null;







  function openSubject(){


    close();


    setTimeout(()=>{


      setShowSubject(true);


    },100);


  }






  function openEvent(){


    close();


    setTimeout(()=>{


      setShowEvent(true);


    },100);


  }







  function openTask(){


    close();


    setTimeout(()=>{


      setShowTask(true);


    },100);


  }







  return (

    <>


      {


        open && (


          <div

            className="
              fixed
              inset-0
              z-[100]
              bg-black/40
              backdrop-blur-sm
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
              "

            >




              <div className="flex justify-between items-center mb-6">


                <h2 className="text-2xl text-white font-bold">

                  Añadir

                </h2>



                <button onClick={close}>

                  <X className="text-white"/>

                </button>


              </div>







              <button

                onClick={openEvent}

                className="
                  w-full
                  p-4
                  rounded-2xl
                  bg-white/10
                  text-white
                  flex
                  items-center
                  gap-4
                  mb-3
                "

              >

                <CalendarPlus/>

                Nuevo evento

              </button>







              <button

                onClick={openSubject}

                className="
                  w-full
                  p-4
                  rounded-2xl
                  bg-white/10
                  text-white
                  flex
                  items-center
                  gap-4
                  mb-3
                "

              >

                <BookOpen/>

                Nueva asignatura

              </button>








              <button

                onClick={openTask}

                className="
                  w-full
                  p-4
                  rounded-2xl
                  bg-white/10
                  text-white
                  flex
                  items-center
                  gap-4
                "

              >

                <ClipboardPlus/>

                Nueva tarea

              </button>






            </section>


          </div>


        )


      }








      <AddSubjectModal

        open={showSubject}

        close={()=>setShowSubject(false)}

      />








      <AddEventModal

        open={showEvent}

        close={()=>setShowEvent(false)}

      />








      <AddTaskModal

        open={showTask}

        close={()=>setShowTask(false)}

      />





    </>


  );

}


export default QuickAdd;