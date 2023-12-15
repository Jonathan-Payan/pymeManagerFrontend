import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../services/api';
import { useNavigate } from 'react-router-dom';

const CreateSupplierForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    website: '',
    contact_name: '',
    contact_phone: '',
    contact_email: '',
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
      const response = await fetch(`${API_BASE_URL}/suppliers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const newSupplierData = await response.text();
        console.log('Proveedor creado exitosamente:', newSupplierData);
        navigate('/supplier-list'); // Ajusta la ruta según tu aplicación
      } else {
        console.error('Error al crear el proveedor:', response.statusText);
      }
    } catch (error) {
      console.error('Error al crear el proveedor:', error.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Crear Nuevo Proveedor</h2>
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
          <label className="form-label">Dirección:</label>
          <input
            type="text"
            className="form-control"
            name="address"
            value={formData.address}
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
          <label className="form-label">Correo Electrónico:</label>
          <input
            type="text"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Sitio Web:</label>
          <input
            type="text"
            className="form-control"
            name="website"
            value={formData.website}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Nombre de Contacto:</label>
          <input
            type="text"
            className="form-control"
            name="contact_name"
            value={formData.contact_name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Teléfono de Contacto:</label>
          <input
            type="text"
            className="form-control"
            name="contact_phone"
            value={formData.contact_phone}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Correo Electrónico de Contacto:</label>
          <input
            type="text"
            className="form-control"
            name="contact_email"
            value={formData.contact_email}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Crear Proveedor
        </button>
      </form>
    </div>
  );
};

export { CreateSupplierForm };
