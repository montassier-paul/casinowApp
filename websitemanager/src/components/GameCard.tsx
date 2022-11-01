import React, { useState, useRef, useEffect } from 'react'
import "./GameCard.css"
import { propsGameCard } from '../interfaces'
import slot from "../images/slot.png"
import table from "../images/table.png"
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import DeleteIcon from '@mui/icons-material/Delete';
import useMediaQuery from '@mui/material/useMediaQuery';




function GameCard(props: propsGameCard) {

    const myRef = useRef<HTMLDivElement>(null);
    const [x, setX] = useState<number>(0)
    const [y, setY] = useState<number>(0)
    const small_screen = useMediaQuery('(max-width:900px)');

    const getPosition = () => {

        if (myRef.current) {
            const x = myRef.current.offsetLeft;
            setX(x);

            const y = myRef.current.offsetTop;
            setY(y);

        }
    };

    useEffect(() => {
        getPosition();
    }, []);

    useEffect(() => {
        window.addEventListener("resize", getPosition);
    }, []);

    const handleDeleteClick = () => {
        props.functions.handleDeleteGame(props.data)
    }

    const DescContainer = ({ handleOnClick, desc, position }: { handleOnClick: () => void, desc: string, position: { x: number, y: number } }) => {

        return (
            <div  className="gameCard_desc" style={{ top: position.y + 62, left: position.x }}>
                <p>{desc}</p>
                <div className='' onClick={handleOnClick}>
                <ExpandLessIcon />
                </div>
            </div>
        )
    }

    const [text, setText] = useState(false)

    const handleOnClick = () => {
        setText(prev => !prev)
    }

    return (
        <div className='gameCard' ref={myRef}>
            <div className='deleteButton' onClick={handleDeleteClick}>
            <DeleteIcon/>
            </div>
            <div className='gameCard_top'>
                {props.data.type === "machine" &&
                    <img src={slot} />
                }
                {props.data.type === "table" &&
                    <img src={table} />
                }
                <h4>{props.data.nom}</h4>
                {props.data.nombre && <p>{props.data.nombre}</p>}
            </div>
            {props.data.desc &&
                <div className='gameCard_bottom'>
                    <div onClick={handleOnClick}>
                            <ExpandMoreIcon />
                    </div>
                    {text && <DescContainer handleOnClick={handleOnClick} desc={props.data.desc} position={{ x: x, y: y }} />

                    }
                </div>
            }


        </div>
    )
}

export default GameCard