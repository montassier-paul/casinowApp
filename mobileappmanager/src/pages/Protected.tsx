import { useContext, useEffect, useState } from "react";
import { Navigate, RouteProps, } from "react-router-dom";
import { UserContext } from "../Context/UserContext";

import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { app } from '../firebase/firebase-config'


interface PrivateRouteProps extends RouteProps {

    outlet: JSX.Element;
    context: string
    path: string
}

const Protected = ({ outlet, context, path }: PrivateRouteProps) => {

    const authentication = getAuth(app);
    const [authenticated, setAuthenticated] = useState(false)

    onAuthStateChanged(authentication, (user) => {
        if (user) {
          setAuthenticated(true)
        } else {
          setAuthenticated(false)
        }
      });


    switch (context) {
        case "Login":
            if (!authenticated) {

                return outlet;

            } else {

                return <Navigate to={{ pathname: path }} />;

            }


        case "Dashboard":
            if (authenticated) {

                return outlet;

            } else {

                return <Navigate to={{ pathname: path }} />;

            }

        default:
            return outlet
    }




};
export default Protected;