import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'

import AnimeImg from '/images/category/Anime.jpg'
import MangaImg from '/images/category/Manga.jpg'
import SerieImg from '/images/category/Serie.jpg'
import FilmImg from '/images/category/Film.jpg'
import GameImg from '/images/category/Game.jpg'
import NovelImg from '/images/category/Novel.jpg'

export default function Users() {
    const { username } = useParams()
    const [userExists, setUserExists] = useState(null) 
    const categories = [
        { name: "Películas", param: "film", img: FilmImg },
        { name: "Novelas", param: "novel", img: NovelImg },
        { name: "Mangas", param: "manga", img: MangaImg },
        { name: "Juegos", param: "game", img: GameImg },
        { name: "Anime", param: "anime", img: AnimeImg },
        { name: "Serie", param: "serie", img: SerieImg },
    ]
    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/memorialApp/users/')
            .then(res => res.json())
            .then(users => {
                const exists = users.some(u => u.username === username)
                setUserExists(exists)
            })
            .catch(() => setUserExists(false))
    }, [username])
    if (!userExists) return (
        <>
            <Navbar />
            <div className="category-container">
                <h2>No se ha encontrado ningún usuario con el nombre: {username}</h2>
            </div>
        </>
    )

    return (
        <>
            <Navbar />
            <div className='category-container'>
                <div className='category-title text-1'>
                    <h2>Inspecciona una categoría de {username}</h2>
                </div>
                <div className='category-list'>
                    {categories.map((elemento) => (
                        <Link
                            to={`/users/${username}/${elemento.param}`}
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
    )
}
