import { useEffect, useState } from "react";
import { X } from "lucide-react";

import { useTheme } from "../../Context/ThemeContext";
import { useTasks } from "../../Context/TaskContext";
import { useSubjects } from "../../Context/SubjectContext";
import { useLanguage } from "../../Context/LanguageContext";



function AddTaskModal({

  open,

  close

}) {



  const { styles } = useTheme();

  const { addTask } = useTasks();

  const { subjects } = useSubjects();

  const { texts } = useLanguage();





  const initialForm = {

    title: "",

    subject: "",

    date: ""

  };





  const [form, setForm] = useState(initialForm);







  useEffect(() => {


    if (open) {


      setForm(initialForm);


    }


  }, [open]);









  if (!open) return null;









  function change(e) {


    setForm({

      ...form,

      [e.target.name]: e.target.value

    });


  }









  function save() {



    if (!form.title.trim()) {


      return;


    }






    const newTask = {


      title: form.title.trim(),

      subject: form.subject,

      date: form.date



    };






    console.log("CREANDO TAREA:", newTask);






    addTask(newTask);






    setForm(initialForm);





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


            {texts.newTask || "Nueva tarea"}


          </h2>





          <button onClick={close}>


            <X className="text-white"/>


          </button>



        </div>








        <input



          name="title"



          value={form.title}



          onChange={change}



          placeholder={texts.taskTitle || "Título de tarea"}



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








        <select



          name="subject"



          value={form.subject}



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



        >





          <option value="">


            {texts.noSubject || "Sin asignatura"}


          </option>







          {


            subjects.map(subject => (



              <option



                key={subject.id}



                value={subject.name}



              >



                {subject.name}



              </option>



            ))


          }





        </select>









        <input



          type="date"



          name="date"



          value={form.date}



          onChange={change}



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

            hover:bg-white/30

            transition

          "



        >



          {texts.save || "Guardar"}



        </button>







      </section>





    </div>



  );

}



export default AddTaskModal;