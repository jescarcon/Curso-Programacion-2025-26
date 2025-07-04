import React, { useEffect, useState } from 'react'
import Navbar from '../../../../Navbar/Navbar'
import { useParams, Link } from 'react-router-dom'
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

  //#endregion

  //#region lógica

  //#region GET Medium Name
  useEffect(() => {
    authFetch(`/api/memorialApp/media/${id}/`, 'GET')
      .then(res => res.json())
      .then(data => {
        setMediumData(data)
      })
      .catch(e => console.error('Error fetching media:', e))
  }, [id])
  //#endregion GET Medium Name

  useEffect(() => {
    const closeMenu = () => setContextMenu({ ...contextMenu, visible: false });
    document.addEventListener('click', closeMenu);
    return () => document.removeEventListener('click', closeMenu);
  }, [contextMenu])


  //#region GET
  useEffect(() => {
    authFetch(`/api/memorialApp/notes/?medium=${id}`, 'GET')
      .then(res => res.json())
      .then(data => {
        setNoteData(data)
      })
      .catch(e => console.error('Error fetching notes', e))
  }, [id])

  //#endregion GET

  //#region CREATE
  const handleCreateNote = (e) => {
    e.preventDefault()
    const form = e.target
    const formData = new FormData(form)
    formData.append('medium', id)
    authFetch('/api/memorialApp/notes/', 'POST', formData
    )
      .then(res => res.json())
      .then(newNote => {
        setNoteData([...noteData, newNote])
        form.reset()
      })
      .catch(e => console.error('Error creating note:', e))
  }
  //#endregion CREATE

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
  //#endregion UPDATE

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
      {!isUserComponent ? (<>
        <div className="notes-header">
          <h3 className="notes-title">Notas de {mediumData ? (mediumData.title) : ('')}</h3>
          <img
            src={CreateButtonImage}
            alt="Añadir nueva nota"
            className="create-button"
            onClick={() => setShowForm(!showForm)}
          />
        </div>
        <div className="notes-container">
          {noteData.length > 0 ? (
            noteData
              .filter(note => String(note.medium) === String(id))
              .map(note => (
                <Link key={note.id} to={`/categories/categoryDetail/${categoryName}/${id}/notes/${note.id}`}>
                  <div className="note-card" onContextMenu={(e) => {
                    e.preventDefault();
                    setContextMenu({ visible: true, mouseX: e.pageX, mouseY: e.pageY, note: note })
                  }}>
                    {note.image ? (
                      <img src={note.image} alt={note.title} className="note-image" />
                    ) : (
                      <div className="note-placeholder">Sin imagen</div>
                    )}
                    <h2 className="note-title">{note.title}</h2>
                  </div>
                </Link>
              ))
          ) : (
            <p>No se han detectado notas</p>
          )}
        </div>

        <Modal isOpen={showForm} onClose={() => setShowForm(false)}>
          <div className="media-form">
            <form onSubmit={handleCreateNote}>
              <h3>Crear nueva nota</h3>
              <label>Título</label>
              <input type="text" name="title" />
              <label>Descripción</label>
              <textarea name="description"></textarea>
              <label>Imagen</label>
              <input type="file" name="image" />
              <div className="form-buttons">
                <button type="submit" className="save-button">Crear</button>
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => setShowForm(false)}
                >
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
                <label>Título</label>
                <input
                  type="text"
                  name="title"
                  value={editingNote.title}
                  onChange={(e) =>
                    setEditingNote({ ...editingNote, title: e.target.value })
                  }
                />
                <label>Descripción</label>
                <textarea
                  name="description"
                  value={editingNote.description}
                  onChange={(e) =>
                    setEditingNote({ ...editingNote, description: e.target.value })
                  }
                />
                <label>Imagen</label>
                <input
                  type="file"
                  name="image"
                  onChange={(e) =>
                    setEditingNote({ ...editingNote, image: e.target.files[0] })
                  }
                />
                <div className="form-buttons">
                  <button type="submit" className="save-button">Guardar cambios</button>
                  <button
                    type="button"
                    className="cancel-button"
                    onClick={() => setEditingNote(null)}
                  >
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
      </>)
        :
        (<>
          <div className="notes-header">
            <h3 className="notes-title">Notas de {mediumData ? (mediumData.title) : ('')}</h3>
          </div>
          <div className="notes-container">
            {noteData.length > 0 ? (
              noteData
                .filter(note => String(note.medium) === String(id))
                .map(note => (
                  <Link key={note.id} to={`/users/${user}/categories/${categoryName}/${id}/notes/${note.id}`}>
                    <div className="note-card">
                      {note.image ? (
                        <img src={note.image} alt={note.title} className="note-image" />
                      ) : (
                        <div className="note-placeholder">Sin imagen</div>
                      )}
                      <h2 className="note-title">{note.title}</h2>
                    </div>
                  </Link>
                ))
            ) : (
              <p>No se han detectado notas</p>
            )}
          </div>
        </>)}
    </>
  )
}
