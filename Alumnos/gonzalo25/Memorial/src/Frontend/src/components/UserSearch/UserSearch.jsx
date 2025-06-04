import React, { useEffect, useState } from 'react'
import './UserSearch.css'
import Navbar from '../Navbar/Navbar'
import { useParams, Link } from 'react-router-dom'
import { authFetch, getJWT } from '../../constants'
import Modal from '../Modal/Modal'

export default function UserSearch() {
    //#region Variables
    const { userSearch } = useParams();
    const [userList, setUserList] = useState([]);

    //#endregion

    //#region lógica
    useEffect(() => {
        //Obtención del token de acceso
        const token = localStorage.getItem('access_token');
        if (!token) {
            console.error('Se requiere un token de acceso');
            window.location.href = '/login';
            return;
        }

        //lectura de los usuarios filtrados
        authFetch('/api/memorialApp/users/', 'GET')
            .then(res => res.json())
            .then(data => {
                const userFilter = data.filter(u => u.username.toLowerCase().includes(userSearch.toLowerCase()));
                setUserList(userFilter);

            })
            .catch(e => console.error('User not found', e));
    }, [userSearch])


    //#endregion

    return (
        <div>
            <Navbar />
            {userList.length == 0 ? (
                <div className='usersearch-container'>
                    <p>No se ha encontrado ningún usuario que coincida con: {userSearch}</p>
                </div>
            ) : (
                <div className='usersearch-container'>
                    <p>Resultados de la búsqueda: {userSearch}</p>
                    {
                    userList.map(u => (

                        <div key={u.id} className='usersearch-userlist'>
                            <img src={`/images/avatars/${u.avatar}`} alt="Avatar de usuario" />
                            <p>{u.username}</p>
                            <Link to={`/users/${u.id}/profile`}>Ver perfil</Link>
                            <Link to={`/users/${u.id}/categories`}>Ver medios</Link>
                        </div>

                    ))
                }</div>

            )}
        </div>
    )
}
