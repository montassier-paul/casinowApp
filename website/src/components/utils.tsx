import { propsButton, propsSearchBar, propsGameCard } from "../interface"
import "./Utils.css"
import { useState } from "react"
import { Table, Slot } from '../images/images'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLessRounded';


const Button = (props: propsButton) => {
    return (
        <button className="button" onClick={props.functions?.handleOnClick}>
            {props.data?.text}
        </button>
    )
}


const SearchBar = (props: propsSearchBar) => {

    // const handleOnChange = (event : React.ChangeEvent<HTMLInputElement>) => {
    //     props.functions.setQuery && props.functions.setQuery(event.target.value)
    //   }

    return (
        <div className='searchBar'>
            <input type={'text'} placeholder={props.data?.placeholder} onChange={(e: React.ChangeEvent<HTMLInputElement>) => props.functions.onChange && props.functions.onChange(e.target.value)} value={props.data.query} />
        </div>
    )

}

const GameCard = (props: propsGameCard) => {

    const [display, SetDisplay] = useState(false)

    return (
    <div className="gameCard" style={{ borderRadius : display ?'20px 20px 0 0' :  '20px'}}>
        <div className="gameCard__top">
            {props.type === "machine" &&
                <img src={Slot} />
            }
            {props.type === "table" &&
                <img src={Table} />
            }
            <h4>{props.nom}</h4>
            <p>{props.nombre}</p>
        </div>

        {props.desc && 
        <div className="gameCard__bottom">

            
            {!display
            
            ? <div onClick={() => SetDisplay(true)}>
                <ExpandMoreIcon />
                </div>
            : <div onClick={() => SetDisplay(false)} className="gameCard__desc">
                <p>{props.desc}</p>
                <ExpandLessIcon />
                </div>
            }

        </div>
            }
    </div>
    )
}


export { Button, SearchBar, GameCard }