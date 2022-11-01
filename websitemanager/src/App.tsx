import './App.css';
import {
  Routes,
  Route
} from "react-router-dom";
import Home from './pages/Home';
import CasinoPage from './pages/CasinoPage';
import Login from './pages/Login';
import NewCasino from './pages/NewCasino';
import { ApiContextProvider } from './context/ApiContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import LearnPageManagement from './pages/LearnPageManagement';
import HomePageManagement from './pages/HomePageManagement';
import ConditionsPageManagement from './pages/ConditionsPageManagement';


function App() {



  return (
    <ApiContextProvider>
      <Header/>
      <Routes>
          <Route path="Home" element={<Home />} />
          <Route path="/casinos" >
            <Route path=":casinoId" element={<CasinoPage />} />
            <Route path="new" element={<NewCasino />} />
          </Route>
          <Route path="/websiteManagement" >
            <Route path="home" element={<HomePageManagement />} />
            <Route path="learn" element={<LearnPageManagement />} />
            <Route path="conditions" element={<ConditionsPageManagement />} />
          </Route>
          <Route path="*" element={<Home />} />    
        <Route path="login" element={<Login />} />
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </ApiContextProvider>

  )
}

export default App

