import {
  BookOpen,
  CheckCircle2
} from "lucide-react";


function DaySummary() {


  return (

    <div className="
      mt-6
      rounded-3xl
      bg-white/15
      backdrop-blur-xl
      border
      border-white/20
      p-6
      text-white
      shadow-xl
    ">


      <h2 className="
        text-xl
        font-semibold
        mb-5
      ">

        Tu día

      </h2>



      <div className="
        grid
        grid-cols-2
        gap-4
      ">


        <div className="
          rounded-2xl
          bg-white/10
          p-4
        ">

          <BookOpen size={24}/>


          <p className="
            mt-3
            text-2xl
            font-bold
          ">

            3

          </p>


          <p className="
            text-sm
            text-white/70
          ">

            Clases

          </p>


        </div>




        <div className="
          rounded-2xl
          bg-white/10
          p-4
        ">

          <CheckCircle2 size={24}/>


          <p className="
            mt-3
            text-2xl
            font-bold
          ">

            2

          </p>


          <p className="
            text-sm
            text-white/70
          ">

            Tareas

          </p>


        </div>


      </div>


    </div>

  );

}


export default DaySummary;