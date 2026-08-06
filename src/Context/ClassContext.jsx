import { createContext, useContext, useState } from "react";


const ClassContext = createContext();



export function ClassProvider({ children }) {



  const [classes, setClassesState] = useState(()=>{


    const saved = localStorage.getItem(
      "ilargi-classes"
    );


    return saved

      ? JSON.parse(saved)

      : [];


  });




  function saveClasses(data){


    setClassesState(data);


    localStorage.setItem(

      "ilargi-classes",

      JSON.stringify(data)

    );


  }





  function addClass(newClass){


    const updated = [

      ...classes,

      newClass

    ];


    saveClasses(updated);


  }





  function removeClass(id){


    const updated = classes.filter(

      item => item.id !== id

    );


    saveClasses(updated);


  }





  function updateClass(id, data){


    const updated = classes.map(item=>{


      if(item.id === id){

        return {

          ...item,

          ...data

        };

      }


      return item;


    });


    saveClasses(updated);


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

  return useContext(ClassContext);

}