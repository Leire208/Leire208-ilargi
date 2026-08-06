import { CalendarDays } from "lucide-react";

import { useTheme } from "../../Context/ThemeContext";



function NextEventCard({

  event

}) {


  const { styles } = useTheme();





  return (


    <section


      className={`

        rounded-3xl

        p-6

        shadow-xl

        ${styles.card}

      `}


    >





      <div className="flex items-center gap-3 mb-5">


        <CalendarDays className="text-white"/>


        <h2 className="text-xl font-bold text-white">


          Próximo evento


        </h2>


      </div>








      {


        !event ? (


          <p className="text-white/60">


            No tienes eventos próximos 📅


          </p>


        )



        :



        (


          <div>



            <h3 className="text-2xl font-bold text-white">


              {event.title}


            </h3>





            {


              event.date && (


                <p className="text-white/70 mt-2">


                  {new Date(event.date).toLocaleDateString(

                    "es-ES",

                    {

                      weekday:"long",

                      day:"numeric",

                      month:"long"

                    }

                  )}


                </p>


              )


            }





            {


              event.startTime && (


                <p className="text-white/60 mt-1">


                  {event.startTime}


                  {


                    event.endTime &&

                    ` - ${event.endTime}`


                  }


                </p>


              )


            }





            {


              event.color && (


                <div


                  className="
                    w-4
                    h-4
                    rounded-full
                    mt-4
                  "


                  style={{


                    background:event.color


                  }}


                />


              )


            }



          </div>


        )


      }




    </section>


  );

}



export default NextEventCard;