import { useNavigate } from 'react-router-dom'
import "./Footer.css"

function Footer() {

  const navigate = useNavigate()

  return (
    <div className='footer'>
      <p>
      © 2022 Casinow
      </p>
      <div onClick={() => navigate("/conditions")}>
        Conditions d'utilisation
      </div>
      <div onClick={() => navigate("/contact")}>
        Contact
      </div>
    </div>
  )
}

export default Footer