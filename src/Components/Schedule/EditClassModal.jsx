import { X } from "lucide-react";

import { useSchedule } from "../../Context/ScheduleContext";



function EditClassModal({

  open,

  close,

  item

}) {



  const { removeClass } = useSchedule();




  if(!open || !item) return null;






  function remove(){


    removeClass(item.id);


    close();


  }







  return (


    <div


      className="
        fixed
        inset-0
        z-[130]
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


        className="
          rounded-3xl
          bg-white/10
          backdrop-blur-3xl
          p-6
          w-full
          max-w-md
        "


      >



        <div className="flex justify-between mb-6">


          <h2 className="text-white text-2xl font-bold">


            {item.subjectName}


          </h2>



          <button onClick={close}>


            <X className="text-white"/>


          </button>



        </div>







        <p className="text-white/70 mb-2">


          {item.day} · {item.start}


        </p>






        {


          item.room && (


            <p className="text-white/70 mb-6">


              Aula: {item.room}


            </p>


          )


        }








        <button


          onClick={remove}


          className="
            w-full
            py-4
            rounded-2xl
            bg-red-500/20
            text-red-200
            font-semibold
          "


        >


          Eliminar clase


        </button>






      </section>



    </div>


  );


}



export default EditClassModal;