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


const ScheduleContext = createContext(null);



export function ScheduleProvider({ children }) {


const { currentUser } = useAuth();


const [classes, setClasses] = useState([]);

const [loading, setLoading] = useState(true);





useEffect(() => {


async function loadSchedule() {


if (!currentUser) {

setClasses([]);

setLoading(false);

return;

}



const ref = collection(

db,

"users",

currentUser.uid,

"schedule"

);



const snapshot = await getDocs(ref);



const data = snapshot.docs.map(item => ({

id: item.id,

...item.data()

}));



setClasses(data);

setLoading(false);


}



loadSchedule();


}, [currentUser]);









async function addClass(item) {


if (!currentUser) return;



const ref = collection(

db,

"users",

currentUser.uid,

"schedule"

);



const newClass = {

day: item.day,

start: item.start,

subjectId: item.subjectId,

subjectName: item.subjectName,

color: item.color || "#60a5fa",

room: item.room || ""

};



const result = await addDoc(

ref,

newClass

);



setClasses(prev => [

...prev,

{

id: result.id,

...newClass

}

]);


}









async function removeClass(id) {


if (!currentUser) return;



await deleteDoc(

doc(

db,

"users",

currentUser.uid,

"schedule",

id

)

);



setClasses(prev =>

prev.filter(

item => item.id !== id

)

);


}









async function updateClass(id, data) {


if (!currentUser) return;



await updateDoc(

doc(

db,

"users",

currentUser.uid,

"schedule",

id

),

data

);



setClasses(prev =>

prev.map(item =>


item.id === id

?

{

...item,

...data

}

:

item


)

);


}









return (

<ScheduleContext.Provider

value={{

classes,

loading,

addClass,

removeClass,

updateClass

}}

>


{!loading && children}


</ScheduleContext.Provider>


);


}







export function useSchedule() {


const context = useContext(ScheduleContext);



if (!context) {

throw new Error(

"useSchedule debe usarse dentro de ScheduleProvider"

);

}



return context;


}