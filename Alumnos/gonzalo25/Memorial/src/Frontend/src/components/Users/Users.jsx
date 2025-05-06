import React, { useState } from 'react'
import Navbar from '../Navbar/Navbar'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom';
import SerieImg from '/images/categories/series.jpg'
import PeliImg from '/images/categories/peliculas.jpg'
import AnimeImg from '/images/categories/animes.jpg'
import MangaImg from '/images/categories/manga.jpg'
import NovelaImg from '/images/categories/novelas.jpg'
import JuegoImg from '/images/categories/videojuegos.jpg'


export default function Users() {
  const { user } = useParams();
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
      <h1>Categorías de {user}</h1>
      <div className="categories-container">
        {categories.map((e) => (
          <div key={e.tag} className='category-card'>
            <Link to={`/users/${user}/${e.tag}/`}>
              <img src={e.image} alt={e.name} className='category-image' />
            </Link>
            <h3>{e.name}</h3>
          </div>
        ))}

      </div>

    </>

  )
}