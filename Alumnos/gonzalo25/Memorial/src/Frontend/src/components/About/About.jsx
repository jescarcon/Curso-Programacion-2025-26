import React from 'react'
import './About.css'
import Navbar from '../Navbar/Navbar'

export default function About() {
    return (
        <div>
            <Navbar />
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

        </div>
    )
}
