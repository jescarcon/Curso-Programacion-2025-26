import { useState, useEffect } from 'react';
import './note.css';
import { BASE_API_URL } from './../../constants';

function Note() {
  //#region Variables
  const [notes, setNotes] = useState([]);

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

    }



    fetchNotes();
  }, [])

  //#endregion

  return (
    <div className='note-container'>
      <div className='note-header'>Notas</div>
      <div className='note-elements'>
        
        <div className='note-element'>
          <p className='note-element-title'>Titulo</p>
          <p className='note-element-description'>Descripcion</p>
        </div> 

        <div className='note-element'>
          <p className='note-element-title'>Titulo</p>
          <p className='note-element-description'>Descripcion</p>
        </div>
        <div className='note-element'>
          <p className='note-element-title'>Titulo</p>
          <p className='note-element-description'>Descripcion</p>
        </div>
        <div className='note-element'>
          <p className='note-element-title'>Titulo</p>
          <p className='note-element-description'>Descripcion</p>
        </div>
        <div className='note-element'>
          <p className='note-element-title'>Titulo</p>
          <p className='note-element-description'>Descripcion</p>
        </div>
      </div>
    </div>
  )
}

export default Note
