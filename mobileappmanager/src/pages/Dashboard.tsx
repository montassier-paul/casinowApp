import Header from '../components/Header'
import "./Dashboard.css"
import ImagesManager from '../components/ImagesManager'
import EventsManager from '../components/EventsManager'
import TablesManager from '../components/TablesManager'
import MachinesManager from '../components/MachinesManager'
import TournamentsManager from '../components/TournamentsManager'
import CasinoManager from '../components/CasinoManager'
import { useContext, useEffect } from 'react'
import { AppContext } from '../Context/AppContext'
import socketIOClient from "socket.io-client";
import { getUserInfo } from '../firebase/authentification'

const Dashboard = () => {

  
  useEffect(() => {

    const init = async() => {
      const user = await getUserInfo()
      if(user){
        const tokenuser = await user.getIdToken(true)
        console.log(tokenuser)
      }
      
    }

  init()
    
  }, [])


  const {fetchData, setMachines, casinoInfo, machines,tables,events,tournaments, createMachine, deleteMachine, updateCasinoInfo, handleCasinoChange, deleteImage, uploadImage, updateTable, createTable, deleteTable, createEvent, deleteEvent, createTournament, deleteTournament} = useContext(AppContext)

  useEffect(() => {
    fetchData()

    const socket = socketIOClient("https://casinow.herokuapp.com");
    socket.on("machine update", data => {
      setMachines(machines => machines.map((machine) =>{
        if(machine._id === data.id){
          return {...machine, jackpot : data.jackpot}
        }
        return machine}))
    
   });
  }, [])


  return (
    <main className='main'>
    <Header data={{casinoName : casinoInfo.name, casinoAdresse :casinoInfo.adresse}}/>
    <CasinoManager data={{casinoInfo : casinoInfo}} functions={{handleCasinoChange : handleCasinoChange, updateCasinoInfo : updateCasinoInfo}}/>
    <ImagesManager  data={{casinoInfo : casinoInfo}} functions={{uploadImage : uploadImage, deleteImage : deleteImage}}/>
    <MachinesManager data={{machines : machines}} functions={{createMachine : createMachine, deleteMachine : deleteMachine}}/>
    <TablesManager  data={{tables : tables}} functions={{createTable : createTable, deleteTable : deleteTable, updateTable : updateTable}}/>
    <EventsManager  data={{events : events}} functions={{createEvent : createEvent, deleteEvent : deleteEvent}}/>
    <TournamentsManager data={{tournaments : tournaments}} functions={{createTournament : createTournament, deleteTournament : deleteTournament}}/>
    </main>

  )
}

export default Dashboard