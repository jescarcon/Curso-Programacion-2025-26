import React, { use, useEffect, useState } from 'react'
import logo from '/images/home/logo.png'
import { Link, useNavigate} from 'react-router-dom';
import './Navbar.css'



export default function Navbar() {
    //#region Variables
    const Navigate = useNavigate();
    const [userSearch, setUserSearch] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [avatar, setAvatar] = useState(null);

    //#endregion

    //#region Logica
    const pressEnter = (e) => {

        if (e.key === 'Enter' && userSearch.trim() !== '') {
           Navigate(`/users/${userSearch}`);
        }
    }

    // Detecta si está logueado y saca la foto 
    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (token) {
            setIsLoggedIn(true);

            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                const userId = payload.user_id;

                fetch('http://127.0.0.1:8000/api/memorialApp/users/', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                    .then((res) => res.json())
                    .then((data) => {
                        const user = data.find(u => u.id === userId);
                        if (user && user.avatar) {
                            setAvatar(user.avatar);
                        }
                    })
                    .catch((err) => {
                        console.error('Error al obtener avatar:', err);
                    });

            } catch (err) {
                console.error('Error al decodificar token:', err);
            }
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    //Logout
    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        setIsLoggedIn(false);
        window.location.href = "/";
    };

    //Cierra menu del perfil al clicar fuera
    useEffect(() => {
        const handleClickOutside = (event) => {
            const menu = document.querySelector('.navbar-profile-menu');
            if (menu && !menu.contains(event.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    //#endregion

    return (
        <div className='navbar-header'>
            <div className='navbar-logo'>
                {isLoggedIn && (
                    <>
                        <Link to="/categories">
                            <div><img src={logo} alt="Memorial Logo" /></div>
                        </Link>
                    </>
                )}
                {!isLoggedIn && (
                    <>
                        <div><img src={logo} alt="Memorial Logo" /></div>
                    </>
                )}
            </div>

            <div className='navbar-menu'>
                {/*Si no esta log*/}
                {!isLoggedIn && (
                    <>
                        <Link to="/login"><button className='btn-1 text-1'>Iniciar sesión</button></Link>
                        <Link to="/about"><button className='btn-1 text-1'>¿Qué es Memorial?</button></Link>

                    </>
                )}

                {/*Si esta log*/}
                {isLoggedIn && (
                    <>
                        <div className='navbar-search'>
                            <input
                                type="text"
                                placeholder='Buscar usuario'
                                onKeyDown={pressEnter}
                                onChange={(e) => setUserSearch(e.target.value)}
                                value={userSearch}
                            />
                        </div>

                        <div className="navbar-profile-menu">
                            <div
                                className="profile-icon"
                                onClick={() => setShowMenu(!showMenu)}
                            >
                                {avatar ? (
                                    <img src={`/images/avatars/${avatar}`} alt="Avatar" className="avatar-img" />
                                ) : (
                                    <div className="profile-placeholder">👤</div>
                                )}
                            </div>

                            {showMenu && (
                                <div className="dropdown-menu">
                                    <Link to="/profile" className="dropdown-item">Perfil</Link>
                                    <div className="dropdown-item" onClick={handleLogout}>
                                        Cerrar sesión
                                    </div>
                                </div>
                            )}
                        </div>
                    </>
                )}

            </div>

        </div>

    )
}
