import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";

import "./index.css";

import { ThemeProvider } from "./Context/ThemeContext.jsx";
import { SettingsProvider } from "./Context/SettingsContext.jsx";
import { UserProvider } from "./Context/UserContext.jsx";
import { LanguageProvider } from "./Context/LanguageContext.jsx";
import { ClassProvider } from "./Context/ClassContext.jsx";
import { TaskProvider } from "./Context/TaskContext.jsx";
import { EventProvider } from "./Context/EventContext.jsx";
import { SubjectProvider } from "./Context/SubjectContext.jsx";
import { DashboardProvider } from "./Context/DashboardContext.jsx";
import { ScheduleProvider } from "./Context/ScheduleContext.jsx";


ReactDOM.createRoot(

  document.getElementById("root")

).render(


  <React.StrictMode>


    <BrowserRouter>


      <ThemeProvider>


        <SettingsProvider>


          <LanguageProvider>


            <UserProvider>


              <SubjectProvider>


                <ClassProvider>


                  <TaskProvider>


                    <EventProvider>


                      <ScheduleProvider>


                        <DashboardProvider>


                          <App />


                        </DashboardProvider>


                      </ScheduleProvider>


                    </EventProvider>


                  </TaskProvider>


                </ClassProvider>


              </SubjectProvider>


            </UserProvider>


          </LanguageProvider>


        </SettingsProvider>


      </ThemeProvider>


    </BrowserRouter>


  </React.StrictMode>


);