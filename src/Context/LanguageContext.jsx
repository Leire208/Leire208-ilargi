import { createContext, useContext, useState } from "react";

import es from "../Language/es";
import eu from "../Language/eu";
import en from "../Language/en";
import fr from "../Language/fr";
import it from "../Language/it";


const LanguageContext = createContext();



const languages = {

  es,

  eu,

  en,

  fr,

  it

};




export function LanguageProvider({ children }) {



  const [language, setLanguageState] = useState(()=>{


    return (

      localStorage.getItem("ilargi-language")

      ||

      "es"

    );


  });







  function setLanguage(value){



    setLanguageState(value);



    localStorage.setItem(

      "ilargi-language",

      value

    );



  }







  const texts = languages[language] || languages.es;







  return (



    <LanguageContext.Provider


      value={{


        language,


        setLanguage,


        texts


      }}


    >


      {children}


    </LanguageContext.Provider>



  );

}






export function useLanguage(){


  return useContext(LanguageContext);


}