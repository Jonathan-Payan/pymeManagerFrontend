
import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../services/api';
import { useNavigate } from 'react-router-dom';


const PurchaseOrders = () => {
  const [purchaseOrders, setPurchaseOrders] = useState([]);
  const [providers, setProviders] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState('');
  const navigate = useNavigate();



  useEffect(() => {
    // Obtener órdenes de compra
    const fetchPurchaseOrders = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/purchase-orders`);
        const data = await response.json();
        setPurchaseOrders(data);
      } catch (error) {
        console.error('Error al obtener órdenes de compra:', error);
      }
    };

    // Obtener proveedores
    const fetchProviders = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/suppliers`);
        const data = await response.json();
        setProviders(data);
      } catch (error) {
        console.error('Error al obtener proveedores:', error);
      }
    };

    fetchPurchaseOrders();
    fetchProviders();
  }, []);

  const handlePayOrder = async (orderId) => {
    // Verificar que se haya seleccionado un proveedor
    if (!selectedProvider) {
      alert('Por favor, seleccione un proveedor.');
      return;
    }

    // Realizar la solicitud para pagar la orden
    try {
      const response = await fetch(`${API_BASE_URL}/purchase-orders/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          providerId: selectedProvider,
          status: 'paid',
        }),
      });

      if (response.ok) {
        // Actualizar el estado de las órdenes de compra después de pagar
        const updatedOrders = purchaseOrders.map((order) =>
          order.id === orderId ? { ...order, status: 'paid' } : order
        );
        setPurchaseOrders(updatedOrders);

        // Limpiar el proveedor seleccionado
        setSelectedProvider('');


        alert('Orden pagada con éxito.');
      } else {
        alert('Error al pagar la orden. Por favor, inténtelo de nuevo.');
      }
    } catch (error) {
      console.error('Error al pagar la orden:', error);
    }
  };

  

  const handleReceiveOrder = async (orderId) => {
    // Obtener el productoId y la cantidad asociados a la orden de compra
    const purchaseOrder = purchaseOrders.find((order) => order.id === orderId);
    console.log(purchaseOrder);
    const { productId, quantity } = purchaseOrder;
    console.log(productId);
    console.log(quantity);

  
    // Realizar la solicitud para pagar la orden
    try {
      const response = await fetch(`${API_BASE_URL}/purchase-orders-received/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            productId: productId, 
            quantity: quantity,
            status: 'received',
        }),
      });
      console.log(response);
      if (response.ok) {
        // Actualizar el estado de las órdenes de compra después de pagar
        const updatedOrders = purchaseOrders.map((order) =>
          order.id === orderId ? { ...order, status: 'received' } : order
        );
        setPurchaseOrders(updatedOrders);
  
        alert('Orden recibida con éxito.');
        navigate('/inventario');

      } else {
        navigate('/inventory');
      }
    } catch (error) {
      console.error('Error al recibir la orden:', error);
    }
  };
  

  return (
    <div>
      <h1>Órdenes de Compra</h1>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Producto ID</th>
            <th>Cantidad</th>
            <th>Fecha de Orden</th>
            <th>Estado</th>
            <th>Proveedor ID</th>
            <th>Proveedor</th>
            <th>Pagos</th>
            <th>Recibidos</th>
            
            
          </tr>
        </thead>
        <tbody>
          {purchaseOrders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.productId}</td>
              <td>{order.quantity}</td>
              <td>{new Date(order.orderDate).toLocaleDateString()}</td>
              <td>{order.status}</td>
              <td>{order.providerId}</td>
             
              <td>   
                
     
      <select value={selectedProvider} onChange={(e) => setSelectedProvider(e.target.value)}>
        <option value="">Seleccionar proveedor</option>
        {providers.map((provider) => (
          <option key={provider.id} value={provider.id}>
            {provider.name}
          </option>
        ))}
      </select>
      </td>

      <td>
    {order.status !== 'paid'  && (
        <button onClick={() => handlePayOrder(order.id)}>Pagar Orden</button>
    )}

                
              </td>
              <td>
    {order.status !== 'received' && (
        <button onClick={() => handleReceiveOrder(order.id)}>Recibido</button>
    )}

                
              </td>
            </tr>
          ))}
        </tbody>
      </table>

   
    </div>
  );
};

export {PurchaseOrders};
