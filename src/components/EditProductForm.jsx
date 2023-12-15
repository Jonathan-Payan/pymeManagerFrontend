import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { API_BASE_URL } from '../services/api';

const EditProductForm = () => {
  const { productCode } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    stock: '',
    supplierId: '',
    categoryId: '',
    weight: '',
    expirationDate: '',
    image: '',
    description: '',
  });

  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

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

    // Obtener datos del producto para editar
    fetch(`${API_BASE_URL}/products/${productCode}`)
      .then((response) => response.json())
      .then((productData) => setFormData(productData))
      .catch((error) => console.error('Error al obtener datos del producto:', error));
  }, [navigate, productCode]);

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
      console.log(productCode);
      console.log(formData);
      const response = await fetch(`${API_BASE_URL}/products/${productCode}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Producto actualizado exitosamente.');
        // Después de actualizar, navega a la lista de productos o a donde sea necesario
        navigate('/products-list');
      } else {
        console.error('Error al actualizar el producto:', response.statusText);
      }
    } catch (error) {
      console.error('Error al actualizar el producto:', error.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Editar Producto</h2>
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
            name="category_id"
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
            name="supplier_id"
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
          Guardar Cambios
        </button>
      </form>
    </div>
  );
};

export { EditProductForm };
