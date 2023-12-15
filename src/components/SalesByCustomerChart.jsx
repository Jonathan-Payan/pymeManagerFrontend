import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { API_BASE_URL } from '../services/api';

const SalesByCustomerChart = () => {
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

  // Procesar los datos para el gráfico de barras
  const processedData = salesData.map((sale) => ({
    customerNumber: sale.customerNumber,
    total: sale.total,
  }));

  return (
    <div>
      <h1>Gráfico de Ventas por Cliente</h1>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={processedData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="customerNumber" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="total" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export { SalesByCustomerChart };
