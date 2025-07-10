import React, { useEffect, useState } from 'react';
import Navbar from '../../../Navbar/Navbar';
import './MediaDetailView.css';
import { authFetch } from './../../../../constants';
import { useParams, Link } from 'react-router-dom';

export default function MediaDetailView() {
  const URL_NAV = window.location.href;
  const isUserComponent = URL_NAV.includes("/users");
  const { user } = isUserComponent ? useParams() : "";
  const { categoryName, id } = useParams();
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
    authFetch(`/api/memorialApp/media/${id}/`, 'GET')
      .then(res => res.json())
      .then(data => {
        setMediumData(data)
        setStatus(data.status)
      })
      .catch(e => console.error('Error en la recepción de datos:', e))
  }, [id])

  const [status, setStatus] = useState(null);
  const translatedStatus = statusList.find(e => e.param === status)


  return (
    <>
      <Navbar />
      {mediumData ? (
        <div className="media-detail-view-container">
          {/* Subcontenedor 1 */}
          <div className="media-detail-view-subcontainer-1">
            <div>
              <div className="media-detail-view-image">
                {mediumData.image ? (<img
                  src={mediumData.image}
                  alt={mediumData.title}
                />):(
                  <img src='/images/categories/media/DefaultMediaImage.png' alt={mediumData.title} style={{'object-fit':'contain'}}></img>
                )}
              </div>
              <div id="hola" className="media-detail-view-notes">
                <Link
                  to={!isUserComponent ? `/categories/categoryDetail/${categoryName}/${id}/notes` : `/users/${user}/categories/${categoryName}/${id}/notes`}
                  className="media-detail-view-notes-button">
                  Ver Notas
                </Link>
              </div>
            </div>
          </div>

          {/* Subcontenedor 2 */}
          <div className="media-detail-view-subcontainer-2">
            <h2 id="media-detail-view-title" className="text-1">{mediumData.title}</h2>
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
                Inicio: {mediumData.begin_date ?
                  new Date(mediumData.begin_date).toLocaleDateString('es-ES') : 'No especificado'}
              </p>
              <p className="media-detail-view-finishDate">
                Fin: {mediumData.finish_date ?
                  new Date(mediumData.finish_date).toLocaleDateString('es-ES')
                  : 'No especificado'}
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