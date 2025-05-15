import React, { useEffect, useState } from 'react';
import { BASE_API_URL } from '../../utils';
import Navbar from '../Navbar/Navbar';

export default function Profile() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetch(`${BASE_API_URL}/api/memorialApp/users/`, {
            method: 'GET',
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => {
                console.log('Datos del usuario:', data); // Depuración
                const currentUser = data.find(user => user.is_current_user); // Ajusta según la lógica de tu backend
                setUser(currentUser);
            })
            .catch((err) => console.error('Error fetching user data:', err));
    }, []);
    
    if (!user) {
        return <p>Cargando datos del usuario...</p>;
    }

    return (
        <>
            <Navbar/>
            <div className="profile-container">
                <h1>Perfil de Usuario</h1>
                <p><strong>Nombre:</strong> {user.username}</p>
                <p><strong>Email:</strong> {user.email}</p>
            </div>
        </>
    );
}