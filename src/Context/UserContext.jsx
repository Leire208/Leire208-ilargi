import { createContext, useContext, useEffect, useState } from "react";

import { doc, getDoc, setDoc } from "firebase/firestore";

import { db } from "../Firebase/firebase";

import { useAuth } from "./AuthContext";

const UserContext = createContext(null);

const defaultUser = {
  name: "",
  career: "Universidad",
  university: "",
  photo: "",
  settings: {
    notifications: true,
    motivation: true,
    reminders: true
  }
};

export function UserProvider({ children }) {

  const { currentUser } = useAuth();

  const [user, setUser] = useState(defaultUser);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function loadUser() {

      if (!currentUser) {

        setUser(defaultUser);
        setLoading(false);
        return;

      }

      try {

        const ref = doc(
          db,
          "users",
          currentUser.uid
        );

        const snapshot = await getDoc(ref);

        if (snapshot.exists()) {

          setUser({
            ...defaultUser,
            ...snapshot.data()
          });

        } else {

          const newUser = {
            name:
              currentUser.displayName ||
              currentUser.email?.split("@")[0] ||
              "Usuario",

            career: "Universidad",

            university: "",

            photo: currentUser.photoURL || "",

            settings: {
              notifications: true,
              motivation: true,
              reminders: true
            }
          };

          await setDoc(
            ref,
            newUser
          );

          setUser(newUser);

        }

      } catch (error) {

        console.error(error);

        setUser(defaultUser);

      }

      setLoading(false);

    }

    loadUser();

  }, [currentUser]);



  async function updateUser(data) {

    if (!currentUser) return;

    const updated = {
      ...user,
      ...data
    };

    setUser(updated);

    await setDoc(
      doc(
        db,
        "users",
        currentUser.uid
      ),
      updated,
      {
        merge: true
      }
    );

  }



  async function updateSettings(settings) {

    await updateUser({

      settings: {

        ...user.settings,

        ...settings

      }

    });

  }



  async function updatePhoto(photo) {

    await updateUser({

      photo

    });

  }



  async function removePhoto() {

    await updateUser({

      photo: ""

    });

  }



  return (

    <UserContext.Provider

      value={{

        user,

        loading,

        updateUser,

        updateSettings,

        updatePhoto,

        removePhoto

      }}

    >

      {!loading && children}

    </UserContext.Provider>

  );

}



export function useUser() {

  const context = useContext(UserContext);

  if (!context) {

    throw new Error(
      "useUser debe usarse dentro de UserProvider"
    );

  }

  return context;

}