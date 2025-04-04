import { useState, useEffect } from 'react'; //cargar ... usar
import './note.css';
import { BASE_API_URL } from '../../constants';

function Note() {
  //#region Variables
  const [notes, setNotes] = useState([]);

  //Variables para crear la nota
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  //Variables para editar la nota
  const [editNote, setEditNote] = useState(null);
  const [editName, seteditName] = useState("");
  const [editDescription, seteditDescription] = useState("");

  //#endregion

  //#region Lógica
  useEffect(() => {
    //siempre se va a ejecutar
    const fetchNotes = async () => {
      try {
        const response = await fetch(`${BASE_API_URL}/api/noteApp/notes`);
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setNotes(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchNotes();
  }, []);

  const createNote = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);

    try {
      const response = await fetch(`${BASE_API_URL}/api/noteApp/notes/`, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const createdNote = await response.json();
      setNotes((prevNotes) => [...prevNotes, createdNote]);
    } catch (error) {
      console.error("Error de la creación de la nota", error);
    }
  };

  //Funcion editar nota
  const handleEdit = async (e) => {
    e.preventDefault(); // Evitar el comportamiento por defecto del formulario
    try {
      console.log("Datos enviados:", {
        name: editName,
        description: editDescription,
      });
  
      const response = await fetch(`${BASE_API_URL}/api/noteApp/notes/${editNote.id}/`, { // Agregamos la barra al final
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json', // Especificar que el cuerpo es JSON
        },
        body: JSON.stringify({
          name: editName,
          description: editDescription,
        }),
      });
  
      if (!response.ok) {
        console.log("Editando nota con ID:", editNote?.id);
        throw new Error(`Error: ${response.status}`);
      }
  
      const updatedNote = await response.json();
      setNotes((prevNotes) =>
        prevNotes.map((note) => (note.id === updatedNote.id ? updatedNote : note))
      );
      setEditNote(null); // Limpiar el estado de edición después de actualizar
    } catch (error) {
      console.error("Error de la edición de la nota", error);
    }
  };  //#endregion

  //Funcion para eliminar la nota
  const handleDelete = async (noteId) => {
    try {
      const response = await fetch(`${BASE_API_URL}/api/noteApp/notes/${noteId}/`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
    } catch (error) {
      console.error("Error al eliminar la nota", error);
    }
  }
  
  //Un modal es un bloque de codigo que se ejecuta cuando se cumple una condición, en este caso cuando se hace click en el botón editar
  return (
    <div className='noteAppContainer'>
      <div className='noteHeader'>Notas de Gonzalo</div>
      <div className='noteElements'>
        {notes.length > 0 ? (
          notes.map((note) => (
            <div key={note.id} className='noteElement'>
              <p className='noteElementTitle'>{note.name}</p>
              <p className='noteElementDescription'>{note.description}</p>
              <button
                onClick={() => {
                  setEditNote(note); // Establece la nota que se está editando
                  seteditName(note.name); // Carga el nombre de la nota en el formulario
                  seteditDescription(note.description); // Carga la descripción de la nota en el formulario
                }}
              >Editar</button>
              <button onClick={() => handleDelete(note.id)}>Eliminar</button>
            </div>
          ))
        ) : (
          <p>No hay notas disponibles.</p>
        )}
      </div>

      {/* Formulario de edición */}
      {editNote && (
        <div className='edit-note-form-container'>
          <div className='edit-note-form-container-title'><h2>Editar nota</h2></div>
          <form onSubmit={handleEdit}>
            <label>Título:</label>
            <input
              type='text'
              id='editName'
              name='editName'
              required
              value={editName}
              onChange={(e) => seteditName(e.target.value)}
            />

            <label>Descripción:</label>
            <input
              type='text'
              id='editDescription'
              name='editDescription'
              required
              value={editDescription}
              onChange={(e) => seteditDescription(e.target.value)}
            />

            <button type='submit'>Guardar cambios</button>
            <button
              type='button'
              onClick={() => {
                setEditNote(null); // Cancela la edición
                seteditName(""); // Limpia el formulario
                seteditDescription("");
              }}
            >
              Cancelar
            </button>
          </form>
        </div>
      )}

      {/* Formulario de creación */}
      <div className='create-note-form-container'>
        <div className='create-note-form-header'><h2>Crear nota</h2></div>
        <form onSubmit={createNote}>
          <div className='create-note-form-group'>
            <label>Nombre:</label>
            <input
              type='text'
              id='name'
              name='name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className='create-note-form-group'>
            <label>Descripción:</label>
            <input
              type='text'
              id='description'
              name='description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <button type='submit'>Crear nota</button>
        </form>
      </div>
    </div>
  );
} export default Note