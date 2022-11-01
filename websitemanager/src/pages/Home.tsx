import Header from '../components/Header'
import CasinosManagementComponent from '../components/CasinosManagementComponent'
import './Home.css'
import { useContext, useEffect } from "react"
import { ApiContext } from "../context/ApiContext"
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase";
import Loading from '../components/Loading'
import WebsiteMangementComponent from '../components/WebsiteManagementComponent'


function Home() {

  const { getCasinos, getWebsiteData } = useContext(ApiContext)
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    getCasinos()
    getWebsiteData()
  }, [])

  useEffect(() => {
    if (loading) return;
    if (!user) navigate("/Login");
  }, [user, loading]);



  return (
    <>
      {user ?
        <div>
          <div className='home_body'>
            <CasinosManagementComponent />
            <WebsiteMangementComponent/>
          </div>
        </div>


        : <Loading />

      }

    </>
  )
}

export default Home






