import React, { createContext, useState } from "react";
import axios from "axios"
import { propsCasino, propsMessage, propsWebsiteData } from "../interfaces";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { storage } from '../firebase/firebase'
import { ref, getDownloadURL, uploadBytes } from "firebase/storage"
import uuid from 'react-uuid';
import { auth } from "../firebase/firebase"

const URL = process.env.REACT_APP_URL

interface propsApiContext {

  casinos: propsCasino[];

  messages: propsMessage[];

  websiteData : propsWebsiteData | undefined; 

  getCasinos: () => void;

  getWebsiteData : () => void; 

  createCasino: (casino: propsCasino, newImages: File[], setNewImages: ([]) => void) => void;

  updateCasino: (casinoId: string, casino: propsCasino, newImages: File[], setNewImages: ([]) => void) => void;

  deleteCasino: (casinoId: string) => void;

  getMessages: (casinoId: string) => void;

  deleteMessages: (messagesId: string[], setDeletedMessages: ([]) => void) => void;
  
  loadImage: (file : File) => Promise<string>; 

  updateWebSiteData: (websiteData : propsWebsiteData) => void; 



}

const initContext: propsApiContext = {

  casinos: [],
  messages: [],
  websiteData : {},
  getCasinos: () => { },
  getWebsiteData: () => {},
  updateWebSiteData: (websiteData : propsWebsiteData) => {},
  createCasino: (casino: propsCasino, newImages: File[], setNewImages: ([]) => void) => { },
  updateCasino: (casinoId: string, casino: propsCasino, newImages: File[], setNewImages: ([]) => void) => { },
  deleteCasino: (casinoId: string) => { },
  getMessages: (casinoId: string) => { },
  deleteMessages: (messagesId: string[], setDeletedMessages: ([]) => void) => { },
  loadImage: async(file : File) => {return ''}


}

export const ApiContext = createContext(initContext);


type propsApiContextProvider = {
  children: React.ReactNode
};


