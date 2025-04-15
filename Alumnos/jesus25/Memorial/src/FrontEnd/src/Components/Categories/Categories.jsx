import React from 'react'
import { Link, useParams } from 'react-router-dom'

import AnimeImg from '/images/category/Anime.jpg'
import MangaImg from '/images/category/Manga.jpg'
import SerieImg from '/images/category/Serie.jpg'
import FilmImg from '/images/category/Film.jpg'
import GameImg from '/images/category/Game.jpg'
import NovelImg from '/images/category/Novel.jpg'

import './Categories.css'
import Navbar from '../Navbar/Navbar'

export default function Categories() {
    const { pk } = useParams();

    const categories = [
        { name: "Películas", param: "film", img: FilmImg },
        { name: "Novelas", param: "novel", img: NovelImg },
        { name: "Mangas", param: "manga", img: MangaImg },
        { name: "Juegos", param: "game", img: GameImg },
        { name: "Anime", param: "anime", img: AnimeImg },
        { name: "Serie", param: "serie", img: SerieImg },
    ];

    return (
        <>
            <Navbar />
            <div className='category-container'>
                <div className='category-title text-1'>
                    <h1>Categorías</h1>
                </div>
                <div className='category-list'>
                    {categories.map((elemento) => (
                        <Link
                            to={`/categories/${elemento.param}`}
                            key={elemento.param}
                            className='category-card'
                            style={{ backgroundImage: `url(${elemento.img})` }}
                        >
                            <div className='category-overlay'>
                                {elemento.name}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
}
