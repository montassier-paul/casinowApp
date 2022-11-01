import "./LoginCard.css"
import Logo from "../images/logo.png"
import { UserSignIn } from "../firebase/firebase";
import { useState } from "react"
import { toast } from 'react-toastify';

function LoginCard() {

  const [email, setEmail] = useState<string>(''); 
  const [password, setPassword] = useState<string>(""); 

  const handleOnClick = async() => {
    if(email.length && password.length){
      
      UserSignIn(email, password)
    }
    else{
      toast("Email and password needed")
    }
    
    
  }

  const handleOnChange = (e : React.ChangeEvent<HTMLInputElement>) => {

    if(e.target.name === "email"){
      setEmail(e.target.value)
    }
    if(e.target.name === "password"){
      setPassword(e.target.value)
    }
    

  }
  return (
    <div className='loginCard'>
      <h2>
        Welcome
      </h2>
      <h3>
        <img src={Logo} />
        CASINOW
      </h3>

      <input type="text" placeholder="Email" name="email" value={email} required  onChange={handleOnChange}/>
      <input type="password" placeholder="password" name="password" value={password} required onChange={handleOnChange}/>



      <button onClick={handleOnClick}>
        Login
      </button>
    </div>
  )
}

export default LoginCard


