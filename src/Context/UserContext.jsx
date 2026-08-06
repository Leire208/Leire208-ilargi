import { createContext, useContext, useState } from "react";


const UserContext = createContext();



export function UserProvider({ children }) {


  const [user, setUser] = useState(()=>{

    const saved = localStorage.getItem("ilargi-user");


    return saved

      ? JSON.parse(saved)

      : {

          name: "Leire",

          career: "Universidad"

        };


  });



  function updateUser(data){


    setUser(data);


    localStorage.setItem(
      "ilargi-user",
      JSON.stringify(data)
    );


  }



  return (

    <UserContext.Provider

      value={{

        user,

        setUser:updateUser

      }}

    >

      {children}

    </UserContext.Provider>

  );

}



export function useUser(){

  return useContext(UserContext);

}