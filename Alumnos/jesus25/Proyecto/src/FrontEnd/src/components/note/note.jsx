import { useState, useEffect } from 'react';
import './note.css';
import { BASE_API_URL } from './../../constants';
import addIcon from '/assets/images/common/black-add-icon.png';

import Modal from '../modal/modal';

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

  //#endregion

  //#region Logic

  //#region Menú Contextual
  const handleContextMenu = (e, note) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY, note });
  };

  const handleContextAction = (action) => {
    if (action === 'edit') {
      setEditName(contextMenu.note.name);
      setEditDescription(contextMenu.note.description);
      setEditNote(contextMenu.note);
      setIsEditOpen(true);
    } else if (action === 'delete') {
      handleDelete(contextMenu.note.id);
    }
    setContextMenu(null); // Cerrar el menú
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (contextMenu && !e.target.closest('.context-menu')) {
        setContextMenu(null); // Cerrar el menú
      }
    };
  
    // Escuchar clics en todo el documento
    document.addEventListener('click', handleClickOutside);
  
    // Limpiar el event listener cuando el componente se desmonte
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [contextMenu]);
  
  //#endregion

  // Cuando se cierra el modal, limpiar los campos
  const handleCloseCreateModal = () => {
    setIsCreateOpen(false);
    setName(""); // Limpiar el campo del nombre
    setDescription(""); // Limpiar el campo de descripción
  };


  //#region CRUD

  //Funcion List
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
          <img src={addIcon} alt="Add Note" />
        </div>
      </div>

      <div className='note-elements'>
        {notes.length > 0 ? (
          notes.map((note) => (
            <div key={note.id} className='note-element' onContextMenu={(e) => handleContextMenu(e, note)}>
              <p className='note-element-name'>{note.name}</p>
              <p className='note-element-description'>{note.description}</p>
            </div>
          ))
        ) : (
          <p>No hay notas disponibles.</p>
        )}
      </div>
      
      {contextMenu && (
        <div className="context-menu" style={{ top: contextMenu.y, left: contextMenu.x }}>
          <button onClick={() => handleContextAction('edit')}>Editar</button>
          <button onClick={() => handleContextAction('delete')}>Eliminar</button>
        </div>
      )}

      <Modal isOpen={isCreateOpen} onClose={() => handleCloseCreateModal(false)}>
        <h2>Crear Nota</h2>
        <form onSubmit={createNote}>
          <label>Título:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

          <label>Descripción:</label>
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />

          <button type="submit">Crear</button>
          <button onClick={() => handleCloseCreateModal(false)}>Cancelar</button>
        </form>
      </Modal>

      <Modal isOpen={isEditOpen} onClose={() => setIsEditOpen(false)}>
        <h2>Editar Nota</h2>
        <form onSubmit={handleEdit}>
          <label>Título:</label>
          <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)} required />

          <label>Descripción:</label>
          <input type="text" value={editDescription} onChange={(e) => setEditDescription(e.target.value)} required />

          <button type="submit">Guardar Cambios</button>
          <button onClick={() => setIsEditOpen(false)}>Cancelar</button>
        </form>
      </Modal>

    </div>
  );
}

export default Note;