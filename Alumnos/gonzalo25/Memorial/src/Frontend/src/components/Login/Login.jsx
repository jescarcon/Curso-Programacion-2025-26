import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import './Login.css'
import Categories from '../Categories/Categories';
import Navbar from '../Navbar/Navbar';


export default function Login() {
    return (
        <div className='loginpage-container'>
            <Navbar/>
            <div class='loginpage-body'>
                <div class='loginpage-body-text text-1'>
                    Iniciar sesión en Memorial
                </div>
                <div class='loginpage-form'>
                    <div class='form-group'>
                        <label for='username'>Nombre de usuario</label>
                        <input type='text' id='username' name='username' />
                    </div>
                    <div class='form-group'>
                        <label for='password'>Contraseña</label>
                        <input type='password' id='password' name='password' />
                    </div>
                    <Link to='/categories'><button type='submit' class='btn-1 text-1'>Acceder</button></Link>
                    <div class='forgot-password'>
                        <a href='/forgotPassword'>¿Olvidaste tu contraseña?</a>
                    </div>
                </div>
            </div>
        </div>
    )
}
