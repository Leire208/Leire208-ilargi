import DayCell from "./DayCell";


const weekDays = [

  "L",

  "M",

  "X",

  "J",

  "V",

  "S",

  "D"

];



function MonthGrid({

  currentDate,

  selectedDate,

  setSelectedDate,

  events = []

}) {



  const year = currentDate.getFullYear();

  const month = currentDate.getMonth();





  const firstDay = new Date(

    year,

    month,

    1

  );



  const lastDay = new Date(

    year,

    month + 1,

    0

  );





  let startDay = firstDay.getDay();



  startDay = startDay === 0

    ? 6

    : startDay - 1;





  const totalDays = lastDay.getDate();





  const cells = [];





  for(let i = 0; i < startDay; i++){


    cells.push(null);


  }







  for(let i = 1; i <= totalDays; i++){


    cells.push(

      new Date(

        year,

        month,

        i

      )

    );


  }








  while(cells.length % 7 !== 0){


    cells.push(null);


  }








  return (



    <section>





      <div className="grid grid-cols-7 mb-3">



        {

          weekDays.map(day=>(


            <div


              key={day}


              className="
                text-center
                text-white/60
                font-semibold
              "


            >


              {day}


            </div>



          ))

        }



      </div>







      <div className="grid grid-cols-7 gap-2">



        {


          cells.map((date,index)=>(



            <DayCell



              key={index}



              date={date}



              selectedDate={selectedDate}



              setSelectedDate={setSelectedDate}



              events={events}



            />



          ))



        }



      </div>





    </section>



  );

}



export default MonthGrid;