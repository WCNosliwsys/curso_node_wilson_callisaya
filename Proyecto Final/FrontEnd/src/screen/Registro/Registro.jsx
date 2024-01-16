import React, { useState } from 'react';
import './Registro.css';
import { NavLink } from 'react-router-dom';

export const Registro = () => {
  const [nombre, setNombre] = useState('');
  const [edad, setEdad] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegistro = async () => {
    // Aquí puedes utilizar los datos capturados (nombre, edad, email, password)
    // Puedes enviarlos a tu API o manejarlos de alguna otra manera

    // Simulando una respuesta exitosa

    const data = {
      name: nombre,
      age: edad,
      email: email,
      password: password,
    };
    try {
      const response = await fetch('http://localhost:3200/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const verData = await response.json()
      console.log(verData)
      console.log(response.status)
      console.log(response)
/*       if (response.status == 200) {
        console.log(verData.token)
        // navigate('/home');
      }
     else{
      alert(verData.message)
     } */
    } catch (error) {
      console.error('Error:', error.message);
    }

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
