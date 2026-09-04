import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";
import "./index.css";

import { AuthProvider } from "./Context/AuthContext.jsx";

import { ThemeProvider } from "./Context/ThemeContext.jsx";
import { SettingsProvider } from "./Context/SettingsContext.jsx";
import { LanguageProvider } from "./Context/LanguageContext.jsx";

import { UserProvider } from "./Context/UserContext.jsx";

import { SubjectProvider } from "./Context/SubjectContext.jsx";
import { TaskProvider } from "./Context/TaskContext.jsx";
import { WorkProvider } from "./Context/WorkContext.jsx";
import { ExamProvider } from "./Context/ExamContext.jsx";
import { EventProvider } from "./Context/EventContext.jsx";

import { NotificationProvider } from "./Context/NotificationContext.jsx";

import { ScheduleProvider } from "./Context/ScheduleContext.jsx";
import { DashboardProvider } from "./Context/DashboardContext.jsx";

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>

        <ThemeProvider>
          <SettingsProvider>
            <LanguageProvider>

              <UserProvider>
                <SubjectProvider>

                  <TaskProvider>
                    <WorkProvider>
                      <ExamProvider>

                        <EventProvider>

                          <NotificationProvider>

                            <ScheduleProvider>
                              <DashboardProvider>

                                <App />

                              </DashboardProvider>
                            </ScheduleProvider>

                          </NotificationProvider>

                        </EventProvider>

                      </ExamProvider>
                    </WorkProvider>
                  </TaskProvider>

                </SubjectProvider>
              </UserProvider>

            </LanguageProvider>
          </SettingsProvider>
        </ThemeProvider>

      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);