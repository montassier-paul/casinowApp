import React, { useState } from 'react'
import { Authentification } from '../firebase/authentification'
import './Login.css'
import imgBackground from "../images/BackgroundLoginImage.jpg"
import Logo from "../images/Logo.png"

// to do : display error 
const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        const name = event.currentTarget.name;
        const value = event.currentTarget.value;

        if (name === 'email') {
            setEmail(value)
        }
        if (name === "password") {
            setPassword(value)
        }
    }

    const submit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        await Authentification("signIn", email, password)

    }



    return (
        <div className='login-page-man'>
            <img src={imgBackground} className="image-background" />
            <div className='login-form'>
                <form onSubmit={submit}>
                    <div className='logo-container'>
                        <img src={Logo} className="image-logo" />
                        <h2 className='brand'>CASINOW</h2>
                    </div>
                    
                    <h2 className='login-title'>Manage your room</h2>
                    <label className="login-input">
                        Email :
                        <input type="email" name="email" value={email} onChange={handleChange} className="input-field" />
                    </label>
                    <label className="login-input">
                        Password:
                        <input type="password" value={password} name="password" onChange={handleChange} className="input-field" />
                    </label>
                    <input type="submit" value="Connect" className='login-button' />
                </form>
            </div>


        </div>
    )
}

export default Login