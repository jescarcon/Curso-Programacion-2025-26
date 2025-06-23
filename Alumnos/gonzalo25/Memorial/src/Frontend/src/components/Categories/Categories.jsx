import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import './Categories.css'

import SerieImg from '/images/categories/series.jpg'
import PeliImg from '/images/categories/peliculas.jpg'
import AnimeImg from '/images/categories/animes.jpg'
import MangaImg from '/images/categories/manga.jpg'
import NovelaImg from '/images/categories/novelas.jpg'
import JuegoImg from '/images/categories/videojuegos.jpg'
import Navbar from '../Navbar/Navbar';
import { Navigate } from 'react-router-dom';



export default function Categories() {
    const urlActual = window.location.href;
    const { user } = urlActual.includes('users') ? useParams() : "";
    const navigate=useNavigate();

    const categories = [
        { name: 'Series', image: SerieImg, tag: 'serie' },
        { name: 'Películas', image: PeliImg, tag: 'film' },
        { name: 'Anime', image: AnimeImg, tag: 'anime' },
        { name: 'Manga', image: MangaImg, tag: 'manga' },
        { name: 'Novelas', image: NovelaImg, tag: 'novel' },
        { name: 'Videojuegos', image: JuegoImg, tag: 'game' }
    ]

    return (
        <>
            <Navbar />

            <div className="categories-container">
                {categories.map((e) => {
                    const ruta = urlActual.includes('users') ? `/users/${user}/categories/${e.tag}` : `/categories/categoryDetail/${e.tag}`;
                    return (
                        <div key={e.tag} className='category-card' onClick={() => navigate(ruta)}>
                            <img src={e.image} alt={e.name} className='category-image' />
                            <h3>{e.name}</h3>
                        </div>
                    );
                })}

            </div>
        </>
    );
}
