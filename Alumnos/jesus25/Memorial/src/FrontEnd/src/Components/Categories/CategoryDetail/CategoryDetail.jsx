import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import './CategoryDetail.css'
import Navbar from '../../Navbar/Navbar'
import Error from '../../Error/Error'
import Modal from '../../Modal/modal'

export default function CategoryDetail() {
    const { category } = useParams()
    const [mediaList, setMediaList] = useState([])//LISTA 

    const categories = [
        { name: "Películas", param: "film" },
        { name: "Novelas", param: "novel" },
        { name: "Mangas", param: "manga" },
        { name: "Juegos", param: "game" },
        { name: "Anime", param: "anime" },
        { name: "Serie", param: "serie" },
    ];//TRADUCTOR 

    const currentCategory = categories.find(c => c.param === category)
    if (!currentCategory) return <Error /> //ERROR SI CATEGORIA NO EXISTE

    const [showForm, setShowForm] = useState(false) // Modal Create
    const [editingMedia, setEditingMedia] = useState(null) //EDIT VARIABLE

    const [createImagePreview, setCreateImagePreview] = useState(null)
    const [editImagePreview, setEditImagePreview] = useState(null)

    const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0, media: null })

    // Si la categoría no es válida, mostramos el componente Error directamente
    //#region Logica

    //ACTUALIZA IMAGE PREVIEW EN EL EDIT
    useEffect(() => {
        if (editingMedia && editingMedia.image) {
            setEditImagePreview(editingMedia.image)
        } else {
            setEditImagePreview(null)
        }
    }, [editingMedia])

    //MENU CONTEXTUAL ABRIR
    const handleContextMenu = (e, media) => {
        e.preventDefault()
        setContextMenu({
            visible: true,
            x: e.pageX,
            y: e.pageY,
            media: media
        })
    }
    //MENU CONTEXTUAL CERRAR
    useEffect(() => {
        const closeMenu = () => setContextMenu({ ...contextMenu, visible: false })
        document.addEventListener('click', closeMenu)
        return () => document.removeEventListener('click', closeMenu)
    }, [contextMenu])
    
    //#region CRUD

    //GET Lista
    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/memorialApp/media/')
            .then(res => res.json())
            .then(data => {
                const filtered = data.filter(item => item.category === category)
                setMediaList(filtered)
            })
            .catch(error => console.error('Error fetching media:', error))
    }, [])

    //POST
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
                setShowForm(false)
            })
            .catch(err => console.error('Error al crear media:', err))
    }

    //EDIT
    const handleEditSubmit = (e) => {
        e.preventDefault()
        const form = e.target
        const formData = new FormData(form)
        formData.append('category', category)
        formData.append('user', 1)

        fetch(`http://127.0.0.1:8000/api/memorialApp/media/${editingMedia.id}/`, {
            method: 'PUT',
            body: formData
        })
            .then(res => res.json())
            .then(updatedMedia => {
                setMediaList(mediaList.map(m => m.id === updatedMedia.id ? updatedMedia : m))
                setEditingMedia(null)
            })
            .catch(err => console.error('Error al editar media:', err))
    }

    //DELETE
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
    //#endregion

    //#endregion

    return (<>
        <Navbar />
        <div className="media-detail-container">
            <h2>Elementos de la categoría: {currentCategory ? currentCategory.name : 'Error, categoría no válida'}</h2>
            <button onClick={() => setShowForm(!showForm)}>
               Añadir nuevo elemento
            </button>
            {mediaList.length > 0 ? (
                <div className="media-grid">
                    {mediaList.map(media => (
                        <div className="media-card" key={media.id} onContextMenu={(e) => handleContextMenu(e, media)}>
                            <Link to={`/categories/${category}/${media.id}`}>
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
                            </div>
                        </div>
                    ))}
                </div>
            ) :
                <>Aún no hay nada en esta categoría... ¡Prueba añadiendo algo!</>
            }

            {/*-----------CREATE FORM-------------*/}

            <Modal isOpen={showForm} onClose={() => {setShowForm(false);  setCreateImagePreview(null);}}>
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

                        <input type="file" name="image" onChange={e => {
                            const file = e.target.files[0]
                            if (file) {
                                setCreateImagePreview(URL.createObjectURL(file))
                            } else {
                                setCreateImagePreview(null)
                            }
                        }} />

                        {createImagePreview && (
                            <div className="image-preview">
                                <img src={createImagePreview} alt="Previsualización" />
                            </div>
                        )}

                        <button type="submit">Crear</button>
                        <button type="button" onClick={() => {setShowForm(false); setCreateImagePreview(null);}}>Cancelar</button>

                    </form>

                </>
            </Modal>


            {/*-----------EDIT FORM-------------*/}
            {/* igual editingMedia !== null chequea que no sea null*/}
            <Modal isOpen={!!editingMedia} onClose={() => setEditingMedia(null)}>
                <>
                    <h3>Editando: {editingMedia ? editingMedia.title : 'Cargando...'}</h3>
                    <form onSubmit={handleEditSubmit} className="media-form">
                        <input type="text" name="title" defaultValue={editingMedia ? editingMedia.title : ''} required />
                        <textarea name="description" defaultValue={editingMedia ? editingMedia.description : ''} required></textarea>
                        <input type="number" name="rating" min="0" max="10" defaultValue={editingMedia ? editingMedia.rating : ''} required />

                        <select name="status" defaultValue={editingMedia ? editingMedia.status : 'pending'}>
                            <option value="pending">Pendiente</option>
                            <option value="following">Siguiéndolo/a</option>
                            <option value="reading">Leyéndolo/a</option>
                            <option value="watched">Visto/a</option>
                            <option value="upcoming">Pendiente de salida</option>
                            <option value="pending_purchase">Pendiente de compra</option>
                            <option value="playing">Jugándolo/a</option>
                            <option value="finished">Terminado/a</option>
                        </select>

                        <input type="file" name="image" onChange={e => {
                            const file = e.target.files[0]
                            if (file) {
                                setEditImagePreview(URL.createObjectURL(file))
                            }
                        }} />

                        {editImagePreview && (
                            <div className="image-preview">
                                <img src={editImagePreview} alt="Previsualización" />
                            </div>
                        )}

                        <button type="submit">Guardar cambios</button>
                        <button type="button" onClick={() => setEditingMedia(null)}>Cancelar</button>
                    </form>
                </>
            </Modal>


            {contextMenu.visible && (
                <div
                    className="context-menu"
                    style={{
                        position: 'absolute',
                        top: `${contextMenu.y}px`,
                        left: `${contextMenu.x}px`,
                        backgroundColor: '#fff',
                        border: '1px solid #ccc',
                        boxShadow: '0px 0px 10px rgba(0,0,0,0.2)',
                        zIndex: 1000,
                        padding: '10px',
                        borderRadius: '5px'
                    }}
                >
                    <button onClick={() => {
                        setEditingMedia(contextMenu.media)
                        setContextMenu({ ...contextMenu, visible: false })
                    }}>Editar</button>
                    <button onClick={() => {
                        handleDelete(contextMenu.media.id)
                        setContextMenu({ ...contextMenu, visible: false })
                    }}>Eliminar</button>
                </div>
            )}

        </div>
    </>
    )
}
