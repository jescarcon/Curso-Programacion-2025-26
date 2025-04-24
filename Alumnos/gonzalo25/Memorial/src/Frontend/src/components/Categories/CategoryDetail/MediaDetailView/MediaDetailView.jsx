import React, { useEffect, useState } from 'react';
import Navbar from '../../../Navbar/Navbar';
import './MediaDetailView.css';
import { BASE_API_URL } from './../../../../constants';
import { useParams } from 'react-router-dom';

export default function MediaDetailView() {
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
      <div className='media-detail-view-container'>
        <div className='media-detail-view-subcontainer-1'> 1
          <div className='media-detail-view-image'>1.1</div>
          <div className='media-detail-view-notes'>1.2</div>
        </div>
        <div className='media-detail-view-subcontainer-2'>
          <div className='text-1'>{mediumData.title}</div>
          <div className='media-detail-view-description'>{mediumData.description}</div>
          <div className='media-detail-view-addDate'>{mediumData.add_date}</div>
          <div className='media-detail-view-rating'>Valoración: {mediumData.rating}/10</div>
          <div className='media-detail-view-status'>{translatedStatus.name}</div>
          <div className='media-detail-view-dates'>
            <div className='media-detail-view-beginDate'>{mediumData.begin_date}</div>
            <div className='media-detail-view-finishDate'>{mediumData.finish_date}</div>
          </div>
        </div>
        {/* <h1>{mediumData.title}</h1>
        <p>{mediumData.description}</p> */}
      </div>

      ):(
        <p>Cargando</p>
      )}
    </>
  );
}