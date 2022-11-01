import React, { useState, createContext, Dispatch, SetStateAction} from "react";


export interface propsUserProvider {
  children: React.ReactNode
}

export interface propsUserContext {

    connected : boolean, 
    ConnectionManager:  (input : boolean) => void, 
    mail : string, 
    setMail : Dispatch<SetStateAction<string>>

}

export const initialState = {

    connected : false, 
    ConnectionManager : (input : boolean) => {}, 
    mail : '', 
    setMail : () => {}



}

export const UserContext = createContext<propsUserContext>(initialState);

export const UserProvider = ({ children }: propsUserProvider) => {


  const [connected, setConnected] = useState(false)
  const [mail, setMail] = useState('')

  const ConnectionManager = (input :boolean) => {
    setConnected(input)
  }


  return (
    <UserContext.Provider value={{connected, ConnectionManager, mail, setMail}}>
    {children}
    </UserContext.Provider>
  );
};

