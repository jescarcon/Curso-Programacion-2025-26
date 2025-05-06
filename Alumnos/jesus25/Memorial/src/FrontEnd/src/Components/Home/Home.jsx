import React, { useState } from 'react'
import fondo from '/images/home/home-img.jpg'
import './Home.css'
import Navbar from '../Navbar/Navbar'

export default function HomePage() {
    const [showAbout, setShowAbout] = useState(false);

    const show_hide_toggle = (e) => {
        setShowAbout(e);
    };

    return (
        <div className='homepage-container'>
            <Navbar />
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
        </div>
    )
}