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
    const [showAvatarSelector, setShowAvatarSelector] = useState(false);
    const [selectedAvatar, setSelectedAvatar] = useState(null);
    const [formValues, setFormValues] = useState({
        username: '',
        password: '',
        two_factor_enabled: false
    });
    const [show2FAModal, setShow2FAModal] = useState(false);
    const [twoFACode, setTwoFACode] = useState('');
    const [twoFAError, setTwoFAError] = useState('');


    const avatarList = [
        '/public/images/avatars/askywalker.jpg',
        '/public/images/avatars/dtargaryen.jpg',
        '/public/images/avatars/hpotter.jpg',
        '/public/images/avatars/joker.jpg',
        '/public/images/avatars/lackerman.jpg',
        '/public/images/avatars/linkbotw.jpg',
        '/public/images/avatars/mcaufield.jpg',
        '/public/images/avatars/rayanami.jpg',
        '/public/images/avatars/smurasaki.jpg',
        '/public/images/avatars/waddams.jpg',
        '/public/images/avatars/wmaximoff.jpg',
        '/public/images/avatars/wwhite.jpg',
    ];
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
                setSelectedAvatar(data.avatar); // Inicializa el avatar seleccionado
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

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('username', formValues.username);
        formData.append('password', formValues.password);
        formData.append('two_factor_enabled', formValues.two_factor_enabled);

        authFetch(`/api/memorialApp/users/${userData.id}/`, 'PATCH', formData)
            .then(res => {
                if (!res.ok) throw new Error("Error al actualizar perfil");
                return res.json();
            })
            .then(updated => {
                setUserData(updated);
                setShowModal(false);
            })
            .catch(err => console.error("Error al actualizar perfil", err));
    };

    const handleEditClick = () => {
        if (userData.two_factor_enabled) {
            authFetch('/api/memorialApp/users/send_2fa_code/', 'POST')
                .then(res => {
                    if (!res.ok) throw new Error("No se pudo enviar el código");
                    setShow2FAModal(true);
                })
                .catch(err => {
                    console.error("Error al enviar el código 2FA", err);
                    alert("Error al enviar el código de verificación");
                });
        } else {
            openEditModal();
        }
    }

    const openEditModal = () => {
        setFormValues({
            username: userData.username,
            password: '',
            two_factor_enabled: userData.two_factor_enabled
        });
        setShowModal(true);
    }

    const verifyTwoFACode = () => {
        authFetch('/api/memorialApp/users/verify_2fa_code/', 'POST', { code: twoFACode })
            .then(res => {
                if (!res.ok) {
                    setTwoFAError('Código incorrecto o expirado');
                    return;
                }
                setShow2FAModal(false);
                setTwoFACode('');
                setTwoFAError('');
                openEditModal();
            })
            .catch(err => {
                console.error("Error al verificar código 2FA", err);
                setTwoFAError('Error al verificar el código');
            });
    }


    if (!userData) return <div>Cargando perfil...</div>;

    const avatarUrl = userData && userData.avatar
        ? `/images/avatars/${userData.avatar}`
        : '/images/avatars/default.png';


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
                            <button className="edit-profile-button" onClick={handleEditClick}>
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
                    <form onSubmit={handleFormSubmit} className="media-form-1" >
                        <h3>Editar Perfil</h3>
                        <input
                            type="text"
                            value={formValues.username}
                            onChange={(e) => setFormValues(prev => ({ ...prev, username: e.target.value }))}
                            required
                        />
                        <input
                            type="password"
                            value={formValues.password}
                            onChange={(e) => setFormValues(prev => ({ ...prev, password: e.target.value }))}
                            placeholder='******'
                        />
                        <label className='label-checkbox'>
                            <div>
                                <input
                                    type="checkbox"
                                    className="toggle-checkbox"
                                    checked={formValues.two_factor_enabled}
                                    onChange={(e) => setFormValues(prev => ({
                                        ...prev,
                                        two_factor_enabled: e.target.checked
                                    }))}
                                />
                            </div>
                            <div>Activar verificación en dos pasos</div>
                        </label>
                        <button
                            type="button"
                            className="edit-profile-button"
                            onClick={() => setShowAvatarSelector(!showAvatarSelector)}
                            style={{ marginBottom: "10px" }}
                        >
                            Cambiar avatar
                        </button>
                        {showAvatarSelector && (
                            <div>
                                <div className="avatar-list">
                                    {avatarList.map((avatar) => {
                                        const avatarName = avatar.replace('/public/images/avatars/', '');
                                        return (
                                            <button
                                                key={avatar}
                                                type="button"
                                                className={`avatar-option${selectedAvatar === avatarName ? ' selected' : ''}`}
                                                style={{
                                                    backgroundImage: `url(/images/avatars/${avatarName})`,
                                                    backgroundSize: 'cover',
                                                    backgroundPosition: 'center',
                                                    width: '70px',
                                                    height: '70px',
                                                    borderRadius: '50%',
                                                    border: selectedAvatar === avatarName ? '3px solid #2196f3' : '2px solid transparent',
                                                    margin: '6px',
                                                    outline: 'none',
                                                    cursor: 'pointer',
                                                    transition: 'background 0.2s, border 0.2s, transform 0.2s',
                                                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                                                }}
                                                onClick={() => setSelectedAvatar(avatarName)}
                                                aria-label={avatarName}
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                        <div className='button-group'>
                            <button type="submit">Guardar cambios</button>
                            <button
                                type='button'
                                className="cancel-button"
                                onClick={() => setShowModal(false)}
                            >
                                Cancelar
                            </button>
                        </div>
                    </form>
                </Modal>
            )}

            {show2FAModal && (
                <Modal isOpen={show2FAModal} onClose={() => setShow2FAModal(false)}>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            verifyTwoFACode();
                        }}
                        className="media-form-1"
                    >
                        <h3>Verificación en dos pasos</h3>
                        <p>Introduce el código enviado a tu correo:</p>
                        <input
                            type="text"
                            value={twoFACode}
                            onChange={(e) => setTwoFACode(e.target.value)}
                            placeholder="Código de 6 dígitos"
                            required
                        />
                        {twoFAError && <span style={{ color: 'red', fontSize: '0.9rem' }}>{twoFAError}</span>}
                        <div className='button-group'>
                            <button type="submit">Verificar</button>
                            <button type="button" onClick={() => {
                                setShow2FAModal(false);
                                setTwoFACode('');
                                setTwoFAError('');
                            }}>Cancelar</button>
                        </div>
                    </form>
                </Modal>
            )}
        </>
    );
};

export default Profile;