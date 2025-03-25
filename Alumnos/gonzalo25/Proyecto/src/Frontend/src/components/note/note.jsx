import { useState,useEffect } from 'react';
        //cargar    usar
import './note.css';
import {BASE_API_URL} from '../../constants';

function Note() {
  //#region Variables
    const [notes,setNotes]= useState([]);
  //#endregion

  //#region Logica
  useEffect(()=>{ //siempre se va a ejecutar
    const fetchNotes = async ()=>{
      try {
        const response = await fetch(`${BASE_API_URL}/api/noteApp/notes`);
        if(!response.ok){
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setNotes(data);

      } catch (error) {
        console.error("Error:", error);
      }
    }
    fetchNotes();
  },[]);

  //#endregion


  return (
    <div className='noteAppContainer'>
      <h1 className='noteHeader'>Aplicación notas by Gonzalo</h1>
      <div className='noteElements'>
        <ul>
          {notes.length > 0 ? (
            notes.map((note) => {
              return (
                <li key={note.id} className='noteElement'>
                  <p className='noteElementTitle'>Titulo: {note.name}</p>
                  <p className='noteElementDescription'>Descripcion: {note.description}</p>
                </li>
              )
            })
          ) : (<p>No hay notas disponibles.</p>)
          }
        </ul>
      </div>
    </div>
  )
}

export default Note