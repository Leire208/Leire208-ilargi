import { Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";
import Calendar from "./Pages/Calendar";
import Schedule from "./Pages/Schedule";
import Tasks from "./Pages/Tasks";
import Subjects from "./Pages/Subjects";
import SubjectDetail from "./Pages/SubjectDetail";
import Profile from "./Pages/Profile";
import EditProfile from "./Pages/EditProfile";

import Login from "./Pages/Login";
import Register from "./Pages/Register";

import BottomNav from "./Components/BottomNav";
import CreateMenu from "./Components/CreateMenu";

import ProtectedRoute from "./Components/ProtectedRoute";

function PrivateLayout({ children }) {
  return (
    <>
      {children}

      <CreateMenu />

      <BottomNav />
    </>
  );
}

function App() {
  return (
    <div className="min-h-screen pb-40">
      <Routes>

        {/* AUTH */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* HOME */}

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <PrivateLayout>
                <Home />
              </PrivateLayout>
            </ProtectedRoute>
          }
        />

        {/* CALENDAR */}

        <Route
          path="/calendar"
          element={
            <ProtectedRoute>
              <PrivateLayout>
                <Calendar />
              </PrivateLayout>
            </ProtectedRoute>
          }
        />

        {/* SCHEDULE
            Se mantiene de momento para no romper nada.
            Más adelante lo eliminaremos cuando
            terminemos la migración. */}

        <Route
          path="/schedule"
          element={
            <ProtectedRoute>
              <PrivateLayout>
                <Schedule />
              </PrivateLayout>
            </ProtectedRoute>
          }
        />

        {/* TASKS */}

        <Route
          path="/tasks"
          element={
            <ProtectedRoute>
              <PrivateLayout>
                <Tasks />
              </PrivateLayout>
            </ProtectedRoute>
          }
        />

        {/* SUBJECTS */}

        <Route
          path="/subjects"
          element={
            <ProtectedRoute>
              <PrivateLayout>
                <Subjects />
              </PrivateLayout>
            </ProtectedRoute>
          }
        />

        {/* SUBJECT DETAIL */}

        <Route
          path="/subjects/:id"
          element={
            <ProtectedRoute>
              <PrivateLayout>
                <SubjectDetail />
              </PrivateLayout>
            </ProtectedRoute>
          }
        />

        {/* PROFILE */}

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <PrivateLayout>
                <Profile />
              </PrivateLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile/edit"
          element={
            <ProtectedRoute>
              <PrivateLayout>
                <EditProfile />
              </PrivateLayout>
            </ProtectedRoute>
          }
        />

      </Routes>
    </div>
  );
}

export default App;