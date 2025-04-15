import React from 'react'
import { Link } from 'react-router-dom'
import logo from '/images/home/logo.png'
import './Navbar.css'

export default function Navbar() {
    return (
        <div className='navbar-header'>
            <div className='navbar-logo'>
                <Link to="/"><img src={logo} alt='Memorial Logo' ></img></Link>
            </div>
            <div className='navbar-menu'>
                <Link to="/categories"><button className='btn-1 text-1'>Iniciar sesión</button></Link>
                <Link to="/about"><button className='btn-1 text-1'>¿Qué es un Memorial?</button></Link>
            </div>
        </div>
    )
}
