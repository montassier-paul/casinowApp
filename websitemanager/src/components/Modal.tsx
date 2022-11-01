import React from 'react'
import { propsModal } from '../interfaces'
import "./Modal.css"

function Modal(props: propsModal) {
    return (
        <div className='modal'>

            <div className='modal_content'>
                <p>
                    Are you sure you want to remove this casino ?
                </p>
                <div>
                    <button onClick={props.functions.handleOnClick}>
                        DELETE
                    </button>
                    <button onClick={() => props.functions.handleClose(false)}>
                        CANCEL
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Modal