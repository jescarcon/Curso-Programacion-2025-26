import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../../../../Navbar/Navbar';
import Error from '../../../../Error/Error';
import Modal from '../../../../Modal/modal';

export default function UserNotes() {
    const { category, id } = useParams();
    const [notesList, setNotesList] = useState([]);

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
    const [selectedNote, setSelectedNote] = useState(null);  // Vista previa al click

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/memorialApp/notes/?media=${id}`)
            .then(res => res.json())
            .then(data => setNotesList(data))
            .catch(error => console.error('Error fetching notes:', error));
    }, [id]);

    return (
        <>
            <Navbar />
            <div className="notes-container">
                <h2>Notas de la categoría: {currentCategory.name}</h2>

                {notesList.length > 0 ? (
                    <div className="notes-grid">
                        {notesList.map(note => (
                            <div className="note-card" key={note.id} onClick={() => setSelectedNote(note)}>
                                <div className="note-image">
                                    {note.image ? (
                                        <img src={note.image} alt={note.title} />
                                    ) : (
                                        <div className="note-placeholder">Sin imagen</div>
                                    )}
                                </div>
                                <div className="note-info">
                                    <h3>{note.title}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>Aún no hay notas en esta categoría...</p>
                )}
            </div>
            {/* Modal Vista Previa Nota */}
            <Modal isOpen={!!selectedNote} onClose={() => setSelectedNote(null)}>
                {selectedNote && (
                    <div className="note-detail-modal">
                        <h3>{selectedNote.title}</h3>
                        <p>{selectedNote.description}</p>
                        <p><strong>Fecha:</strong> {selectedNote.add_date}</p>
                        {selectedNote.image ? (
                            <div className="image-preview">
                                <img src={selectedNote.image} alt="Imagen de la nota" />
                            </div>
                        ) : (
                            <div className="note-placeholder">Sin imagen</div>
                        )}
                    </div>
                )}
            </Modal>
        </>
    );
}
