import { Routes, Route } from "react-router-dom";

import Home from "./Pages/Home";
import Calendar from "./Pages/Calendar";
import Schedule from "./Pages/Schedule";
import Tasks from "./Pages/Tasks";
import Profile from "./Pages/Profile";

import BottomNav from "./Components/BottomNav";


function App(){


  return (

    <>

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/calendar" element={<Calendar />} />

        <Route path="/schedule" element={<Schedule />} />

        <Route path="/tasks" element={<Tasks />} />

        <Route path="/profile" element={<Profile />} />

      </Routes>


      <BottomNav />


    </>

  );

}


export default App;