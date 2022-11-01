import React, { useEffect, useState } from 'react'
import { propsCasinoCard } from '../interface'
import "./CasinoCard.css"
import { useNavigate } from 'react-router-dom';

function CasinoCard(props: propsCasinoCard) {

    const [isHover, setIsHover] = useState(false);
    const [isOpen, setIsOpen] = useState(false)
    const navigate = useNavigate()

    const smallCasinoCardOnlick = () => {

        if (props.data.latitude && props.data.longitude && props.functions.handleMoveTo) {

            props.functions.handleMoveTo(props.data.latitude, props.data.longitude)
        }


    }

    const checkCasinoOpened = () => {

        let dt = new Date()

        const hours = dt.getHours()
        const minutes = dt.getMinutes()

        if (!props.data.fermeture || !props.data.ouverture) {
            return false
        }

        if (props.data.ouverture.split(':')[0] > props.data.fermeture.split(':')[0]) {

            if (Number(props.data.ouverture.split(':')[0]) + Number(props.data.ouverture.split(':')[1]) / 60 < hours + minutes / 60 && minutes / 60 < 24) {

                return true
            }
            if (0 < hours + minutes / 60 && hours + minutes / 60 < Number(props.data.fermeture.split(':')[0]) + Number(props.data.fermeture.split(':')[1])) {

                return true
            }

        }

        else {
            if (Number(props.data.ouverture.split(':')[0]) + Number(props.data.ouverture.split(':')[1]) / 60 < hours + minutes / 60 && minutes / 60 < Number(props.data.fermeture.split(':')[0]) + Number(props.data.fermeture.split(':')[0])) {

                return true

            }
        }

        return false
    }

    useEffect(() => {

        setIsOpen(checkCasinoOpened())

    }, [])

    const handleMouseEnter = () => {
        setIsHover(true);
    };

    const handleMouseLeave = () => {
        setIsHover(false);
    };

    const style = {border : isHover? (isOpen ? "solid 1px #3DB87C" : "solid 1px #EA8C78 " ): "solid rgba(50, 50, 93, 0.25) 1px" }




    switch (props.data.context) {

        case "big":
    

        
            return (
                <div className='casinoCard__big' onClick={(e) => navigate(`${props.data.casinoId}`)} style={style} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    <img src={props.data.img} alt='' />
                    <div>
                        <h4>{props.data.name}</h4>
                        <p>{props.data.adresse}</p>
                    </div>
                    <p>{props.data.ouverture} : {props.data.fermeture}</p>
                </div>
            )

        case "small":




            return (
                <div className='casinoCard__small' onClick={smallCasinoCardOnlick} style={style} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>

                    {props.data.name
                        && <h4>{props.data.name}</h4>
                    }
                    {props.data.adresse
                        && <p>{props.data.adresse}</p>
                    }

                </div>
            )
    }


}

export default CasinoCard