import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '/images/home/logo.png'
import './Navbar.css'

export default function Navbar() {
    const [searchUser, setSearchUser] = useState('')
    const navigate = useNavigate()

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && searchUser.trim() !== '') {
            navigate(`/users/${searchUser.trim()}`)
        }
    }
    

    return (
        <div className='navbar-header'>
            <div className='navbar-logo'>
                <Link to="/"><img src={logo} alt='Memorial Logo' /></Link>
            </div>
            <div className='navbar-menu'>
                <input
                    type="text"
                    placeholder="Buscar usuario..."
                    value={searchUser}
                    onChange={(e) => setSearchUser(e.target.value)}
                    onKeyDown={handleKeyPress}
                    className="navbar-search"
                />
                <Link to="/categories"><button className='btn-1 text-1'>Iniciar sesión</button></Link>
                <Link to="/about">
                    <button className='btn-1 text-1'>
                        ¿Qué es un Memorial?
                    </button>
                </Link>
            </div>
        </div>
    )
}
