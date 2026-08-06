import { createContext, useContext, useState } from "react";


const SubjectContext = createContext(null);





export function SubjectProvider({ children }) {



  const [subjects, setSubjects] = useState(()=>{


    try {


      const saved = localStorage.getItem(

        "ilargi-subjects"

      );


      return saved

        ? JSON.parse(saved)

        : [];



    } catch {


      return [];


    }


  });










  function saveSubjects(data){



    setSubjects(data);



    localStorage.setItem(

      "ilargi-subjects",

      JSON.stringify(data)

    );



  }










  function addSubject(subject){



    const newSubject = {



      id: Date.now(),



      name: subject.name,



      teacher: subject.teacher || "",



      classroom: subject.classroom || "",



      color: subject.color || "#60a5fa",



      credits: subject.credits || "",



      semester: subject.semester || "1"



    };







    saveSubjects([


      ...subjects,


      newSubject



    ]);



  }









  function removeSubject(id){



    saveSubjects(



      subjects.filter(


        item => item.id !== id


      )


    );



  }









  function updateSubject(id,data){



    saveSubjects(



      subjects.map(item =>



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



    <SubjectContext.Provider



      value={{



        subjects,


        addSubject,


        removeSubject,


        updateSubject



      }}



    >



      {children}



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