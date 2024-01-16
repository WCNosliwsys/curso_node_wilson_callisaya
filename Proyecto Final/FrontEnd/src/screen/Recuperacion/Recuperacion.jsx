import React, { useState } from 'react';
import './Recuperacion.css';
import { NavLink } from 'react-router-dom';
export const Recuperacion = () => {
  const [email, setEmail] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleRecuperacion = async () => {
    // Lógica para manejar la solicitud de recuperación
    console.log('Correo para recuperación:', email);
    // Puedes agregar la lógica adicional aquí, como enviar la solicitud al servidor, etc.
    const data = {
      email: email,
    };
    try {
      const response = await fetch('http://localhost:3200/auth/solicitudResetPass', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const verData = await response.json()
      if (response.status == 200) {
        alert("Se envio el correo de recuperacion")
      }
      else {
        alert("Ocurrio un error al enviar el correo")
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <div className="recuperacion-container">
      <h2>Recuperación de Contraseña</h2>
      <form>
        <label>
          Correo Electrónico:
          <input type="email" value={email} onChange={handleEmailChange} />
        </label>
        <button type="button" onClick={handleRecuperacion}>
          Enviar Solicitud
        </button>
      </form>
      <div className="volver-link">
        <NavLink to="/" className="text-link">Volver</NavLink>
      </div>
    </div>
  );
};

