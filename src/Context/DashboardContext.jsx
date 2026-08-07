import { createContext, useContext, useMemo } from "react";

import { useEvents } from "./EventContext";
import { useSubjects } from "./SubjectContext";
import { useTasks } from "./TaskContext";
import { useSchedule } from "./ScheduleContext";

import {
  getNextEvent,
  getUpcomingEvents
} from "../Utils/eventUtils";


const DashboardContext = createContext(null);



export function DashboardProvider({ children }) {


const { events } = useEvents();

const { subjects } = useSubjects();

const { tasks } = useTasks();

const { classes } = useSchedule();





const dashboard = useMemo(()=>{


const today = new Date();



const todayEvents = events.filter(event=>{


const date = new Date(event.date);



return (

date.getDate() === today.getDate()

&&

date.getMonth() === today.getMonth()

&&

date.getFullYear() === today.getFullYear()

);


});







const todayClasses = classes.filter(item=>{


return item.day ===

today.toLocaleDateString(

"es-ES",

{

weekday:"short"

}

).charAt(0).toUpperCase();


});








return {


events,

subjects,

tasks,

classes,



nextEvent:getNextEvent(events),


upcomingEvents:getUpcomingEvents(events),


todayEvents,

todayClasses,



totalSubjects:subjects.length,


totalEvents:events.length,


totalTasks:tasks.length,


completedTasks:

tasks.filter(

task=>task.completed

).length,


pendingTasks:

tasks.filter(

task=>!task.completed

).length



};



},[

events,

subjects,

tasks,

classes

]);







return (

<DashboardContext.Provider

value={dashboard}

>

{children}

</DashboardContext.Provider>

);


}







export function useDashboard(){


const context = useContext(DashboardContext);



if(!context){

throw new Error(

"useDashboard debe usarse dentro de DashboardProvider"

);

}



return context;


}