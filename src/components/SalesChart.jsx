import React, { useEffect, useState } from 'react';
import { API_BASE_URL } from '../services/api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';

const SalesChart = () => {
  const [productSales, setProductSales] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductSales = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/sales`); // Reemplaza con la URL correcta
        const data = await response.json();
        setProductSales(data);
      } catch (error) {
        console.error('Error al obtener datos de ventas:', error);
      }
    };

    fetchProductSales();
  }, []);

  // Organizar los datos para el gráfico
  const productData = productSales.reduce((acc, sale) => {
    sale.items.forEach((item) => {
      const existingProduct = acc.find((product) => product.productId === item.productId);

      if (existingProduct) {
        existingProduct.sales_count += item.quantity;
        existingProduct.total_sales_value += item.total;
      } else {
        acc.push({
          productId: item.productId,
          productName: item.productName,
          sales_count: item.quantity,
          total_sales_value: item.total,
        });
      }
    });

    return acc;
  }, []);

  // Ordenar los productos por cantidad de ventas de mayor a menor
  const sortedProductData = productData.sort((a, b) => b.sales_count - a.sales_count);

  return (
    <div>
      <h1>Productos Más Vendidos por Cantidad y Valor</h1>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={sortedProductData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="productName" />
          <YAxis />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip />
          <Legend />
          <Bar dataKey="sales_count" fill="#8884d8" name="Cantidad de Ventas" />
          <Bar dataKey="total_sales_value" fill="#82ca9d" name="Valor Total de Ventas" yAxisId="right" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export{ SalesChart };
