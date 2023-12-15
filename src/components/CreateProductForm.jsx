import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../services/api';
import { useNavigate } from 'react-router-dom';

const CreateProductForm = () => {
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    stock: '',
    categoryId: '',
    supplierId: '',
    weight: '',
    expirationDate: '',
    description: '',
    image: '',
  });

  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
    }

    // Obtener lista de categorías
    fetch(`${API_BASE_URL}/categories`)
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error('Error al obtener categorías:', error));

    // Obtener lista de proveedores
    fetch(`${API_BASE_URL}/suppliers`)
      .then((response) => response.json())
      .then((data) => setSuppliers(data))
      .catch((error) => console.error('Error al obtener proveedores:', error));
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
      // Crear el producto
      const response = await fetch(`${API_BASE_URL}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Obtener la información del producto creado
        const newProduct = await response.json();

        // Agregar operación de entrada en el inventario
        const entryResponse = await fetch(`${API_BASE_URL}/inventory/entry`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            productId: newProduct.id,
            quantity: parseInt(formData.stock, 10), // Usar la cantidad de stock del formulario
          }),
        });

        if (entryResponse.ok) {
          console.log('Producto y entrada en el inventario creados exitosamente.');
          navigate('/products-list'); // Ajusta la ruta según tu aplicación
        } else {
          console.error('Error al agregar la entrada en el inventario:', entryResponse.statusText);
        }
      } else {
        console.error('Error al crear el producto:', response.statusText);
      }
    } catch (error) {
      console.error('Error al crear el producto:', error.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Crear Nuevo Producto</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Código:</label>
          <input
            type="text"
            className="form-control"
            name="code"
            value={formData.code}
            onChange={handleChange}
          />
        </div>
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
          <label className="form-label">Stock:</label>
          <input
            type="text"
            className="form-control"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Categoría:</label>
          <select
            className="form-select"
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
          >
            <option value="">Selecciona una categoría</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Proveedor:</label>
          <select
            className="form-select"
            name="supplierId"
            value={formData.supplierId}
            onChange={handleChange}
          >
            <option value="">Selecciona un proveedor</option>
            {suppliers.map((supplier) => (
              <option key={supplier.id} value={supplier.id}>
                {supplier.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Peso:</label>
          <input
            type="text"
            className="form-control"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Fecha de Vencimiento:</label>
          <input
            type="date"
            className="form-control"
            name="expirationDate"
            value={formData.expirationDate}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Descripción:</label>
          <input
            type="text"
            className="form-control"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
  <label className="form-label">Ruta de la Imagen:</label>
  <input
    type="text"
    className="form-control"
    name="image"
    value={formData.image}
    onChange={handleChange}
  />
</div>
       
        <button type="submit" className="btn btn-primary">
          Crear Producto
        </button>
      </form>
    </div>
  );
};

export { CreateProductForm };
