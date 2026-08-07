import { createContext, useContext, useState } from "react";

const ScheduleContext = createContext(null);

export function ScheduleProvider({ children }) {

  const [classes, setClasses] = useState(() => {

    const saved = localStorage.getItem("ilargi-schedule");

    return saved ? JSON.parse(saved) : [];

  });

  function save(data) {

    setClasses(data);

    localStorage.setItem(

      "ilargi-schedule",

      JSON.stringify(data)

    );

  }

  function addClass(item) {

    save([

      ...classes,

      {

        id: crypto.randomUUID(),

        ...item

      }

    ]);

  }

  function removeClass(id) {

    save(

      classes.filter(

        item => item.id !== id

      )

    );

  }

  function updateClass(id, data) {

    save(

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

    <ScheduleContext.Provider

      value={{

        classes,

        addClass,

        removeClass,

        updateClass

      }}

    >

      {children}

    </ScheduleContext.Provider>

  );

}

export function useSchedule() {

  const context = useContext(ScheduleContext);

  if (!context) {

    throw new Error(

      "useSchedule debe usarse dentro de ScheduleProvider"

    );

  }

  return context;

}