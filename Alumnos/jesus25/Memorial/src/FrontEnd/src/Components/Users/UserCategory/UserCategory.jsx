import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Navbar from '../../Navbar/Navbar'
import Error from '../../Error/Error'

export default function UserCategory() {
    const { username, category } = useParams() // Obtenemos el username y la categoría desde la URL

    const [userId, setUserId] = useState(null)  // Para almacenar el ID del usuario
    const [userMedia, setUserMedia] = useState([])  // Para almacenar los medios del usuario
    const [error, setError] = useState(false)  // Para manejar errores

    const categories = [
        { name: "Películas", param: "film" },
        { name: "Novelas", param: "novel" },
        { name: "Mangas", param: "manga" },
        { name: "Juegos", param: "game" },
        { name: "Anime", param: "anime" },
        { name: "Serie", param: "serie" },
    ]
    const currentCategory = categories.find(c => c.param === category) // Encontramos la categoría actual en base al parámetro

    useEffect(() => {
        // Paso 1: Obtener todos los usuarios
        fetch('http://127.0.0.1:8000/api/memorialApp/users/')
            .then(res => res.json())
            .then(users => {
                const foundUser = users.find(u => u.username === username)  // Buscamos al usuario por su nombre de usuario
                if (foundUser) {
                    setUserId(foundUser.id)  // Si encontramos el usuario, almacenamos su ID
                } else {
                    setError(true)  // Si no encontramos al usuario, mostramos un error
                }
            })
            .catch(() => setError(true))  // Si ocurre un error en la consulta, mostramos un error
    }, [username])  // El efecto depende de `username`

    // Paso 2: Obtener los medios si el userId es válido
    useEffect(() => {
        if (userId) {
            fetch('http://127.0.0.1:8000/api/memorialApp/media/')
                .then(res => res.json())
                .then(mediaData => {
                    const filtered = mediaData.filter(m => m.user === userId && m.category === category)  // Filtramos por usuario y categoría
                    setUserMedia(filtered)  // Guardamos los medios filtrados en el estado
                })
                .catch(() => setError(true))  // Si ocurre un error, mostramos el error
        }
    }, [userId, category])  // El efecto depende de `userId` y `category`

    if (error) return <Error />  // Si hubo un error, mostramos el componente Error

    return (
        <>
            <Navbar />
            <div className="user-category-container">
                <h2>Elementos de {username} en la categoría: {currentCategory.name}</h2>

                {userMedia.length > 0 ? (
                    <div className="media-grid">
                        {userMedia.map(media => (
                            <div className="media-card" key={media.id}>
                                <Link to={`/users/${username}/${category}/${media.id}`}>
                                    <div className="media-image">
                                        {media.image ? (
                                            <img src={media.image} alt={media.title} />
                                        ) : (
                                            <div className="media-placeholder">Sin imagen</div>
                                        )}
                                    </div>
                                </Link>
                                <div className="media-info">
                                    <h3>{media.title}</h3>
                                    <p>Puntuación: {media.rating}</p>
                                    <p>Estado: {media.status}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>Este usuario aún no tiene elementos en esta categoría.</p>
                )}
            </div>
        </>
    )
}