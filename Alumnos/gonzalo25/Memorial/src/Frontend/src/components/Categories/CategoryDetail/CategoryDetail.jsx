import React, { useEffect, useState } from 'react'
import { Link, useFetcher } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import './CategoryDetail.css'
import Navbar from '../../Navbar/Navbar';
import { BASE_API_URL } from '../../../constants'
import Error from '../../Error/Error';
import Modal from '../../Modal/Modal'
import createButtonImage from '/images/createButton.png';
import MediaDetailView from './MediaDetailView/MediaDetailView';
import { getJWT, authFetch } from '../../../constants';

export default function CategoryDetail() {
    //#region Variables 

    const URL = window.location.href;
    const isCategoryComponent = URL.includes("/categories/categoryDetail");


    const { categoryName } = isCategoryComponent ? useParams() : "";

    const categories = [
        { name: "Películas", param: "film" },
        { name: "Novelas", param: "novel" },
        { name: "Mangas", param: "manga" },
        { name: "Juegos", param: "game" },
        { name: "Anime", param: "anime" },
        { name: "Serie", param: "serie" },
    ];

    const currentCategory = isCategoryComponent ? categories.find(c => c.param === categoryName) : "";
    if (!currentCategory && isCategoryComponent) return <Error />

    const [showForm, setShowForm] = useState(false)
    const [editingMedia, setEditingMedia] = useState(null)
    const [mediaList, setMediaList] = useState([])

    const [createImagePreview, setCreateImagePreview] = useState(null)
    const [editImagePreview, setEditImagePreview] = useState(null)

    const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0, media: null })
    const [userId, setUserId] = useState(null);

    const statusOptionsByCategory = {
        film: [
            { label: "Vista", value: "watched" },
            { label: "Pendiente de ver", value: "pending" },
            { label: "Pendiente de salida", value: "upcoming" },
        ],
        novel: [
            { label: "Leyéndolo/a", value: "reading" },
            { label: "Pendiente de leer", value: "pending" },
            { label: "Pendiente de salida", value: "upcoming" },
            { label: "Pendiente de compra", value: "pending_purchase" },
            { label: "Terminado/a", value: "finished" },
        ],
        manga: [
            { label: "Leyéndolo/a", value: "reading" },
            { label: "Pendiente de leer", value: "pending" },
            { label: "Pendiente de salida", value: "upcoming" },
            { label: "Pendiente de compra", value: "pending_purchase" },
            { label: "Terminado/a", value: "finished" },
        ],
        game: [
            { label: "Jugándolo", value: "playing" },
            { label: "Pendiente de jugar", value: "pending" },
            { label: "Pendiente de salida", value: "upcoming" },
            { label: "Pendiente de compra", value: "pending_purchase" },
            { label: "Terminado", value: "finished" },
        ],
        anime: [
            { label: "Visto/a", value: "watched" },
            { label: "Siguiéndolo/a", value: "following" },
            { label: "Pendiente de ver", value: "pending" },
            { label: "Pendiente de salida", value: "upcoming" },
            { label: "Terminado/a", value: "finished" },
        ],
        serie: [
            { label: "Visto/a", value: "watched" },
            { label: "Siguiéndolo/a", value: "following" },
            { label: "Pendiente de ver", value: "pending" },
            { label: "Pendiente de salida", value: "upcoming" },
            { label: "Terminado/a", value: "finished" },
        ],
    };

    const statusOptions = statusOptionsByCategory[categoryName] || [];
    console.log(categoryName);
    //#endregion

    //#region Logica
    useEffect(() => {
        if (editingMedia && editingMedia.image) {
            setEditImagePreview(editingMedia.image)
        } else {
            setEditImagePreview(null)
        }
    }, [editingMedia])

    const handleContextMenu = (e, media) => {
        e.preventDefault()
        setContextMenu({
            visible: true,
            x: e.pageX,
            y: e.pageY,
            media: media
        })
        console.log('Click derecho')
    }

    useEffect(() => {
        const closeMenu = () => setContextMenu({ ...contextMenu, visible: false })
        document.addEventListener('click', closeMenu)
        return () => document.removeEventListener
    }, [contextMenu])

    //#endregion

    //#region CRUD

    //GET

    useEffect(() => {

        const token = localStorage.getItem('access_token');

        if (!token) {
            console.error('No se encontró un token en el almacenamiento local');
            window.location.href = '/login';
            return;

        }

        const tokenJSON = getJWT(token);
        const user_id = tokenJSON.user_id;
        if (user_id) {
            setUserId(user_id);

            const res = authFetch(`/api/memorialApp/media`, {
                method: 'GET',
            })
                .then(res => res.json())
                .then(data => {
                    const filteredMedia = data.filter(m => m.category === categoryName && m.user === user_id);
                    setMediaList(filteredMedia);
                })
                .catch(e => console.error('Error fetching media:', e));

        } else {
            console.error('El user_id no se pudo extraer del token');
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            window.location.href = '/login'; // Redirigir a la página de login
        }
    }, [categoryName]);

    //DELETE*
    const handleDelete = (id) => {
        const token = localStorage.getItem('access_token');

        if (!token) {
            console.error('No se encontró un token en el almacenamiento local');
            window.location.href = '/login'; // Redirigir a la página de login
            return; // Salir de la función si no hay token
        }

        fetch(`${BASE_API_URL}/api/memorialApp/media/${id}/`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(() => {
                setMediaList(mediaList.filter(m => m.id !== id));
            })
            .catch(e => console.error('Error al eliminar:', e));
    };

    //CREATE
    const handleSubmit = (e) => {
        const token = localStorage.getItem('access_token')
        if (!token) {
            console.error('Es necesario tener un token de acceso');
            window.location.href = '/login';
            return;
        }


        e.preventDefault()
        const form = e.target
        const formData = new FormData(form)
        formData.append('category', categoryName)
        formData.append('user', userId)
        authFetch(`/api/memorialApp/media/`, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(newMedia => {
                setMediaList([...mediaList, newMedia])
                form.reset()
                setShowForm(false)
            })
            .catch(e => console.error('Error creating media:', e))
    }


    //EDIT
    const handleEditSubmit = (e) => {
        e.preventDefault();

        const token = localStorage.getItem('access_token');
        if (!token) {
            console.error('No se encontró un token en el almacenamiento local');
            window.location.href = '/login'; // Redirigir al login si no hay token
            return;
        }
        const tokenJSON = getJWT(token);
        const user_id = tokenJSON.user_id;

        if (isValid && user_id) {
            const form = e.target;
            const formData = new FormData(form);
            formData.append('category', categoryName);
            formData.append('user', user_id); // Agregar el ID del usuario al formulario

            fetch(`http://127.0.0.1:8000/api/memorialApp/media/${editingMedia.id}/`, {
                method: 'PUT',
                body: formData,
                headers: {
                    'Authorization': `Bearer ${token}` // Agregar el token al header de autorización
                }
            })
                .then(res => res.json())
                .then(updatedMedia => {
                    setMediaList(mediaList.map(m => m.id === updatedMedia.id ? updatedMedia : m));
                    setEditingMedia(null);
                })
                .catch(err => console.error('Error al editar media:', err));


        };

    }

        //#endregion



        return (
            <>
                <Navbar />
                {isCategoryComponent ? (
                    <div className='media-detail-container'>
                        <div className='category-detail-body-title'>
                            <h3>{currentCategory.name}</h3>
                            <img src={createButtonImage} alt="Añadir nuevo elemento" className='create-button' onClick={() => setShowForm(!showForm)} />

                        </div>
                        {mediaList.length > 0 ? (
                            <div className='media-grid'>
                                {mediaList.map(media => (
                                    <div className='media-card' key={media.id} onContextMenu={(e) => handleContextMenu(e, media)}>
                                        <Link to={`/categories/categoryDetail/${categoryName}/${media.id}`}>
                                            <div className="media-image" >
                                                {media.image ? (
                                                    <img src={media.image} alt={media.title} />
                                                ) : (
                                                    <div className="media-placeholder">Sin imagen</div>
                                                )}
                                            </div>
                                            <div className='media-info'>
                                                <h3>{media.title}</h3>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <>
                                <p>No se ha encotrado ninguna {currentCategory.name}</p>
                            </>)}

                        {/* Formulario creación*/}
                        <Modal isOpen={showForm} onClose={() => {
                            setShowForm(false); setCreateImagePreview(null)

                        }}>
                            <>
                                <h3>Crear nuevo elemento en {currentCategory.name}</h3>
                                <form onSubmit={handleSubmit} className="media-form">
                                    <input type="text" name="title" placeholder="Título" required />
                                    <textarea name="description" placeholder="Descripción"></textarea>
                                    <input type="number" name="rating" min="0" max="10" placeholder="Puntuación (0-10)" required />
                                    <select name="status" defaultValue="pending">
                                        {statusOptions.map(option => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                    <input type="date" name='begin_date' placeholder='Fecha de inicio' />
                                    <input type="date" name='finish_date' placeholder='Fecha de fin' />
                                    <input type="file" name="image" onChange={e => {
                                        const file = e.target.files[0]
                                        if (file) {
                                            setCreateImagePreview(URL.createObjectURL(file))
                                        } else {
                                            setCreateImagePreview(null)
                                        }
                                    }} />
                                    {createImagePreview && (
                                        <div className='createimage-preview'>
                                            <img src={createImagePreview} alt="Vista previa imagen" />
                                        </div>
                                    )}
                                    <button type="submit">Crear</button>
                                    <button type='submit' onClick={() => {
                                        setShowForm(false)
                                        setCreateImagePreview(null)
                                    }}>Cancelar</button>
                                </form>
                            </>
                        </Modal>

                        {/* Formulario edición*/}
                        <Modal isOpen={!!editingMedia} onClose={() => setEditingMedia(null)}>
                            {editingMedia && (
                                <>
                                    <h3>Editando: {editingMedia.title}</h3>
                                    <form onSubmit={handleEditSubmit} className="media-form">
                                        <input type="text" name="title" defaultValue={editingMedia.title} required />
                                        <textarea name="description" defaultValue={editingMedia.description}></textarea>
                                        <input type="number" name="rating" min="0" max="10" defaultValue={editingMedia.rating} required />
                                        <select name="status" defaultValue={editingMedia.status}>
                                            {statusOptions.map(option => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                        <input type="date" name='begin_date' defaultValue={editingMedia.begin_date} />
                                        <input type="date" name='finish_date' defaultValue={editingMedia.finish_date} />
                                        <input type="file" name="image" onChange={e => {
                                            const file = e.target.files[0]
                                            if (file) {
                                                setEditImagePreview(URL.createObjectURL(file))
                                            } else {
                                                setEditImagePreview(null)
                                            }
                                        }} />

                                        <button type="submit">Guardar cambios</button>
                                        <button type="button" onClick={() => setEditingMedia(null)}>Cancelar</button>
                                    </form>
                                </>
                            )}
                        </Modal>

                        {contextMenu.visible && (
                            <div className='context-menu'
                                style={{
                                    position: 'absolute',
                                    top: `${contextMenu.y}px`,
                                    left: `${contextMenu.x}px`,
                                    backgroundColor: '#ffffff',
                                    border: '1px solid #ddd',
                                    borderRadius: '8px',
                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                    padding: '10px',
                                    zIndex: 1000,
                                }}
                            >
                                <button
                                    className='context-menu-btn'
                                    onClick={() => {
                                        setEditingMedia(contextMenu.media)
                                        setContextMenu({ ...contextMenu, visible: false })
                                    }}>Editar</button>

                                <button
                                    className='context-menu-btn'
                                    onClick={() => {
                                        handleDelete(contextMenu.media.id)
                                        setContextMenu({ ...contextMenu, visible: false })
                                    }}>Eliminar</button>
                            </div>
                        )}



                    </div>
                ) : (
                    <>

                    </>
                )}

            </>
        )

    }

