import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { API_BASE_URL } from '../services/api';

const SaleDetails = () => {
  const { saleId } = useParams();
  const [sale, setSale] = useState({});
  const [saleItems, setSaleItems] = useState([]);
  const [customer, setCustomer] = useState({});

  useEffect(() => {
    const fetchSaleDetails = async () => {
      try {
        // Obtener detalles de la venta
        const saleResponse = await fetch(`${API_BASE_URL}/sales/${saleId}`);
        const saleData = await saleResponse.json();
        setSale(saleData);

        // Obtener elementos de venta asociados a la venta
        const saleItemsResponse = await fetch(`${API_BASE_URL}/sale-items/${saleId}`);
        const saleItemsData = await saleItemsResponse.json();
        setSaleItems(saleItemsData);

        // Obtener detalles del cliente
        const customerResponse = await fetch(`${API_BASE_URL}/customers/${saleData.customerId}`);
        const customerData = await customerResponse.json();
        setCustomer(customerData);
      } catch (error) {
        console.error('Error al obtener detalles de la venta:', error);
      }
    };

    fetchSaleDetails();
  }, [saleId]);

  // Calcular el subtotal sumando los totales de los elementos de venta
  const subtotal = saleItems.reduce((acc, item) => acc + item.total, 0);

  // Calcular el IVA y el total
  const iva = subtotal * 0.19;
  const total = subtotal + iva;

  return (
    <div className="container">
      <div className="row mt-4">
        <div className="col-md-4 offset-md-1">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Datos del Cliente</h5>
              <div className="row">
                <div className="col">
                  <p className="card-text"><strong>ID:</strong></p>
                  <p className="card-text"><strong>Nombre:</strong></p>
                  <p className="card-text"><strong>Correo Electrónico:</strong></p>
                </div>
                <div className="col text-right">
                  <p className="card-text">{customer.id}</p>
                  <p className="card-text">{customer.name}</p>
                  <p className="card-text">{customer.email}</p>
                </div>
              </div>
              <div className="row mt-2">
                <div className="col">
                  <p className="card-text"><strong>Teléfono:</strong></p>
                  <p className="card-text"><strong>Dirección:</strong></p>
                </div>
                <div className="col text-right">
                  <p className="card-text">{customer.phone}</p>
                  <p className="card-text">{customer.address}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4 offset-md-1">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Detalles de la Venta</h5>
              <div className="row">
                <div className="col">
                  <p className="card-text"><strong>ID de Venta:</strong></p>
                  <p className="card-text"><strong>Número de Factura:</strong></p>
                  <p className="card-text"><strong>Fecha de Factura:</strong></p>
                </div>
                <div className="col text-right">
                  <p className="card-text">{sale.id}</p>
                  <p className="card-text">{sale.invoiceNumber}</p>
                  <p className="card-text">{new Date(sale.invoiceDate).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="row mt-2">
                <div className="col">
                  <p className="card-text"><strong>Número de Cliente:</strong></p>
                  <p className="card-text"><strong>Total:</strong></p>
                </div>
                <div className="col text-right">
                  <p className="card-text">{sale.customerId}</p>
                  <p className="card-text">{sale.total}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h2 className="mt-4">Elementos de Venta</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>ID de Venta</th>
            <th>ID de Producto</th>
            <th>Nombre del Producto</th>
            <th>Descripción</th>
            <th>Cantidad</th>
            <th>Precio Unitario</th>
            <th>Descuento</th>
            <th>Total Producto</th>
          </tr>
        </thead>
        <tbody>
          {saleItems.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.saleId}</td>
              <td>{item.productId}</td>
              <td>{item.productName}</td>
              <td>{item.description}</td>
              <td>{item.quantity}</td>
              <td>{item.unitPrice}</td>
              <td>{item.discount}</td>
              <td>{item.total}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="row mt-4">
        <div className="col-md-3 offset-md-9">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Resumen de la Factura</h5>
              <div className="row">
                <div className="col">
                  <p className="card-text"><strong>Subtotal:</strong></p>
                  <p className="card-text"><strong>IVA (19%):</strong></p>
                  <p className="card-text"><strong>Total:</strong></p>
                </div>
                <div className="col text-right">
                  <p className="card-text">{subtotal}</p>
                  <p className="card-text">{iva}</p>
                  <p className="card-text">{total}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { SaleDetails };
