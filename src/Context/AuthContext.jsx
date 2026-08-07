import { createContext, useContext, useEffect, useState } from "react";

import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";

import { auth } from "../Firebase/firebase";


const AuthContext = createContext(null);



export function AuthProvider({ children }) {


const [currentUser, setCurrentUser] = useState(null);

const [loading, setLoading] = useState(true);





useEffect(()=>{


const unsubscribe = onAuthStateChanged(

auth,

(user)=>{


setCurrentUser(user);


setLoading(false);


}

);



return unsubscribe;


}, []);








function register(email,password){


return createUserWithEmailAndPassword(

auth,

email,

password

);


}








function login(email,password){


return signInWithEmailAndPassword(

auth,

email,

password

);


}








function loginGoogle(){


const provider = new GoogleAuthProvider();



return signInWithPopup(

auth,

provider

);


}








function logout(){


return signOut(auth);


}








return (


<AuthContext.Provider


value={{


currentUser,

loading,

register,

login,

loginGoogle,

logout


}}



>


{children}


</AuthContext.Provider>


);


}








export function useAuth(){


const context = useContext(AuthContext);



if(!context){


throw new Error(

"useAuth debe usarse dentro de AuthProvider"

);


}



return context;


}