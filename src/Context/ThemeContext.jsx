import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {

  const getTheme = () => {

    const hour = new Date().getHours();

    if (hour >= 7 && hour < 17) return "day";

    if (hour >= 17 && hour < 21) return "sunset";

    return "night";

  };

  const [theme, setTheme] = useState(getTheme());

  useEffect(() => {

    const updateTheme = () => {

      setTheme(getTheme());

    };

    updateTheme();

    const interval = setInterval(updateTheme, 60000);

    return () => clearInterval(interval);

  }, []);

  const styles = {

    day: {

      background: "from-sky-500 via-sky-400 to-sky-600",

      overlay: "bg-slate-900/20",

      card: "bg-white/30 border border-white/40 backdrop-blur-2xl",

      nav: "bg-slate-900/30 border border-white/20 backdrop-blur-2xl",

      text: "text-white",

      secondary: "text-white/85"

    },

    sunset: {

      background: "from-orange-400 via-purple-500 to-indigo-900",

      overlay: "bg-slate-900/15",

      card: "bg-white/20 border border-white/30 backdrop-blur-2xl",

      nav: "bg-black/30 border border-white/20 backdrop-blur-2xl",

      text: "text-white",

      secondary: "text-white/80"

    },

    night: {

      background: "from-indigo-950 via-purple-950 to-black",

      overlay: "bg-black/10",

      card: "bg-white/10 border border-white/20 backdrop-blur-2xl",

      nav: "bg-black/40 border border-white/20 backdrop-blur-2xl",

      text: "text-white",

      secondary: "text-white/70"

    }

  };

  return (

    <ThemeContext.Provider
      value={{
        theme,
        styles: styles[theme]
      }}
    >

      {children}

    </ThemeContext.Provider>

  );

}

export function useTheme() {

  return useContext(ThemeContext);

}