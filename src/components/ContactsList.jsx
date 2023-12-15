
import React, { useState, useEffect } from 'react';
import { fetchData, API_BASE_URL } from '../services/api';
import { useNavigate } from 'react-router-dom';

const ContactList = () => {
  const [contacts, setContacts] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchContacts = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const contactsList = await fetchData(`contacts/user/${userId}`);
        setContacts(contactsList);
      } catch (error) {
        // Handle errors
      }
    };

    fetchContacts();
  }, [token, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/login');
  };

  const handleNewContact = () => {
    navigate('/create-form');
    console.log('Agregar nuevo contacto');
  };

  const handleEditContact = (contactId) => {
    navigate(`/edit-form/${contactId}`);
  };

  const handleDeleteContact = async (contactId) => {
    try {
      await fetch(`${API_BASE_URL}/contacts/${contactId}`, {
        method: 'DELETE',
      });

      const updatedContacts = contacts.filter((contact) => contact.id !== contactId);
      setContacts(updatedContacts);

      console.log(`Contacto con ID ${contactId} eliminado exitosamente.`);
    } catch (error) {
      console.error('Error al eliminar el contacto:', error.message);
    }
  };

  return (
    <div className="container mt-5">
      {token ? (
        <>
          <h2 className="mb-3">Lista de Contactos</h2>
          <button className="btn btn-primary mb-3" onClick={handleNewContact}>
            Nuevo Contacto
          </button>

          {Array.isArray(contacts) ? (
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Apellido</th>
                  <th scope="col">Correo Electrónico</th>
                  <th scope="col">Teléfono</th>
                  <th scope="col">Celular</th>
                  <th scope="col">Dirección</th>
                  <th scope="col">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((contact) => (
                  <tr key={contact.id}>
                    <th scope="row">{contact.id}</th>
                    <td>{contact.first_name}</td>
                    <td>{contact.last_name}</td>
                    <td>{contact.email}</td>
                    <td>{contact.phone}</td>
                    <td>{contact.cellphone}</td>
                    <td>{contact.address}</td>
                    <td>
                      <button
                        className="btn btn-warning btn-sm mr-2"
                        onClick={() => handleEditContact(contact.id)}
                      >
                        Editar
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDeleteContact(contact.id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Cargando contactos...</p>
          )}

          <button className="btn btn-secondary" onClick={handleLogout}>
            Cerrar Sesión
          </button>
        </>
      ) : (
        <p>No has iniciado sesión. Ingresa a tu cuenta para acceder a esta sección.</p>
      )}
    </div>
  );
};

export  {ContactList};
