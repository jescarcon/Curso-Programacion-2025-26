import React, { useEffect, useState } from 'react';
import { getJWT, authFetch } from '../../constants';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Modal from '../Modal/Modal';
import './Profile.css';

const Profile = () => {
    //#region Variables

    const URL_NAV = window.location.href;
    const isUserComponent = URL_NAV.includes("/users");
    const { userSearch } = isUserComponent ? useParams() : "";
    const [userData, setUserData] = useState(null);
    const [mediaList, setMediaList] = useState([]);
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [editUsername, setEditUsername] = useState('');
    const [editPassword, setEditPassword] = useState('');
    //#endregion

    //#region Logica
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

        let usuarioBusqueda = user_id;
        if (userSearch && userSearch != "") {
            usuarioBusqueda = userSearch;
        }

        authFetch(`/api/memorialApp/users/${usuarioBusqueda}`, 'GET')
            .then(res => res.json())
            .then(data => {
                setUserData(data)

            })
            .catch(err => console.error("Error al obtener datos del usuario", err));

        authFetch(`/api/memorialApp/media`, 'GET')
            .then(res => res.json())
            .then(data => {
                const filteredMedia = data.filter(m => m.user === parseInt(usuarioBusqueda));

                const userMedia = filteredMedia.slice(-3)
                setMediaList(userMedia);

            })
            .catch(err => console.error("Error al obtener medios del usuario", err));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const updateData = {};
        if (editUsername !== userData.username) updateData.username = editUsername;
        if (editPassword) updateData.password = editPassword;

        authFetch(`/api/memorialApp/users/${userData.id}/`, 'PATCH', updateData)
            .then(res => {
                if (!res.ok) throw new Error("Error al actualizar perfil");
                return res.json();
            })
            .then(updated => {
                setUserData(updated);
                setShowModal(false);
            })
            .catch(err => console.error("Error al actualizar perfil", err));
    }

    //#endregion

    if (!userData) return <div>Cargando perfil...</div>;

    const avatarUrl = userData.avatar
        ? `/images/avatars/${userData.avatar}`
        : '/images/avatars/default.jpg';


    return (
        <>
            <Navbar />
            <div className="profile-container">
                <div className='profile-header'>

                    <img src={avatarUrl} alt="Avatar" className='profile-avatar' />
                    <h2 className='profile-username'>{userData.username}</h2>
                    {!userSearch ?
                        <>
                            <h3>
                                {userData.email}
                            </h3>
                            <button className="edit-profile-button" onClick={() => {
                                setEditUsername(userData.username);
                                setShowModal(true);
                            }}>
                                Editar perfil
                            </button>
                        </>
                        : <></>
                    }
                </div>
                <h3 className='section-title'>Últimos medios publicados</h3>
                <div className="media-grid-profile">
                    {mediaList.map(medium => (
                        <div key={medium.id} className="category-card">
                            <div >
                                <img src={medium.image} alt={medium.title} className='category-image' />
                            </div>
                            <div className="media-info-profile">
                                <h3>{medium.title}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {showModal && (
                <Modal isOpen={showModal} onClose={() => setShowModal(false)}>

                    <form onSubmit={handleSubmit} className="media-form-1" >
                        <h3>Editar Perfil</h3>
                        <input
                            type="text"
                            value={editUsername}
                            onChange={(e) => setEditUsername(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            value={editPassword}
                            onChange={(e) => setEditPassword(e.target.value)}
                            placeholder='******'
                        />
                        <div className='button-group'>
                            <button type="submit">Guardar cambios</button>
                            <button type='submit' onClick={() => {
                                setShowModal(false)
                            }}>Cancelar</button>
                        </div>

                    </form>


                </Modal>
            )}


        </>
    );
};

export default Profile;