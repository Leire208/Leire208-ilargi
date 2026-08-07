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


const SubjectContext = createContext(null);



export function SubjectProvider({ children }) {



const { currentUser } = useAuth();


const [subjects, setSubjects] = useState([]);

const [loading, setLoading] = useState(true);





useEffect(()=>{


async function loadSubjects(){


if(!currentUser){

setSubjects([]);

setLoading(false);

return;

}



const ref = collection(

db,

"users",

currentUser.uid,

"subjects"

);



const snapshot = await getDocs(ref);



const data = snapshot.docs.map(item => ({


id:item.id,


...item.data()


}));



setSubjects(data);


setLoading(false);


}



loadSubjects();


},[currentUser]);









async function addSubject(subject){


if(!currentUser) return;



const ref = collection(

db,

"users",

currentUser.uid,

"subjects"

);



const newSubject = {


name: subject.name,


teacher: subject.teacher || "",


classroom: subject.classroom || "",


color: subject.color || "#60a5fa",


credits: subject.credits || "",


semester: subject.semester || "1"


};



const result = await addDoc(

ref,

newSubject

);



setSubjects(prev => [


...prev,


{

id:result.id,

...newSubject

}


]);


}









async function removeSubject(id){


if(!currentUser) return;



await deleteDoc(

doc(

db,

"users",

currentUser.uid,

"subjects",

id

)

);



setSubjects(prev =>


prev.filter(

item => item.id !== id

)

);


}









async function updateSubject(id,data){


if(!currentUser) return;



await updateDoc(

doc(

db,

"users",

currentUser.uid,

"subjects",

id

),

data

);



setSubjects(prev =>


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

<SubjectContext.Provider

value={{

subjects,

loading,

addSubject,

removeSubject,

updateSubject

}}

>


{!loading && children}


</SubjectContext.Provider>


);


}





export function useSubjects(){


const context = useContext(SubjectContext);



if(!context){

throw new Error(

"useSubjects debe usarse dentro de SubjectProvider"

);

}



return context;


}