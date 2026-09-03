import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  function getAutoTheme() {
    const hour = new Date().getHours();

    if (hour >= 7 && hour < 17) return "day";
    if (hour >= 17 && hour < 21) return "sunset";
    return "night";
  }

  const [mode, setMode] = useState(() => {
    return localStorage.getItem("ilargi-theme-mode") || "auto";
  });

  const [theme, setThemeState] = useState(() => {
    const savedTheme = localStorage.getItem("ilargi-theme");

    if (savedTheme) {
      return savedTheme;
    }

    return getAutoTheme();
  });

  function setTheme(value) {
    setMode(value);
    localStorage.setItem("ilargi-theme-mode", value);

    if (value === "auto") {
      const automaticTheme = getAutoTheme();

      setThemeState(automaticTheme);
      localStorage.setItem("ilargi-theme", automaticTheme);

      return;
    }

    setThemeState(value);
    localStorage.setItem("ilargi-theme", value);
  }

  useEffect(() => {
    if (mode !== "auto") return;

    function updateAutomaticTheme() {
      const automaticTheme = getAutoTheme();

      setThemeState(automaticTheme);
      localStorage.setItem("ilargi-theme", automaticTheme);
    }

    updateAutomaticTheme();

    const interval = setInterval(
      updateAutomaticTheme,
      60 * 1000
    );

    return () => clearInterval(interval);
  }, [mode]);

  const styles = {
    day: {
      background:
        "bg-[#79b9d8]",
      card:
        "bg-white/[0.13] border border-white/[0.22] backdrop-blur-2xl",
      nav:
        "bg-white/[0.12] border border-white/[0.18] backdrop-blur-2xl",
      text:
        "text-white",
      secondary:
        "text-white/70",
    },

    sunset: {
      background:
        "bg-[#28345b]",
      card:
        "bg-white/[0.09] border border-white/[0.16] backdrop-blur-2xl",
      nav:
        "bg-black/[0.22] border border-white/[0.14] backdrop-blur-2xl",
      text:
        "text-white",
      secondary:
        "text-white/65",
    },

    night: {
      background:
        "bg-[#070d18]",
      card:
        "bg-white/[0.065] border border-white/[0.12] backdrop-blur-2xl",
      nav:
        "bg-black/[0.32] border border-white/[0.11] backdrop-blur-2xl",
      text:
        "text-white",
      secondary:
        "text-white/60",
    },
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        mode,
        setTheme,
        styles: styles[theme],
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(
      "useTheme debe usarse dentro de ThemeProvider"
    );
  }

  return context;
}