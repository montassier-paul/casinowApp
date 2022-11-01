import "./Header.css"
import { Logo } from "../images/images"
import { useNavigate } from "react-router-dom"
import { useAppSelector } from "../store"

function Header() {

    const navigate = useNavigate()
    return (
        <div className='header'>

            <div className='header_left'>

                <img src={Logo} alt='' onClick={() => navigate("/Home")} />
                <h3> CASINOW </h3>

            </div>
            <div className='header_right'>


                <div onClick={() => navigate("/home")}>
                    Home
                </div>
                <div onClick={() => navigate("/casinos")}>
                    Casinos
                </div>
                <div onClick={() => navigate("/map")}>
                    Map
                </div>
                <div onClick={() => navigate("/learn")}>
                    Learn
                </div>


            </div>

        </div>
    )
}

export default Header