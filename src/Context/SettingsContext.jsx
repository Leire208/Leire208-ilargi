import { createContext, useContext, useState } from "react";


const SettingsContext = createContext();



export function SettingsProvider({ children }) {


  const [settings, setSettings] = useState(()=>{


    const saved = localStorage.getItem(
      "ilargi-settings"
    );


    return saved

      ? JSON.parse(saved)

      : {

          language:"es",

          showMessages:true,

          skyMode:"auto"

        };


  });




  function updateSettings(data){


    const updated = {

      ...settings,

      ...data

    };


    setSettings(updated);


    localStorage.setItem(

      "ilargi-settings",

      JSON.stringify(updated)

    );


  }





  return (

    <SettingsContext.Provider

      value={{

        settings,

        updateSettings

      }}

    >

      {children}

    </SettingsContext.Provider>

  );


}





export function useSettings(){

  return useContext(SettingsContext);

}