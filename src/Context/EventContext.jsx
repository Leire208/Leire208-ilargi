import { createContext, useContext, useEffect, useState } from "react";

import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  getDocs,
  updateDoc
} from "firebase/firestore";

import { db } from "../Firebase/firebase";

import { useAuth } from "./AuthContext";


const EventContext = createContext(null);



export function EventProvider({ children }) {


const { currentUser } = useAuth();


const [events, setEvents] = useState([]);

const [loading, setLoading] = useState(true);





useEffect(()=>{


async function loadEvents(){


if(!currentUser){

setEvents([]);

setLoading(false);

return;

}



const ref = collection(

db,

"users",

currentUser.uid,

"events"

);



const snapshot = await getDocs(ref);



const data = snapshot.docs.map(item => ({


id:item.id,


...item.data()


}));



setEvents(data);


setLoading(false);


}



loadEvents();


},[currentUser]);









async function addEvent(event){


if(!currentUser) return;



const ref = collection(

db,

"users",

currentUser.uid,

"events"

);



const newEvent = {


color: event.color || "#ffffff",


...event


};



const result = await addDoc(

ref,

newEvent

);



setEvents(prev => [


...prev,


{

id:result.id,

...newEvent

}


]);


}









async function removeEvent(id){


if(!currentUser) return;



await deleteDoc(

doc(

db,

"users",

currentUser.uid,

"events",

id

)

);



setEvents(prev =>


prev.filter(

event => event.id !== id

)

);


}









async function updateEvent(id,data){


if(!currentUser) return;



await updateDoc(

doc(

db,

"users",

currentUser.uid,

"events",

id

),

data

);



setEvents(prev =>


prev.map(event =>


event.id === id

?

{

...event,

...data

}

:

event


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

loading,

addEvent,

removeEvent,

updateEvent,

getEventsByDate

}}

>


{!loading && children}


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