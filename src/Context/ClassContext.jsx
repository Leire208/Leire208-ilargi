import { createContext, useContext, useState } from "react";


const ClassContext = createContext(null);




export function ClassProvider({ children }) {



  const [classes, setClasses] = useState(()=>{


    try {


      const saved = localStorage.getItem(

        "ilargi-classes"

      );


      return saved

        ? JSON.parse(saved)

        : [];



    } catch {


      return [];


    }


  });







  function saveClasses(data){



    setClasses(data);



    localStorage.setItem(

      "ilargi-classes",

      JSON.stringify(data)

    );



  }








  function addClass(newClass){



    const updated = [


      ...classes,


      {


        id: Date.now(),


        ...newClass


      }


    ];



    saveClasses(updated);



  }








  function removeClass(id){



    saveClasses(


      classes.filter(

        item => item.id !== id

      )


    );



  }








  function updateClass(id,data){



    saveClasses(


      classes.map(item =>



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



    <ClassContext.Provider


      value={{


        classes,


        addClass,


        removeClass,


        updateClass



      }}



    >



      {children}



    </ClassContext.Provider>



  );



}








export function useClasses(){



  const context = useContext(ClassContext);



  if(!context){


    throw new Error(

      "useClasses debe usarse dentro de ClassProvider"

    );


  }



  return context;



}