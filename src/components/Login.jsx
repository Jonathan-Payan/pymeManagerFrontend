import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { API_BASE_URL } from '../services/api';  // Asegúrate de ajustar esta importación

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {  
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

   
      if (response.ok) {
        const responseData = await response.json();
        localStorage.setItem('token', responseData.token);
        localStorage.setItem('userId', responseData.user.id); // Almacena el user_id
        navigate('/');
        console.log(responseData.message);
        console.log(responseData.user);
      }
      else if (response.status === 401) {
        console.error('Error en el inicio de sesión:', 'Credenciales incorrectas');
        alert("usuario o contraseña incorrectas");
      } else {
        console.error('Error en el inicio de sesión:', response.statusText);
        alert("usuario o contraseña incorrectas");
      }
    } catch (error) {
      console.error('Error en el inicio de sesión:', error.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label className="form-label">Nombre de usuario:</label>
          <input
            type="text"
            className="form-control"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Contraseña:</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Iniciar Sesión
        </button>
      </form>

      {/* Agregar enlace al componente Registro */}
      <p className="mt-3">
        ¿No tienes una cuenta?{' '}
        <Link to="/register-form">Regístrate aquí</Link>
      </p>
    </div>
  );
};

export { LoginForm };

