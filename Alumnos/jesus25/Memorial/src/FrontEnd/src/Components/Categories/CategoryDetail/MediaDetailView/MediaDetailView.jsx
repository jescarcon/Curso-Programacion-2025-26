import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import './MediaDetailView.css'
import Navbar from '../../../Navbar/Navbar'

export default function MediaDetailView() {
    const { id } = useParams()
    const [media, setMedia] = useState(null)

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/memorialApp/media/${id}/`)
            .then(res => res.json())
            .then(data => setMedia(data))
            .catch(err => console.error('Error al obtener el detalle:', err))
    }, [id])

    return (
        <>
            <Navbar />
            {media ? (
                <div className="media-detail">
                    <h2>{media.title}</h2>
                    {media.image ? (
                        <img src={media.image} alt={media.title} />
                    ) : (
                        <div className="media-placeholder">Sin imagen</div>
                    )}
                    <p><strong>Descripción:</strong> {media.description}</p>
                    <p><strong>Puntuación:</strong> {media.rating}/10</p>
                    <p><strong>Estado:</strong> {media.status}</p>
                    <p><strong>Fecha añadida:</strong> {media.add_date}</p>
                    <Link to={`/categories/manga/${id}/notes`}><button>Notas</button></Link>
                </div>
            ) : (
                <p>Cargando detalle...</p>
            )}
        </>
    )
}
