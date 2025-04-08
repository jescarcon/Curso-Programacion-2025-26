import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate,Outlet } from 'react-router-dom';
import './App.css'
import HomePage from './Components/Home/HomePage'
import Login from './Components/Home/Login/Login';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/login" element={<Login/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
