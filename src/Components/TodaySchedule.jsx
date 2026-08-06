import { Clock3 } from "lucide-react";

import { useClasses } from "../Context/ClassContext";


function TodaySchedule(){


  const { classes } = useClasses();


  const today = new Date().getDate();



  const todayClasses = classes.filter(

    item => item.day === today

  );



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
    ">



      <h2 className="
        text-xl
        font-semibold
      ">

        Clases de hoy

      </h2>




      {
        todayClasses.length === 0

        ?

        <p className="
          mt-4
          text-white/60
        ">

          No tienes clases hoy

        </p>



        :



        <div className="
          mt-4
          space-y-3
        ">


          {
            todayClasses.map(item => (

              <div

                key={item.id}

                className="
                  flex
                  items-center
                  justify-between
                  rounded-2xl
                  bg-white/10
                  p-4
                "

              >


                <div>


                  <h3 className="
                    font-semibold
                  ">

                    {item.subject}

                  </h3>


                  <p className="
                    text-white/60
                  ">

                    Aula {item.room}

                  </p>


                </div>




                <div className="
                  flex
                  items-center
                  gap-2
                ">

                  <Clock3 size={18}/>


                  <span>

                    {item.time}

                  </span>


                </div>



              </div>


            ))
          }


        </div>


      }



    </div>

  );

}


export default TodaySchedule;