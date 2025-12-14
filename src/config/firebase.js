// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//     apiKey: "AIzaSyA241ZKul3uMBwmfkOc6N1D_vPHARY2Nzk",
//     authDomain: "the-make-connect.firebaseapp.com",
//     projectId: "the-make-connect",
//     storageBucket: "the-make-connect.firebasestorage.app",
//     messagingSenderId: "971935968852",
//     appId: "1:971935968852:web:080bcdd29c3853a70c47c1",
//     measurementId: "G-8H5B90XR5V"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

import { initializeApp } from 'firebase/app';
import {
    initializeAuth,
    getReactNativePersistence,
} from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
    apiKey: "AIzaSyA241ZKul3uMBwmfkOc6N1D_vPHARY2Nzk",
    authDomain: "the-make-connect.firebaseapp.com",
    projectId: "the-make-connect",
    storageBucket: "the-make-connect.firebasestorage.app",
    messagingSenderId: "971935968852",
    appId: "1:971935968852:web:080bcdd29c3853a70c47c1",
    measurementId: "G-8H5B90XR5V"
};

export const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
