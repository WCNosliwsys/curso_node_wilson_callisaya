import React, { useState } from 'react';
import './Recuperacion.css'; 
import { NavLink } from 'react-router-dom';
export const Recuperacion = () => {
  const [email, setEmail] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleRecuperacion = () => {
    // Lógica para manejar la solicitud de recuperación
    console.log('Correo para recuperación:', email);
    // Puedes agregar la lógica adicional aquí, como enviar la solicitud al servidor, etc.
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

