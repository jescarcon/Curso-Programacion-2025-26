import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Components/Home/Home'
import About from './Components/About/About'
import Categories from './Components/Categories/Categories'
import CategoryDetail from './Components/Categories/CategoryDetail/CategoryDetail'
import Error from './Components/Error/Error'


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/categories' element={<Categories/>} />
        <Route path='/categories/:category' element={<CategoryDetail/>} />
        <Route path='*' element={<Error/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
