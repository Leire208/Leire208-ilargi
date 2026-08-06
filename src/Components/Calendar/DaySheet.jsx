import { useMemo, useState } from "react";
import { X, Plus, Trash2 } from "lucide-react";

import AddEventModal from "./AddEventModal";

import { useEvents } from "../../Context/EventContext";
import { useLanguage } from "../../Context/LanguageContext";


function DaySheet({

  open,

  close,

  date

}) {


  const [showModal, setShowModal] = useState(false);


  const { events, removeEvent } = useEvents();

  const { language, texts } = useLanguage();






  const dayEvents = useMemo(()=>{


    if(!date) return [];



    return events.filter(event=>{


      const eventDate = new Date(event.date);



      return (

        eventDate.getDate() === date.getDate() &&

        eventDate.getMonth() === date.getMonth() &&

        eventDate.getFullYear() === date.getFullYear()

      );


    });


  },[events,date]);







  if(!open || !date) return null;








  function addEvent(){


    close();


    setTimeout(()=>{


      setShowModal(true);


    },100);


  }







  return (


    <>



      {


        open && (


          <div


            className="
              fixed
              inset-0
              bg-black/40
              backdrop-blur-sm
              z-[80]
              flex
              items-end
            "


            onClick={close}


          >



            <section


              onClick={(e)=>e.stopPropagation()}


              className="
                w-full
                rounded-t-[40px]
                bg-white/10
                backdrop-blur-3xl
                border-t
                border-white/20
                p-8
              "


            >





              <div className="flex justify-between items-center mb-8">


                <h2 className="text-3xl text-white font-bold">


                  {
                    date.toLocaleDateString(

                      language === "eu"

                      ? "eu-ES"

                      : "es-ES",

                      {

                        weekday:"long",

                        day:"numeric",

                        month:"long"

                      }

                    )
                  }


                </h2>





                <button onClick={close}>


                  <X className="text-white"/>


                </button>



              </div>








              {

                dayEvents.length === 0 && (


                  <p className="text-white/60 mb-6">


                    {texts.noEvents}


                  </p>


                )


              }








              {


                dayEvents.map(event=>(



                  <div


                    key={event.id}


                    className="
                      rounded-2xl
                      bg-white/10
                      p-4
                      mb-4
                    "


                  >





                    <div className="flex items-center gap-3">


                      <div


                        className="
                          w-4
                          h-4
                          rounded-full
                        "


                        style={{

                          background:event.color || "white"

                        }}


                      />




                      <h3 className="text-white font-semibold">


                        {event.title}


                      </h3>



                    </div>






                    <p className="text-white/70 mt-2">


                      {event.startTime || "--:--"}

                      {

                        event.endTime &&

                        ` - ${event.endTime}`

                      }


                    </p>






                    <button


                      onClick={()=>removeEvent(event.id)}


                      className="
                        mt-4
                        p-3
                        rounded-xl
                        bg-red-500/20
                        text-red-200
                      "


                    >


                      <Trash2 size={18}/>


                    </button>




                  </div>


                ))


              }









              <button


                onClick={addEvent}


                className="
                  mt-4
                  w-full
                  py-4
                  rounded-2xl
                  bg-white/20
                  text-white
                  font-semibold
                  flex
                  justify-center
                  items-center
                  gap-2
                "


              >


                <Plus/>


                {texts.addEvent}


              </button>





            </section>



          </div>


        )


      }








      <AddEventModal


        open={showModal}


        close={()=>setShowModal(false)}


        date={date}


      />



    </>


  );


}


export default DaySheet;