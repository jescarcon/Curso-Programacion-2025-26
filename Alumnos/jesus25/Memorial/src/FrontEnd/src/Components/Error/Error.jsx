import React from 'react'
import { Link } from 'react-router-dom'
import './Error.css'

export default function Error() {
  return (
    <div className="error-container">
      <h1>404</h1>
      <p>Ups... Esta URL no es válida.</p>
      <Link to="/" className="error-link">Volver al inicio</Link>
    </div>
  )
}
