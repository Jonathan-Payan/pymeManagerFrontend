// Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Nav = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/login');
  };

  const token = localStorage.getItem('token');

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Inicio</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
          <ul className="navbar-nav">
            {token ? null : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Iniciar Sesión</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register-form">Registro</Link>
                </li>
              </>
            )}
             {token && (
              <li className="nav-item">
                <Link className="nav-link" to="/supplier-list">Lista de proveedores</Link>
              </li>
            )}
              {token && (
              <li className="nav-item">
                <Link className="nav-link" to="/customer-list">Lista de clientes</Link>
              </li>
            )}
            {token && (
              <li className="nav-item">
                <Link className="nav-link" to="/products-list">Lista de Productos</Link>
              </li>
            )}
           {token && (
              <li className="nav-item">
                <Link className="nav-link" to="/create-sale">Registrar venta</Link>
              </li>
            )}
            {token && (
              <li className="nav-item">
                <Link className="nav-link" to="/sales-list">Lista de ventas</Link>
              </li>
            )}
          
             {token && (
              <li className="nav-item">
                <Link className="nav-link" to="/inventory">Inventario</Link>
              </li>
            )}
           
              {token && (
              <li className="nav-item">
                <Link className="nav-link" to="/purchase-orders">Ordenes de compra</Link>
              </li>
            )}
             
          </ul>
          {token && (
            <button className="btn btn-danger" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export { Nav };
