import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../services/api';

const Inventory = () => {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/inventory`);
        const data = await response.json();

        // Para cada registro en el inventario, obtén información adicional del producto
        const inventoryWithProductInfo = await Promise.all(
          data.map(async (record) => {
            const productResponse = await fetch(`${API_BASE_URL}/products/${record.productId}`);
            const productData = await productResponse.json();

            // Agrega el nombre y la descripción del producto al registro del inventario
            return {
              ...record,
              productName: productData.name,
              productDescription: productData.description,
            };
          })
        );

        setInventory(inventoryWithProductInfo);
      } catch (error) {
        console.error('Error al obtener el inventario:', error);
      }
    };

    fetchInventory();
  }, []);

  return (
    <div>
      <h1>Inventario</h1>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Producto ID</th>
            <th>Cantidad</th>
            <th>Fecha de Operación</th>
            <th>Nombre del Producto</th>
            <th>Descripción del Producto</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((record) => (
            <tr key={record.id}>
              <td>{record.id}</td>
              <td>{record.productId}</td>
              <td>{record.quantity}</td>
              <td>{new Date(record.operationDate).toLocaleDateString()}</td>
              <td>{record.productName || 'Nombre no disponible'}</td>
              <td>{record.productDescription || 'Descripción no disponible'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export  {Inventory};
