import React, { useEffect, useState } from 'react';
import { getJWT, authFetch } from '../../constants';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import './Profile.css';

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const [mediaList, setMediaList] = useState([]);
    const navigate = useNavigate();
    const { paramUserId } = useParams(); // <-- ahora es el ID

    const [loggedUserId, setLoggedUserId] = useState(null);

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

        setLoggedUserId(user_id);

        // Si me busco a mí mismo con URL /users/:id/profile
        if (paramUserId && parseInt(paramUserId) === user_id) {
            navigate('/profile');
            return;
        }

        const userIdToFetch = paramUserId || user_id;

        // Obtener datos del usuario (ya sea yo o otro)
        authFetch(`/api/memorialApp/users/${userIdToFetch}`, 'GET')
            .then(res => {
                if (!res.ok) throw new Error("Usuario no encontrado");
                return res.json();
            })
            .then(data => {
                setUserData(data);

                // Cargar últimos 3 medios
                authFetch(`/api/memorialApp/media`, 'GET')
                    .then(res => res.json())
                    .then(mediaData => {
                        const userMedia = mediaData.filter(m => m.user === data.id).slice(-3);
                        setMediaList(userMedia);
                    })
                    .catch(err => console.error("Error al obtener medios", err));
            })
            .catch(err => {
                console.error("Error al obtener usuario", err);
                navigate('/not-found');
            });

    }, [paramUserId, navigate]);

    if (!userData) return <div>Cargando perfil...</div>;

    const avatarUrl = userData.avatar
        ? `/images/avatars/${userData.avatar}`
        : '/images/avatars/default.jpg';

    const isOwnProfile = userData.id === loggedUserId;

    return (
        <>
            <Navbar />
            <div className="profile-container">
                <div className='profile-header'>
                    {isOwnProfile && (
                        <button
                            className="edit-profile-button"
                            onClick={() => navigate(`/profile/${userData.id}/edit`)}
                        >
                            Editar perfil
                        </button>
                    )}
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
