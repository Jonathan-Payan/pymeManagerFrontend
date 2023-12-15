import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../services/api';
import { useNavigate } from 'react-router-dom';

const CreateCustomerForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_BASE_URL}/customers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const newCustomerData = await response.text();
        console.log('Cliente creado exitosamente:', newCustomerData);
        navigate('/customer-list'); // Ajusta la ruta según tu aplicación
      } else {
        console.error('Error al crear el cliente:', response.statusText);
      }
    } catch (error) {
      console.error('Error al crear el cliente:', error.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Crear Nuevo Cliente</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Nombre:</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Correo Electrónico:</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Teléfono:</label>
          <input
            type="text"
            className="form-control"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Dirección:</label>
          <input
            type="text"
            className="form-control"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Crear Cliente
        </button>
      </form>
    </div>
  );
};

export  {CreateCustomerForm};
