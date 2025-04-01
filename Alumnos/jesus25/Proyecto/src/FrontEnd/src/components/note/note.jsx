
import { useState, useEffect } from 'react';
import './note.css';
import { BASE_API_URL } from './../../constants';

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


  //#endregion

  //#region Logic

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

  return (
    <div className='note-container'>
      <div className='note-header'>Notas de Jesús</div>
      <div className='note-elements'>
        {notes.length > 0 ? (
          notes.map((note) => (
            <div key={note.id} className='note-element'>
              <p className='note-element-name'>{note.name}</p>
              <p className='note-element-description'>{note.description}</p>
              <button onClick={() => {
                setEditNote(note);
                setEditName(note.name);
                setEditDescription(note.description);
              }}>
                Editar
              </button>

              <button onClick={() => handleDelete(note.id)}>Eliminar</button>
            </div>
          ))
        ) : (
          <p>No hay notas disponibles.</p>
        )}
      </div>




      {/* Formulario Crear Notas */}
      <div className='create-note-form-container'>
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
        </form>
      </div>
      
      {/* Formulario Editar Notas */}
      {editNote && (
        <div className='edit-note-form-container'>
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
            <button type="button" onClick={() => setEditNote(null)}>Cancelar</button>
          </form>
        </div>
      )}

    </div>
  );
}

export default Note;