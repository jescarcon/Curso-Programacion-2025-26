import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Components/Home/Home'
import About from './Components/About/About'
import Categories from './Components/Categories/Categories'
import CategoryDetail from './Components/Categories/CategoryDetail/CategoryDetail'
import Error from './Components/Error/Error'
import MediaDetailView from './Components/Categories/CategoryDetail/MediaDetailView/MediaDetailView'
import Notes from './Components/Categories/CategoryDetail/MediaDetailView/Notes/Notes'
import Users from './Components/Users/Users'
import UserCategory from './Components/Users/UserCategory/UserCategory'
import UserCategoryDetailView from './Components/Users/UserCategory/UserCategoryDetailView/UserCategoryDetailView'
import UserNotes from './Components/Users/UserCategory/UserCategoryDetailView/Notes/UserNotes'


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/categories' element={<Categories/>} />
        <Route path='/categories/:category' element={<CategoryDetail/>} />
        <Route path='/categories/:category/:id' element={<MediaDetailView/>} />
        <Route path='/categories/:category/:id/notes' element={<Notes/>} />
        
        <Route path='/users/:username' element={<Users/>} />
        <Route path="/users/:username/:category" element={<UserCategory />} />
        <Route path="/users/:username/:category/:id" element={<UserCategoryDetailView/>} />
        <Route path="/users/:username/:category/:id/notes" element={<UserNotes/>} />

        <Route path='*' element={<Error/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
