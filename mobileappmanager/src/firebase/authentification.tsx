
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { app } from './firebase-config';


const authentication = getAuth(app);


export const Authentification = async(context: string, email: string, password: string) => {

    switch (context) {
        case "createUser":
            
            await createUserWithEmailAndPassword(authentication, email, password)
                .then((userCredential) => {   
                                    
                })
                .catch((error) => {
                    console.log(error.code)
                })

            break

        case "signIn":

            await signInWithEmailAndPassword(authentication, email, password)
                .then((userCredential) => {                  

                })
                .catch((error) => {
                    console.log(error.code)
                })

            break


        default:
            break
            }
}


export const HandleLogout = async() => {
    
    await signOut(authentication);
    };

    
export const getUserInfo = async () => {
    
    return authentication.currentUser
    
}



