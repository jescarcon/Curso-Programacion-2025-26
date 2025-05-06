import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BASE_API_URL } from '../../../../../../constants';
import './NoteDetailView.css';
import Navbar from '../../../../../Navbar/Navbar';

const NoteDetailView = () => {
  const { noteId } = useParams();
  const [note, setNote] = useState(null);

  useEffect(() => {
    fetch(`${BASE_API_URL}/api/memorialApp/notes/${noteId}/`)
      .then((res) => res.json())
      .then((data) => setNote(data))
      .catch((e) => console.error('Error fetching note details:', e));
  }, [noteId]);

  if (!note) {
    return <p>Cargando detalles de la nota...</p>;
  }

  return (
    <>
      <Navbar></Navbar>
      <div className="note-detail-container">
        <div className="note-detail-card">
          <div className="note-detail-image">
            {note.image ? (
              <img src={note.image} alt={note.title} />
            ) : (
              <div className="note-detail-placeholder">Sin imagen</div>
            )}
          </div>
          <div className="note-detail-content">
            <h1 className="note-detail-title">{note.title}</h1>
            <p className="note-detail-description"><strong>Descripción:</strong> {note.description}</p>
            <p className="note-detail-date"><strong>Fecha de creación:</strong> {note.add_date}</p>
          </div>
        </div>
      </div>

    </>
  );
};

export default NoteDetailView;