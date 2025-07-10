import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { authFetch } from '../../../../../../constants';
import './NoteDetailView.css';
import Navbar from '../../../../../Navbar/Navbar';

const NoteDetailView = () => {
  const { noteId } = useParams();
  const [note, setNote] = useState(null);

  useEffect(() => {
    authFetch(`/api/memorialApp/notes/${noteId}/`, 'GET')
      .then(res => res.json())
      .then(data => setNote(data))
      .catch(e => console.error('Error fetching note data:', e));
  }, [noteId]);

  if (!note) {
    return <p>Cargando detalles de la nota...</p>;
  }

  return (
    <>
      <Navbar />
      <div className="note-detail-view-container">
        <div className="note-detail-view-subcontainer-1">
          <div className="note-detail-view-image">
            {note.image ? (
              <img src={note.image} alt={note.title} />
            ) : (
              <img src='/images/categories/media/notes/DefaultNoteImage.png' alt={note.title}/>
            )}
          </div>
        </div>

        <div className="note-detail-view-subcontainer-2">
          <h2 id="note-detail-view-title">{note.title}</h2>
          <p className="note-detail-view-description">
            <strong>Descripción:</strong> {note.description}
          </p>
          <p className="note-detail-view-date">
            <strong>Fecha de creación:</strong> {note.add_date}
          </p>
        </div>
      </div>
    </>
  );
};

export default NoteDetailView;
