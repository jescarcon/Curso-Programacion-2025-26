import './App.css'
import {BrowserRouter, Routes, Route,} from 'react-router-dom'
import Home from './components/Home/Home'
import Login from './components/Login/Login'
import About from './components/About/About'
import CreateAccount from './components/CreateAccount/CreateAccount'
import Categories from './components/Categories/Categories'
import CategoryDetail from './components/Categories/CategoryDetail/CategoryDetail'
import Error from './components/Error/Error'
import MediaDetailView from './components/Categories/CategoryDetail/MediaDetailView/MediaDetailView'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/create-account' element={<CreateAccount/>}/>
        <Route path='/categories' element={<Categories/>}/>
        <Route path="/categories/categoryDetail/:categoryName" element={<CategoryDetail />} />
        <Route path="/categories/categoryDetail/:categoryName/:id" element={<MediaDetailView/>} />
        <Route path='*' element={<Error/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
