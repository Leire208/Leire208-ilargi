import { useState } from "react";
import { ChevronLeft, ChevronRight, Plus, Trash2 } from "lucide-react";

import AddClassModal from "../Components/AddClassModal";
import { useClasses } from "../Context/ClassContext";


function Calendar() {


  const { classes, removeClass } = useClasses();


  const today = new Date();


  const [month, setMonth] = useState(
    today.getMonth()
  );


  const [year, setYear] = useState(
    today.getFullYear()
  );


  const [selectedDay, setSelectedDay] = useState(
    today.getDate()
  );


  const [showModal, setShowModal] = useState(false);



  const monthName = new Date(
    year,
    month
  ).toLocaleDateString(
    "es-ES",
    {
      month: "long"
    }
  );



  const daysInMonth = new Date(
    year,
    month + 1,
    0
  ).getDate();



  const changeMonth = (value)=>{


    let newMonth = month + value;

    let newYear = year;



    if(newMonth < 0){

      newMonth = 11;

      newYear--;

    }



    if(newMonth > 11){

      newMonth = 0;

      newYear++;

    }



    setMonth(newMonth);

    setYear(newYear);


  };



  const days = Array.from(

    {
      length: daysInMonth
    },

    (_,i)=>i+1

  );



  const dayClasses = classes.filter(

    item => item.day === selectedDay

  );



  const hasClasses = (day)=>{


    return classes.some(

      item => item.day === day

    );


  };



  return (

    <div className="
      min-h-screen
      bg-gradient-to-b
      from-slate-900
      via-purple-950
      to-black
      text-white
      px-6
      pt-10
      pb-32
    ">


      <div className="
        flex
        justify-between
        items-center
      ">


        <button

          onClick={()=>changeMonth(-1)}

          className="
            bg-white/10
            p-3
            rounded-full
          "

        >

          <ChevronLeft/>

        </button>




        <div className="text-center">

          <h1 className="
            text-3xl
            font-semibold
            capitalize
          ">

            {monthName}

          </h1>


          <p className="text-white/60">

            {year}

          </p>


        </div>




        <button

          onClick={()=>changeMonth(1)}

          className="
            bg-white/10
            p-3
            rounded-full
          "

        >

          <ChevronRight/>

        </button>


      </div>





      <div className="
        grid
        grid-cols-7
        gap-3
        mt-10
        text-center
        text-white/60
      ">


        {
          [
            "L",
            "M",
            "X",
            "J",
            "V",
            "S",
            "D"
          ].map(day=>(

            <span key={day}>

              {day}

            </span>

          ))
        }


      </div>





      <div className="
        grid
        grid-cols-7
        gap-3
        mt-4
      ">


        {
          days.map(day=>(

            <button

              key={day}

              onClick={()=>setSelectedDay(day)}

              className={`

                aspect-square
                rounded-2xl
                flex
                flex-col
                items-center
                justify-center

                ${
                  selectedDay === day

                  ? "bg-white text-purple-900 scale-110"

                  : "bg-white/10"

                }

              `}

            >


              <span>

                {day}

              </span>



              {
                hasClasses(day) && (

                  <span className="
                    w-1.5
                    h-1.5
                    rounded-full
                    bg-purple-400
                    mt-1
                  " />

                )
              }


            </button>


          ))
        }


      </div>





      <div className="
        mt-10
        rounded-3xl
        bg-white/15
        backdrop-blur-xl
        border
        border-white/20
        p-6
      ">


        <h2 className="
          text-xl
          font-semibold
        ">

          Día {selectedDay}

        </h2>




        {
          dayClasses.length === 0

          ?

          <p className="
            mt-3
            text-white/60
          ">

            No hay clases

          </p>



          :


          <div className="
            mt-4
            space-y-3
          ">


            {
              dayClasses.map(item=>(


                <div

                  key={item.id}

                  className="
                    rounded-2xl
                    bg-white/10
                    p-4
                    flex
                    justify-between
                    items-center
                  "

                >


                  <div>


                    <h3 className="
                      font-semibold
                    ">

                      {item.subject}

                    </h3>



                    <p className="
                      text-white/70
                    ">

                      {item.time}
                      {" · "}
                      Aula {item.room}

                    </p>


                  </div>



                  <button

                    onClick={()=>removeClass(item.id)}

                    className="
                      text-red-300
                    "

                  >

                    <Trash2 size={20}/>

                  </button>


                </div>


              ))

            }


          </div>


        }


      </div>





      <button

        onClick={()=>setShowModal(true)}

        className="
          fixed
          bottom-28
          right-8
          bg-white
          text-purple-900
          p-5
          rounded-full
          shadow-xl
        "

      >

        <Plus size={28}/>

      </button>





      {
        showModal && (

          <AddClassModal

            close={()=>setShowModal(false)}

            selectedDay={selectedDay}

          />

        )
      }


    </div>

  );

}


export default Calendar;