import React, { useEffect, useState } from 'react';
import { getJWT, authFetch } from '../../constants';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import './Profile.css';

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const [mediaList, setMediaList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (!token) {
            navigate('/login');
            return;
        }

        const tokenJSON = getJWT(token);
        const user_id = tokenJSON?.user_id;

        if (!user_id) {
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            navigate('/login');
            return;
        }

        authFetch(`/api/memorialApp/users/${user_id}`, {
            method: 'GET',
        })
            .then(res => res.json())
            .then(data => {
                setUserData(data)

            })
            .catch(err => console.error("Error al obtener datos del usuario", err));

        authFetch(`/api/memorialApp/media`, {
            method: 'GET',
        })
            .then(res => res.json())
            .then(data => {
                const userMedia = data.slice(-3)
                setMediaList(userMedia);
                
            })
            .catch(err => console.error("Error al obtener medios del usuario", err));
    }, []);

    if (!userData) return <div>Cargando perfil...</div>;

    const avatarUrl = userData.avatar
        ? `/images/avatars/${userData.avatar}`
        : '/images/avatars/default.jpg';

    return (
        <>
            <Navbar></Navbar>
            <div className="profile-container">
                <div className='profile-header'>
                    <button className="edit-profile-button" onClick={() => navigate(`/profile/${user_id}/edit`)}>
                        Editar perfil
                    </button>
                    <img src={avatarUrl} alt="Avatar" className='profile-avatar' />
                    <h2 className='profile-username'>{userData.username}</h2>
                </div>
                <h3 className='section-title'>Últimos medios publicados</h3>
                <div className="media-grid-profile">
                    {mediaList.map(medium => (
                        <div key={medium.id} className="media-card-profile">
                            <div className="media-image-profile">
                                <img src={medium.image} alt={medium.title} />
                            </div>
                            <div className="media-info-profile">
                                <h3>{medium.title}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Profile;