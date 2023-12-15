import React, { useState, useEffect } from 'react';
import {  API_BASE_URL } from '../services/api';
import { useNavigate } from 'react-router-dom';

const SupplierList = () => {
  const [suppliers, setSuppliers] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchSuppliers = async () => {
        try {

          const response = await fetch(`${API_BASE_URL}/suppliers`);
          const suppliersList = await response.json();

          console.log('Resultado de la solicitud:', suppliersList);
          setSuppliers(suppliersList);
        } catch (error) {
          console.error('Error al obtener proveedores:', error);
          // Handle errors
        }
      };
      
      

    fetchSuppliers();
  }, [token, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleNewSupplier = () => {
    navigate('/create-supplier');
    console.log('Agregar nuevo proveedor');
  };

  const handleEditSupplier = (supplierId) => {
    navigate(`/edit-supplier/${supplierId}`);
  };

  const handleDeleteSupplier = async (supplierId) => {
    try {
      await fetch(`${API_BASE_URL}/suppliers/${supplierId}`, {
        method: 'DELETE',
      });

      const updatedSuppliers = suppliers.filter((supplier) => supplier.id !== supplierId);
      setSuppliers(updatedSuppliers);

      console.log(`Proveedor con ID ${supplierId} eliminado exitosamente.`);
    } catch (error) {
      console.error('Error al eliminar el proveedor:', error.message);
    }
  };

  return (
    <div className="container mt-5">
      {token ? (
        <>
          <h2 className="mb-3">Lista de Proveedores</h2>
          <button className="btn btn-primary mb-3" onClick={handleNewSupplier}>
            Nuevo Proveedor
          </button>

          {Array.isArray(suppliers) ? (
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Correo Electrónico</th>
                  <th scope="col">Teléfono</th>
                  <th scope="col">Dirección</th>
                  <th scope="col">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {suppliers.map((supplier) => (
                  <tr key={supplier.id}>
                    <th scope="row">{supplier.id}</th>
                    <td>{supplier.name}</td>
                    <td>{supplier.email}</td>
                    <td>{supplier.phone}</td>
                    <td>{supplier.address}</td>
                    <td>
                      <button
                        className="btn btn-warning btn-sm mr-2"
                        onClick={() => handleEditSupplier(supplier.id)}
                      >
                        Editar
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDeleteSupplier(supplier.id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Cargando proveedores...</p>
          )}

          
        </>
      ) : (
        <p>No has iniciado sesión. Ingresa a tu cuenta para acceder a esta sección.</p>
      )}
    </div>
  );
};

export { SupplierList };
