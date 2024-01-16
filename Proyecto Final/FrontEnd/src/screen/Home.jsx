import React from 'react'
import { useEffect, useState } from 'react';

export const Home = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    email: ''
  });

  function leerDatos() {
    fetch("http://localhost:3200/api/users")
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(e => console.log(e))
  }

  useEffect(() => {
    leerDatos()
  }, [])

  const agregar = async (e) => {
    e.preventDefault();
    const { nombre, edad, email } = e.target.elements;
    const data = {
      name: nombre.value,
      age: parseInt(edad.value),
      email: email.value,
    };

    try {
      const response = await fetch('http://localhost:3200/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Error al agregar usuario');
      }
      leerDatos();
      console.log('Usuario Agregado');
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const editar = (index) => {
    const userToEdit = users[index];
    setEditingUser(userToEdit._id);
    setFormData({
      name: userToEdit.name,
      age: userToEdit.age,
      email: userToEdit.email
    });
  };

  const actualizarUsuario = async () => {
    if (editingUser !== null) {

      console.log(editingUser)
      const endpoint = `http://localhost:3200/api/user/${editingUser}`;
      const dataToUpdate = {
        name: formData.name,
        age: formData.age,
        email: formData.email,
      };
      try {
        const response = await fetch(endpoint, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataToUpdate),
        });

        if (!response.ok) {
          throw new Error('Error al actualizar usuario');
        }

        leerDatos();
        console.log('Usuario Actualizado');
      } catch (error) {
        console.error('Error:', error.message);
      }
      setEditingUser(null);
      setFormData({
        name: '',
        age: '',
        email: ''
      });
    }
  };

  const eliminar = async (id) => {
    const endpoint = `http://localhost:3200/api/user/${id}`;

    try {
      const response = await fetch(endpoint, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error al eliminar usuario');
      }

      leerDatos();
      console.log('Usuario Eliminado');
    } catch (error) {
      console.error('Error:', error.message);
    }
  };


  const ver = async (id) => {
    const endpoint = `http://localhost:3200/api/user/${id}`;

    try {
      const response = await fetch(endpoint, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error('Error al leer usuario');
      }
      const userData = await response.json();

      alert(`ID: ${userData._id}\nNombre: ${userData.name}\nEdad: ${userData.age}\nEmail: ${userData.email}`);

    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <>
      <h1>Consumiendo API</h1>
      <form className='form-agregar' onSubmit={(e) => agregar(e)}>
        <div>

          <label htmlFor="">Nombre:</label>
          <input type="text" name='nombre' />
        </div>
        <div>
          <label htmlFor="">Edad:</label>
          <input type="number" name='edad' />
        </div>
        <div>
          <label htmlFor="">Email:</label>
          <input type="email" name='email' />
        </div>

        <button type="submit">Agregar</button>
      </form>

      {users.length === 0 ? (
        <div>Cargando...</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Edad</th>
              <th>Email</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((elemento, index) => (
              <tr key={index}>
                <td>{elemento.name}</td>
                <td>{elemento.age}</td>
                <td>{elemento.email}</td>
                <td>
                  <button onClick={() => editar(index)}>Editar</button>
                  <button onClick={() => eliminar(elemento._id)}>Eliminar</button>
                  <button onClick={() => ver(elemento._id)}>Ver</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {editingUser !== null && (
        <div>
          <h2>Editar Usuario</h2>
          <form className="edit-form">
            <label htmlFor="">Nombre:</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <label htmlFor="">Edad:</label>
            <input
              type="number"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
            />
            <label htmlFor="">Email:</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <button type="button" onClick={actualizarUsuario}>
              Actualizar
            </button>
          </form>
        </div>
      )}
    </>
  );
}
