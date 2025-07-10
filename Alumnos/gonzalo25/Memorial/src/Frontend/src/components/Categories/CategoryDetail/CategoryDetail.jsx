import React, { useEffect, useState } from 'react'
import { Link, useFetcher, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import './CategoryDetail.css'
import Navbar from '../../Navbar/Navbar';
import { authFetch, BASE_API_URL } from './../../../constants'
import Error from '../../Error/Error';
import Modal from '../../Modal/Modal'
import createButtonImage from '/images/createButton.png';
import MediaDetailView from './MediaDetailView/MediaDetailView';
import { getJWT } from './../../../constants';

export default function CategoryDetail() {
    //#region Variables
    const navigate = useNavigate();
    const [generateAI, setGenerateAI] = useState(false);

    const URL_NAV = window.location.href;
    const isCategoryComponent = URL_NAV.includes("/categories/categoryDetail");
    const { user } = !isCategoryComponent ? useParams() : "";
    const { categoryName } = useParams();
    const categories = [
        { name: "Películas", param: "film" },
        { name: "Novelas", param: "novel" },
        { name: "Mangas", param: "manga" },
        { name: "Juegos", param: "game" },
        { name: "Animes", param: "anime" },
        { name: "Series", param: "serie" },
    ];
    const currentCategory = categories.find(c => c.param === categoryName);
    if (!currentCategory && isCategoryComponent) return <Error />
    const [showForm, setShowForm] = useState(false)
    const [editingMedia, setEditingMedia] = useState(null);
    const [mediaList, SetMediaList] = useState([]);
    const [createImagePreview, setCreateImagePreview] = useState(null);
    const [editImagePreview, setEditImagePreview] = useState(null);
    const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0, media: null });
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
    const [searchTerm, setSearchTerm] = useState('');
    const [searchedUser, setSearchedUser] = useState('');
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
    }
    useEffect(() => {
        const closeMenu = () => setContextMenu({ ...contextMenu, visible: false })
        document.addEventListener('click', closeMenu)
        return () => document.removeEventListener
    }, [contextMenu])

    const filteredMedia = mediaList.filter(media =>
        media.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    //Get Searched User
    if (!isCategoryComponent) {
        useEffect(() => {
            const token = localStorage.getItem('access_token')
            if (!token) {
                console.error('Es necesario tener un token de acceso');
                window.location.href = '/login';
                return;
            }

            const tokenJSON = getJWT(token);
            const userId = tokenJSON.user_id;
            if (userId) {
                setUserId(userId);

                authFetch(`/api/memorialApp/users/`, 'GET')
                    .then(res => res.json())
                    .then(data => {
                        const username = data.find(u => u.id === parseInt(user)).username;
                        setSearchedUser(username);
                    })
                    .catch(e => console.error('Error fetching media:', e))
            } else {
                console.error('No se pudo extraer un id de usuario del token');
                window.location.href = '/login';
            }
        }, [])

    }
    //#endregion

    //#region CRUD

    //GET
    useEffect(() => {
        const token = localStorage.getItem('access_token')
        if (!token) {
            console.error('Es necesario tener un token de acceso');
            window.location.href = '/login';
            return;
        }

        const tokenJSON = getJWT(token);
        const userId = tokenJSON.user_id;
        if (userId) {
            setUserId(userId);

            authFetch(`/api/memorialApp/media/`, 'GET')
                .then(res => res.json())
                .then(data => {
                    let usuarioBusqueda = userId;
                    if (user != null) {
                        usuarioBusqueda = user;
                    }
                    const filteredMedia = data.filter(m => m.category === categoryName && m.user === parseInt(usuarioBusqueda));
                    SetMediaList(filteredMedia);
                })
                .catch(e => console.error('Error fetching media:', e))
        } else {
            console.error('No se pudo extraer un id de usuario del token');
            window.location.href = '/login';
        }
    }, [categoryName])

    //DELETE
    const handleDelete = (id) => {
        const token = localStorage.getItem('access_token')
        if (!token) {
            console.error('Es necesario tener un token de acceso');
            window.location.href = '/login';
            return;
        }

        authFetch(`/api/memorialApp/media/${id}/`, 'DELETE')
            .then(() => {
                SetMediaList(mediaList.filter(m => m.id !== id))
            }).catch(e => console.error("Error al eliminar:", e))
    }

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
        
        // Si generateAI está activo, elimina la imagen del formData
        if (generateAI) {
            formData.delete('image'); // Borra campo 'image' para que no se suba fichero
            formData.append('generate_ai_image', 'true'); // Añade flag para backend
        }

        authFetch('/api/memorialApp/media/', 'POST', formData
        )
            .then(res => res.json())
            .then(newMedia => {
                SetMediaList([...mediaList, newMedia])
                form.reset()
                setShowForm(false)
            })
            .catch(e => console.error('Error creating media:', e))
        setCreateImagePreview(null);
    }

    //EDIT
    const handleEditSubmit = (e) => {
        const token = localStorage.getItem('access_token');
        if (!token) {
            console.error('Es necesario tener un token de acceso');
            window.location.href = '/login';
            return;
        }

        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);

        formData.append('category', categoryName);
        formData.append('user', userId);

        // Si no se ha seleccionado nueva imagen, eliminar del formData
        if (!form.image.files[0]) {
            formData.delete('image'); // No se sobreescribe la anterior
        }

        authFetch(`/api/memorialApp/media/${editingMedia.id}/`, 'PATCH', formData)
            .then(res => res.json())
            .then(updatedMedia => {
                SetMediaList(prevList =>
                    prevList.map(item => item.id === updatedMedia.id ? updatedMedia : item)
                );
                setEditImagePreview(null);  // Limpia vista previa
                setEditingMedia(null);      // Cierra modal
            })
            .catch(e => console.error('Error updating media:', e));
    };


    //#endregion

    return (
        <>
            <Navbar />
            {isCategoryComponent ? (
                <div className='media-detail-container'>
                    <div className='category-detail-body-title'>
                        <h3>Mis {currentCategory.name.toLocaleLowerCase()}</h3>
                        <img src={createButtonImage} alt="Añadir nuevo elemento" className='create-button' onClick={() => setShowForm(!showForm)} />
                    </div>
                    <input
                        type="text"
                        placeholder="Buscar..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="media-search-input"
                    />

                    {filteredMedia.length > 0 ? (
                        <div className='media-grid'>
                            {filteredMedia.map(media => (
                                <div className='category-card' key={media.id} onContextMenu={(e) => handleContextMenu(e, media)}>
                                    <div className="category-image" onClick={() => navigate(`/categories/categoryDetail/${categoryName}/${media.id}`)}>
                                        {media.image ? (
                                            <img src={media.image} alt={media.title} className="category-image" />
                                        ) : (
                                            <img src='/images/categories/media/DefaultMediaImage.png' alt={media.title} className="category-image" style={{ 'object-fit':'contain'}}/>
                                        )}
                                    </div>
                                    <div className='media-info'>
                                        <h3>{media.title}</h3>
                                        <p>{media.rating}/10</p>

                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <>
                            <p style={{ "user-select": "none" }}>No se han encontrado {currentCategory.name}</p>
                        </>)}

                    {/* Formulario creación*/}
                    <Modal isOpen={showForm} onClose={() => {
                        setShowForm(false); setCreateImagePreview(null)

                    }}>
                        <>
                            <form onSubmit={handleSubmit} className="media-form-1">
                                <h3>Crea tus {currentCategory.name} </h3>

                                <input type="text" name="title" placeholder="Título" maxLength={100} required />
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
                                <label className="ai-checkbox-label">
                                    <input
                                        type="checkbox"
                                        name="generate_ai_image"
                                        checked={generateAI}
                                        onChange={(e) => setGenerateAI(e.target.checked)}
                                    />
                                    Generar imagen con IA
                                </label>



                                <div className="button-group">
                                    <button type="submit">Crear</button>
                                    <button
                                        type="button"
                                        className='cancel-button'
                                        onClick={() => {
                                            setShowForm(false);
                                            setCreateImagePreview(null);
                                        }}>Cancelar</button>
                                </div>
                            </form>
                        </>
                    </Modal>



                    {/* Formulario edición*/}
                    <Modal isOpen={!!editingMedia} onClose={() => { setEditingMedia(null); setEditImagePreview(null); }}>
                        {editingMedia && (
                            <>
                                <form onSubmit={handleEditSubmit} className="media-form-1">
                                    <h3>Editando: {editingMedia.title}</h3>

                                    <input type="text" name="title" defaultValue={editingMedia.title} maxLength={100} required />
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
                                    <input
                                        type="file"
                                        name="image"
                                        onChange={e => {
                                            const file = e.target.files[0];
                                            if (file) {
                                                const newPreview = URL.createObjectURL(file);
                                                setEditImagePreview(newPreview);
                                            }
                                        }}
                                    />

                                    {editImagePreview && (
                                        <div className='createimage-preview'>
                                            <img src={editImagePreview} alt="Vista previa imagen" />
                                        </div>
                                    )}

                                    <div className="button-group">
                                        <button type="submit">Guardar cambios</button>
                                        <button
                                            type="button"
                                            className="cancel-button"
                                            onClick={() => {
                                                setEditingMedia(null);
                                                setEditImagePreview(null);
                                            }}
                                        >Cancelar</button>
                                    </div>
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
                <div className='media-detail-container'>
                    <div className='category-detail-body-title'>
                        {searchedUser && (<h3>{currentCategory.name} de {searchedUser}</h3>)}
                    </div>

                    <input
                        type="text"
                        placeholder="Buscar..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="media-search-input"
                    />
                    {filteredMedia.length > 0 ? (
                        <div className='media-grid'>
                            {filteredMedia.map(media => (
                                <div className='category-card' key={media.id} >
                                    <div onClick={() => navigate(`/users/${user}/categories/${categoryName}/${media.id}`)}>
                                        {media.image ? (
                                            <img src={media.image} alt={media.title} className="category-image" />
                                        ) : (
                                            <div className="media-placeholder">Sin imagen</div>
                                        )}
                                    </div>
                                    <div className='media-info'>
                                        <h3>{media.title}</h3>
                                        <p>{media.rating}/10</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <>
                            <p style={{ "user-select": "none" }}>No se han encontrado {currentCategory.name}</p>
                        </>)}

                </div>
            )}
        </>
    )

}