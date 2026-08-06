import { Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";
import Calendar from "./Pages/Calendar";
import Schedule from "./Pages/Schedule";
import Tasks from "./Pages/Tasks";
import Profile from "./Pages/Profile";
import EditProfile from "./Pages/EditProfile";
import Subjects from "./Pages/Subjects";

import BottomNav from "./Components/BottomNav";
import CreateMenu from "./Components/CreateMenu";



function App(){



  return (



    <>



      <Routes>


        <Route

          path="/"

          element={<Home />}

        />


        <Route

          path="/calendar"

          element={<Calendar />}

        />


        <Route

          path="/schedule"

          element={<Schedule />}

        />


        <Route

          path="/tasks"

          element={<Tasks />}

        />


        <Route

          path="/subjects"

          element={<Subjects />}

        />


        <Route

          path="/profile"

          element={<Profile />}

        />


        <Route

          path="/profile/edit"

          element={<EditProfile />}

        />


      </Routes>







      <CreateMenu />

      <BottomNav />





    </>


  );


}



export default App;