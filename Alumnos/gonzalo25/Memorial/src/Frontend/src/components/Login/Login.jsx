import React, { useState } from 'react'
import logo from '/images/home/logo.png'
import { Link } from 'react-router-dom';
import './Login.css'

export default function Login() {
    return (
        <div className='loginpage-container'>
            <div className='loginpage-header'>
                <div className='loginpage-logo' onClick={() => show_hide_toggle(false)}>
                    <Link to="/"><div><img src={logo} alt="Memorial Logo" /></div></Link>
                </div>

                <div className='loginpage-menu'>
                    <Link to="/CreateAccount"><button className='btn-1 text-1'>Crear cuenta</button></Link>
                </div>
            </div>

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
                    <button type='submit' class='btn-1 text-1'>Acceder</button>
                    <div class='forgot-password'>
                        <a href='/forgotPassword'>¿Olvidaste tu contraseña?</a>
                    </div>
                </div>
            </div>
        </div>
    )
}
