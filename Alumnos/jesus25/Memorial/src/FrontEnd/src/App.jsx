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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path='/about' element={<About/>} />

        <Route path='/login' element={<Login/>} />
        <Route path='/create-account' element={<CreateAccount/>}/>
        <Route path='/profile' element={<Profile/>}/>

        <Route path='/categories' element={<Categories/>}/>
        <Route path="/categories/categoryDetail/:categoryName" element={<CategoryDetail  />} />
        <Route path="/categories/categoryDetail/:categoryName/:id" element={<MediaDetailView/>} />
        <Route path="/categories/categoryDetail/:categoryName/:id/notes" element={<Notes />} />
        <Route path="/categories/categoryDetail/:categoryName/:id/notes/:noteId" element={<NoteDetailView />} />
        
        
        <Route path='/users/:user' element={<CategoryDetail/>} />
        <Route path='/users/:user/:categoryName' element={<UsersCategoryDetail/>} />
        <Route path='/users/:user/:categoryName/:id' element={<UsersMediaDetailView/>} />
        <Route path='/users/:user/:categoryName/:id/notes' element={<UsersMediaNotes/>} />
        <Route path='/users/:user/:categoryName/:id/notes/:noteId' element={<UsersNoteDetailView/>} />


        <Route path='*' element={<Error/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
