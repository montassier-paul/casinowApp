import { propsHeader } from "../interfaces"
import "./Header.css"
import Logo from "../images/logo.png"
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import HomeIcon from '@mui/icons-material/Home';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { UserSignOut } from "../firebase/firebase";
import { useContext, useEffect, useState } from "react";
import ApiContext from "../context/ApiContext";

function Header(props: propsHeader) {

  let navigate = useNavigate()

  const { casinos } = useContext(ApiContext)
  const [casinoName, setCasinoName] = useState<string>()

  const handleOnClick = (context: string) => {

    if (context === "Home") {
      navigate("/Home");
    }
    if (context === "Quit") {
      UserSignOut()
    }


  }

  const casinoId = useParams().casinoId
  const pageName = useLocation().pathname


  useEffect(() => {

    if (casinoId) {
      casinos.map((casino) => {
        if (casino._id === casinoId) {
          setCasinoName(casino.nom)
        }
      })
    }
    else {
      setCasinoName(undefined)
    }

  }, [casinoId])


  return (
    <>
      {pageName.toUpperCase() !== "/LOGIN" &&

        <div className='header'>
          <div className="header_left">
            <img src={Logo} onClick={() => handleOnClick("Home")} />
            {casinoName
              ? <h3> {casinoName}</h3>
              : <h3> CASINOW </h3>

            }


          </div>

          <div className="header_right">
            <div onClick={() => handleOnClick("Quit")}>
              <ExitToAppIcon />
            </div>

            <div onClick={() => handleOnClick("Home")}>
              <HomeIcon />
            </div>


          </div>


        </div>

      }

    </>

  )
}

export default Header