export const ApiContextProvider = ({ children }: propsApiContextProvider) => {

  let navigate = useNavigate()

  const [casinos, setCasinos] = useState<propsCasino[]>([])
  const [messages, setMessages] = useState<propsMessage[]>([])
  const [websiteData, setWebsiteData] = useState<propsWebsiteData>()


  const getWebsiteData = async( ) => {

    if(!websiteData){

      await axios.get(URL + '/websiteData/')
      .then(res => {
        setWebsiteData(res.data.data)
      })
      .catch(err => {
        console.log(err)
        if (err.response.data.msg) {
          toast(err.response.data.msg)
        }
        else {
          toast("Something goes wrong " + err)
        }
      })

    }

  }

  const getMessages = async (casinoId: string) => {

    await axios.get(URL + '/messages/full/', { params: { q_casinoId: casinoId } })
      .then(res => {
        setMessages(res.data.data)
      })
      .catch(err => {
        console.log(err)
        if (err.response.data.msg) {
          toast(err.response.data.msg)
        }
        else {
          toast("Something goes wrong " + err)
        }
      })

  }

  const getCasinos = async () => {

    if (casinos.length === 0) {


      await axios.get(URL + "/casinos/full")
        .then(res => {
          setCasinos(res.data.data)
        })
        .catch(err => {
          console.log(err)
          if (err.response.data.msg) {
            toast(err.response.data.msg)
          }
          else {
            toast("Something goes wrong " + err)
          }


        })

    }


  }

  const deleteMessages = async (messagesId: string[], setDeletedMessages: ([]) => void) => {


    if (auth.currentUser) {
      await auth.currentUser.getIdToken()
        .then(async (idToken) => {


          await Promise.all(messagesId.map(async (messageId, key) => {

            await axios.delete(URL + '/messages/message/' + messageId, { headers: { authtoken: idToken } })
              .then(res => {
                setMessages(prev => prev.filter((message) => { return message._id !== messageId }))
              })
              .catch(err => null)
          })
          )
            .then(async (res) => {

              setDeletedMessages([])

            })
            .catch((err) => {

              toast("Something goes wrong : Messages haven't been deleted")

            })
        }).catch((err) => {
          toast("Something goes wrong " + err)
        })

    }

    else {

      toast("Something goes wrong : cannot identify user")

    }
  }
  
  const loadImage = async(image : File) => {

    let url = ""

      const storageRef = ref(storage, `files/${image.name + '.' + uuid()}`)
      await uploadBytes(storageRef, image)
        .then(async (snapshot) => {
          await getDownloadURL(snapshot.ref)
            .then((downloadURL) => {
              url = downloadURL
            })
        })    
      
      return url
      }
  
  const updateCasino = async (casinoId: string, casino: propsCasino, newImages: File[], setNewImages: ([]) => void) => {

    if (auth.currentUser) {
      await auth.currentUser.getIdToken()
        .then(async (idToken) => {

          await Promise.all(newImages.map(async (image, key) => {

            const storageRef = ref(storage, `files/${image.name + '.' + uuid()}`)
            await uploadBytes(storageRef, image)
              .then(async (snapshot) => {
                await getDownloadURL(snapshot.ref)
                  .then((downloadURL) => {
                    // console.log(downloadURL)
                    casino.images = [...casino.images ? casino.images : [], downloadURL]
                  })
                  .catch(err => null)
              })
              .catch(err => null)
          })
          )
            .then(async (res) =>
              await axios.put(URL + "/casinos/casino/" + casinoId, casino, { headers: { authtoken: idToken } })
                .then(res => {
                  setCasinos(prev => prev.map(prevCasino => {
                    if (prevCasino._id === casinoId) {
                      return casino
                    }
                    return prevCasino
                  }))
                  toast("the casino has been updated")
                  setNewImages([])
                })
                .catch(err => {
                  console.log(err)
                  if (err.response.data.msg) {
                    toast(err.response.data.msg)
                  }
                  else {
                    toast("Something goes wrong " + err)
                  }


                })
            )
            .catch(err => null)
        }).catch((err) => {
          toast("Something goes wrong " + err)
        })

    }

    else {

      toast("Something goes wrong : cannot identify user")

    }

  }

  const deleteCasino = async (casinoId: string) => {

    if (auth.currentUser) {
      await auth.currentUser.getIdToken()
        .then(async (idToken) => {

          await axios.delete(URL + '/casinos/casino/' + casinoId, { headers: { authtoken: idToken } }).then(res => {
            setCasinos(prev => prev.filter(casino => casino._id !== casinoId))
            navigate("/Home")
          })
            .catch(err => {
              // console.log(err)
              if (err.response.data.msg) {
                toast(err.response.data.msg)
              }
              else {
                toast("Something goes wrong " + err)
              }
            })
        }).catch((err) => {
          toast("Something goes wrong " + err)
        })

    }

    else {

      toast("Something goes wrong : cannot identify user")

    }





  }

  const createCasino = async (casino: propsCasino, newImages: File[], setNewImages: ([]) => void) => {

    if (auth.currentUser) {
      await auth.currentUser.getIdToken()
        .then(async (idToken) => {


          await Promise.all(newImages.map(async (image, key) => {

            const storageRef = ref(storage, `files/${image.name + '.' + uuid()}`)
            await uploadBytes(storageRef, image)
              .then(async (snapshot) => {
                await getDownloadURL(snapshot.ref).then((downloadURL) => {
                  // console.log(downloadURL)
                  casino.images = [...casino.images ? casino.images : [], downloadURL]
                })

              })
          })
          ).then(

            async (res) => (

              await axios.post(URL + "/casinos/casino", casino, { headers: { authtoken: idToken } })
                .then(res => {
                  setCasinos(prev => [...prev, res.data.data])
                  toast("the casino has been created")
                  setNewImages([])
                  navigate("/Home")
                })
                .catch(err => {
                  console.log(err)
                  if (err.response.data.msg) {
                    toast(err.response.data.msg)
                  }
                  else {
                    toast("Something goes wrong " + err)
                  }


                })
            )

          )

        }).catch((err) => {
          toast("Something goes wrong " + err)
        })

    }

    else {

      toast("Something goes wrong : cannot identify user")

    }

  }

  const updateWebSiteData = async(newWebsiteData : propsWebsiteData) => {

    if (auth.currentUser) {
      await auth.currentUser.getIdToken()
        .then(async (idToken) => {

              await axios.put(URL + '/websiteData/' , newWebsiteData, { headers: { authtoken: idToken } })
                .then(res => {
                  toast("Data have been updated")
                  setWebsiteData(newWebsiteData)
                })
                .catch(err => {
                  console.log(err)
                  if (err.response.data.msg) {
                    toast(err.response.data.msg)
                  }
                  else {
                    toast("Something goes wrong " + err)
                  }

                })
        })
        .catch((err) => {
          toast("Something goes wrong " + err)
        })
    }
    else {

      toast("Something goes wrong : cannot identify user")

    }

  }

  const value = {
    casinos,
    websiteData,
    getCasinos,
    createCasino,
    getMessages,
    deleteMessages,
    updateCasino,
    deleteCasino,
    messages, 
    loadImage, 
    getWebsiteData, 
    updateWebSiteData,
  };

  return (
    <ApiContext.Provider value={value}> {children} </ApiContext.Provider>
  );
};

export default ApiContext;