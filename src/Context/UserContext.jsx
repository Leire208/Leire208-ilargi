import { createContext, useContext, useState } from "react";


const UserContext = createContext();



export function UserProvider({ children }) {


  const [user, setUserState] = useState(()=>{


    const saved = localStorage.getItem(
      "ilargi-user"
    );


    return saved

      ? JSON.parse(saved)

      : {

          name: "Leire",

          career: "Universidad",

          university: "",

          photo: "",

          settings: {

            notifications: true,

            motivation: true,

            reminders: true

          }

        };


  });





  function updateUser(data){


    const updated = {

      ...user,

      ...data

    };


    setUserState(updated);


    localStorage.setItem(

      "ilargi-user",

      JSON.stringify(updated)

    );


  }





  function updateSettings(settings){


    const updated = {


      ...user,


      settings:{


        ...user.settings,


        ...settings


      }


    };


    updateUser(updated);


  }





  return (


    <UserContext.Provider


      value={{


        user,

        updateUser,

        updateSettings


      }}


    >


      {children}


    </UserContext.Provider>


  );


}





export function useUser(){


  return useContext(UserContext);


}