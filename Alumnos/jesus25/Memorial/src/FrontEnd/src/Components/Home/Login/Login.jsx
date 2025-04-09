import { useState } from 'react';
import './Login.css';

export default function Login() {
  const [isRegistering, setIsRegistering] = useState(false);

  const toggleForm = () => {
    setIsRegistering(!isRegistering);
  };

  return (
    <div className='login-container' id='login-container'>
      {isRegistering ? (
        <div className='register-form' id='register-form'>
          <h2 id='register-title'>Registrarse</h2>
          <form id='register-form-fields'>
            <input id='username-input' type="text" placeholder="Nombre de usuario" />
            <input id='email-input' type="email" placeholder="Correo electrónico" />
            <input id='password-input' type="password" placeholder="Contraseña" />
            <button id='register-button' type="submit">Registrar</button>
          </form>
          <p id='login-toggle'>
            ¿Ya tienes cuenta?{' '}
            <span onClick={toggleForm} className="toggle-link" id='toggle-login'>
              Inicia sesión
            </span>
          </p>
        </div>
      ) : (
        <div className='login-form' id='login-form'>
          <h2 id='login-title'>Iniciar sesión</h2>
          <form id='login-form-fields'>
            <input id='email-login-input' type="email" placeholder="Correo electrónico" />
            <input id='password-login-input' type="password" placeholder="Contraseña" />
            <button id='login-button' type="submit">Iniciar sesión</button>
          </form>
          <p id='register-toggle'>
            ¿Aún no tienes cuenta?{' '}
            <span onClick={toggleForm} className="toggle-link" id='toggle-register'>
              Regístrate
            </span>
          </p>
        </div>
      )}
    </div>
  );
}
