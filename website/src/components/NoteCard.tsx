import React, {useState, useEffect} from 'react'
import { propsNoteCard } from '../interface'
import "./NoteCard.css"
import StarRateIcon from '@mui/icons-material/StarRate';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import { putVote } from '../context/apiManager';
import { useAppDispatch } from '../store';
import { useParams } from 'react-router-dom';

function NoteCard(props : propsNoteCard) {

    const [score, setScore] = useState<{full : number, half : number, empty : number}>({full : 0, half : 0, empty : 5})
    const [vote, setVote] = useState<number>()
    const dispatch = useAppDispatch()
    const casinoId = useParams().casinoId

    useEffect(() => {
        
        if(props.somme && props.votes){
            var full = Math.floor(props.somme/props.votes)
            var half = Math.floor((props.somme/props.votes - full) / 0.5)
            var empty = 5 - full - half
            setScore({full : full, half : half, empty : empty})
        }

    }, [props])

    const StarsScore = () => {
        let key = 1
        let content = [];
        for (let i = 0; i < score.full; i ++) {
          content.push(<StarRateIcon style={{color:'red'}} key={key} />);
          key ++; 
        }
        for (let i = 0; i < score.half; i ++) {
            content.push(<StarHalfIcon style={{color : 'red'}} key={key}/>); 
            key ++; 
          }
          for (let i = 0; i < score.empty; i ++) {
            content.push(<StarRateIcon key={key}/>);
            key ++; 
          }

        return content;

    }

    const handleMouseEnter = (value : number) => {

        setVote(value)

        for(let i = 1; i < 6; i ++ ){

            const el = document.getElementById(String(i));
            if(el) { 
                if(i <= value) {el.style.color = 'red' }
                else {el.style.color = 'black'}
            }
            

        }        

    }

    const handleMouseLeave = (value : number) => {


    }

    const handleOnClick = () => {

        if(vote && casinoId){

            dispatch(putVote({payload : {vote : vote, casinoId : casinoId}}))
            setVote(undefined)
            for(let i = 1; i < 6; i ++ ){

                const el = document.getElementById(String(i));
                if(el) { 
                    el.style.color = 'black'
                }
                

            }   
            
        }

        else {
            alert("You should vote")
        }

        
    }
  return (
    <div className='noteCard'>


        <div className='noteCard_score'>

            Votes :
            
            {StarsScore()}

        </div>

        <div className='noteCard_vote'>

        <div onMouseEnter={(e) => handleMouseEnter(1)}>
        <StarRateIcon  id='1' />
        </div>

        <div onMouseEnter={(e) => handleMouseEnter(2)}>
        <StarRateIcon  id='2' />
        </div>

        <div onMouseEnter={(e) => handleMouseEnter(3)}>
        <StarRateIcon  id='3' />
        </div>

        <div onMouseEnter={(e) => handleMouseEnter(4)}>
        <StarRateIcon  id='4' />
        </div>

        <div onMouseEnter={(e) => handleMouseEnter(5)}>
        <StarRateIcon  id='5' />
        </div>


        <button onClick={handleOnClick}>
            Voter
        </button>

        
        
        </div>

    </div>
  )
}

export default NoteCard