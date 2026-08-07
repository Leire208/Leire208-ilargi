importScripts(
  "https://www.gstatic.com/firebasejs/12.17.1/firebase-app-compat.js"
);

importScripts(
  "https://www.gstatic.com/firebasejs/12.17.1/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyCf64ylOzXGAoWqBtLKKlMls5seEd4MJ5Q",
  authDomain: "iargi-1b106.firebaseapp.com",
  projectId: "iargi-1b106",
  storageBucket: "iargi-1b106.firebasestorage.app",
  messagingSenderId: "498541676264",
  appId: "1:498541676264:web:0f1c2f00e9972e630e2b5d",
  measurementId: "G-H1HVRBZY10"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "Notificación recibida en segundo plano:",
    payload
  );

  const title =
    payload.notification?.title || "Ilargi";

  const body =
    payload.notification?.body ||
    "Tienes una nueva notificación.";

  self.registration.showNotification(title, {
    body,
    icon: "/icon-192.png"
  });
});