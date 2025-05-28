import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import { Link, useParams } from 'react-router-dom';
import { authFetch } from '../../constants';
import './UserSearch.css';

export default function UserSearch() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useParams(); // obtiene el parámetro `:user` de la URL

    useEffect(() => {
        authFetch('/api/memorialApp/users/')
            .then(res => res.ok ? res.json() : Promise.reject('Error en la respuesta'))
            .then(data => {
                const filtered = data.filter(u =>
                    u.username.toLowerCase().includes(user.toLowerCase())
                );
                setUsers(filtered);
            })
            .catch(error => {
                console.error('Error al obtener usuarios:', error);
                setUsers([]);
            })
            .finally(() => setLoading(false));
    }, [user]);

    return (
        <>
            <Navbar />
            <div className="usersearch-container">
                <h2 className="usersearch-title">
                    Resultados para: <span className="usersearch-query">{user}</span>
                </h2>

                {loading ? (
                    <p className="usersearch-loading">Cargando usuarios...</p>
                ) : users.length === 0 ? (
                    <p className="usersearch-notfound">No se han encontrado usuarios con ese nombre.</p>
                ) : (
                    users.map(user => (
                        <div key={user.id} className="usersearch-card">
                            <img
                                src={user.avatar}
                                alt="avatar"
                                className="usersearch-avatar"
                            />
                            <span className="usersearch-username">{user.username}</span>
                            <div className="usersearch-buttons">
                                <Link to={`/users/${user.username}/profile`} className="usersearch-button">Ver perfil</Link>
                                <Link to={`/users/${user.username}/categories`} className="usersearch-button">Ver medios</Link>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </>
    );
}
