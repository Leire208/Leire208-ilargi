import { createContext, useContext } from "react";

import { useEvents } from "./EventContext";
import { useSubjects } from "./SubjectContext";

import {

  getNextEvent,

  getUpcomingEvents

} from "../Utils/eventUtils";

const DashboardContext = createContext();

export function DashboardProvider({ children }) {

  const { events } = useEvents();

  const { subjects } = useSubjects();

  const nextEvent = getNextEvent(events);

  const upcomingEvents = getUpcomingEvents(events);

  const today = new Date();

  const todayEvents = events.filter(event => {

    const date = new Date(event.date);

    return (

      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()

    );

  });

  const value = {

    events,

    subjects,

    nextEvent,

    upcomingEvents,

    todayEvents,

    totalSubjects: subjects.length,

    totalEvents: events.length

  };

  return (

    <DashboardContext.Provider value={value}>

      {children}

    </DashboardContext.Provider>

  );

}

export function useDashboard() {

  return useContext(DashboardContext);

}