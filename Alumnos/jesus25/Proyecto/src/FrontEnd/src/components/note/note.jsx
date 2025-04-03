
import { useState, useEffect } from 'react';
import './note.css';
import { BASE_API_URL } from './../../constants';
import Modal from '../modal/modal';
import addImg from '/assets/images/common/black-add-icon.png';

function Note() {
  //#region Variables
  const [notes, setNotes] = useState([]);

  //Variables formulario creacion
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  //Variables formulario edicion
  const [editNote, setEditNote] = useState(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");

  //Variables Modal
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  //Variable Menú Contextual
  const [contextMenu, setContextMenu] = useState(null);

  //Variable Vista detalle
  const [viewNote, setViewNote] = useState(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  //#endregion

  //#region Logic

  const handleCloseCreateModal = () => {
    setIsCreateOpen(false)
    setName("");
    setDescription("");
  }

  const handleViewNote = (note) => {
    setViewNote(note);
    setIsViewOpen(true);
  };

  //#region Context Menu

  //Aparece Click derecho
  const handleContextMenu = (e, note) => {
    e.preventDefault(); //Evitar el click derecho default
    setContextMenu({ x: e.clientX, y: e.clientY, note });
  }

  //Ejecuta las acciones del click derecho
  const handleContextAction = (action) => {
    if (action === 'edit') {
      setEditNote(contextMenu.note);
      setEditName(contextMenu.note.name);
      setEditDescription(contextMenu.note.description);
      setIsEditOpen(true);

    } else if (action === 'delete') {
      handleDelete(contextMenu.note.id);
    }
  }

  //Cerrar el click derecho
  useEffect(() => {
    const clickOutside = (e) => {
      if (contextMenu && !e.target.closest('.context-menu')) {
        setContextMenu(null); //cerrar el click derecho
      }
    }
    document.addEventListener('click', clickOutside);

    return () => {
      document.removeEventListener('click', clickOutside);
    };
  }
    , [contextMenu]);


  //#endregion

  //#region CRUD
  //Funcion Get List

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch(`${BASE_API_URL}/api/noteApp/notes`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();
        setNotes(data);
      } catch (error) {
        console.error("Error al obtener las notas:", error);
      }
    };

    fetchNotes();
  }, []);

  //Funcion Create
  const createNote = async (e) => {
    e.preventDefault();


    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);

    try {
      const response = await fetch(`${BASE_API_URL}/api/noteApp/notes/`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} -  ${response.statusText}`);
      }

      const createdNote = await response.json();
      setNotes((prevNotes) => [...prevNotes, createdNote]);

      setName("");
      setDescription("");
      setIsCreateOpen(false);
    } catch (error) {
      console.error("Error en la creacion de la nota:", error);
    }

  }

  //Funcion Edit
  const handleEdit = async (e) => {
    e.preventDefault(); // Previene la recarga

    const formData = new FormData();
    formData.append("name", editName);
    formData.append("description", editDescription);

    try {
      const response = await fetch(`${BASE_API_URL}/api/noteApp/notes/${editNote.id}/`, {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const updatedNote = await response.json();
      setNotes((prevNotes) =>
        prevNotes.map((note) => (note.id === updatedNote.id ? updatedNote : note))
      );

      setEditNote(null);
      setIsEditOpen(false);
    } catch (error) {
      console.error("Error en la edición de la nota: ", error);
    }
  };

  //Funcion Delete
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${BASE_API_URL}/api/noteApp/notes/${id}/`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id)); // Actualizar UI
    } catch (error) {
      console.error("Error al eliminar la nota:", error);
    }
  };
  //#endregion

  //#endregion

  return (
    <div className='note-container'>
      <div className='note-header'>
        <div className='note-header-text'>Notas de Jesús</div>
        <div className='add-note-button' onClick={() => setIsCreateOpen(true)}>
          <img src={addImg} alt="Add Note" />
        </div>
      </div>

      <div className='note-elements'>
        {notes.length > 0 ? (
          notes.map((note) => (
            <div key={note.id} className='note-element' onClick={() => handleViewNote(note)}
              onContextMenu={(e) => handleContextMenu(e, note)}>
              <p className='note-element-name'>{note.name}</p>
              <p className='note-element-description'>{note.description}</p>
            </div>
          ))
        ) : (
          <p>No hay notas disponibles.</p>
        )}
      </div>

      {/* Modal Crear Notas */}
      <Modal isOpen={isCreateOpen} onClose={() => handleCloseCreateModal(false)}>
        <div className='create-note-form-header'><h2>Crear Nota</h2></div>
        <form onSubmit={createNote}>
          <div className='create-note-form-group'>
            <label>Título:</label>
            <input type="text" id="name" name="name"
              value={name} onChange={(e) => setName(e.target.value)}
              required />
          </div>

          <div className='create-note-form-group'>
            <label>Descripción:</label>
            <input type="text" id="description" name="description"
              value={description} onChange={(e) => setDescription(e.target.value)}
              required />
          </div>
          <button type='submit'>Crear Nota</button>
          <button onClick={() => handleCloseCreateModal(false)}>Cancelar</button>
        </form>
      </Modal>

      {/* Modal Edit Notas */}
      <Modal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)}>
        <div className='edit-note-form-header'><h2>Editar Nota</h2></div>
        <form onSubmit={handleEdit}>
          <div className='edit-note-form-group'>
            <label>Título:</label>
            <input
              type="text"
              id="editName"
              name="editName"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              required
            />
          </div>

          <div className='edit-note-form-group'>
            <label>Descripción:</label>
            <input
              type="text"
              id="editDescription"
              name="editDescription"
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              required
            />
          </div>

          <button type='submit'>Guardar Cambios</button>
          <button type="button" onClick={() => setIsEditOpen(false)}>Cancelar</button>
        </form>
      </Modal>

      <Modal isOpen={isViewOpen} onClose={() => setIsViewOpen(false)}>
        {viewNote && (
          <div className='view-note-content'>
            <h2>{viewNote.name}</h2>
            <p>{viewNote.description}</p>
          </div>
        )}
      </Modal>


      {contextMenu && (
        <div className='context-menu' style={{ top: contextMenu.y, left: contextMenu.x }}>
          <button onClick={() => handleContextAction('edit')} >Editar</button>
          <button onClick={() => handleContextAction('delete')}>Eliminar</button>
        </div>
      )}


    </div>
  );
}

export default Note;