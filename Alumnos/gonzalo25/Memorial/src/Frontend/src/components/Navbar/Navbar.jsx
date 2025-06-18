import React, { useEffect, useState } from 'react'
import logo from '/images/home/logo.png'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import './Navbar.css'
import { BASE_API_URL } from '../../constants';
import categoryComponent from '../../App';
import search_icon from '/images/navbar/search_icon.png';

export default function Navbar() {
    //#region Variables
    const Navigate = useNavigate();
    const [userSearch, setUserSearch] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false); //Control de si el usuario está logueado o no
    const [showMenu, setShowMenu] = useState(false); //Controla si el menú está abierto o cerrado
    const [avatar, setAvatar] = useState(null);
    //#endregion 

    //#region Lógica

    const pressEnter = (e) => {
        if (e.key == 'Enter' && userSearch.trim() !== '') {
            Navigate(`/users/${userSearch.trim()}`);
        }
    }

    useEffect(() => {
        const access_token = localStorage.getItem('access_token');
        setIsLoggedIn(!!access_token) //True si existe el token y false si no
        if (access_token) {
            setIsLoggedIn(true)
            try {
                const tokenDataJSON = JSON.parse(atob(access_token.split(".")[1]));
                const userID = tokenDataJSON.user_id;
                fetch(`${BASE_API_URL}/api/memorialApp/users`, {
                    headers: {
                        Authorization: `Bearer ${access_token}`,
                    },
                })
                    .then((res) => res.json())
                    .then((data) => {
                        const user = data.find(u => u.id === userID);
                        if (user && user.avatar) {
                            setAvatar(user.avatar);
                        }
                    }).catch((error) => {
                        console.error("Error al obtener avatar", error);
                    })
                    ;
            } catch (error) {
                console.error("Error al obtener avatar", error);
            }
        } else {
            setIsLoggedIn(false);
        }
    }, [])

    //Logout
    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        setIsLoggedIn(false);
        window.location.href = '/';
    }

    //Login
    const navigateLogin = () => {
        window.location.href = "/login";
    };
    const navigateRegister = () => {
        window.location.href = "/create-account";
    };
    useEffect(() => {
        const handleClickOutside = (e) => {
            const menu = document.querySelector('.navbar-profile-menu');
            if (menu && !menu.contains(e.target)) {
                setShowMenu(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [])

    //#endregion

    return (
        <nav className="navbar navbar-expand-lg navbar-light navbar-container">
            <div className="container">
                <div className='navbar-logo'>
                    {!isLoggedIn && (
                        <Link to="/"><div><img src={logo} alt="Memorial Logo" /></div></Link>
                    )}
                    {isLoggedIn && (
                        <Link to="/categories"><div><img src={logo} alt="Memorial Logo" /></div></Link>

                    )}

                </div>

                <button className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        {isLoggedIn ? (
                            <>
                                <form class="d-flex input-group w-auto">
                                    <input
                                        type="search"
                                        class="form-control rounded"
                                        placeholder="Busca usuarios"
                                        aria-label="Search"
                                        aria-describedby="search-addon"
                                        onKeyDown={pressEnter}
                                        onChange={(e) => setUserSearch(e.target.value)}
                                        value={userSearch}
                                    />
                                    <img
                                        src={search_icon}
                                        height="30"
                                        alt=""
                                        className='d-block my-auto'
                                    />
                                </form>

                                <li className="nav-item dropdown">
                                    <a
                                        className="nav-link dropdown-toggle d-flex align-items-center"
                                        href="#"
                                        id="navbarDropdownMenuLink"
                                        role="button"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                    >
                                        <img
                                            src={`/images/avatars/${avatar}`}
                                            className="rounded-circle"
                                            height="30"
                                            alt=""
                                        />
                                    </a>
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                        <li><a className="dropdown-item" href="#">My profile</a></li>
                                        <li><a className="dropdown-item"  onClick={handleLogout}>Logout</a></li>
                                    </ul>


                                </li>
                            </>
                        ) : (
                            <>
                                <button type="button" className="btn px-3 me-2 bo" onClick={() => navigateLogin()}>
                                    Inicia Sesión
                                </button>
                                <button type="button" id="register_button" className="btn me-3 register_button" onClick={() => navigateRegister()}>
                                    Únete
                                </button>
                            </>)}

                    </ul>
                </div>
            </div>
        </nav>


    )
}
