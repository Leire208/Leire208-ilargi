import { Routes, Route } from "react-router-dom";


import Home from "./Pages/Home";
import Calendar from "./Pages/Calendar";
import Schedule from "./Pages/Schedule";
import Tasks from "./Pages/Tasks";
import Profile from "./Pages/Profile";
import EditProfile from "./Pages/EditProfile";
import Subjects from "./Pages/Subjects";


import Login from "./Pages/Login";
import Register from "./Pages/Register";


import BottomNav from "./Components/BottomNav";
import CreateMenu from "./Components/CreateMenu";


import ProtectedRoute from "./Components/ProtectedRoute";



function PrivateLayout({ children }){


return (

<>

{children}


<CreateMenu />


<BottomNav />


</>

);


}




function App(){


return (


<div className="min-h-screen pb-40">


<Routes>





<Route

path="/login"

element={<Login />}

/>




<Route

path="/register"

element={<Register />}

/>







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