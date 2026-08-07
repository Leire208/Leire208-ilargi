import { createContext, useContext, useEffect } from "react";

import { getToken, onMessage } from "firebase/messaging";
import {
  doc,
  setDoc,
  serverTimestamp
} from "firebase/firestore";

import { messaging, db } from "../Firebase/firebase";

import { useUser } from "./UserContext";
import { useTasks } from "./TaskContext";
import { useEvents } from "./EventContext";
import { useAuth } from "./AuthContext";

const NotificationContext = createContext(null);

const VAPID_KEY =
  "BDG5XQ9Qxi6SbhZCCSze91aCQxgRa6o9OfiSTvYKB_k_ZcVRZ-32nHyU5Alk2mVoIQCssiZQiK_dIRQ1qdTYWYs";

export function NotificationProvider({ children }) {
  const { user } = useUser();
  const { currentUser } = useAuth();

  const { tasks } = useTasks();
  const { events } = useEvents();

  useEffect(() => {
    if (!currentUser) {
      return;
    }

    if (!user?.settings?.notifications) {
      return;
    }

    setupFirebaseMessaging();
  }, [
    currentUser,
    user?.settings?.notifications
  ]);

  async function setupFirebaseMessaging() {
    try {
      if (!("Notification" in window)) {
        console.log(
          "Este navegador no soporta notificaciones."
        );
        return;
      }

      let permission = Notification.permission;

      if (permission === "default") {
        permission =
          await Notification.requestPermission();
      }

      if (permission !== "granted") {
        console.log(
          "El usuario no ha permitido las notificaciones."
        );
        return;
      }

      const registration =
        await navigator.serviceWorker.register(
          "/firebase-messaging-sw.js"
        );

      const token = await getToken(
        messaging,
        {
          vapidKey: VAPID_KEY,
          serviceWorkerRegistration: registration
        }
      );

      if (!token) {
        console.log(
          "No se pudo obtener el token FCM."
        );
        return;
      }

      console.log(
        "Token FCM obtenido:",
        token
      );

      await setDoc(
        doc(
          db,
          "users",
          currentUser.uid,
          "fcmTokens",
          token
        ),
        {
          token,
          createdAt: serverTimestamp(),
          platform: "web"
        },
        {
          merge: true
        }
      );

      console.log(
        "Token FCM guardado en Firestore."
      );

    } catch (error) {
      console.error(
        "Error configurando Firebase Messaging:",
        error
      );
    }
  }

  useEffect(() => {
    if (!currentUser) {
      return;
    }

    if (!user?.settings?.notifications) {
      return;
    }

    const unsubscribe = onMessage(
      messaging,
      (payload) => {
        console.log(
          "Notificación FCM recibida:",
          payload
        );

        const title =
          payload.notification?.title ||
          "Ilargi";

        const body =
          payload.notification?.body ||
          "Tienes una nueva notificación.";

        sendNotification(title, body);
      }
    );

    return () => unsubscribe();
  }, [
    currentUser,
    user?.settings?.notifications
  ]);

  useEffect(() => {
    if (!user?.settings?.notifications) {
      return;
    }

    requestPermission();
  }, [
    user?.settings?.notifications
  ]);

  useEffect(() => {
    if (!user?.settings?.notifications) {
      return;
    }

    checkNotifications();

    const interval = setInterval(
      checkNotifications,
      60000
    );

    return () => clearInterval(interval);
  }, [
    tasks,
    events,
    user?.settings?.notifications
  ]);

  async function requestPermission() {
    if (!("Notification" in window)) {
      return;
    }

    if (Notification.permission === "default") {
      await Notification.requestPermission();
    }
  }

  function sendNotification(title, body) {
    if (
      Notification.permission !== "granted"
    ) {
      return;
    }

    new Notification(title, {
      body
    });
  }

  function checkNotifications() {
    const today = new Date();

    tasks.forEach((task) => {
      if (!task.date) {
        return;
      }

      const taskDate = new Date(task.date);

      const diff = Math.ceil(
        (taskDate - today) /
        (1000 * 60 * 60 * 24)
      );

      if (
        diff === 1 &&
        !task.completed
      ) {
        sendNotification(
          "Tarea pendiente",
          `${task.title} es para mañana`
        );
      }
    });

    events.forEach((event) => {
      if (!event.date) {
        return;
      }

      const eventDate = new Date(event.date);

      const diff = Math.ceil(
        (eventDate - today) /
        (1000 * 60 * 60 * 24)
      );

      if (diff === 1) {
        sendNotification(
          "Próximo evento",
          `${event.title} es mañana`
        );
      }
    });
  }

  return (
    <NotificationContext.Provider
      value={{
        requestPermission
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context =
    useContext(NotificationContext);

  if (!context) {
    throw new Error(
      "useNotifications debe usarse dentro de NotificationProvider"
    );
  }

  return context;
}