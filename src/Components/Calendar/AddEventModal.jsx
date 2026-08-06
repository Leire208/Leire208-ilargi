import { useEffect, useState } from "react";
import { X } from "lucide-react";

import { useTheme } from "../../Context/ThemeContext";
import { useEvents } from "../../Context/EventContext";



function AddEventModal({

  open,

  close,

  date

}) {



  const { styles } = useTheme();

  const { addEvent } = useEvents();





  const emptyForm = {

    title:"",

    date:"",

    startTime:"",

    endTime:"",

    color:"#ffffff"

  };





  const [form,setForm] = useState(emptyForm);







  useEffect(()=>{


    if(open && date){


      setForm({

        ...emptyForm,

        date: date.toISOString().split("T")[0]

      });


    }



  },[open,date]);









  if(!open) return null;








  function change(e){



    setForm({

      ...form,

      [e.target.name]: e.target.value

    });



  }









  function save(){



    if(!form.title.trim() || !form.date){


      return;


    }







    addEvent({



      title:form.title,

      date:form.date,

      startTime:form.startTime,

      endTime:form.endTime,

      color:form.color



    });






    close();



  }










  return (



    <div



      className="

        fixed

        inset-0

        z-[200]

        bg-black/50

        backdrop-blur-md

        flex

        items-center

        justify-center

        px-6

      "



      onClick={close}



    >





      <section



        onClick={(e)=>e.stopPropagation()}



        className={`

          w-full

          max-w-md

          rounded-3xl

          p-6

          shadow-2xl

          ${styles.card}

        `}



      >





        <div className="flex justify-between items-center mb-6">



          <h2 className="text-2xl text-white font-bold">


            Nuevo evento


          </h2>





          <button onClick={close}>


            <X className="text-white"/>


          </button>



        </div>








        <input



          name="title"



          value={form.title}



          onChange={change}



          placeholder="Título"



          className="

            w-full

            mb-4

            rounded-2xl

            bg-white/20

            text-white

            px-4

            py-3

          "



        />









        <input



          type="date"



          name="date"



          value={form.date}



          onChange={change}



          className="

            w-full

            mb-4

            rounded-2xl

            bg-white/20

            text-white

            px-4

            py-3

          "



        />









        <div className="grid grid-cols-2 gap-3">





          <input



            type="time"



            name="startTime"



            value={form.startTime}



            onChange={change}



            className="

              rounded-2xl

              bg-white/20

              text-white

              px-4

              py-3

            "



          />








          <input



            type="time"



            name="endTime"



            value={form.endTime}



            onChange={change}



            className="

              rounded-2xl

              bg-white/20

              text-white

              px-4

              py-3

            "



          />





        </div>








        <button



          onClick={save}



          className="

            w-full

            mt-6

            py-4

            rounded-2xl

            bg-white/20

            text-white

            font-semibold

            hover:bg-white/30

            transition

          "



        >



          Guardar



        </button>







      </section>





    </div>



  );

}



export default AddEventModal;