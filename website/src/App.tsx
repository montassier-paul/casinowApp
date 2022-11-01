import './App.css';
import {
  Routes,
  Route
} from "react-router-dom";
import Header from './components/Header';
import Home from './pages/Home';
import CasinoPage from './pages/CasinoPage';
import MapCasinos from "./pages/Map"
import Footer from './components/Footer';
import Conditions from './pages/Conditions';
import Contact from './pages/Contact';
import Casinos from './pages/Casinos';
import {useEffect} from "react"
import { fetchCasinos, fetchWebsiteData  } from "./context/apiManager"
import { useAppDispatch, useAppSelector } from "./store"
import Learn from './pages/Learn';


function App() {

  const dispatch = useAppDispatch()
  const apiStatusCasinos = useAppSelector(state => state.casinos.status)
  const apiStatusWebsite = useAppSelector(state => state.webData.status)


  useEffect(() => {

    if(apiStatusCasinos === 'idle'){
      dispatch(fetchCasinos())
    }

  }, [apiStatusCasinos, dispatch])

  useEffect(() => {
    
    if(apiStatusWebsite === 'idle'){
      dispatch(fetchWebsiteData ())
    }

  }, [apiStatusWebsite, dispatch])

  
  return (
    <>
    <Header/>

    <Routes>
      <Route path="Home" element={<Home/>} />
      <Route path="contact" element={<Contact/>} />
      <Route path="conditions" element={<Conditions/>} />
      <Route path="learn" element={<Learn/>} />
      <Route path="/casinos" >
        <Route path='' element={<Casinos/>}/>
        <Route path=":casinoId" element={<CasinoPage />} />
      </Route>
      <Route path="*" element={<Home />} />
      <Route path="map" element={<MapCasinos/>} />
    </Routes>

    <Footer/>

    </>

  );
}

export default App;
