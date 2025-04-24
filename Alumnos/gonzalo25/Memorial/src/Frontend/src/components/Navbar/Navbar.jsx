import React from 'react'
import logo from '/images/home/logo.png'
import { Link } from 'react-router-dom';
import './Navbar.css'

export default function Navbar() {
    return (
        <div className='navbar-header'>
            <div className='navbar-logo'>
                <Link to="/"><div><img src={logo} alt="Memorial Logo" /></div></Link>
            </div>

            <div className='navbar-menu'>
                <Link to="/login"><button className='btn-1 text-1'>Iniciar sesión</button></Link>
                <Link to="/about"><button className='btn-1 text-1'>¿Qué es Memorial?</button></Link>
            </div>
        </div>

    )
}
