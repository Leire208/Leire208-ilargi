import { createContext, useContext, useState } from "react";


const ScheduleContext = createContext();




export function ScheduleProvider({ children }) {


  const [classes, setClasses] = useState(()=>{


    const saved = localStorage.getItem(

      "ilargi-schedule"

    );


    return saved

      ? JSON.parse(saved)

      : [];


  });







  function saveClasses(data){


    setClasses(data);


    localStorage.setItem(

      "ilargi-schedule",

      JSON.stringify(data)

    );


  }








  function addClass(item){


    saveClasses([


      ...classes,


      {


        id:Date.now(),


        ...item


      }


    ]);


  }








  function removeClass(id){


    saveClasses(


      classes.filter(

        item=>item.id !== id

      )


    );


  }








  function updateClass(id,data){


    saveClasses(


      classes.map(item=>


        item.id === id

        ? {

            ...item,

            ...data

          }

        : item


      )


    );


  }








  return (


    <ScheduleContext.Provider


      value={{


        classes,


        addClass,


        removeClass,


        updateClass


      }}


    >


      {children}


    </ScheduleContext.Provider>


  );


}






export function useSchedule(){


  return useContext(ScheduleContext);


}