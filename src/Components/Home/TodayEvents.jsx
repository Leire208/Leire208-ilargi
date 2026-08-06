import { CalendarDays } from "lucide-react";

import { useTheme } from "../../Context/ThemeContext";
import { useLanguage } from "../../Context/LanguageContext";
import { useEvents } from "../../Context/EventContext";



function TodayEvents() {


  const { styles } = useTheme();

  const { texts } = useLanguage();

  const { events } = useEvents();





  const today = new Date();






  const todayEvents = events.filter(event=>{


    const eventDate = new Date(event.date);



    return (

      eventDate.getDate() === today.getDate() &&

      eventDate.getMonth() === today.getMonth() &&

      eventDate.getFullYear() === today.getFullYear()

    );


  });







  const sortedEvents = [...todayEvents].sort((a,b)=>


    (a.startTime || "").localeCompare(

      b.startTime || ""

    )


  );







  return (


    <section


      className={`

        rounded-3xl

        p-6

        shadow-xl

        ${styles.card}

      `}


    >




      <div className="flex items-center gap-3 mb-6">


        <CalendarDays className="text-white"/>



        <h2 className="text-xl font-semibold text-white">


          {texts.today}


        </h2>



      </div>







      {


        sortedEvents.length === 0 && (


          <p className="text-white/70">


            {texts.noEvents}


          </p>


        )


      }







      <div className="space-y-4">



        {


          sortedEvents.map(event=>(



            <div


              key={event.id}


              className="

                flex

                items-center

                gap-4

                rounded-2xl

                bg-white/10

                p-4

              "


            >





              <div


                className="

                  w-3

                  h-12

                  rounded-full

                "


                style={{


                  background:event.color || "#ffffff"


                }}


              />






              <div>


                <h3 className="text-white font-semibold">


                  {event.title}


                </h3>






                <p className="text-white/60 text-sm">


                  {event.startTime || "--:--"}


                  {


                    event.endTime &&

                    ` - ${event.endTime}`


                  }


                </p>






                {


                  event.subjectName && (



                    <p className="text-white/70 text-sm">


                      📚 {event.subjectName}


                    </p>



                  )


                }





              </div>




            </div>




          ))


        }



      </div>





    </section>


  );


}



export default TodayEvents;