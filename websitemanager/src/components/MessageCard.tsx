import React from 'react'
import { propsMessageCard } from '../interfaces'
import DeleteIcon from '@mui/icons-material/Delete';
import './MessageCard.css'

function MessageCard(props: propsMessageCard) {

    const handleDeleteOnclick = () => {
        console.log("ici")
        props.functions.handleDelete && props.functions.handleDelete(props.data)
    }
    return (
        <div className='messageCard'>
            <div className='messageCard_top'>
                <h3>{props.data.nom}</h3>
                <p>{props.data.email}</p>

            </div>
            <div className='messageCard_bottom'>
                <p>{props.data.message}</p>
            </div>
            <p>{new Date(props.data.date).toLocaleDateString()}</p>
            <div className='deleteButton' onClick={handleDeleteOnclick}>
            <DeleteIcon/>
            </div>


        </div>
    )
}

export default MessageCard