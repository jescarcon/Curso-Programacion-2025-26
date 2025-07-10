import React, { useEffect, useState } from 'react'
import Navbar from '../../../../Navbar/Navbar'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { authFetch, BASE_API_URL } from '../../../../../constants';
import './Notes.css'
import Modal from '../../../../Modal/Modal'
import CreateButtonImage from '/images/createButton.png'

export default function Notes() {
  //#region Variables
  const URL_NAV = window.location.href;
  const isUserComponent = URL_NAV.includes("/users");
  const { user } = isUserComponent ? useParams() : "";
  const { id, categoryName } = useParams();
  const [noteData, setNoteData] = useState([]);
  const [editingNote, setEditingNote] = useState(false);
  const [mediumData, setMediumData] = useState(null);
  const [showForm, setShowForm] = useState(null);
  const [contextMenu, setContextMenu] = useState({ visible: false, mouseX: 5, mouseY: 5, note: null });
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const filteredNotes = noteData
    .filter(note => String(note.medium) === String(id))
    .filter(note => note.title.toLowerCase().includes(searchTerm.toLowerCase()));
  //#endregion

  //#region lógica
  useEffect(() => {
    authFetch(`/api/memorialApp/media/${id}/`, 'GET')
      .then(res => res.json())
      .then(data => {
        setMediumData(data)
      })
      .catch(e => console.error('Error fetching media:', e))
  }, [id])

  useEffect(() => {
    const closeMenu = () => setContextMenu({ ...contextMenu, visible: false });
    document.addEventListener('click', closeMenu);
    return () => document.removeEventListener('click', closeMenu);
  }, [contextMenu])

  useEffect(() => {
    authFetch(`/api/memorialApp/notes/?medium=${id}`, 'GET')
      .then(res => res.json())
      .then(data => {
        setNoteData(data)
      })
      .catch(e => console.error('Error fetching notes', e))
  }, [id])
  //#endregion lógica

  //#region CREATE
  const handleCreateNote = (e) => {
    e.preventDefault()
    const form = e.target
    const formData = new FormData(form)
    formData.append('medium', id)
    authFetch('/api/memorialApp/notes/', 'POST', formData)
      .then(res => res.json())
      .then(newNote => {
        setNoteData([...noteData, newNote])
        form.reset()
        setShowForm(false)
      })
      .catch(e => console.error('Error creating note:', e))
  }
  //#endregion

  //#region UPDATE
  const handleEditSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    const formData = new FormData(form)
    formData.append('medium', id)

    authFetch(`/api/memorialApp/notes/${editingNote.id}/`, 'PATCH', formData)
      .then(res => res.json())
      .then(updatedNote => {
        setNoteData(noteData.map(n => n.id === updatedNote.id ? updatedNote : n))
        setEditingNote(null)
      })
      .catch(err => console.error('Error editing media:', err))
  }
  //#endregion

  //#region DELETE
  const handleDeleteNote = (id) => {
    authFetch(`/api/memorialApp/notes/${id}/`, 'DELETE')
      .then(() => {
        setNoteData(noteData.filter(n => n.id !== id))
      }).catch(e => console.error("Error deleting note", e))
  }
  //#endregion

  return (
    <>
      <Navbar />
      {!isUserComponent ? (
        <>
          <div className="notes-header">
            <h3 className="notes-title">Notas de {mediumData ? (mediumData.title) : ('')}</h3>
            <img
              src={CreateButtonImage}
              alt="Añadir nueva nota"
              className="create-button"
              onClick={() => setShowForm(!showForm)}
            />
          </div>

          <div className='media-search-input-container'>
            <input
              type="text"
              placeholder="Buscar notas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="media-search-input"
            />

          </div>

          <div className="notes-container">
            {filteredNotes.length > 0 ? (
              filteredNotes.map(note => (
                <div key={note.id} className="category-card" onClick={() => navigate(`/categories/categoryDetail/${categoryName}/${id}/notes/${note.id}`)} onContextMenu={(e) => {
                  e.preventDefault();
                  setContextMenu({ visible: true, mouseX: e.pageX, mouseY: e.pageY, note: note });
                }}>
                  {note.image ? (
                    <img src={note.image} alt={note.title} className="category-image" />
                  ) : (
                    <img src='/images/categories/media/notes/DefaultNoteImage.png' alt={note.title} className="category-image" style={{ 'object-fit':'contain'}} />
                  )}
                  <h2 className="note-title">{note.title}</h2>
                </div>
              ))
            ) : (
              <p>No se han encontrado notas</p>
            )}
          </div>

          <Modal isOpen={showForm} onClose={() => setShowForm(false)}>
            <div className="media-form">
              <form onSubmit={handleCreateNote}>
                <h3>Crear nueva nota</h3>
                <input type="text" name="title" placeholder="Título" />
                <textarea name="description" placeholder="Descripción"></textarea>
                <input type="file" name="image" />
                <div className="form-buttons">
                  <button type="submit" className="save-button">Crear</button>
                  <button type="button" className="cancel-button" onClick={() => setShowForm(false)}>
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </Modal>

          {editingNote && (
            <Modal isOpen={!!editingNote} onClose={() => setEditingNote(null)}>
              <div className="media-form">
                <form onSubmit={handleEditSubmit}>
                  <h3>Editando: {editingNote.title}</h3>
                  <input
                    type="text"
                    name="title"
                    placeholder="Título"
                    value={editingNote.title}
                    onChange={(e) =>
                      setEditingNote({ ...editingNote, title: e.target.value })
                    }
                  />
                  <textarea
                    name="description"
                    placeholder="Descripción"
                    value={editingNote.description}
                    onChange={(e) =>
                      setEditingNote({ ...editingNote, description: e.target.value })
                    }
                  />
                  <input
                    type="file"
                    name="image"
                    onChange={(e) =>
                      setEditingNote({ ...editingNote, image: e.target.files[0] })
                    }
                  />
                  <div className="form-buttons">
                    <button type="submit" className="save-button">Guardar cambios</button>
                    <button type="button" className="cancel-button" onClick={() => setEditingNote(null)}>
                      Cancelar
                    </button>
                  </div>
                </form>
              </div>
            </Modal>
          )}

          {contextMenu.visible && (
            <div
              className="context-menu"
              style={{
                top: `${contextMenu.mouseY}px`,
                left: `${contextMenu.mouseX}px`,
              }}
            >
              <button
                onClick={() => {
                  setEditingNote(contextMenu.note);
                  setContextMenu({ ...contextMenu, visible: false });
                }}
                className="context-menu-btn"
              >
                Editar
              </button>
              <button
                onClick={() => {
                  handleDeleteNote(contextMenu.note.id);
                  setContextMenu({ ...contextMenu, visible: false });
                }}
                className="context-menu-btn delete"
              >
                Borrar
              </button>
            </div>
          )}
        </>
      ) : (
        <>
          <div className="notes-header">
            <h3 className="notes-title">Notas de {mediumData ? mediumData.title : ''}</h3>
          </div>
          <input
            type="text"
            placeholder="Buscar notas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="media-search-input"
          />
          <div className="notes-container">
            {filteredNotes.length > 0 ? (
              filteredNotes.map(note => (
                <div key={note.id} onClick={() => navigate(`/users/${user}/categories/${categoryName}/${id}/notes/${note.id}`)} className="note-card">
                  {note.image ? (
                    <img src={note.image} alt={note.title} className="note-image" />
                  ) : (
                    <div className="note-placeholder">Sin imagen</div>
                  )}
                  <h2 className="note-title">{note.title}</h2>
                </div>
              ))
            ) : (
              <p>No se han encontrado notas</p>
            )}
          </div>
        </>
      )}
    </>
  )
}
