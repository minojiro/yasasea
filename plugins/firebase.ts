import { initializeApp, FirebaseApp } from "firebase/app";

export let firebaseApp: FirebaseApp;
export default defineNuxtPlugin(() => {
  // Import the functions you need from the SDKs you need

  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const runtimeConfig = useRuntimeConfig();

  // Initialize Firebase
  firebaseApp = initializeApp(runtimeConfig.public.firebaseConfig);
  return {};
});
