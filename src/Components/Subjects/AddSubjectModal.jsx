import { useEffect, useState } from "react";
import { X } from "lucide-react";

import { useTheme } from "../../Context/ThemeContext";
import { useSubjects } from "../../Context/SubjectContext";



function AddSubjectModal({

  open,

  close

}) {



  const { styles } = useTheme();

  const { addSubject } = useSubjects();





  const emptyForm = {

    name:"",

    color:"#60a5fa"

  };





  const [form,setForm] = useState(emptyForm);








  useEffect(()=>{


    if(open){


      setForm(emptyForm);


    }


  },[open]);









  if(!open) return null;








  function change(e){



    setForm({

      ...form,

      [e.target.name]: e.target.value

    });



  }









  function save(){



    if(!form.name.trim()) return;






    addSubject({


      name:form.name.trim(),


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


            Nueva asignatura


          </h2>





          <button onClick={close}>


            <X className="text-white"/>


          </button>



        </div>








        <input



          name="name"



          value={form.name}



          onChange={change}



          placeholder="Nombre"



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








        <div className="flex items-center gap-4 mb-6">



          <span className="text-white">


            Color


          </span>





          <input



            type="color"



            name="color"



            value={form.color}



            onChange={change}



            className="

              w-12

              h-12

              rounded-xl

            "



          />



        </div>








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



          Guardar



        </button>







      </section>





    </div>



  );

}



export default AddSubjectModal;