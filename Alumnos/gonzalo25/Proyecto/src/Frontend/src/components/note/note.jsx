import { useState, useEffect } from 'react'; //cargar ... usar
import './note.css';
import { BASE_API_URL } from '../../constants';

function Note() {
  //#region Variables
  const [notes, setNotes] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
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
  
  //#endregion

  return (
    <div className='noteAppContainer'>
      <div className='noteHeader'>Notas de Gonzalo</div>
      <div className='noteElements'>
        {notes.length > 0 ? (
          notes.map((note) => (
            <div key={note.id} className='noteElement'>
              <p className='noteElementTitle'>{note.name}</p>
              <p className='noteElementDescription'>{note.description}</p>
            </div>
          ))
        ) : (
          <p>No hay notas disponibles.</p>
        )}
      </div>


      <div className='create-note-form-container'>
        <div className='create-note-form-header'><h2>Crear nota</h2></div>
        <form onSubmit={createNote}>
          <div className='create-note-form-group'>
            <label>Nombre:</label>
            <input type='text' id='name' name='name' value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className='create-note-form-group'>
            <label>Descripción:</label>
            <input type='text' id='description' name='description' value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <button type='submit'>Crear nota</button>
        </form>
      </div>


    </div>
  )
} export default Note