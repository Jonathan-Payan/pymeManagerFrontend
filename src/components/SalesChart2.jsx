import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { API_BASE_URL } from '../services/api';

const SalesChart2 = () => {
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/sales`);
        const data = await response.json();
        setSalesData(data);
      } catch (error) {
        console.error('Error fetching sales data:', error);
      }
    };

    fetchSalesData();
  }, []);

  // Procesar los datos para el gráfico de barras apiladas
  const processedData = salesData.map((sale) => ({
    id: sale.id,
    customerNumber: sale.customerNumber,
    total: sale.total,
    ...sale.items.reduce((acc, item) => {
      acc[item.productName] = item.total;
      return acc;
    }, {}),
  }));

  // Obtener la lista de nombres de productos únicos
  const productNames = Array.from(
    new Set(salesData.flatMap((sale) => sale.items.map((item) => item.productName)))
  );

  return (
    <div>
      <h1>Contribución de cada producto al total de la venta</h1>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={processedData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="customerNumber" />
          <YAxis />
          <Tooltip />
          <Legend />
          {productNames.map((productName) => (
            <Bar key={productName} dataKey={productName} stackId="a" fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`} />
          ))}
          <Bar dataKey="total" stackId="a" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export { SalesChart2 };
