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
import Notes from './components/Categories/CategoryDetail/MediaDetailView/Notes/Notes'
import NoteDetailView from './components/Categories/CategoryDetail/MediaDetailView/Notes/NoteDetailView/NoteDetailView'
import Users from './components/Users/Users'
import UsersCategoryDetail from './components/Users/UsersCategoryDetail/UsersCategoryDetail'
import UsersMediaDetailView from './components/Users/UsersCategoryDetail/UsersMediaDetailView/UsersMediaDetailView'
import UsersMediaNotes from './components/Users/UsersCategoryDetail/UsersMediaDetailView/UsersMediaNotes/UsersMediaNotes'
import UsersNoteDetailView from './components/Users/UsersCategoryDetail/UsersMediaDetailView/UsersMediaNotes/UsersNoteDetailView/UsersNoteDetailView'
import Profile from './components/Profile/Profile'
import PrivateRoute from './components/Auth/PrivateRoute'
import UserSearch from './components/UserSearch/UserSearch'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas abiertas */}
        <Route path="/" element={<Home/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/create-account' element={<CreateAccount/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='*' element={<Error/>}/>


        {/* Rutas privadas */}
        <Route path='/categories' element={<PrivateRoute><Categories /></PrivateRoute>}/>
        <Route path="/categories/categoryDetail/:categoryName" element={<PrivateRoute><CategoryDetail /></PrivateRoute>} />
        <Route path="/categories/categoryDetail/:categoryName/:id" element={<PrivateRoute><MediaDetailView /></PrivateRoute>} />
        <Route path="/categories/categoryDetail/:categoryName/:id/notes" element={<PrivateRoute><Notes /></PrivateRoute>} />
        <Route path="/categories/categoryDetail/:categoryName/:id/notes/:noteId" element={<PrivateRoute><NoteDetailView /></PrivateRoute>} />
        
        <Route path='/users/:userSearch' element={<PrivateRoute><UserSearch /> </PrivateRoute>} />
        
        <Route path='/users/:user/:categoryName' element={<PrivateRoute><UsersCategoryDetail /></PrivateRoute>} />
        <Route path='/users/:user/:categoryName/:id' element={<PrivateRoute><UsersMediaDetailView /></PrivateRoute>} />
        <Route path='/users/:user/:categoryName/:id/notes' element={<PrivateRoute><UsersMediaNotes /></PrivateRoute>} />
        <Route path='/users/:user/:categoryName/:id/notes/:noteId' element={<PrivateRoute><UsersNoteDetailView /></PrivateRoute>} />

      </Routes>
    </BrowserRouter>
  )
}

export default App