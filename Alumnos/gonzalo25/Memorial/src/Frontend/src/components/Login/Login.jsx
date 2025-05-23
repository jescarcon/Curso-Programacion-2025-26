import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import Categories from '../Categories/Categories';
import Navbar from '../Navbar/Navbar';
import { BASE_API_URL } from '../../constants.js';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);
        try {
            // Consulta
            const response = await fetch(`${BASE_API_URL}/api/token/`, {
                method: 'POST',
                body: formData,
            });

            // Error (validación)
            if (!response.ok) {
                setErrorMessage('Usuario y/o contraseña incorrectos');
                setShowErrorModal(true);
                return;
            }

            // Guardado del Token
            const data = await response.json();
            localStorage.setItem('access_token', data.access);
            localStorage.setItem('refresh_token', data.refresh);

            //Redirección
            if (response.ok) {
                window.location.href = '/categories';
            }
        } catch (error) {
            console.error('Error logging', error); // Error al fetch
            setErrorMessage('Ocurrió un error al intentar iniciar sesión');
            setShowErrorModal(true);
        }
    };

    return (
        <div className='loginpage-container'>
            <Navbar />
            <div className='loginpage-body'>
                <div className='loginpage-body-text text-1'>Iniciar sesión en Memorial</div>
                <div className='loginpage-form'>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSubmit();
                        }}
                    >
                        <div className='form-group'>
                            <label>Nombre de usuario</label>
                            <input
                                type='text'
                                id='username'
                                name='username'
                                onChange={(e) => {
                                    setUsername(e.target.value);
                                }}
                            />
                        </div>
                        <div className='form-group'>
                            <label>Contraseña</label>
                            <input
                                type='password'
                                id='password'
                                name='password'
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                            />
                        </div>
                        <button type='submit' className='btn-1 text-1'>
                            Acceder
                        </button>
                    </form>
                </div>
            </div>
            {showErrorModal && (
                <div className="custom-error-modal">
                    <span>{errorMessage}</span>
                    <button className="close-error-modal" onClick={() => setShowErrorModal(false)}>
                        ✖
                    </button>
                </div>
            )}
        </div>
    );
}