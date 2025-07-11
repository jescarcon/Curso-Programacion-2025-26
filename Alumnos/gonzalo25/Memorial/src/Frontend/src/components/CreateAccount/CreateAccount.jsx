import React, { useState } from 'react';
import logo from '/images/home/logo.png';
import createAccImage from '/images/home/create-acc.jpeg';
import { Link } from 'react-router-dom';
import './CreateAccount.css';
import Navbar from '../Navbar/Navbar';
import Modal from '../Modal/Modal'; // Importa el componente Modal
import { BASE_API_URL } from '../../constants';

export default function CreateAccount() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [username, setUsername] = useState(null)
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [avatar, setAvatar] = useState(null)

    const submitUser = async (e) => {
        e.preventDefault();
        const formData = new FormData()
        formData.append('username', username);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('avatar', avatar);
        const metodoPost = await
            fetch(`${BASE_API_URL}/api/memorialApp/users/`, {
            method: 'POST',
            body: formData
        })
            .catch(e => console.error('Error creating user:', e))
        if(metodoPost.ok){
            window.location.href = '/login';
        }
    }

    const avatars = [
        '/images/avatars/askywalker.jpg',
        '/images/avatars/dtargaryen.jpg',
        '/images/avatars/hpotter.jpg',
        '/images/avatars/joker.jpg',
        '/images/avatars/lackerman.jpg',
        '/images/avatars/linkbotw.jpg',
        '/images/avatars/mcaufield.jpg',
        '/images/avatars/rayanami.jpg',
        '/images/avatars/smurasaki.jpg',
        '/images/avatars/waddams.jpg',
        '/images/avatars/wmaximoff.jpg',
        '/images/avatars/wwhite.jpg',
    ];

    const openModal = () => {
        console.log('Abriendo modal')
        setIsModalOpen(true);
    } 
    const closeModal = () => setIsModalOpen(false);

    const selectAvatar = (avatar) => {
        const avatarName = avatar.replace('/images/avatars/','');
        setAvatar(avatarName);
        console.log(avatarName);
        closeModal();
    };

    return (
        <div className='createacc-container'>
            <Navbar />
            <div className='createacc-body-text text-1'>
                Creación de cuenta en Memorial
            </div>

            <div className='createacc-body'>
                <div className='homepage-body-img'>
                    <img src={createAccImage} alt="Creación de cuenta" />
                </div>

                <div className='createacc-form'>
                    <div className='form-group'>
                        <label htmlFor='username'>Nombre de usuario</label>
                        <input type='text' id='username' name='username' placeholder="Introduce un nombre" onChange={(e)=>setUsername(e.target.value)}/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='email'>Dirección de correo electrónico</label>
                        <input type='email' id='email' name='email' placeholder="Añade un email" onChange={(e)=>setEmail(e.target.value)}/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='password'>Contraseña</label>
                        <input type='password' id='password' name='password' placeholder="*****" onChange={(e)=>setPassword(e.target.value)}/>
                    </div>
                    <div className='form-group'>
                        <label>Avatar seleccionado:</label>
                        {avatar ? (
                            <img src={`/images/avatars/${avatar}`} alt="Avatar seleccionado" className='selected-avatar' onChange={(e)=>setAvatar(e.target.value)}/>
                        ) : (
                            <p>No se ha seleccionado un avatar</p>
                        )}
                        <button type='button' onClick={openModal} className='btn-1 text-1'>
                            Elegir Avatar
                        </button>
                    </div>
                    <button type='submit' className='btn-1 text-1' onClick={(e) => submitUser(e)}>Crear cuenta</button>
                </div>
            </div>

            {isModalOpen && (
                <Modal isOpen={isModalOpen} onClose={closeModal} title="Elige tu avatar">
                    <div className='avatar-grid'>
                        {avatars.map((avatar, index) => (
                            <img
                                key={index}
                                src={avatar}
                                alt={`Avatar ${index + 1}`}
                                className='avatar-option'
                                onClick={() => selectAvatar(avatar)}
                            />
            
                        ))}
                    </div>
                </Modal>
            )}
        </div>
    );
}