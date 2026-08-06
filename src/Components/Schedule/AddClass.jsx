import { useState } from "react";

import { useClasses } from "../../Context/ClassContext";
import { useSubjects } from "../../Context/SubjectContext";



function AddClass(){



  const { addClass } = useClasses();

  const { subjects } = useSubjects();



  const [form,setForm] = useState({

    subjectId:"",

    day:"Lunes",

    time:"",

    room:""

  });







  function handleChange(e){


    setForm({

      ...form,

      [e.target.name]:e.target.value

    });


  }






  function save(){


    const subject =
      subjects.find(
        s => s.id === Number(form.subjectId)
      );



    if(!subject) return;




    addClass({

      ...form,

      subjectId:subject.id,

      subjectName:subject.name,

      color:subject.color

    });



    setForm({

      subjectId:"",

      day:"Lunes",

      time:"",

      room:""

    });


  }







  return (



    <section className="
      rounded-3xl
      p-6
      bg-white/10
      border
      border-white/20
      backdrop-blur-xl
    ">




      <h2 className="
        text-white
        text-xl
        font-bold
        mb-5
      ">

        Añadir clase

      </h2>






      <select

        name="subjectId"

        value={form.subjectId}

        onChange={handleChange}

        className="
          w-full
          mb-4
          rounded-2xl
          p-3
          bg-white/20
          text-white
        "

      >

        <option value="">
          Asignatura
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







      <select

        name="day"

        value={form.day}

        onChange={handleChange}

        className="
          w-full
          mb-4
          rounded-2xl
          p-3
          bg-white/20
          text-white
        "

      >

        <option>Lunes</option>
        <option>Martes</option>
        <option>Miércoles</option>
        <option>Jueves</option>
        <option>Viernes</option>


      </select>







      <input

        name="time"

        placeholder="Hora (ej: 10:00)"

        value={form.time}

        onChange={handleChange}

        className="
          w-full
          mb-4
          rounded-2xl
          p-3
          bg-white/20
          text-white
        "

      />






      <input

        name="room"

        placeholder="Aula"

        value={form.room}

        onChange={handleChange}

        className="
          w-full
          mb-5
          rounded-2xl
          p-3
          bg-white/20
          text-white
        "

      />







      <button

        onClick={save}

        className="
          w-full
          py-3
          rounded-2xl
          bg-white/20
          text-white
          font-semibold
        "

      >

        Guardar clase

      </button>



    </section>


  );

}


export default AddClass;