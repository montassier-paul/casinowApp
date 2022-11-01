import { useContext, useState, useEffect } from 'react'
import CasinoImagesComponent from '../components/CasinoImagesComponent'
import CasinoInfoComponent from '../components/CasinoInfoComponent'
import Header from '../components/Header'
import "./NewCasino.css"
import { Button_DUC } from '../components/buttons'
import CasinoGamesManagement from '../components/CasinoGamesManagement'
import { init_horaires, propsCasino, propsGame, propsHandleChange } from '../interfaces'
import ApiContext from '../context/ApiContext'
import { toast } from 'react-toastify';
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase";
import Loading from '../components/Loading'


function NewCasino() {

  const [newCasino, setNewCasino] = useState<propsCasino>({ nom: '', horaires: init_horaires })
  const [newImages, setNewImages] = useState<File[]>([])
  const { createCasino } = useContext(ApiContext)
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) navigate("/Login");
  }, [user, loading]);


  const handleCreateOnClick = () => {

    if (newCasino && newCasino.nom.length > 0) {

      createCasino(newCasino, newImages, setNewImages)

    }
    else {
      toast('You must at least add a name')
    }

  }

  const handleChange = (props: propsHandleChange) => {


    if (props.context === "horaire") {

      setNewCasino(prev => ({
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


      setNewCasino(prev => ({
        ...prev,
        [props.name]: props.value
      }))


    }


    // console.log(newCasino)

  }

  const handleNewGame = (newGame: propsGame) => {

    if (newCasino.jeux?.filter((jeu) => jeu.nom === newGame.nom && jeu.type === newGame.type).length) {

      setNewCasino(prev => ({
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

      setNewCasino(prev => ({
        ...prev,
        jeux: [...prev.jeux ? prev.jeux : [], newGame]
      }))

    }

  }

  const handleDeleteGame = (Game: propsGame) => {

    setNewCasino(prev => ({
      ...prev,
      jeux: prev.jeux?.filter((jeu) => {
        return jeu.nom !== Game.nom || jeu.type !== Game.type
      })
    }))

  }

  const handleAddImage = (newImage : File) => {

    setNewImages(prev => [...prev?  prev : [], newImage])

  }

  const handleRemoveImage = (imageToRemove : File | string) => {

    setNewImages(prev => prev?.filter((image) => image !== imageToRemove))
  }

  return (

    <>{user
      ? <div>
        <div className='newCasino_body'>
          <div className='newCasino_button'>
            <Button_DUC data={{ context: "create" }} functions={{ handleOnClick: handleCreateOnClick }} />
          </div>
          <CasinoInfoComponent data={{ casino: newCasino }} functions={{ handleChange: handleChange }} />
          <CasinoGamesManagement data={{ casino: newCasino }} functions={{ handleChange: handleNewGame, handleDeleteGame: handleDeleteGame }} />
          <CasinoImagesComponent  data={{ newImages : newImages }} functions={{handleAddImage : handleAddImage, handleRemoveImage : handleRemoveImage}} />

        </div>

      </div>

      : <Loading />

    }

    </>

  )
}

export default NewCasino




