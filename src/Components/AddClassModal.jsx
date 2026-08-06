import { useState } from "react";
import { X } from "lucide-react";

import { useClasses } from "../Context/ClassContext";


function AddClassModal({ close, selectedDay }) {


  const { addClass } = useClasses();



  const [form, setForm] = useState({

    subject: "",
    time: "",
    room: ""

  });



  function saveClass(){


    if(!form.subject || !form.time){

      return;

    }



    addClass({

      id: Date.now(),

      day: selectedDay,

      ...form

    });



    close();


  }



  return (

    <div className="
      fixed
      inset-0
      z-[100]
      bg-black/50
      backdrop-blur-sm
      flex
      items-center
      justify-center
      px-6
    ">


      <div className="
        w-full
        max-w-md
        rounded-3xl
        bg-slate-900
        p-6
        text-white
        border
        border-white/20
        shadow-2xl
      ">


        <div className="
          flex
          justify-between
          items-center
        ">


          <h2 className="
            text-2xl
            font-semibold
          ">

            Nueva clase

          </h2>


          <button

            onClick={close}

            className="
              rounded-full
              bg-white/10
              p-2
            "

          >

            <X size={20}/>

          </button>


        </div>



        <p className="
          mt-4
          text-white/60
        ">

          Día seleccionado: {selectedDay}

        </p>



        <div className="
          mt-6
          space-y-4
        ">



          <input

            placeholder="Asignatura"

            value={form.subject}

            onChange={(e)=>

              setForm({

                ...form,

                subject:e.target.value

              })

            }

            className="
              w-full
              rounded-2xl
              bg-white/10
              p-4
              outline-none
            "

          />



          <input

            placeholder="Hora (ej: 10:00)"

            value={form.time}

            onChange={(e)=>

              setForm({

                ...form,

                time:e.target.value

              })

            }

            className="
              w-full
              rounded-2xl
              bg-white/10
              p-4
              outline-none
            "

          />



          <input

            placeholder="Aula"

            value={form.room}

            onChange={(e)=>

              setForm({

                ...form,

                room:e.target.value

              })

            }

            className="
              w-full
              rounded-2xl
              bg-white/10
              p-4
              outline-none
            "

          />



          <button

            onClick={saveClass}

            className="
              w-full
              rounded-2xl
              bg-white
              text-black
              py-4
              font-semibold
            "

          >

            Guardar clase

          </button>



        </div>


      </div>


    </div>

  );

}


export default AddClassModal;