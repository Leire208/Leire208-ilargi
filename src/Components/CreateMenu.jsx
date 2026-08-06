import { useState } from "react";

import {
  Plus,
  X,
  CalendarDays,
  BookOpen,
  CheckSquare
} from "lucide-react";

import AddEventModal from "./Calendar/AddEventModal";
import AddSubjectModal from "./Subjects/AddSubjectModal";
import AddTaskModal from "./Tasks/AddTaskModal";

import { useLanguage } from "../Context/LanguageContext";



function CreateMenu(){


  const [open,setOpen] = useState(false);


  const [modal,setModal] = useState(null);



  const { texts } = useLanguage();






  function closeModal(){


    setModal(null);


  }







  return (


    <>



      <div


        className="
          fixed
          bottom-24
          left-1/2
          -translate-x-1/2
          z-[90]
        "


      >





        {


          open && (


            <div


              className="
                mb-4
                flex
                flex-col
                gap-3
              "


            >





              <button


                onClick={()=>setModal("task")}


                className="
                  rounded-2xl
                  bg-white/20
                  backdrop-blur-xl
                  px-6
                  py-3
                  text-white
                  flex
                  items-center
                  gap-3
                "


              >


                <CheckSquare/>


                {texts.newTask || "Nueva tarea"}


              </button>







              <button


                onClick={()=>setModal("subject")}


                className="
                  rounded-2xl
                  bg-white/20
                  backdrop-blur-xl
                  px-6
                  py-3
                  text-white
                  flex
                  items-center
                  gap-3
                "


              >


                <BookOpen/>


                {texts.newSubject || "Asignatura"}


              </button>







              <button


                onClick={()=>setModal("event")}


                className="
                  rounded-2xl
                  bg-white/20
                  backdrop-blur-xl
                  px-6
                  py-3
                  text-white
                  flex
                  items-center
                  gap-3
                "


              >


                <CalendarDays/>


                {texts.event || "Evento"}


              </button>





            </div>


          )


        }








        <button


          onClick={()=>setOpen(!open)}


          className="
            w-16
            h-16
            rounded-full
            bg-white/20
            backdrop-blur-xl
            text-white
            flex
            items-center
            justify-center
            shadow-xl
          "


        >


          {


            open

            ?

            <X/>

            :

            <Plus/>


          }


        </button>





      </div>







      <AddTaskModal


        open={modal==="task"}


        close={closeModal}


      />






      <AddSubjectModal


        open={modal==="subject"}


        close={closeModal}


      />






      <AddEventModal


        open={modal==="event"}


        close={closeModal}


      />





    </>


  );


}



export default CreateMenu;