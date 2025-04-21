import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './Notes.css';
import Navbar from '../../../../Navbar/Navbar';
import Modal from '../../../../Modal/modal';
import Error from '../../../../Error/Error';

export default function Notes() {
    //#region VARIABLES
    const { category, id } = useParams();  // El parámetro id filtra las notas según el media
    const [notesList, setNotesList] = useState([]);
    const [showForm, setShowForm] = useState(false);  // Modal Create
    const [editingNote, setEditingNote] = useState(null);  // Edit variable
    const [createImagePreview, setCreateImagePreview] = useState(null);
    const [editImagePreview, setEditImagePreview] = useState(null);
    const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0, note: null });

    const categories = [
        { name: 'Películas', param: 'film' },
        { name: 'Novelas', param: 'novel' },
        { name: 'Mangas', param: 'manga' },
        { name: 'Juegos', param: 'game' },
        { name: 'Anime', param: 'anime' },
        { name: 'Serie', param: 'serie' },
    ];

    const currentCategory = categories.find(c => c.param === category);
    if (!currentCategory) return <Error />;
    //#endregion

    //#region LOGICA
    //#region Metodos
    //Click derecho abrir
    const handleContextMenu = (e, note) => {
        e.preventDefault();
        setContextMenu({
            visible: true,
            x: e.pageX,
            y: e.pageY,
            note: note
        });
    };
    //Click derecho cerrar
    useEffect(() => {
        const closeMenu = () => setContextMenu({ ...contextMenu, visible: false });
        document.addEventListener('click', closeMenu);
        return () => document.removeEventListener('click', closeMenu);
    }, [contextMenu]);

    //EDIT IMAGEN PREVIA
    useEffect(() => {
        if (editingNote && editingNote.image) {
            setEditImagePreview(editingNote.image);
        } else {
            setEditImagePreview(null);
        }
    }, [editingNote]);

    //#endregion

    //#region CRUD

    // Get notes (by id)
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/memorialApp/notes/?media=${id}`)
            .then(res => res.json())
            .then(data => setNotesList(data))
            .catch(error => console.error('Error fetching notes:', error));
    }, [id]);

   //CREATE
    const handleCreateSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        formData.append('category', category);
        formData.append('medium', id);

        fetch('http://127.0.0.1:8000/api/memorialApp/notes/', {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(newNote => {
                setNotesList([...notesList, newNote]);
                form.reset();
                setShowForm(false);
                setCreateImagePreview(null);
            })
            .catch(err => console.error('Error creating note:', err));
    };

    //EDIT
    const handleEditSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        formData.append('category', category);
        formData.append('medium', id);

        fetch(`http://127.0.0.1:8000/api/memorialApp/notes/${editingNote.id}/`, {
            method: 'PUT',
            body: formData
        })
            .then(res => res.json())
            .then(updatedNote => {
                setNotesList(notesList.map(note => note.id === updatedNote.id ? updatedNote : note));
                setEditingNote(null);
            })
            .catch(err => console.error('Error editing note:', err));
    };

    //DELETE
    const handleDelete = (id) => {
        fetch(`http://127.0.0.1:8000/api/memorialApp/notes/${id}/`, {
            method: 'DELETE'
        })
            .then(() => {
                setNotesList(notesList.filter(note => note.id !== id));
            })
            .catch(err => console.error('Error deleting note:', err));
    };
    //#endregion

    //#endregion
    
    return (
        <>
            <Navbar />
            <div className="notes-container">
                <h2>Notas de la categoría: {currentCategory ? currentCategory.name : 'Error, categoría no válida'}</h2>
                <button onClick={() => setShowForm(!showForm)}>Añadir nueva nota</button>

                {notesList.length > 0 ? (
                    <div className="notes-grid">
                        {notesList.map(note => (
                            <div className="note-card" key={note.id} onContextMenu={(e) => handleContextMenu(e, note)}>
                                <Link to={`/categories/${category}/${note.id}/notes`}>
                                    <div className="note-image">
                                        {note.image ? (
                                            <img src={note.image} alt={note.title} />
                                        ) : (
                                            <div className="note-placeholder">Sin imagen</div>
                                        )}
                                    </div>
                                </Link>
                                <div className="note-info">
                                    <h3>{note.title}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>Aún no hay notas en esta categoría... ¡Prueba añadiendo algo!</p>
                )}

                {/* Modal Create */}
                <Modal isOpen={showForm} onClose={() => { setShowForm(false); setCreateImagePreview(null); }}>
                    <>
                        <h3>Crear nueva nota en {currentCategory.name}</h3>
                        <form onSubmit={handleCreateSubmit} className="note-form">
                            <input type="text" name="title" placeholder="Título" required />
                            <textarea name="description" placeholder="Descripción" required></textarea>
                            <input type="file" name="image" onChange={e => {
                                const file = e.target.files[0];
                                if (file) {
                                    setCreateImagePreview(URL.createObjectURL(file));
                                } else {
                                    setCreateImagePreview(null);
                                }
                            }} />
                            {createImagePreview && (
                                <div className="image-preview">
                                    <img src={createImagePreview} alt="Previsualización" />
                                </div>
                            )}
                            <button type="submit">Crear</button>
                            <button type="button" onClick={() => { setShowForm(false); setCreateImagePreview(null); }}>Cancelar</button>
                        </form>
                    </>
                </Modal>

                {/* Modal Edit */}
                <Modal isOpen={!!editingNote} onClose={() => setEditingNote(null)}>
                    <>
                        <h3>Editar nota: {editingNote ? editingNote.title : 'Cargando...'}</h3>
                        <form onSubmit={handleEditSubmit} className="note-form">
                            <input type="text" name="title" defaultValue={editingNote ? editingNote.title : ''} required />
                            <textarea name="description" defaultValue={editingNote ? editingNote.description : ''} required></textarea>
                            <input type="file" name="image" onChange={e => {
                                const file = e.target.files[0];
                                if (file) {
                                    setEditImagePreview(URL.createObjectURL(file));
                                }
                            }} />
                            {editImagePreview && (
                                <div className="image-preview">
                                    <img src={editImagePreview} alt="Previsualización" />
                                </div>
                            )}
                            <button type="submit">Guardar cambios</button>
                            <button type="button" onClick={() => setEditingNote(null)}>Cancelar</button>
                        </form>
                    </>
                </Modal>

                {/* Context Menu */}
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
                            setEditingNote(contextMenu.note);
                            setContextMenu({ ...contextMenu, visible: false });
                        }}>Editar</button>
                        <button onClick={() => {
                            handleDelete(contextMenu.note.id);
                            setContextMenu({ ...contextMenu, visible: false });
                        }}>Eliminar</button>
                    </div>
                )}
            </div>
        </>
    );
}
