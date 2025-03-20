import { useState,useEffect } from 'react';
        //cargar    usar
import './App.css';
import {BASE_API_URL} from './constants';

function App() {
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
    <div>
      <h1>Aplicación notas by Gonzalo</h1>
      <ul>
        {notes.length > 0 ? (
          notes.map((note) => {
            return (
              <li key={note.id}>
                <p>Titulo: {note.name}</p>
                <p>Descripcion: {note.description}</p>
              </li>
            )
          })
        ) : (<p>No hay notas disponibles.</p>)
        }
      </ul>
    </div>
  )
}

export default App
