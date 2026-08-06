import { createContext, useContext, useState } from "react";


const EventContext = createContext(null);





export function EventProvider({ children }) {



  const [events, setEvents] = useState(()=>{


    try {


      const saved = localStorage.getItem(

        "ilargi-events"

      );


      return saved

        ? JSON.parse(saved)

        : [];



    } catch {


      return [];


    }


  });









  function saveEvents(data){



    setEvents(data);



    localStorage.setItem(

      "ilargi-events",

      JSON.stringify(data)

    );



  }











  function addEvent(event){



    const newEvent = {


      id: Date.now(),


      color: event.color || "#ffffff",


      ...event


    };





    saveEvents([


      ...events,


      newEvent



    ]);



  }









  function removeEvent(id){



    saveEvents(


      events.filter(


        event => event.id !== id


      )


    );


  }









  function updateEvent(id,data){



    saveEvents(



      events.map(event =>



        event.id === id


          ? {


              ...event,


              ...data


            }


          : event



      )



    );


  }









  function getEventsByDate(date){



    return events.filter(event=>{


      const eventDate = new Date(event.date);



      return (


        eventDate.getDate() === date.getDate()

        &&

        eventDate.getMonth() === date.getMonth()

        &&

        eventDate.getFullYear() === date.getFullYear()



      );


    });



  }









  return (



    <EventContext.Provider


      value={{


        events,


        addEvent,


        removeEvent,


        updateEvent,


        getEventsByDate



      }}



    >



      {children}



    </EventContext.Provider>



  );



}








export function useEvents(){



  const context = useContext(EventContext);



  if(!context){


    throw new Error(

      "useEvents debe usarse dentro de EventProvider"

    );


  }



  return context;



}