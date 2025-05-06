import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import './Login.css'
import Categories from '../Categories/Categories';
import Navbar from '../Navbar/Navbar';
import {BASE_API_URL} from '../../constants.js'



export default function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async()=>{
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);
        try{
            //Consulta
            const response = await fetch(`${BASE_API_URL}/api/token/`,{
                method:'POST',
                body: formData
            })
            // .then(filter)
            .catch(error => console.error('Error filtering', error.text()));

            //Error (validación)
            // if(!response.ok){
            //     throw new Error('User not found');
            //     //alert('User not found');
            // }

            //Guardado del Token
            const data = await response.json();
            localStorage.setItem('access_token', data.access);
            localStorage.setItem('refresh_token', data.refresh);

            if(response.ok){
                window.location.href = '/categories';
            }

            //Redirección (lobby)
        } catch(error){
            console.error('Error logging', error); //error al fetch
        }
    }
    

    return (
        <div className='loginpage-container'>
            <Navbar/>
            <div className='loginpage-body'>
                <div className='loginpage-body-text text-1'>
                    Iniciar sesión en Memorial
                </div>
                <div className='loginpage-form'>
                    <div className='form-group'>
                        <label>Nombre de usuario</label>
                        <input type='text' id='username' name='username' onChange={(e) => {setUsername(e.target.value)}} />
                    </div>
                    <div className='form-group'>
                        <label>Contraseña</label>
                        <input type='password' id='password' name='password' onChange={(e) => {setPassword(e.target.value)}}/>
                    </div>
                    <button type='submit' className='btn-1 text-1' onClick={handleSubmit}>Acceder</button>
                    <div className='forgot-password'>
                        <a href='/create-account'>¿Aún no tienes cuenta? Regístrate</a>
                    </div>
                </div>
            </div>
        </div>
    )
}
