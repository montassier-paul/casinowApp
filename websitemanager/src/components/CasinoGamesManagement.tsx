import React, {useState, useEffect} from 'react'
import { Button_DUC } from './buttons'
import './CasinoGamesManagement.css'
import GameCard from './GameCard'
import useMediaQuery from '@mui/material/useMediaQuery';
import { propsGame, propsGamesManagementComponent } from '../interfaces';
import { toast } from 'react-toastify';


function CasinoGamesManagement(props : propsGamesManagementComponent) {

  const small_screen = useMediaQuery('(max-width:900px)');
  const [mainClassName, setMainClassName] = useState("casinoGamesManagement")
  const [bodyClassName, setBodyClassName] = useState("casinoGamesManagement_body")

  const [newGame, setNewGame] = useState<propsGame>({nom: ""})

  useEffect(() => {

    if(small_screen){
      setMainClassName("casinoGamesManagement_smallScreen")
      setBodyClassName("casinoGamesManagement_body_smallScreen")
    }
    else{
      setMainClassName("casinoGamesManagement")
      setBodyClassName("casinoGamesManagement_body")
    }

  }, [small_screen])


  const handleChange = (event : React.ChangeEvent<HTMLInputElement>  |  React.ChangeEvent<HTMLTextAreaElement>) => {
    // console.log(event.target.value)
    event.preventDefault()
    setNewGame(prev => ({
      ...prev, 
      [event.target.name] : event.target.value
    }))
  }

  const handleSelectElement = (event : React.ChangeEvent<HTMLSelectElement>) => {
    // console.log(event.target.value)
    setNewGame(prev => ({
      ...prev, 
      [event.target.name] : event.target.value
    }))
  }

  const handleCreateGameOnClick = () => {

    if(newGame.nom.length > 0){

      props.functions.handleChange(newGame)
      setNewGame({nom: ""})

    }

    else {
      toast('Game should at least have a name')
    }

   
  }



  return (
    <div className={mainClassName}>
      <h2>Casino's Games</h2>
      <div className={bodyClassName}>
        <div className='casinoGamesManagement_newGame'>
          <h4>Create a new Game</h4>
          <input type='text' placeholder={"Nom"} name='nom' value={newGame.nom} onChange={handleChange}/>
          <select id="type" name="type" value={newGame.type? newGame.type : ''} onChange={handleSelectElement}>
            <option value="">type de jeu</option>
            <option value="machine">machine</option>
            <option value="table">table</option>
            {/* <option value="autre">autre</option> */}
          </select>
          <input type='number' placeholder={"Nombre"} name="nombre" value={newGame.nombre? newGame.nombre : ''} onChange={handleChange}/>
          <textarea id="story"
          rows={5} cols={10} placeholder="Description du jeu" name="desc" value={newGame.desc? newGame.desc : ''} onChange={handleChange}/>
          <div><Button_DUC data={{context : "create"}} functions={{handleOnClick : handleCreateGameOnClick}}/></div>
          <br/>
          
        </div>
        <div className='casinoGamesManagement_gamesList'>

          {props.data.casino.jeux?.map((jeu, key) => {
            return <GameCard data={{nom : jeu.nom, nombre:jeu.nombre, type :jeu.type, desc :jeu.desc}} functions={{handleDeleteGame : props.functions.handleDeleteGame}} key={key}/>
          })}
          {/* <GameCard data={{nom : "blackjack", number:2, type:"table"}} functions={{}}/>
          <GameCard data={{nom : "blackjack", number:2, type:"table", desc:"oceokoecocoeeec ejcnejcjn jnejce jnej"}} functions={{}}/>
          <GameCard data={{nom : "blackjack", number:2, type:"table", desc:"oceokoecocoeeec ejcnejcjn jnejce jnej"}} functions={{}}/>
          <GameCard data={{nom : "blackjack", number:2, type:"table", desc:"oceokoecocoeeec ejcnejcjn jnejce jnej"}} functions={{}}/>
          <GameCard data={{nom : "blackjack", number:2, type:"table", desc:"oceokoecocoeeec ejcnejcjn jnejce jnej"}} functions={{}}/>
          <GameCard data={{nom : "blackjack", number:2, type:"table", desc:"oceokoecocoeeec ejcnejcjn jnejce jnej"}} functions={{}}/>
          <GameCard data={{nom : "blackjack", number:2, type:"table", desc:"oceokoecocoeeec ejcnejcjn jnejce jnej"}} functions={{}}/>
          <GameCard data={{nom : "blackjack", number:2, type:"table", desc:"oceokoecocoeeec ejcnejcjn jnejce jnej"}} functions={{}}/>
          <GameCard data={{nom : "blackjack", number:2, type:"table", desc:"oceokoecocoeeec ejcnejcjn jnejce jnej"}} functions={{}}/>
          <GameCard data={{nom : "blackjack", number:2, type:"table", desc:"oceokoecocoeeec ejcnejcjn jnejce jnej"}} functions={{}}/>
          <GameCard data={{nom : "blackjack", number:2, type:"table", desc:"oceokoecocoeeec ejcnejcjn jnejce jnej"}} functions={{}}/> */}
         
         
        </div>
      </div>
    </div>
  )
}

export default CasinoGamesManagement