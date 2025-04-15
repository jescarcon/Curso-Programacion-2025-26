import React from 'react'
import home_img from '/images/home/home_img.jpg'
import './Home.css'
import Navbar from '../Navbar/Navbar'

export default function Home() {

    return (
        <div className='home-container'>
            <Navbar/>
            <div className='home-body'>
                <div className='home-body-text text-1'>
                    ¿Eres amante del entretenimiento y quieres tener tu biblioteca personal de tus películas,
                    series, novelas, anime, manga y videojuegos favoritos? con Memorial, ¡es posible!
                </div>

                <div className='home-body-img'>
                    <img src={home_img} alt='Home Image' ></img>

                </div>

            </div>
        </div>
    )
}
