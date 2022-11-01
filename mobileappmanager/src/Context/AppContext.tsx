import React, { useState, createContext } from "react";
import axios from "axios";
import { getUserInfo } from "../firebase/authentification";
import { propsCasinoInfo, propsEvent, propsMachine, propsTable, propsTournament } from "../interfaces/interfaces";

export interface propsAppProvider {
  children: React.ReactNode
}

export interface propsAppContext {

  casinoId: string,

  casinoInfo: propsCasinoInfo

  machines : propsMachine[], 

  tables : propsTable[] 

  events : propsEvent[]

  tournaments : propsTournament[]

  deleteEvent : (EventId : string) => void,

  createEvent : (date :  string, title : string) => void

  deleteTournament : (TournamentId : string) => void,

  createTournament : (title:  string, type: "regular"|"exceptional", date : string) => void
  
  handleCasinoChange: (event: React.FormEvent<HTMLInputElement>) => void,

  fetchData: () => void,

  updateCasinoInfo : () => void,

  uploadImage : (file : File) => void, 

  deleteImage : (url : string) => void, 

  deleteMachine : (machineId : string) => void,

  createMachine : (jackpot : number, game : string) => void

  deleteTable : (tableId : string) => void,

  createTable : (open :  boolean, game : string) => void

  updateTable : (tableId : string, open? :  boolean, game? : string) => void

  setMachines: React.Dispatch<React.SetStateAction<{
    jackpot: number;
    game: string;
    _id: string;}[]>>


}

export const initialState = {


  fetchData: async () => { },

  updateCasinoInfo : () => {},

  uploadImage : (file : File) => {}, 

  deleteImage : (url : string) => {}, 

  deleteMachine : (machineId : string) => {},

  createMachine : (jackpot : number, game : string) => {}, 

  deleteTable : (tableId : string) => {},

  createTable : (open : boolean, game : string) => {}, 

  updateTable : (tableId : string, open? :  boolean, game? : string) => {},

  casinoId: '',

  casinoInfo: {
    name: '',
    adresse: '',
    region: '',
    groupe: '',
    departement: '',
    ville: '',
    machines: 0,
    tables: 0,
    restaurant: false,
    betting: false,
    poker: false,
    hotel: false,
    parking: false,
    desc: [],
    images: [],
    tournamentsId: [],
    tablesId: [],
    trendsId: [],
    eventsId: [],
    machinesId: [],
    hours: [
      { day: "Monday", opening: "00:00", ending: "00:00" },
      { day: "Tuesday", opening: "00:00", ending: "00:00" },
      { day: "Wednesday", opening: "00:00", ending: "00:00" },
      { day: "Thursday", opening: "00:00", ending: "00:00" },
      { day: "Friday", opening: "00:00", ending: "00:00" },
      { day: "Saturday", opening: "00:00", ending: "00:00" },
      { day: "Sunday", opening: "00:00", ending: "00:00" }],
    games: [],
  },

  machines: [],

  tables: [], 

  handleCasinoChange: (event: React.FormEvent<HTMLInputElement>) => { },

  events : [],

  tournaments : [], 

  deleteEvent : (EventId : string) => {},

  createEvent : (date :  string, title : string) => {},

  deleteTournament : (TournamentId : string) => {},

  createTournament : (title :  string, type: "regular"|"exceptional", date : string) => {},

  setMachines: () => {}

  

  


}

export const AppContext = createContext<propsAppContext>(initialState);

