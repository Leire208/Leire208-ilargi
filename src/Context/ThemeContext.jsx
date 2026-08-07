import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext(null);


export function ThemeProvider({ children }) {


  function getAutoTheme() {

    const hour = new Date().getHours();


    if (hour >= 7 && hour < 17)

      return "day";


    if (hour >= 17 && hour < 21)

      return "sunset";


    return "night";

  }





  const [mode,setMode] = useState(()=>{


    const saved = localStorage.getItem(
      "ilargi-theme-mode"
    );


    return saved || "auto";


  });





  const [theme,setThemeState] = useState(()=>{


    const saved = localStorage.getItem(
      "ilargi-theme"
    );


    return saved || getAutoTheme();


  });









  function setTheme(value){


    setMode(value);


    localStorage.setItem(

      "ilargi-theme-mode",

      value

    );



    if(value === "auto"){


      const auto = getAutoTheme();


      setThemeState(auto);


      localStorage.setItem(

        "ilargi-theme",

        auto

      );


      return;


    }




    setThemeState(value);


    localStorage.setItem(

      "ilargi-theme",

      value

    );


  }









  useEffect(()=>{


    if(mode !== "auto") return;



    function update(){


      const auto = getAutoTheme();


      setThemeState(auto);


      localStorage.setItem(

        "ilargi-theme",

        auto

      );


    }




    update();



    const interval = setInterval(

      update,

      60000

    );



    return ()=>clearInterval(interval);



  },[mode]);









  const styles = {


    day: {

      background:
        "from-sky-500 via-sky-400 to-sky-600",

      overlay:
        "bg-slate-900/20",

      card:
        "bg-white/30 border border-white/40 backdrop-blur-2xl",

      nav:
        "bg-slate-900/30 border border-white/20 backdrop-blur-2xl",

      text:
        "text-white",

      secondary:
        "text-white/85"

    },





    sunset: {

      background:
        "from-orange-400 via-purple-500 to-indigo-900",

      overlay:
        "bg-slate-900/15",

      card:
        "bg-white/20 border border-white/30 backdrop-blur-2xl",

      nav:
        "bg-black/30 border border-white/20 backdrop-blur-2xl",

      text:
        "text-white",

      secondary:
        "text-white/80"

    },





    night: {

      background:
        "from-indigo-950 via-purple-950 to-black",

      overlay:
        "bg-black/10",

      card:
        "bg-white/10 border border-white/20 backdrop-blur-2xl",

      nav:
        "bg-black/40 border border-white/20 backdrop-blur-2xl",

      text:
        "text-white",

      secondary:
        "text-white/70"

    }


  };







  return (


    <ThemeContext.Provider


      value={{

        theme,

        mode,

        setTheme,

        styles: styles[theme]

      }}


    >


      {children}


    </ThemeContext.Provider>


  );


}




export function useTheme(){


  const context = useContext(ThemeContext);


  if(!context){


    throw new Error(
      "useTheme debe usarse dentro de ThemeProvider"
    );


  }


  return context;


}