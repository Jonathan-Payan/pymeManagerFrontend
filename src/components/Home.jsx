import React from 'react';
import { SalesChart } from './SalesChart';
import { SalesChart2 } from "./SalesChart2";
import { SalesByCustomerChart } from "./SalesByCustomerChart";
import { SalesByDateChart } from "./SalesByDateChart";


const Home = () => {
  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Bienvenido a la Página de Inicio</h1>

      <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-start' }}>
        <div style={{ flex: 1, minWidth: '300px', margin: '10px' }}>
          
          <SalesChart></SalesChart>
        </div>

        
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-start' }}>
      <div style={{ flex: 1, minWidth: '300px', margin: '10px' }}>
          <SalesChart2></SalesChart2>
        </div>
      </div>


      <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-start' }}>
        <div style={{ flex: 1, minWidth: '300px', margin: '10px' }}>
        <SalesByCustomerChart></SalesByCustomerChart>
        </div>
        <div style={{ flex: 1, minWidth: '300px', margin: '10px' }}>
        <SalesByDateChart></SalesByDateChart>
        </div>
      </div>
    </div>
  );
};

export { Home };










