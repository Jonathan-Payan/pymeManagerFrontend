import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../services/api';
import { useNavigate } from 'react-router-dom';

const CustomerList = () => {
  const [customers, setCustomers] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchCustomers = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/customers`);
        const customersList = await response.json();

        console.log('Resultado de la solicitud de clientes:', customersList);
        setCustomers(customersList);
      } catch (error) {
        console.error('Error al obtener clientes:', error);
        // Handle errors
      }
    };

    fetchCustomers();
  }, [token, navigate]);

  const handleCreateCustomer = () => {
    navigate('/create-customer'); // Ajusta la ruta según tu aplicación
  };
  const handleEditCustomer = (customerId) => {
    navigate(`/edit-customer/${customerId}`); // Ajusta la ruta según tu aplicación
  };
  const handleDeleteCustomer = async (customerId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/customers/${customerId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Actualizar la lista de clientes después de eliminar uno
        const updatedCustomers = customers.filter((customer) => customer.id !== customerId);
        setCustomers(updatedCustomers);
      } else {
        console.error('Error al eliminar el cliente:', response.statusText);
        // Manejar errores según sea necesario
      }
    } catch (error) {
      console.error('Error al eliminar el cliente:', error.message);
      // Manejar errores según sea necesario
    }
  };

  return (
    <div className="container mt-5">
      {token ? (
        <>
          <h2 className="mb-3">Lista de Clientes</h2>
          <button className="btn btn-primary mb-3" onClick={handleCreateCustomer}>
            Nuevo Cliente
          </button>
          {Array.isArray(customers) ? (
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Correo Electrónico</th>
                  <th scope="col">Teléfono</th>
                  <th scope="col">Dirección</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => (
                  <tr key={customer.id}>
                    <th scope="row">{customer.id}</th>
                    <td>{customer.name}</td>
                    <td>{customer.email}</td>
                    <td>{customer.phone}</td>
                    <td>{customer.address}</td>
                    <td>
                      <button
                        className="btn btn-warning btn-sm mr-2"
                        onClick={() => handleEditCustomer(customer.id)}
                      >
                        Editar
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDeleteCustomer(customer.id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Cargando clientes...</p>
          )}
        </>
      ) : (
        <p>No has iniciado sesión. Ingresa a tu cuenta para acceder a esta sección.</p>
      )}
    </div>
  );
};

export { CustomerList };
