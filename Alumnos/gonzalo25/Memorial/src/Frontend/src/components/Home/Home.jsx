import React, { useState } from 'react'
import logo from '/images/home/logo.png'
import { Link } from 'react-router-dom';
import fondo from '/images/home/home-img.jpg'
import './Home.css'

export default function HomePage() {
    const [showAbout, setShowAbout] = useState(false);

    const show_hide_toggle = (e) => {
        setShowAbout(e);
    };

    return (
        <div className='homepage-container'>
            <div className='homepage-header'>
                <div className='homepage-logo' onClick={() => show_hide_toggle(false)}>
                    <Link to="/"><div><img src={logo} alt="Memorial Logo" /></div></Link>
                </div>

                <div className='homepage-menu'>
                    <Link to="/login"><button className='btn-1 text-1'>Iniciar sesión</button></Link>
                    <button className='btn-1 text-1' onClick={() => show_hide_toggle(true)}>¿Qué es Memorial?</button>
                </div>
            </div>

            {!showAbout && (
                <div className='homepage-body'>
                    <div className='homepage-body-text text-1'>
                        ¿Eres amante del entretenimiento y quieres tener tu biblioteca personal de tus películas,
                        series, novelas, anime, manga y videojuegos favoritos? con Memorial, ¡es posible!
                    </div>
                    <div className='homepage-body-img'>
                        <img src={fondo} alt="Imagen Inicio" />
                    </div>
                </div>
            )}

            {showAbout && (
                <div className='homepage-about text-1'>
                    <p>
                        Memorial es una aplicación desarrollada para todo aquel que quiera tener almacenada una biblioteca personal donde tenga a mano los medios
                        de entretenimiento (película, serie, novela, anime, manga o videojuego).
                    </p>
                    <p>
                        Es normal que cuando estás conociendo a alguien y sale el tema de qué os gusta ver/leer, en estas situaciones a más de uno se le ha
                        olvidado más de la mitad de las cosas que algún día vio o leyó. Es aquí donde entra Memorial.
                    </p>
                    
                    <div className='homepage-about-creator text-1'>
                        <p>Desarrollada por Gzl27, sobre mí: <a href="https://gzl27.carrd.co/" target="_blank" rel="noopener noreferrer">https://gzl27.carrd.co/</a></p>
                    </div>
                </div>
            )}
        </div>
    )
}