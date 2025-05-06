import React from 'react'
import './Error.css'
import {Link} from 'react-router-dom'

export default function Error() {
  return (
    <div className='error-container'>
        <h1>Error 404</h1>
        <h2>Element not found</h2>
        <Link to='/' className='error-link'>Regresar</Link>
    </div>
  )
}
