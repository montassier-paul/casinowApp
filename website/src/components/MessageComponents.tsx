import { propsMessage } from "../interface"
import "./MessageComponents.css"
import { useAppDispatch } from "../store"
import { postMessage } from "../context/apiManager"
import {useState} from 'react'
import { useParams } from "react-router-dom"

function MessageCard(props : propsMessage) {


  return (
    <div className='messageCard'>
        <div className='messageCard_header'>
            <h5>{props.nom}</h5>
            <p>{props.date && new Date(props.date).toUTCString()}</p>
        </div>
        <div className='messageCard_body'> 
            <p> {props.message}</p>

        </div>
        
    </div>
  )
}


function NewMessageForm() {

  const dispatch = useAppDispatch()
  const [formData, setFormData] = useState<{nom : string, prenom : string, email : string, message : string}>({nom : '', prenom : '', email : '', message : ''})
  const casinoId = useParams().casinoId

  const handleChange = (event : React.ChangeEvent<HTMLInputElement>  |  React.ChangeEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
   
    setFormData(prev => ({
      ...prev, 
      [event.target.name] : event.target.value
    }))
    }

  const handleSubmit = (e : React.SyntheticEvent) => {

    e.preventDefault();
    if(casinoId){
      dispatch(postMessage({payload : {...formData, casinoId : casinoId}}))
      setFormData({nom : '', prenom : '', email : '', message : ''})

    }
    

  }
    return (
      <div className='newMessageForm'>
        <h4>Partagez votre avis</h4>

        <form onSubmit={handleSubmit}>
        <label>Prenom</label>
        <input type={'text'} value={formData?.prenom} onChange={handleChange} name="prenom" required={true}/>   
        <label>Nom</label>
        <input type={'text'} value={formData?.nom} onChange={handleChange} name="nom" required={true}/>
        <label>Email</label>
        <input type={'email'} value={formData?.email} onChange={handleChange} name="email" required={true}/>
        <label>Votre message</label>
        <textarea value={formData?.message} onChange={handleChange} name="message" required={true}/>

        <input type="submit" value="Partager" />
        </form>

    </div>
    )
  }
  

export {MessageCard, NewMessageForm}