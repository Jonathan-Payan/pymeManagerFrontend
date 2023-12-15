import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { API_BASE_URL } from '../services/api';

const AddPrice = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    price: '',
    date: '',
  });

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

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
      console.log(`${API_BASE_URL}/purchase-prices/${productId}`);
      const response = await fetch(`${API_BASE_URL}/purchase-prices/${productId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Precio agregado exitosamente.');
        // Después de agregar, navega a la lista de precios del producto o a donde sea necesario
        navigate(`/price-list/${productId}`);
      } else {
        console.error('Error al agregar el precio:', response.statusText);
      }
    } catch (error) {
      console.error('Error al agregar el precio:', error.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Agregar Precio</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Precio:</label>
          <input
            type="text"
            className="form-control"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Fecha:</label>
          <input
            type="date"
            className="form-control"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Agregar Precio
        </button>
      </form>
    </div>
  );
};

export { AddPrice };
