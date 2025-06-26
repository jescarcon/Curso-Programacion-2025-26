import './App.css'
import { BrowserRouter, Routes, Route, Navigate, } from 'react-router-dom'
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
import { useEffect, useState } from 'react'
import { BASE_API_URL } from './constants'
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); //Control de si el usuario está logueado o no

  useEffect(() => {
    const access_token = localStorage.getItem('access_token');
    setIsLoggedIn(!!access_token) //True si existe el token y false si no
    if (access_token) {
      setIsLoggedIn(true)
      try {
        const tokenDataJSON = JSON.parse(atob(access_token.split(".")[1]));
        const userID = tokenDataJSON.user_id;
        fetch(`${BASE_API_URL}/api/memorialApp/users`, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            const user = data.find(u => u.id === userID);
            if (user && user.avatar) {
              setAvatar(user.avatar);
            }
          }).catch((error) => {
            console.error("Error al obtener avatar", error);
          })
          ;
      } catch (error) {
        console.error("Error al obtener avatar", error);
      }
    } else {
      setIsLoggedIn(false);
    }
  }, [])

  function RedirectIfLogin({ isLoggedIn, children }) {
    if (isLoggedIn) {
      return <Navigate to="/categories" replace />
    }
    return children;
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas abiertas */}
        <Route path="/" element={
          <RedirectIfLogin isLoggedIn={isLoggedIn}>
            <Home />
          </RedirectIfLogin>} />

        <Route
          path='/login'
          element={
            <RedirectIfLogin isLoggedIn={isLoggedIn}>
              <Login />
            </RedirectIfLogin>
          }
        />


        <Route path='/create-account' element={
          <RedirectIfLogin isLoggedIn={isLoggedIn}>
            <CreateAccount />
          </RedirectIfLogin>
        } />
        <Route path='*' element={<Error />} />


        {/* Rutas privadas */}
        <Route path='/categories' element={<PrivateRoute><Categories /></PrivateRoute>} />
        <Route path='/categories/categoryDetail/:categoryName' element={<PrivateRoute><CategoryDetail /></PrivateRoute>} />
        <Route path='/categories/categoryDetail/:categoryName/:id' element={<PrivateRoute><MediaDetailView /></PrivateRoute>} />
        <Route path='/categories/categoryDetail/:categoryName/:id/notes' element={<PrivateRoute><Notes /></PrivateRoute>} />
        <Route path='/categories/categoryDetail/:categoryName/:id/notes/:noteId' element={<PrivateRoute><NoteDetailView /></PrivateRoute>} />
        <Route path='//profile' element={<PrivateRoute><Profile /> </PrivateRoute>} />


        <Route path='/users/:userSearch' element={<PrivateRoute><UserSearch /> </PrivateRoute>} />
        <Route path='/users/:userSearch/profile' element={<PrivateRoute><Profile /> </PrivateRoute>} />
        <Route path='/users/:user/categories' element={<PrivateRoute><Categories /></PrivateRoute>} />
        <Route path='/users/:user/categories/:categoryName' element={<PrivateRoute><CategoryDetail /></PrivateRoute>} />
        <Route path='/users/:user/categories/:categoryName/:id' element={<PrivateRoute><MediaDetailView /></PrivateRoute>} />
        <Route path='/users/:user/categories/:categoryName/:id/notes' element={<PrivateRoute><Notes /></PrivateRoute>} />
        <Route path='/users/:user/categories/:categoryName/:id/notes/:noteId' element={<PrivateRoute><NoteDetailView /></PrivateRoute>} />

      </Routes>
    </BrowserRouter>
  )
}

export default App