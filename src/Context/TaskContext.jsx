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


const TaskContext = createContext(null);



export function TaskProvider({ children }) {


const { currentUser } = useAuth();


const [tasks, setTasks] = useState([]);

const [loading, setLoading] = useState(true);





useEffect(()=>{


async function loadTasks(){


if(!currentUser){

setTasks([]);

setLoading(false);

return;

}



const ref = collection(
  db,
  "users",
  currentUser.uid,
  "tasks"
);



const snapshot = await getDocs(ref);



const data = snapshot.docs.map(item => ({

id:item.id,

...item.data()

}));



setTasks(data);


setLoading(false);


}



loadTasks();


},[currentUser]);









async function addTask(task){


if(!currentUser) return;



const ref = collection(

db,

"users",

currentUser.uid,

"tasks"

);



const newTask = {


completed:false,

...task


};



const result = await addDoc(

ref,

newTask

);



setTasks(prev => [

...prev,

{

id:result.id,

...newTask

}

]);


}









async function removeTask(id){


if(!currentUser) return;



await deleteDoc(

doc(

db,

"users",

currentUser.uid,

"tasks",

id

)

);



setTasks(prev =>

prev.filter(

task => task.id !== id

)

);


}









async function updateTask(id,data){


if(!currentUser) return;



await updateDoc(

doc(

db,

"users",

currentUser.uid,

"tasks",

id

),

data

);



setTasks(prev =>


prev.map(task =>


task.id === id

?

{

...task,

...data

}

:

task


)


);


}







return (

<TaskContext.Provider

value={{

tasks,

loading,

addTask,

removeTask,

updateTask

}}

>


{!loading && children}


</TaskContext.Provider>


);


}





export function useTasks(){


const context = useContext(TaskContext);



if(!context){

throw new Error(
"useTasks debe usarse dentro de TaskProvider"
);

}



return context;


}