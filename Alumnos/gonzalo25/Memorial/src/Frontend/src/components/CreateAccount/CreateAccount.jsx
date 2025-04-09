import React, { useState } from 'react'
import logo from '/images/home/logo.png'
import createAccImage from '/images/home/create-acc.jpeg'
import { Link } from 'react-router-dom';
import './CreateAccount.css'

export default function CreateAccount() {
    return (
        <div className='createacc-container'>
            <div className='createacc-header'>
                <div className='createacc-logo' onClick={() => show_hide_toggle(false)}>
                    <Link to="/"><div><img src={logo} alt="Memorial Logo" /></div></Link>
                </div>
            </div>
            <div className='createacc-body-text text-1'>
                Creación de cuenta en Memorial
            </div>

            <div className='createacc-body'>
                <div className='homepage-body-img'>
                    <img src={createAccImage} alt="Creación de cuenta" />
                </div>

                <div className='createacc-form'>
                    <div className='form-group'>
                        <label htmlFor='username'>Nombre de usuario</label>
                        <input type='text' id='username' name='username' />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='email'>Dirección de correo electrónico</label>
                        <input type='email' id='email' name='email' />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='password'>Contraseña</label>
                        <input type='password' id='password' name='password' />
                    </div>
                    <button type='submit' className='btn-1 text-1'>Crear cuenta</button>
                </div>
            </div>
        </div>
    )
}
