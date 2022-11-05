import React, { useState, useEffect, useContext } from 'react'
import CasinoImagesComponent from '../components/CasinoImagesComponent'
import CasinoInfoComponent from '../components/CasinoInfoComponent'
import './CasinoPage.css'
import { Button_DUC } from '../components/buttons'
import MessagesManagementComponent from '../components/MessagesManagementComponent'
import CasinoGamesManagement from '../components/CasinoGamesManagement'
import { init_horaires, propsCasino, propsGame, propsHandleChange } from '../interfaces'
import ApiContext from '../context/ApiContext'
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, useParams } from "react-router-dom";
import { auth } from "../firebase/firebase";
import Loading from '../components/Loading'; 
import xtype from 'xtypejs'
import Modal from '../components/Modal'
import CasinoDatascraping from '../components/CasinoDatascraping'




function CasinoPage() {

  const { getCasinos, casinos, getMessages, deleteCasino, updateCasino, deleteMessages } = useContext(ApiContext)
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  const [newImages, setNewImages] = useState<File[]>([])
  const [deletedMessages, setDeletedMessages] = useState<string[]>([])
  const [Casino, setCasino] = useState<propsCasino>({ nom: '', horaires: init_horaires })
  const casinoId = String(useParams().casinoId)
  const [showModal, setShowModal] = useState(false);
  

  useEffect(() => {
    if (loading) return;
    if (!user) navigate("/Login");
  }, [user, loading]);

  useEffect(() => {
    getCasinos()
    getMessages(casinoId)
  }, [])

  useEffect(() => {

    const casino = casinos.filter(casino => { return casino._id === casinoId })[0]
    if (casino) {
      setCasino(casino)
    }

  }, [casinos])


  const handleUpdateOnClick = () => {

    updateCasino(casinoId, Casino, newImages, setNewImages)
    deleteMessages(deletedMessages, setDeletedMessages)
  }

  const handleDeleteCasinoOnClick = () => {

    
    setShowModal(true)

  }

  const handleDeleteCasino = () => {

    deleteCasino(casinoId)
  }

  const handleChange = (props: propsHandleChange) => {

    if (props.context === "horaire") {

      setCasino(prev => ({
        ...prev,
        horaires: prev.horaires.map((horaire) => {
          if (horaire.jour === props.day) {
            return { ...horaire, [props.name]: props.value }
          }
          return horaire
        })
      }))
    }

    else {


      setCasino(prev => ({
        ...prev,
        [props.name]: props.value
      }))


    }



  }

  const handleCancelChange = () => {

    const casino = casinos.filter(casino => { return casino._id === casinoId })[0]
    if (casino) {
      setCasino(casino)
    }

    getMessages(casinoId)
    setNewImages([])
    setDeletedMessages([])
    

  }

  const handleNewGame = (newGame: propsGame) => {

    if (Casino.jeux?.filter((jeu) => jeu.nom === newGame.nom && jeu.type === newGame.type).length) {

      setCasino(prev => ({
        ...prev,
        jeux: prev.jeux?.map((jeu) => {
          if (jeu.nom === newGame.nom && jeu.type === newGame.type) {
            return { ...jeu, desc: newGame.desc ? newGame.desc : prev.desc, nombre: newGame.nombre && jeu.nombre ? Number(newGame.nombre) + Number(jeu.nombre) : newGame.nombre ? newGame.nombre : jeu.nombre }
          }
          return jeu
        })
      }))
    }

    else {

      setCasino(prev => ({
        ...prev,
        jeux: [...prev.jeux ? prev.jeux : [], newGame]
      }))

    }

  }

  const handleDeleteGame = (Game: propsGame) => {

    setCasino(prev => ({
      ...prev,
      jeux: prev.jeux?.filter((jeu) => {
        return jeu.nom !== Game.nom || jeu.type !== Game.type
      })
    }))

  }

  const handleAddImage = (newImage : File ) => {


    setNewImages(prev => [...prev?  prev : [], newImage])

  }

  const handleRemoveImage = (imageToRemove :  File | string) => {

   
  
    if (xtype(imageToRemove) === 'multi_char_string'){

      console.log("ici")
      setCasino(prev => ({
        ...prev, 
        images : prev.images?.filter((image) => image !== imageToRemove)
      }))
    }

    else {

      setNewImages(prev => prev?.filter((image) => image !== imageToRemove))
    }

  }

  const handleDeleteMessages = (messageId : string) => {
    setDeletedMessages(prev => [...prev, messageId])
  }



  return (

    <>{user ?

      <div>
        <div className='casinoPage_body'>
        {showModal && <div>
          <Modal data={{}} functions={{handleOnClick : handleDeleteCasino, handleClose : setShowModal}}/>
          </div>}
          <div className='casinoPage_buttons'>
            <Button_DUC data={{ context: "update" }} functions={{ handleOnClick: handleUpdateOnClick }} />
            <Button_DUC data={{ context: "cancel" }} functions={{ handleOnClick: handleCancelChange }} />
          </div>
          <CasinoInfoComponent data={{ casino: Casino }} functions={{ handleChange: handleChange }} />
          <CasinoGamesManagement data={{ casino: Casino }} functions={{ handleChange: handleNewGame, handleDeleteGame: handleDeleteGame }} />
          <CasinoImagesComponent data={{newImages : newImages, images : Casino.images}} functions = {{handleAddImage : handleAddImage, handleRemoveImage : handleRemoveImage}}/>
          <MessagesManagementComponent data={{deletedMessages : deletedMessages}} functions={{handleDeleteMessages : handleDeleteMessages}}/>
          <CasinoDatascraping/>
          <div>
            <Button_DUC data={{ context: "delete" }} functions={{ handleOnClick: handleDeleteCasinoOnClick }} />
          </div>
        </div>

      </div>


      : <Loading />

    }


    </>

  )
}

export default CasinoPage
