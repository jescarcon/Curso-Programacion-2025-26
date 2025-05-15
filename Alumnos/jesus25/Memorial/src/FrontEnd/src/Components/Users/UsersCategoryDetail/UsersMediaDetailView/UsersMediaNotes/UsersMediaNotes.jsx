import React, { useEffect, useState } from 'react'
import Navbar from '../../../../Navbar/Navbar'
import { useParams, Link } from 'react-router-dom'
import { BASE_API_URL } from '../../../../../utils';
import Modal from '../../../../Modal/Modal'
import CreateButtonImage from '/images/createButton.png'



export default function Notes() {
  //#region Variables
  const { id, categoryName, user } = useParams();
  const [noteData, setNoteData] = useState([]);
  const [mediumName, setMediumName] = useState(''); // Nuevo estado para el nombre del medio
  const [showForm, setShowForm] = useState(null)

  //#endregion

  //#region lógica

  //#region GET Medium Name
  useEffect(() => {
    fetch(`${BASE_API_URL}/api/memorialApp/media/${id}/`) // Endpoint para obtener el medio
      .then((res) => res.json())
      .then((data) => {
        setMediumName(data.title); // Asume que el medio tiene un campo "name"
      })
      .catch((e) => console.error('Error fetching medium', e));
  }, [id]);
  //#endregion GET Medium Name

  //#region GET
  useEffect(() => {
    fetch(`${BASE_API_URL}/api/memorialApp/notes/?medium=${id}`)
      .then(res => res.json())
      .then(data => {
        setNoteData(data)
      })
      .catch(e => console.error('Error fetching note', e))
  }, [id]);

  //#endregion GET


  return (
    <>
      <Navbar />
      <div className="notes-header">
        <h3 className="notes-title">Notas de {mediumName} del usuario {user}</h3>
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
              <Link to={`/categories/categoryDetail/${categoryName}/${id}/notes/${note.id}`}>
                <div key={note.id} className="note-card">
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

    </>
  )
}
