import './CasinoCard.css'
import { propsCasinoCard } from '../interfaces'
import { useNavigate } from 'react-router-dom'

function CasinoCard(props: propsCasinoCard) {

  const navigate = useNavigate()

  const handleOnclick = () => {

    if (props.data.newCasinoCard) {

      navigate("/casinos/new")

    }
    if (props.data.casinoId) {
      navigate("/casinos/" + props.data.casinoId)
    }

  }

  return (
    <div className='casinoCard' onClick={handleOnclick}>
      {props.data.newCasinoCard
        && <h4>New Casino</h4>
      }
      {props.data.name
        && <h4>{props.data.name}</h4>
      }
      {props.data.adresse
        && <p>{props.data.adresse}</p>
      }






    </div>
  )

}

export default CasinoCard


