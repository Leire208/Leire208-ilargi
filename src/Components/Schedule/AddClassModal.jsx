import { useState } from "react";
import { X } from "lucide-react";

import { useTheme } from "../../Context/ThemeContext";
import { useSubjects } from "../../Context/SubjectContext";
import { useSchedule } from "../../Context/ScheduleContext";



function AddClassModal({

  open,

  close,

  day,

  hour

}) {



  const { styles } = useTheme();


  const { subjects } = useSubjects();


  const { addClass } = useSchedule();





  const [subjectId,setSubjectId] = useState("");

  const [room,setRoom] = useState("");







  if(!open) return null;








  function save(){



    const subject = subjects.find(

      item => item.id === Number(subjectId)

    );





    if(!subject) return;






    addClass({


      day,


      start:hour,


      subjectId:subject.id,


      subjectName:subject.name,


      color:subject.color,


      room



    });






    close();



  }







  return (



    <div


      className="
        fixed
        inset-0
        z-[120]
        bg-black/40
        backdrop-blur-sm
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

          ${styles.card}

        `}


      >





        <div className="flex justify-between items-center mb-6">


          <h2 className="text-2xl font-bold text-white">


            Nueva clase


          </h2>





          <button onClick={close}>


            <X className="text-white"/>


          </button>



        </div>







        <select


          value={subjectId}


          onChange={(e)=>setSubjectId(e.target.value)}


          className="
            w-full
            mb-4
            rounded-2xl
            bg-white/20
            text-white
            px-4
            py-3
          "


        >



          <option value="">


            Selecciona asignatura


          </option>




          {


            subjects.map(subject=>(


              <option


                key={subject.id}


                value={subject.id}


              >


                {subject.name}


              </option>



            ))


          }





        </select>







        <input


          value={room}


          onChange={(e)=>setRoom(e.target.value)}


          placeholder="Aula"


          className="
            w-full
            mb-6
            rounded-2xl
            bg-white/20
            text-white
            px-4
            py-3
          "


        />







        <button


          onClick={save}


          className="
            w-full
            py-4
            rounded-2xl
            bg-white/20
            text-white
            font-semibold
          "


        >


          Guardar


        </button>





      </section>




    </div>



  );


}



export default AddClassModal;