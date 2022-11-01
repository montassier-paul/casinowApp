import React, { useEffect, useState } from 'react'
import "./CasinoInfoComponent.css"
import useMediaQuery from '@mui/material/useMediaQuery';
import {  propsInfoComponent } from '../interfaces';
import axios from 'axios'
import { toast } from 'react-toastify';


function CasinoInfoComponent( props : propsInfoComponent ) {

  const small_screen = useMediaQuery('(max-width:900px)');
  const medium_screen = useMediaQuery('(max-width:1350px)');
  const [mainClassName, setMainClassName] = useState("casinoInfoComponent")



  useEffect(() => {

    if(small_screen){
      setMainClassName("casinoInfoComponent_smallScreen")
    }
    else if(medium_screen){
      setMainClassName("casinoInfoComponent_mediumScreen")
    }
    else{
      setMainClassName("casinoInfoComponent")
    }

  }, [small_screen, medium_screen])


  const handleChangeText = (event : React.ChangeEvent<HTMLInputElement>  |  React.ChangeEvent<HTMLTextAreaElement>) => {
    // console.log(event.target.value)
    event.preventDefault()
    props.functions.handleChange({name : event.target.name, value : event.target.value})
  }


  const handleChangeCheckbox = (event : React.ChangeEvent<HTMLInputElement>) => {
    // event.preventDefault()
    // console.log(event.target.name, event.target.checked)
    props.functions.handleChange({name : event.target.name, value : event.target.checked})
  }

  const handleChangeTime = (event : React.ChangeEvent<HTMLInputElement>) => {
    // console.log(event.target.value)
    event.preventDefault()
    props.functions.handleChange({name : event.target.name.split("-")[1], value : event.target.value, context : "horaire", day : event.target.name.split("-")[0]})
  }

  const handleGetPosition = async() => {

    if(props.data.casino.adresse?.length){

      
      await axios.get('http://api.positionstack.com/v1/forward',
     {params : {access_key : process.env.REACT_APP_POSITION_KEY, query : props.data.casino.adresse}})
     .then((res) => 
     {
      const position = res.data.data.filter((dt : {type : string, confidence : number, longitude : number, latitude : number}) => dt.type === "address").reduce((prev : {type : string, confidence : number, longitude : number, latitude : number}, current : {type : string, confidence : number, longitude : number, latitude : number}) => (prev.confidence > current.confidence && current.type==="adresse") ? prev : current)
      props.functions.handleChange({name : 'latitude', value : position.latitude})
      props.functions.handleChange({name : "longitude", value : position.longitude})
    })
     
     .catch((err) => toast("Cannot get position"))

    }

  }


  return (
    <div className={mainClassName}>
      <h2>Casinos Info</h2>
      <div className='casinoInfoComponent_body'>

        <input type='text' placeholder={"nom"} name="nom" value={props.data.casino.nom? props.data.casino.nom : ''}  onChange={handleChangeText} />
        <input type='text' placeholder={"adresse"} name="adresse" value={props.data.casino.adresse? props.data.casino.adresse : ''} onChange={handleChangeText}/>
        
        <button onClick={handleGetPosition}>
          Get lat/long from adress
        </button>
        <label>latitude : 
        <input type='number' placeholder={"latitude"} name="longitude" value={props.data.casino.longitude? props.data.casino.longitude: ''} onChange={handleChangeText}/>
        </label>
        <label>latitude : 
        <input type='number' placeholder={"latitude"} name="latitude" value={props.data.casino.latitude? props.data.casino.latitude: ''} onChange={handleChangeText}/>
        </label>
    
        <input type='text' placeholder={"region"} name="region" value={props.data.casino.region? props.data.casino.region : ''} onChange={handleChangeText} />
        <input type='text' placeholder={"ville"} name="ville" value={props.data.casino.ville? props.data.casino.ville : ''} onChange={handleChangeText}/>
        <input type='text' placeholder={"departement"} name="departement" value={props.data.casino.departement? props.data.casino.departement : ''} onChange={handleChangeText}/>
        <input type='text' placeholder={"groupe"} name="groupe" value={props.data.casino.groupe? props.data.casino.groupe : ''} onChange={handleChangeText}/>
        <input type='text' placeholder={"lien site web"} name="link" value={props.data.casino.link? props.data.casino.link : ''} onChange={handleChangeText}/>
        
        <label>Nombre de machines
        <input type='number' placeholder='Nombre de machines'  name="machines_nombre" value={props.data.casino.machines_nombre? props.data.casino.machines_nombre : ''} onChange={handleChangeText}/>
        </label>
        <label>Nombre de tables
        <input type='number' placeholder='Nombre de tables'  name="tables_nombre" value={props.data.casino.tables_nombre? props.data.casino.tables_nombre : ''} onChange={handleChangeText}/>
        </label>
        <textarea 
          rows={5} cols={10} placeholder="Description du casino"  name="desc" value={props.data.casino.desc? props.data.casino.desc : ''} onChange={handleChangeText}/>


        <label>Poker : 
          <input type='checkbox' name="poker" checked={props.data.casino.poker} onChange={handleChangeCheckbox}/>
        </label>
        <label>paris sportif : 
          <input type='checkbox'  name="paris" checked={props.data.casino.paris} onChange={handleChangeCheckbox}/>
        </label>
        <label>restaurant : 
          <input type='checkbox'  name="restaurant" checked={props.data.casino.restaurant} onChange={handleChangeCheckbox}/>
        </label>
        <label>hotel : 
          <input type='checkbox'  name="hotel" checked={props.data.casino.hotel} onChange={handleChangeCheckbox}/>
        </label>
        <label>parking : 
          <input type='checkbox'  name="parking" checked={props.data.casino.parking} onChange={handleChangeCheckbox}/>
        </label>


       

        <label>
          <p>Lundi :</p> 
          <input type='time'  className='casinoInfoComponent_time_input' value={props.data.casino.horaires[0].ouverture} name="Lundi-ouverture" onChange={handleChangeTime}/>
          <input type='time'  className='casinoInfoComponent_time_input' value={props.data.casino.horaires[0].fermeture} name="Lundi-fermeture" onChange={handleChangeTime}/>
        </label>

        <label><p>Mardi : </p>
          <input type='time'  className='casinoInfoComponent_time_input'value={props.data.casino.horaires[1].ouverture}  name="Mardi-ouverture" onChange={handleChangeTime}/>
          <input type='time'  className='casinoInfoComponent_time_input'value={props.data.casino.horaires[1].fermeture}  name="Mardi-fermeture" onChange={handleChangeTime}/>
        </label>

        <label><p>Mercredi :</p> 
          <input type='time'  className='casinoInfoComponent_time_input'value={props.data.casino.horaires[2].ouverture}  name="Mercredi-ouverture" onChange={handleChangeTime}/>
          <input type='time'  className='casinoInfoComponent_time_input'value={props.data.casino.horaires[2].fermeture}  name="Mercredi-fermeture" onChange={handleChangeTime}/>
        </label>

        <label><p>Jeudi :</p> 
          <input type='time'  className='casinoInfoComponent_time_input'value={props.data.casino.horaires[3].ouverture}  name="Jeudi-ouverture" onChange={handleChangeTime}/>
          <input type='time'  className='casinoInfoComponent_time_input'value={props.data.casino.horaires[3].fermeture}  name="Jeudi-fermeture" onChange={handleChangeTime}/>
        </label>

        <label><p>Vendredi :</p> 
          <input type='time'  className='casinoInfoComponent_time_input'value={props.data.casino.horaires[4].ouverture}  name="Vendredi-ouverture" onChange={handleChangeTime}/>
          <input type='time'  className='casinoInfoComponent_time_input'value={props.data.casino.horaires[4].fermeture}  name="Vendredi-fermeture" onChange={handleChangeTime}/>
        </label>

        <label><p>Samedi : </p>
          <input type='time'  className='casinoInfoComponent_time_input' value={props.data.casino.horaires[5].ouverture}  name="Samedi-ouverture" onChange={handleChangeTime}/>
          <input type='time'  className='casinoInfoComponent_time_input' value={props.data.casino.horaires[5].fermeture}  name="Samedi-fermeture" onChange={handleChangeTime}/>
        </label>

        <label><p>Dimanche : </p>
          <input type='time'  className='casinoInfoComponent_time_input' value={props.data.casino.horaires[6].ouverture}  name="Dimanche-ouverture" onChange={handleChangeTime}/>
          <input type='time'  className='casinoInfoComponent_time_input' value={props.data.casino.horaires[6].fermeture}  name="Dimanche-fermeture" onChange={handleChangeTime}/>
        </label>

      </div>
    </div>
  )
}

export default CasinoInfoComponent