export const AppProvider = ({ children }: propsAppProvider) => {


  const [casinoId, setCasinoId] = useState('')

  const [casinoInfo, setCasinoInfo] = useState({
    name: '',
    adresse: '',
    region: '',
    groupe: '',
    departement: '',
    ville: '',
    machines: 0,
    tables: 0,
    restaurant: false,
    betting: false,
    poker: false,
    hotel: false,
    parking: false,
    desc: [],
    images: [],
    tournamentsId: [],
    tablesId: [],
    trendsId: [],
    eventsId: [],
    machinesId: [],
    hours: [
      { day: "Monday", opening: "00:00", ending: "00:00" },
      { day: "Tuesday", opening: "00:00", ending: "00:00" },
      { day: "Wednesday", opening: "00:00", ending: "00:00" },
      { day: "Thursday", opening: "00:00", ending: "00:00" },
      { day: "Friday", opening: "00:00", ending: "00:00" },
      { day: "Saturday", opening: "00:00", ending: "00:00" },
      { day: "Sunday", opening: "00:00", ending: "00:00" }],
    games: [],
  }
  )

  const [machines, setMachines] = useState<{jackpot : number, game : string, _id:string}[]>([])

  const [tables, setTables] = useState<{open : boolean, game : string, _id:string}[]>([])

  const [events, setEvents] = useState<{desc? : string, title : string, img? : string, _id : string, date : string, opening? : string, ending? : string}[]>([])

  const [tournaments, setTournaments] = useState<{desc? : string, title : string, img? : string, _id : string,  type : 'regular'|"exceptional", blind? : number, date :  string, opening? : string, ending? : string }[]>([])



  const fetchData = async () => {

    const user = await getUserInfo()
    const token = await user?.getIdToken(true)
   

    if(token && user){

    const resCasinoId = await axios.get('https://mobileapp--server-tnsbggprqa-ew.a.run.app/api/admin/' + user.email, {headers : {authtoken : token}}).then((req) => req.data.data).catch((error) => { })

    setCasinoId(resCasinoId.casinoId)
    const response = await axios.get("https://mobileapp--server-tnsbggprqa-ew.a.run.app/api/casinos/casino/" + resCasinoId.casinoId).then((req) => req.data.data).catch((error) => { })
    if (response) {
      setCasinoInfo(prev => ({
        ...prev,
        name: response.name ? response.name :undefined,
        adresse: response.adresse ? response.adresse :undefined,
        region: response.region ? response.region :undefined,
        groupe: response.groupe ? response.groupe :undefined,
        departement: response.departement ? response.departement :undefined,
        ville: response.ville ? response.ville :undefined,
        machines: response.machines ? response.machines :undefined,
        tables: response.tables ? response.tables :undefined,
        restaurant: response.restaurant ? response.restaurant :undefined,
        betting: response.betting ? response.betting :undefined,
        poker: response.poker ? response.poker :undefined,
        hotel: response.hotel ? response.hotel :undefined,
        parking: response.parking ? response.parking :undefined,
        desc: response.desc ? response.desc :undefined,
        images: response.images ? response.images :undefined,
        tournamentsId: response.tournamentsId ? response.tournamentsId :undefined,
        tablesId: response.tablesId ? response.tablesId :undefined,
        trendsId: response.trendsId ? response.trendsId :undefined,
        eventsId: response.eventsId ? response.eventsId :undefined,
        machinesId: response.machinesId ? response.machinesId :undefined,
        hours: response.hours ? response.hours :undefined,
        games: response.games ? response.games :undefined,

      }))
    }

    const res_machines = await axios.get('https://mobileapp--server-tnsbggprqa-ew.a.run.app/api/machines/full', {params : {q_casinoId : resCasinoId.casinoId, p_jackpot : 1, p_game : 1}}).then((res)=> res.data.data).catch((error) => console.log(error))
    setMachines(res_machines)


    const res_tables = await axios.get('https://mobileapp--server-tnsbggprqa-ew.a.run.app/api/tables/full', {params : {q_casinoId : resCasinoId.casinoId, p_open : 1, p_game : 1}}).then((res)=> res.data.data).catch((error) => console.log(error))
    setTables(res_tables)

    const res_events = await axios.get('https://mobileapp--server-tnsbggprqa-ew.a.run.app/api/evenements/full', {params : {q_casinoId : resCasinoId.casinoId, p_open : 1, p_game : 1}}).then((res)=> res.data.data).catch((error) => console.log(error))
    setEvents(res_events)

    const res_tournaments = await axios.get('https://mobileapp--server-tnsbggprqa-ew.a.run.app/api/tournaments/full', {params : {q_casinoId : resCasinoId.casinoId, p_open : 1, p_game : 1}}).then((res)=> res.data.data).catch((error) => console.log(error))
    setTournaments(res_tournaments)

  }
  }

 
  const updateCasinoInfo = async () => { 

    const bodyCasinoInfo = {

        name: casinoInfo.name ? casinoInfo.name :undefined,
        adresse: casinoInfo.adresse ? casinoInfo.adresse :undefined,
        region: casinoInfo.region ? casinoInfo.region :undefined,
        groupe: casinoInfo.groupe ? casinoInfo.groupe :undefined,
        departement: casinoInfo.departement ? casinoInfo.departement :undefined,
        ville: casinoInfo.ville ? casinoInfo.ville :undefined,
        machines: casinoInfo.machines ? casinoInfo.machines :undefined,
        tables: casinoInfo.tables ? casinoInfo.tables :undefined,
        restaurant: casinoInfo.restaurant ? casinoInfo.restaurant :undefined,
        betting: casinoInfo.betting ? casinoInfo.betting :undefined,
        poker: casinoInfo.poker ? casinoInfo.poker :undefined,
        hotel: casinoInfo.hotel ? casinoInfo.hotel :undefined,
        parking: casinoInfo.parking ? casinoInfo.parking :undefined,
        desc: casinoInfo.desc ? casinoInfo.desc :undefined,

    }
    const res_CasinoUpdate = await axios.put("https://mobileapp--server-tnsbggprqa-ew.a.run.app/api/casinos/casino/" + casinoId, bodyCasinoInfo).then((res) => res.data).catch((error) => {})
    
  const bodyHours = {
    hours : casinoInfo.hours? casinoInfo.hours: undefined
  }
    const res_HoursUpdate = await axios.put("https://mobileapp--server-tnsbggprqa-ew.a.run.app/api/casinos/casino/" + casinoId, bodyHours).then((res) => res.data).catch((error) => {})
  }

  const handleCasinoChange = (event: React.FormEvent<HTMLInputElement>) => {
    const name = event.currentTarget.name;
    const value = event.currentTarget.value

    


    if (name === "restaurant" || name === 'betting' || name === "poker" || name === "hotel" || name === "parking") {

 
      setCasinoInfo(prev => ({
        ...prev,
        [name]: !prev[name]
      })
      )
    }

    else if (name.includes("-")){

      const day = name.split('-')[0]
      const moment = name.split('-')[1]


      setCasinoInfo(prev => ({
        ...prev,
        hours : prev.hours.map((dayHours) => {
          if(dayHours.day === day){
            console.log("ici")
            return {...dayHours, [moment] : value}
          }
          else {
            console.log("la")
            return dayHours
          }
        })
      })
      )

    }
    else {


      
      setCasinoInfo(prev => ({
        ...prev,
        [name]: value
      })
      )
    }


  }

  const uploadImage = async(file : File) => {

    const res_UploadImage = await axios.put("https://mobileapp--server-tnsbggprqa-ew.a.run.app/api/casinos/casino/images/" +casinoId, {image : file}, {   headers: {
      "Content-Type": "multipart/form-data",
    }} ).then((res) => res.data).catch((error) => {})
    console.log(file)
    console.log(res_UploadImage)
    const response = await axios.get("https://mobileapp--server-tnsbggprqa-ew.a.run.app/api/casinos/casino/" +casinoId, {params : {p_images : 1}}).then((req) => req.data.data).catch((error) => { })
    if (response) {

      setCasinoInfo(prev => ({
        ...prev,
        images : response.images? response.images : prev.images

      }))
      
    }
    
    
  }

  const deleteImage = async(url : string) => {

    const res_CasinoUpdate = await axios.put("https://mobileapp--server-tnsbggprqa-ew.a.run.app/api/casinos/casino/images/" +casinoId, {imageLocation : url}).then((res) => res.data).catch((error) => {})
    const response = await axios.get("https://mobileapp--server-tnsbggprqa-ew.a.run.app/api/casinos/casino/" +casinoId, {params : {p_images : 1}}).then((req) => req.data.data).catch((error) => { })
    if (response) {

      setCasinoInfo(prev => ({
        ...prev,
        images : response.images? response.images : prev.images

      }))
      
    }
  
  }

  const deleteMachine = async(machineId : string) => {

    const res = await axios.delete('https://mobileapp--server-tnsbggprqa-ew.a.run.app/api/machines/' + machineId).then((res) => res.data.msg).catch((error) => console.log(error))

    if(res){
      setMachines((prev) => (prev.filter((machine) => {
        return machine._id !== machineId
      })))
    }
  }
  const createMachine = async(jackpot : number, game : string) => {

    const res = await axios.post('https://mobileapp--server-tnsbggprqa-ew.a.run.app/api/machines/', {'jackpot' : jackpot, 'game' : game, 'casinoId' :casinoId}).then((res) => res.data.data).catch((error) => console.log(error))

    if(res){
      setMachines(prev => [...prev, ...[{jackpot : res.jackpot, game : res.game, _id : res._id}]]) 
    }
  }

  const deleteTable = async(tableId : string) => {

    const res = await axios.delete('https://mobileapp--server-tnsbggprqa-ew.a.run.app/api/tables/' + tableId).then((res) => res.data.msg).catch((error) => console.log(error))

    if(res){
      setTables((prev) => (prev.filter((table) => {
        return table._id !== tableId
      })))
    }
  }
  const createTable = async(open : boolean, game:string) => {

    const res = await axios.post('https://mobileapp--server-tnsbggprqa-ew.a.run.app/api/tables/', {'open' : open, 'game' : game, 'casinoId' :casinoId}).then((res) => res.data.data).catch((error) => console.log(error))

    if(res){
      setTables(prev => [...prev, ...[{open : res.open, game : res.game, _id : res._id}]]) 
    }
  }

  const updateTable =  async(tableId : string, open? :  boolean, game? : string) => {

    const res = await axios.put('https://mobileapp--server-tnsbggprqa-ew.a.run.app/api/tables/' + tableId, {'open' : open ? open : undefined, 'game' : game? game : undefined}).then((res) => res.data.data).catch((error) => console.log(error))
    if(res){
      setTables(prev => prev.map((table) => {
        if(table._id === tableId) {
          return {open : open? open : table.open, game : game ? game : table.game, _id : tableId}
        }
        return table
      }))
    }
  }
  
  const deleteEvent = async(EventId : string) => {

    const res = await axios.delete('https://mobileapp--server-tnsbggprqa-ew.a.run.app/api/evenements/' + EventId).then((res) => res.data.msg).catch((error) => console.log(error))

    if(res){
      setEvents((prev) => (prev.filter((event) => {
        return event._id !== EventId
      })))
    }

  }

  const createEvent = async(date :  string, title : string) => {

    const dates = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"]

    const res = await axios.post('https://mobileapp--server-tnsbggprqa-ew.a.run.app/api/evenements/', {'date' : date, 'title' : title,"month" : dates[new Date(date).getMonth()], 'casinoId' :casinoId}).then((res) => res.data.data).catch((error) => console.log(error))

    if(res){
      setEvents(prev => [...prev, ...[{date: res.date, title : res.title, _id : res._id, filterDate : res.filterDate}]]) 
    }
  }
  

  const deleteTournament = async(TournamentId : string) => {

    const res = await axios.delete('https://mobileapp--server-tnsbggprqa-ew.a.run.app/api/tournaments/' + TournamentId).then((res) => res.data.msg).catch((error) => console.log(error))

    if(res){
      setTournaments((prev) => (prev.filter((tournament) => {
        return tournament._id !== TournamentId
      })))
    }

  }

  const createTournament = async(title :  string, type: "regular"|"exceptional", date : string) => {

    const dates = {"regular" : ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], "exceptional" : ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"]
  }

    const filterDate = type==="regular"? dates.regular[new Date(date).getDay()] : dates.exceptional[new Date(date).getMonth()] 

    const res = await axios.post('https://mobileapp--server-tnsbggprqa-ew.a.run.app/api/tournaments/', {'date' : date, 'title' : title,"type" : type, "filterDate" : filterDate, 'casinoId' :casinoId}).then((res) => res.data.data).catch((error) => console.log(error))

    if(res){
      setTournaments(prev => [...prev, ...[{date: res.date, title : res.title, _id : res._id, filterDate : res.filterDate, type : res.type}]]) 
    }

  }
  


  return (
    <AppContext.Provider value={{casinoId, fetchData, casinoInfo, handleCasinoChange, updateCasinoInfo, uploadImage, deleteImage, machines,setMachines, deleteMachine, createMachine , tables, createTable, deleteTable, events, tournaments, createEvent, createTournament, deleteEvent, deleteTournament, updateTable}}>
      {children}
    </AppContext.Provider>
  );
};