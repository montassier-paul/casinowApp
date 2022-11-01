import React, {useEffect} from 'react'
import "./MessagesManager.css"
import { MessageCard, NewMessageForm } from './MessageComponents'
import { fetchMessages } from "../context/apiManager"
import { useAppDispatch, useAppSelector } from "../store"
import { useParams } from 'react-router-dom'


function MessagesManager() {

  const dispatch = useAppDispatch()
  const apiStatus = useAppSelector(state => state.messages.status)
  const casinoId = useParams().casinoId

  useEffect(() => {

    if(apiStatus === 'complete' && casinoId){
      dispatch(fetchMessages({payload : {casinoId : casinoId}}))
    }

  }, [apiStatus, dispatch])



  const messages = useAppSelector(state => state.messages.messages)

  return (
    <div className='messagesManager'>
      <h4>Vos avis sur cet établissement</h4>

      <div className='messagesContainer'>


        {messages?.map((message, key) => {
          return <MessageCard nom={message.nom} date={message.date} message={message.message} key={key} _id={message._id}/>
        })}

      </div>


      <div className='NewMessageContainer'>

        <NewMessageForm/>

      </div>
    </div>
  )
}

export default MessagesManager