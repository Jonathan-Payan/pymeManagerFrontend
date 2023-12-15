
// PriceList.jsx
import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../services/api';
import { Link, useParams } from 'react-router-dom';

const PriceList = () => {
  const { productCode } = useParams();
  const [productId, setProductId] = useState(null);
  const [purchasePrices, setPurchasePrices] = useState([]);
  const [salePrices, setSalePrices] = useState([]);

  useEffect(() => {
    const fetchProductInfo = async () => {
      try {
        const productResponse = await fetch(`${API_BASE_URL}/products/${productCode}`);
        const productData = await productResponse.json();
        setProductId(productData.id);
      } catch (error) {
        console.error('Error al obtener la información del producto:', error);
      }
    };

    const fetchPurchasePrices = async () => {
      try {
        const purchasePricesResponse = await fetch(`${API_BASE_URL}/purchase-prices/${productCode}`);
        const purchasePricesData = await purchasePricesResponse.json();
        console.log(purchasePricesData);

        setPurchasePrices(purchasePricesData);
      } catch (error) {
        console.error('Error al obtener la lista de precios de compra:', error);
      }
    };

    const fetchSalePrices = async () => {
      try {
        const salePricesResponse = await fetch(`${API_BASE_URL}/sale-prices/${productCode}`);
        const salePricesData = await salePricesResponse.json();
        console.log(salePricesData);
        setSalePrices(salePricesData);  
      } catch (error) {
        console.error('Error al obtener la lista de precios de venta:', error);
      }
    };

    // Llamamos a ambas funciones de manera secuencial
    fetchProductInfo().then(() => {
       fetchSalePrices();
      fetchPurchasePrices();
     
    });
  }, [productCode]);

  return (
    <div>
       <h1>Precios del Producto {productCode}</h1>
      <Link to={`/add-price/${productCode}`} className="btn btn-primary">
        Agregar Precio de Compra
      </Link>
      <Link to={`/add-sale-price/${productCode}`} className="btn btn-primary">
        Agregar Precio de Venta
      </Link>
      {purchasePrices.length > 0 ? (
        <div>
          <h2>Precios de Compra</h2>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Precio</th>
                <th scope="col">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {purchasePrices.map((price) => (
                <tr key={price.id}>
                  <td>{price.price}</td>
                  <td>{new Date(price.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No hay precios de compra disponibles para este producto.</p>
      )}
      {salePrices.length > 0 ? (
        <div>
          <h2>Precios de Venta</h2>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Precio</th>
                <th scope="col">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {salePrices.map((price) => (
                <tr key={price.id}>
                  <td>{price.price}</td>
                  <td>{new Date(price.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No hay precios de venta disponibles para este producto.</p>
      )}
      <Link to="/products-list">Volver a la Lista de Productos</Link>
    </div>
  );
};

export { PriceList };
