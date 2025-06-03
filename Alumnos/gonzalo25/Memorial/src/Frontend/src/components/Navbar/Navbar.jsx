import React, { useEffect, useState } from 'react'
import logo from '/images/home/logo.png'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import './Navbar.css'
import { BASE_API_URL } from '../../constants';
import categoryComponent from '../../App';


export default function Navbar() {
    //#region Variables
    const Navigate = useNavigate();
    const [userSearch, setUserSearch] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false); //Control de si el usuario está logueado o no
    const [showMenu, setShowMenu] = useState(false); //Controla si el menú está abierto o cerrado
    const [avatar, setAvatar] = useState(null);
    //#endregion 

    //#region Lógica

    const pressEnter=(e)=>{
        if(e.key == 'Enter' && userSearch.trim()!==''){
            Navigate(`/users/${userSearch.trim()}`);
        }
    }

    useEffect( ()=>{
        const access_token = localStorage.getItem('access_token');
        setIsLoggedIn(!!access_token) //True si existe el token y false si no
        if(access_token){
            setIsLoggedIn(true)
            try{
                const tokenDataJSON = JSON.parse(atob(access_token.split(".")[1]));
                const userID = tokenDataJSON.user_id;
                fetch(`${BASE_API_URL}/api/memorialApp/users`,{
                    headers:{
                        Authorization:`Bearer ${access_token}`,
                    },
                })
                .then((res)=> res.json())
                .then((data)=>{
                    const user = data.find(u => u.id === userID);
                    if(user && user.avatar){
                        setAvatar(user.avatar);
                    }
                }).catch((error)=>{
                    console.error("Error al obtener avatar", error);
                })
                ;
            } catch(error) {
                console.error("Error al obtener avatar", error);
            }
        } else {
            setIsLoggedIn(false);
        }
    },[])

    //Logout
    const handleLogout=()=>{
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        setIsLoggedIn(false);
        window.location.href = '/';
    }

    useEffect( ()=>{
        const handleClickOutside=(e)=>{
            const menu = document.querySelector('.navbar-profile-menu');
            if(menu && !menu.contains(e.target)){
                setShowMenu(false);
            }
        }
        document.addEventListener('mousedown',handleClickOutside);
        return()=>{
            document.removeEventListener('mousedown',handleClickOutside);
        }
    },[])

    //#endregion

    return (
        <div className='navbar-header'>
            <div className='navbar-logo'>
                {!isLoggedIn && (
                    <Link to="/"><div><img src={logo} alt="Memorial Logo" /></div></Link>
                )}
                {isLoggedIn && (
                    <Link to="/categories"><div><img src={logo} alt="Memorial Logo" /></div></Link>

                )}
                
            </div>

            <div className='navbar-menu'>
                {!isLoggedIn && (
                    <>
                        <Link to="/login"><button className='btn-1 text-1'>Iniciar sesión</button></Link>
                        <Link to="/about"><button className='btn-1 text-1'>¿Qué es Memorial?</button></Link>
                    </>
                )}
                {isLoggedIn && (
                    <>
                        <div className='navbar-search'>
                            <input type="text" placeholder='Usuario' onKeyDown={pressEnter} onChange={(e)=>setUserSearch(e.target.value)} value={userSearch}>
                            </input>
                        </div>
                        <div className='navbar-profile-menu'>
                            <div className='profile-icon' onClick={()=>setShowMenu(!showMenu)}>
                                <img src={`/images/avatars/${avatar}`} alt="" className='profile-icon-img'/>
                            </div>
                            {showMenu && (
                                <div className='dropdown-menu'>
                                    <Link to='/profile' className='dropdown-menu-item'>Perfil</Link>
                                    <div className='dropdown-menu-item' onClick={handleLogout}>Cerrar sesión</div>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
            
        </div>

    )
}
