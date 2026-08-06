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

ReactDOM.createRoot(

  document.getElementById("root")

).render(

  <React.StrictMode>

    <BrowserRouter>

      <ThemeProvider>

        <SettingsProvider>

          <LanguageProvider>

            <UserProvider>

              <ClassProvider>

                <TaskProvider>

                  <App />

                </TaskProvider>

              </ClassProvider>

            </UserProvider>

          </LanguageProvider>

        </SettingsProvider>

      </ThemeProvider>

    </BrowserRouter>

  </React.StrictMode>

);