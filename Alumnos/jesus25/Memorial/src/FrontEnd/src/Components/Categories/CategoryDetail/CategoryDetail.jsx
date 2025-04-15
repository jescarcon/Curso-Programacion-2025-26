import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './CategoryDetail.css'
import Navbar from '../../Navbar/Navbar'
import Error from '../../Error/Error'

export default function CategoryDetail() {
    const { category } = useParams()
    const [mediaList, setMediaList] = useState([])

    const categories = [
        { name: "Películas", param: "film" },
        { name: "Novelas", param: "novel" },
        { name: "Mangas", param: "manga" },
        { name: "Juegos", param: "game" },
        { name: "Anime", param: "anime" },
        { name: "Serie", param: "serie" },
    ];

    const currentCategory = categories.find(c => c.param === category)
    if (!currentCategory) return <Error />

    const [showForm, setShowForm] = useState(false)


    // Si la categoría no es válida, mostramos el componente Error directamente

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/memorialApp/media/')
            .then(res => res.json())
            .then(data => {
                const filtered = data.filter(item => item.category === category)
                setMediaList(filtered)
            })
            .catch(error => console.error('Error fetching media:', error))
    })

    const handleSubmit = e => {
        e.preventDefault()
        const form = e.target
        const formData = new FormData(form)
        formData.append('category', category)
        formData.append('user', 1)

        fetch('http://127.0.0.1:8000/api/memorialApp/media/', {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(newMedia => {
                setMediaList([...mediaList, newMedia])
                form.reset()
            })
            .catch(err => console.error('Error al crear media:', err))
    }

    const handleDelete = (id) => {
        fetch(`http://127.0.0.1:8000/api/memorialApp/media/${id}/`, {
            method: 'DELETE'
        })
        .then(() => {
            // Filtramos el que se ha eliminado
            setMediaList(mediaList.filter(media => media.id !== id))
        })
        .catch(err => console.error('Error al eliminar:', err))
    }
    return (<>
        <Navbar />
        <div className="media-detail-container">
            <h2>Elementos de la categoría: {currentCategory ? currentCategory.name : 'Error, categoría no válida'}</h2>
            {mediaList.length > 0 ? (
                <div className="media-grid">
                    {mediaList.map(media => (
                        <div className="media-card" key={media.id}>
                            <div className="media-image">
                                {media.image ? (
                                    <img src={media.image} alt={media.title} />
                                ) : (
                                    <div className="media-placeholder">Sin imagen</div>
                                )}
                            </div>
                            <div className="media-info">
                                <h3>{media.title}</h3>
                            </div>
                            <button onClick={() => handleDelete(media.id)} className="delete-btn">Eliminar</button>

                        </div>
                    ))}
                </div>
            ) :
                <>Aún no hay nada en esta categoría... ¡Prueba añadiendo algo!</>
            }

            <hr />
            <button onClick={() => setShowForm(!showForm)}>
                {showForm ? 'Ocultar formulario' : 'Añadir nuevo elemento'}
            </button>
            
            {showForm && (
                <>
                    <h3>Crear nuevo elemento en {currentCategory.name}</h3>
                    <form onSubmit={handleSubmit} className="media-form">
                        <input type="text" name="title" placeholder="Título" required />
                        <textarea name="description" placeholder="Descripción" required></textarea>
                        <input type="number" name="rating" min="0" max="10" placeholder="Puntuación (0-10)" required />

                        <select name="status" defaultValue="pending">
                            <option value="pending">Pendiente</option>
                            <option value="following">Siguiéndolo/a</option>
                            <option value="reading">Leyéndolo/a</option>
                            <option value="watched">Visto/a</option>
                            <option value="upcoming">Pendiente de salida</option>
                            <option value="pending_purchase">Pendiente de compra</option>
                            <option value="playing">Jugándolo/a</option>
                            <option value="finished">Terminado/a</option>
                        </select>

                        <input type="file" name="image" />
                        <button type="submit">Crear</button>
                    </form>

                </>
            )}
        </div>
    </>
    )
}
