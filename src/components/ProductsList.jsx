// ProductsList.jsx
import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../services/api';
import { useNavigate } from 'react-router-dom';

const ProductsList = () => {
  const [productList, setProductList] = useState([]);
  const [prices, setPrices] = useState({});
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/products`);
        const products = await response.json();
        setProductList(products);

        // Para cada producto, obtén el precio de compra y actualiza el estado de los precios
        const pricesData = {};
        for (const product of products) {
          const purchasePrice = await getPriceForProduct(product.id);
          const salePrice = await getSalePrice(product.id);

          pricesData[product.id] = { purchasePrice, salePrice };
        }
        setPrices(pricesData);
      } catch (error) {
        console.error('Error al obtener la lista de productos:', error);
      }
    };

    fetchProducts();
  }, [token]);

  const handleCreateProduct = () => {
    navigate('/create-form');
    console.log('Crear nuevo producto');
  };

  const handleEditProduct = (id) => {
    navigate(`/edit-form/${id}`);
    console.log(`Editar producto con código ${id}`);
  };

  const handleDeleteProduct = async (id) => {
    try {
      await fetch(`${API_BASE_URL}/products/${id}`, {
        method: 'DELETE',
      });

      const updatedProducts = productList.filter((product) => product.id !== id);
      setProductList(updatedProducts);

      console.log(`Producto con código ${id} eliminado exitosamente.`);
    } catch (error) {
      console.error('Error al eliminar el producto:', error.message);
    }
  };

  const handleViewPrices = (id) => {
    navigate(`/price-list/${id}`);
    console.log(`Ver precios del producto con ID ${id}`);
  };

  const getPriceForProduct = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/latest-purchase-price/${id}`);
      const pricesData = await response.json();
      console.log(pricesData.price);
        return pricesData.price;
      
    } catch (error) {
      console.error('Error al obtener el precio del producto:', error);
      return 'Error';
    }
  };

  const getSalePrice = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/latest-sale-price/${id}`);
      const pricesData = await response.json();
      return pricesData.price;
    } catch (error) {
      console.error('Error al obtener el precio de venta del producto:', error);
      return 'Error';
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between mb-3">
        <h1>Lista de Productos</h1>
        <button className="btn btn-primary" onClick={handleCreateProduct}>
          Crear Producto
        </button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Código</th>
            <th>Nombre</th>
            <th>Stock</th>
            <th>Proveedor</th>
            <th>Categoría</th>
            <th>Peso</th>
            <th>Fecha de Expiración</th>
            <th>Precio de Compra</th>
            <th>Precio de Venta</th>
            <th>Imagen</th>
            <th>Descripción</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productList.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.stock}</td>
              <td>{product.supplierId}</td>
              <td>{product.categoryId}</td>
              <td>{product.weight}</td>
              <td>{new Date(product.expirationDate).toLocaleDateString()}</td>
              <td>{prices[product.id] ? prices[product.id].purchasePrice : 'Cargando...'}</td>
<td>{prices[product.id] ? prices[product.id].salePrice : 'Cargando...'}</td>
    
                       <td>
  {product.image ? (
    <img src={product.image} alt={product.name} style={{ maxWidth: '50px' }} />
  ) : (
    <img src="/images/producto.png" alt={product.name} style={{ maxWidth: '50px' }} />
  )}
</td>        
      <td>{product.description}</td>

              <td>
                <div className="d-flex">
                  <button className="btn btn-warning me-2" onClick={() => handleEditProduct(product.id)}>
                    Editar
                  </button>
                  <button className="btn btn-danger me-2" onClick={() => handleDeleteProduct(product.id)}>
                    Eliminar
                  </button>
                  <button className="btn btn-info" onClick={() => handleViewPrices(product.id)}>
                    Ver Precios
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export { ProductsList };
