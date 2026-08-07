import { createContext, useContext, useEffect } from "react";

import { useUser } from "./UserContext";
import { useTasks } from "./TaskContext";
import { useEvents } from "./EventContext";


const NotificationContext = createContext(null);



export function NotificationProvider({ children }) {


  const { user } = useUser();

  const { tasks } = useTasks();

  const { events } = useEvents();





  useEffect(()=>{


    if(!user.settings.notifications){

      return;

    }



    requestPermission();



  },[user.settings.notifications]);







  useEffect(()=>{


    if(!user.settings.notifications){

      return;

    }



    checkNotifications();



    const interval = setInterval(

      checkNotifications,

      60000

    );



    return ()=>clearInterval(interval);



  },[tasks,events,user.settings.notifications]);








  async function requestPermission(){


    if(!("Notification" in window)){

      return;

    }



    if(Notification.permission === "default"){


      await Notification.requestPermission();


    }


  }








  function sendNotification(title,body){


    if(Notification.permission !== "granted"){

      return;

    }



    new Notification(title,{

      body

    });


  }








  function checkNotifications(){


    const today = new Date();


    tasks.forEach(task=>{


      if(!task.date){

        return;

      }



      const taskDate = new Date(task.date);



      const diff =

        Math.ceil(

          (taskDate - today) /

          (1000*60*60*24)

        );



      if(diff === 1 && !task.completed){


        sendNotification(

          "Tarea pendiente",

          `${task.title} es para mañana`

        );


      }



    });






    events.forEach(event=>{


      if(!event.date){

        return;

      }



      const eventDate = new Date(event.date);



      const diff =

        Math.ceil(

          (eventDate - today) /

          (1000*60*60*24)

        );




      if(diff === 1){


        sendNotification(

          "Próximo evento",

          `${event.title} es mañana`

        );


      }


    });



  }







  return (

    <NotificationContext.Provider value={{}}>

      {children}

    </NotificationContext.Provider>

  );


}






export function useNotifications(){

 return useContext(NotificationContext);

}