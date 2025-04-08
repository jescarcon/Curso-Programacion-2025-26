import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate,Outlet } from 'react-router-dom';
import './App.css'
import HomePage from './Components/Home/HomePage'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
