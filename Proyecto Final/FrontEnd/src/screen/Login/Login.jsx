import React, { useState } from 'react';
import './Login.css'; // Importa el archivo de estilos
import { NavLink,useNavigate } from 'react-router-dom';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 

  const handleLogin = async () => {

    console.log('Ingresar - Correo:', email, 'Contraseña:', password);
    const data = {
      email: email,
      password: password,
    };
    try {
      const response = await fetch('http://localhost:3200/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const verData = await response.json()
      if (response.status == 200) {
        console.log(verData.token)
        navigate('/home');
      }
     else{
      alert(verData.message)
     }
    } catch (error) {
      console.error('Error:', error.message);
    }

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
