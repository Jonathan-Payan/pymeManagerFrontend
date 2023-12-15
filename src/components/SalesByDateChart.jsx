import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { API_BASE_URL } from '../services/api';

const SalesByDateChart = () => {
  const [salesData, setSalesData] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

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

  // Filtrar los datos basados en el rango de fechas seleccionado
  const filteredData = salesData.filter((sale) => {
    const saleDate = new Date(sale.invoiceDate);
    return (!startDate || saleDate >= new Date(startDate)) && (!endDate || saleDate <= new Date(endDate));
  });

  // Procesar los datos para el gráfico de línea
  const processedData = filteredData.map((sale) => ({
    id: sale.id,
    invoiceDate: new Date(sale.invoiceDate).toLocaleDateString(),
    total: sale.total,
  }));

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  return (
    <div>
      <h1>Gráfico de Ventas por Fecha</h1>
      <div>
        <label>Fecha de Inicio:</label>
        <input type="date" value={startDate} onChange={handleStartDateChange} />
        <label>Fecha de Fin:</label>
        <input type="date" value={endDate} onChange={handleEndDateChange} />
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={processedData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="invoiceDate" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="total" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export { SalesByDateChart };
