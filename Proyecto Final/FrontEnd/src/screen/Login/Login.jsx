import React, { useState } from 'react';
import './Login.css'; // Importa el archivo de estilos
import { NavLink } from 'react-router-dom';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Lógica para manejar el inicio de sesión
    console.log('Ingresar - Correo:', email, 'Contraseña:', password);
  };

  return (
    <div className="login-container">
      <h2 className="login-heading">Iniciar Sesión</h2>
      <form className="login-form">
        <label className="login-label">
          Correo Electrónico:
          <input type="email" className="login-input" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>

        <label className="login-label">
          Contraseña:
          <input type="password" className="login-input" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>

        <button type="button" className="login-button" onClick={handleLogin}>
          Ingresar
        </button>

        <NavLink to="/registro" className="registro-button" >
          Registrarse
        </NavLink>
      </form>
      <p className="login-forgot-password">
        <NavLink to="/recuperacion" >
          ¿Olvidaste tu contraseña?
        </NavLink>
      </p>
    </div>
  );
};
