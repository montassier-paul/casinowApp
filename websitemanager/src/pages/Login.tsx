import "./Login.css"
import background from "../images/login-background.jpg"
import LoginCard from '../components/LoginCard'
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase";
import {useEffect} from "react"


function Login() {

    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
  
    useEffect(() => {
      if (loading) return;
      if (user) navigate("/Home");
    }, [user, loading]);

    return (
        <div className='login'>

            <img src={background} />
            <LoginCard />

        </div>

    )
}

export default Login


