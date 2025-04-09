import './App.css'
import {BrowserRouter, Routes, Route,} from 'react-router-dom'
import Home from './components/Home/Home'
import Login from './components/Login/Login'
import CreateAccount from './components/CreateAccount/CreateAccount'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/CreateAccount' element={<CreateAccount/>}></Route>
    
      </Routes>
    </BrowserRouter>
  )
}

export default App
