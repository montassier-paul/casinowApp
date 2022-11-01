import React from 'react'
import "./buttons.css"
import { propsButton_DUC } from '../interfaces'



export const Button_DUC = (props : propsButton_DUC) => {

    const handleOnClick = () => {

        props.functions.handleOnClick()
    }


    switch (props.data.context) {
        case 'delete':
          
            return (
                <button className='button_DUC'onClick={handleOnClick} >
                    DELETE
                </button>
            )


        case "update":

        
            return (
                <button  className='button_DUC'onClick={handleOnClick}>
                    UPDATE
                </button>
            )
        case "create":

           
            return (
                <button  className='button_DUC'onClick={handleOnClick}>
                    CREATE
                </button>
            )
      

        case "new":

            
            return (
                <button  className='button_DUC'onClick={handleOnClick}>
                   NEW
                </button>
            )

        case "add":

        
            return (
                <button  className='button_DUC'onClick={handleOnClick}>
                    ADD
                </button>
            )

        case "cancel":

    
            return (
                <button  className='button_DUC'onClick={handleOnClick}>
                    CANCEL
                </button>
            )

        case "save":


            return (
                <button  className='button_DUC'onClick={handleOnClick}>
                    SAVE
                </button>
            )
    }
}



