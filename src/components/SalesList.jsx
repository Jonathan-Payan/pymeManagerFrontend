import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../services/api';

const SalesList = () => {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/sales`);
        const salesData = await response.json();
        setSales(salesData);
      } catch (error) {
        console.error('Error al obtener la lista de ventas:', error);
      }
    };

    fetchSales();
  }, []);

  return (
    <div>
      <h1>Lista de Ventas</h1>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>ID del cliente</th>
            <th>Número de Factura</th>
            <th>Fecha de Factura</th>
            <th>Número de Cliente</th>
            <th>Total</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((sale) => (
            <tr key={sale.id}>
              <td>{sale.id}</td>
              <td>{sale.customerId}</td>
              <td>{sale.invoiceNumber}</td>
              <td>{new Date(sale.invoiceDate).toLocaleDateString()}</td>
              <td>{sale.customerNumber}</td>
              <td>{sale.total}</td>
              <td>
                <Link to={`/sale-details/${sale.id}`}>Factura</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export  {SalesList};
