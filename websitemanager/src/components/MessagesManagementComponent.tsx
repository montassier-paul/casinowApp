import {useContext, useMemo} from 'react'
import ApiContext from '../context/ApiContext'
import { propsMessage, propsMessagesManagementComponent } from '../interfaces'
import MessageCard from './MessageCard'
import './MessagesManagementComponent.css'

function MessagesManagementComponent(props : propsMessagesManagementComponent) {


  const {messages} = useContext(ApiContext)


  const handleDeleteMessages = (Message :propsMessage) => {
    props.functions.handleDeleteMessages(Message._id)
    
  }

  const filter = (deletedMessages : string[] | undefined) => {

    if(deletedMessages){

    return messages.filter((casino) => {
      return !deletedMessages.includes(casino._id)})

  }

  else {
     return messages
  }

  }

  const messagesKept = useMemo(() => filter(props.data.deletedMessages), [props.data.deletedMessages, messages]);

  return (
    <div className='messagesManagementComponent'>
      <h2>Messages management</h2>
      <div className="messagesManagementComponent_body">

        {messagesKept.map((message, key) => {
          return <MessageCard data={message} functions={{handleDelete : handleDeleteMessages}} key={key}/>
        })

        }
      </div>
    </div>
  )
}

export default MessagesManagementComponent