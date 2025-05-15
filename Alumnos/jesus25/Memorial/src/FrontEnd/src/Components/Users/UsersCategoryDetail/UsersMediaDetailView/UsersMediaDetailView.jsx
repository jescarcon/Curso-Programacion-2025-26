import React, { useEffect, useState } from 'react';
import Navbar from '../../../Navbar/Navbar';
import { BASE_API_URL } from './../../../../utils';
import { useParams, Link } from 'react-router-dom';

export default function MediaDetailView() {
  const { user, categoryName, id } = useParams();
  const [mediumData, setMediumData] = useState(null);
  const statusList = [
    { name: 'Pendiente', param: 'pending' },
    { name: 'Siguiendo', param: 'following' },
    { name: 'Leyendo', param: 'reading' },
    { name: 'Vista', param: 'watched' },
    { name: 'Pendiente de salida', param: 'upcoming' },
    { name: 'Pendiente de compra', param: 'pending_purchase' },
    { name: 'Jugando', param: 'playing' },
    { name: 'Terminado', param: 'finished' }
  ];

  useEffect(() => {
    fetch(`${BASE_API_URL}/api/memorialApp/media/${id}/`)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setMediumData(data)
        setStatus(data.status)
      })
      .catch(e => console.error('Error fetching data:', e))


  }, [])

  const [status, setStatus] = useState(null);
  const translatedStatus = statusList.find(e => e.param === status)

  console.log(translatedStatus)

  return (
    <>
      <Navbar />
      {mediumData ? (
        <div className="media-detail-view-container">
          {/* Subcontenedor 1 */}
          <div className="media-detail-view-subcontainer-1">
            <div className="media-detail-view-image">
              <img
                src={mediumData.image}
                alt={mediumData.title}
                className="media-detail-view-image"
              />
            </div>
            <div className="media-detail-view-notes">
              <Link
                to={`/users/${user}/${categoryName}/${id}/notes`}
                className="media-detail-view-notes-button">
                Ver Notas
              </Link>
            </div>

          </div>

          {/* Subcontenedor 2 */}
          <div className="media-detail-view-subcontainer-2">
            <h2 className="text-1">{mediumData.title}</h2>
            <p className="media-detail-view-description">
              {mediumData.description}
            </p>
            <p className="media-detail-view-addDate">
              Fecha de agregado: {mediumData.add_date}
            </p>
            <p className="media-detail-view-rating">
              Valoración: {mediumData.rating}/10
            </p>
            <p className="media-detail-view-status">
              Estado: {translatedStatus.name}
            </p>
            <div className="media-detail-view-dates">
              <p className="media-detail-view-beginDate">
                Inicio: {mediumData.begin_date}
              </p>
              <p className="media-detail-view-finishDate">
                Fin: {mediumData.finish_date}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </>
  );

}