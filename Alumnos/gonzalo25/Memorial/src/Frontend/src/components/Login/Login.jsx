import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import Categories from '../Categories/Categories';
import Navbar from '../Navbar/Navbar';
import { authFetch, BASE_API_URL } from '../../constants.js';
import Modal from '../Modal/Modal.jsx';

export default function Login() {
    //#region Variables
    const [username, setUsername] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [show2FAModal, setShow2FAModal] = useState(false);
    const [twoFACode, setTwoFACode] = useState('');
    const [twoFAError, setTwoFAError] = useState('');

    //#endregion

    //#region Lógica
    const access_validation = async () => {
        try {
            const res = await fetch(`${BASE_API_URL}/api/memorialApp/users/`);
            const data = await res.json();
            const user = data.find(user => user.username === username);
            if (!user) {
                setErrorMessage("Usuario no encontrado");
                setShowErrorModal(true);
                return;
            }

            // Usamos directamente user.email sin setState
            const body = {
                username: username,
                email: user.email,
            };

            if (user.two_factor_enabled) {
                fetch(`${BASE_API_URL}/api/memorialApp/users/send_2fa_code/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(body),
                })
                    .then(res => {
                        if (!res.ok) throw new Error("No se pudo enviar el código");
                        setShow2FAModal(true);
                    })
                    .catch(err => {
                        console.error("Error al enviar el código 2FA", err);
                        alert("Error al enviar el código de verificación");
                    });
            } else {
                handleSubmit();
            }
        } catch (err) {
            console.error("Error al obtener datos del usuario", err);
        }
    };


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

            //Redirección dependiendo del 2FA
            if (response.ok) {
                window.location.href = '/categories';
            }
        } catch (error) {
            console.error('Error logging', error); // Error al fetch
            setErrorMessage('Ocurrió un error al intentar iniciar sesión');
            setShowErrorModal(true);
        }
    };


    const verifyTwoFACode = () => {
        fetch(`${BASE_API_URL}/api/memorialApp/users/verify_2fa_code/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                code: twoFACode,
            }),
        })
            .then(res => {
                if (!res.ok) {
                    setTwoFAError('Código incorrecto o expirado');
                    return;
                }
                setShow2FAModal(false);
                setTwoFACode('');
                setTwoFAError('');
                handleSubmit(); //Inicia sesion
            })
            .catch(err => {
                console.error("Error al verificar código 2FA", err);
                setTwoFAError('Error al verificar el código');
            });
    };

    //#endregion


    return (
        <div className='loginpage-container'>
            <Navbar />
            <div className='loginpage-body'>
                <div className='loginpage-body-text text-1'>Iniciar sesión en Memorial</div>
                <div className='loginpage-form'>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            access_validation();
                        }}
                    >
                        <div className='form-group'>
                            <label>Nombre de usuario</label>
                            <input
                                type='text'
                                id='username'
                                name='username'
                                placeholder="Introduce tu usuario"
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
                                placeholder="******"
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                            />
                        </div>
                        <button type='submit' className='btn-1 text-1'>
                            Acceder
                        </button>
                        <div className="loginpage-form-create-link text-1">
                            <a href='/create-account'>¿Aún no tienes una cuenta? Regístrate</a>
                        </div>
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
            {show2FAModal && (
                <Modal isOpen={show2FAModal} onClose={() => setShow2FAModal(false)}>
                    <form
                        onSubmit={(e) => { e.preventDefault(); verifyTwoFACode(); }}
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

        </div>
    );
}