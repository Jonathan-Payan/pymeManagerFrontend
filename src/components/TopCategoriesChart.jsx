import React, { useState, useEffect } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import { API_BASE_URL } from '../services/api';

const TopCategoriesChart = () => {
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/top-selling-categories`);
        const data = await response.json();
        setCategoryData(data);
      } catch (error) {
        console.error('Error al obtener datos de categorías más vendidas:', error);
      }
    };

    fetchCategoryData();
  }, []);

  return (
    <RadarChart outerRadius={150} width={400} height={300} data={categoryData}>
      <PolarGrid />
      <PolarAngleAxis dataKey="category" />
      <PolarRadiusAxis angle={30} domain={[0, 'dataMax']} />
      <Radar name="Cantidad Vendida" dataKey="quantity" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
    </RadarChart>
  );
};

export default TopCategoriesChart;
