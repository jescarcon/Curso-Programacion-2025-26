import React from 'react'
import logo from '/images/home/logo.png'
import { Link } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import './About.css'

export default function About() {
    return (
        <>
            <Navbar />
            <div className='about-container'>
                <div className='about-container-text text-1'>
                    <p>
                        Memorial es un aplicación desarrollada para todo aquel que quiera tener almacenada una biblioteca personal donde tenga a mano los medios de entretenimiento
                        (película, serie, novela, anime, manga o videojuego).
                    </p>
                    <p>
                        Es normal que cuando estás conociendo a alguien y sale el tema de qué os gusta ver/leer, en estas situaciones
                        a más de uno se le ha olvidado más de la mitad de las cosas que algún día vio o leyó. Es aquí donde entra Memorial
                    </p>
                </div>
                <div className='about-container-link text-1'>
                    Desarrollada por Gzl27, sobre mí: https://gzl27.carrd.co/
                </div>
            </div>
        </>
    )
}
