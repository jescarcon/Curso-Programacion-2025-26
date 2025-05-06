import React, { useEffect, useState } from 'react'
import logo from '/images/home/logo.png'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import './Navbar.css'



export default function Navbar() {

    const Navigate = useNavigate();
    const [userSearch, setUserSearch] = useState('');

    const pressEnter = (e)=>{

        if(e.key === 'Enter' && userSearch.trim() !== '') {
            Navigate(`/users/${userSearch}`);
        } 
    }


    return (
        <div className='navbar-header'>
            <div className='navbar-logo'>
                <Link to="/"><div><img src={logo} alt="Memorial Logo" /></div></Link>
            </div>

            <div className='navbar-menu'>
                <Link to="/login"><button className='btn-1 text-1'>Iniciar sesión</button></Link>
                <Link to="/about"><button className='btn-1 text-1'>¿Qué es Memorial?</button></Link>
                <Link to='/profile'><button className='btn-1 text-1'>Perfil</button></Link>
            </div>
            <div className='navbar-search'>
                <input type="text" placeholder='Usuario' onKeyDown={pressEnter} onChange={(e)=>setUserSearch(e.target.value)} value={userSearch}>
                </input>
            </div>
        </div>

    )
}
