import { useState } from "react";

import { useTheme } from "../../Context/ThemeContext";
import { useSchedule } from "../../Context/ScheduleContext";

import AddClassModal from "./AddClassModal";
import EditClassModal from "./EditClassModal";


const days = [

  "L",
  "M",
  "X",
  "J",
  "V"

];


const hours = [

  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00"

];



function WeekGrid(){


  const { styles } = useTheme();

  const { classes } = useSchedule();



  const [addOpen,setAddOpen] = useState(false);

  const [editOpen,setEditOpen] = useState(false);



  const [selected,setSelected] = useState({

    day:null,

    hour:null

  });



  const [selectedClass,setSelectedClass] = useState(null);






  function getClass(day,hour){


    return classes.find(item =>

      item.day === day &&

      item.start === hour

    );


  }






  function clickCell(day,hour){


    const existing = getClass(day,hour);



    if(existing){


      setSelectedClass(existing);

      setEditOpen(true);


      return;


    }






    setSelected({

      day,

      hour

    });



    setAddOpen(true);


  }






  return (


    <>


      <section

        className={`

          rounded-3xl

          overflow-hidden

          shadow-xl

          ${styles.card}

        `}

      >



        <div className="grid grid-cols-6">



          <div />



          {

            days.map(day=>(


              <div

                key={day}

                className="
                  py-4
                  text-center
                  text-white
                  font-semibold
                  border-b
                  border-white/10
                "

              >

                {day}

              </div>


            ))

          }






          {


            hours.map(hour=>(


              <div

                key={hour}

                className="contents"

              >




                <div

                  className="
                    h-20
                    flex
                    items-start
                    justify-center
                    pt-2
                    text-white/60
                    text-sm
                    border-r
                    border-white/10
                  "

                >

                  {hour}

                </div>







                {


                  days.map(day=>{


                    const item = getClass(day,hour);




                    return (


                      <button


                        key={day + hour}


                        onClick={()=>clickCell(day,hour)}


                        className="
                          h-20
                          border
                          border-white/10
                          p-2
                          hover:bg-white/5
                          transition
                          text-left
                        "


                      >





                        {


                          item && (


                            <div


                              className="
                                h-full
                                rounded-2xl
                                p-2
                                text-white
                                text-sm
                                font-semibold
                              "


                              style={{


                                background:item.color || "rgba(255,255,255,0.2)"


                              }}


                            >


                              {item.subjectName}



                              {

                                item.room && (


                                  <p className="text-xs opacity-80">


                                    {item.room}


                                  </p>


                                )

                              }


                            </div>


                          )

                        }





                      </button>


                    );


                  })


                }





              </div>


            ))

          }





        </div>



      </section>







      <AddClassModal


        open={addOpen}


        close={()=>setAddOpen(false)}


        day={selected.day}


        hour={selected.hour}


      />






      <EditClassModal


        open={editOpen}


        close={()=>setEditOpen(false)}


        item={selectedClass}


      />





    </>


  );


}



export default WeekGrid;