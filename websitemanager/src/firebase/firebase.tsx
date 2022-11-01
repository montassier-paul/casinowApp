// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { toast } from 'react-toastify';
import { getStorage } from "firebase/storage"


// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional


const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
};



// // Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app)


const UserSignIn = async(email: string, password: string) => {



    const res = await signInWithEmailAndPassword(auth, email, password)
        .then(async(userCredential) => {

        })
        .catch((error) => {
            if(error.code){
                toast(error.code)
            }
            else{
                toast("Error during connection. Check your email and password")
            }
        });


}


const UserSignOut = async () => {

    await signOut(auth).then(() => {
        // toast("Success")

    }).catch((error) => {
        // toast("fail")
    });
}


export {UserSignIn, UserSignOut, storage, auth}