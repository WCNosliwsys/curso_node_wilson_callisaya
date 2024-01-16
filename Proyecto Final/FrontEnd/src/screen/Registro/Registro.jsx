import React, { useState } from 'react';
import './Registro.css';
import { NavLink } from 'react-router-dom';

export const Registro = () => {
  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegistro = () => {
    // Aquí puedes utilizar los datos capturados (nombre, edad, email, password)
    // Puedes enviarlos a tu API o manejarlos de alguna otra manera

    // Simulando una respuesta exitosa
    alert('Registro exitoso');
  };

  return (
    <div className="registro-container">
      <h2 className="registro-heading">Registro</h2>
      <form className="registro-form">
        <label className="registro-label">
          Nombre:
          <input
            type="text"
            className="registro-input"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </label>
        <label className="registro-label">
          Edad:
          <input
            type="number"
            className="registro-input"
            value={edad}
            onChange={(e) => setEdad(e.target.value)}
          />
        </label>
        <label className="registro-label">
          Correo Electrónico:
          <input
            type="email"
            className="registro-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className="registro-label">
          Contraseña:
          <input
            type="password"
            className="registro-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="button" className="registro-button" onClick={handleRegistro}>
          Registrarse
        </button>
      </form>
      <div className="volver-link">
        <NavLink to="/" className="text-link">Volver</NavLink>
      </div>
    </div>
  );
};
