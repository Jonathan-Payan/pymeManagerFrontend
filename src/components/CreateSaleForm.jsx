import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../services/api';
import { useNavigate } from 'react-router-dom';


const CreateSaleForm = () => {
  const [formData, setFormData] = useState({
    customerId: '',
    invoiceNumber: '',
    invoiceDate: '',
    customerNumber: '',
    total: 0,
    items: [],
  });

  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState('');
const [selectedProductQuantity, setSelectedProductQuantity] = useState(0);

  const navigate = useNavigate();

  

  useEffect(() => {
    // Obtener lista de clientes
    fetch(`${API_BASE_URL}/customers`)
      .then((response) => response.json())
      .then((data) => setCustomers(data))
      .catch((error) => console.error('Error al obtener clientes:', error));

    // Obtener lista de productos
    fetch(`${API_BASE_URL}/products`)
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error al obtener productos:', error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };


  



  const handleProductChange = async (index, product) => {
    try {

     const response = await fetch(`${API_BASE_URL}/latest-sale-price/${product.id}`);
      

      const latestSalePrice  = await response.json();
      const updatedItems = [...formData.items];
      const selectedQuantity = formData.items[index]?.quantity || 1; 
      const selectedDiscount = formData.items[index]?.discount || 0;
      

   updatedItems[index] = {
        productId: product.id,
        productName: product.name,
        description: product.description,
        quantity: selectedQuantity, 
        unitPrice: latestSalePrice.price,
        discount: selectedDiscount,
        total: (latestSalePrice.price * selectedQuantity) * (1 - selectedDiscount / 100),
    };

      setFormData((prevFormData) => ({
        ...prevFormData,
        items: updatedItems,
        total: calculateTotal(updatedItems),
      }));

      setSelectedProductId(product.id);
      setSelectedProductQuantity(selectedQuantity);

    } catch (error) {
      console.error('Error al obtener el precio unitario:', error.message);
    }
  };

  const handleQuantityChange = (index, quantity) => {
    const updatedItems = [...formData.items];
    const item = updatedItems[index];
    item.quantity = quantity;
    item.total = quantity * item.unitPrice;
  
    setFormData((prevFormData) => ({
      ...prevFormData,
      items: updatedItems,
      total: calculateTotal(updatedItems),
    }));
  
    // Actualiza selectedProductQuantity
    setSelectedProductQuantity(quantity);
  };

  const calculateTotal = (items) => {
    return items.reduce((acc, item) => acc + item.total, 0);
  };
  
  const handleDiscountChange = (index, discount) => {
    const updatedItems = [...formData.items];
    updatedItems[index] = {
      ...updatedItems[index],
      discount,
      total: calculateTotal(updatedItems, index),
    };
  
    setFormData((prevFormData) => ({
      ...prevFormData,
      items: updatedItems,
      total: calculateTotal(updatedItems),
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
// ... (código anterior)

try {
  

  const exitResponse = await fetch(`${API_BASE_URL}/inventory/exit`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      productId: selectedProductId,
      quantity: selectedProductQuantity,
    }),
  });



  const salesResponse = await fetch(`${API_BASE_URL}/sales`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });



  const newSaleData = await salesResponse.json();
  console.log('Venta creada exitosamente:', newSaleData);

  navigate(`/sales-list`);

} catch (error) {
  console.error('Error general:', error.message);
}

// ... (código posterior)

  };

  return (
    <div className="container mt-5">
      <h2>Registrar Nueva Venta</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Cliente:</label>
          <select
            className="form-select"
            name="customerId"
            value={formData.customerId}
            onChange={handleChange}
          >
            <option value="">Selecciona un cliente</option>
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Número de Factura:</label>
          <input
            type="text"
            className="form-control"
            name="invoiceNumber"
            value={formData.invoiceNumber}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Fecha de Factura:</label>
          <input
            type="date"
            className="form-control"
            name="invoiceDate"
            value={formData.invoiceDate}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Número de Cliente:</label>
          <input
            type="text"
            className="form-control"
            name="customerNumber"
            value={formData.customerNumber}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Total:</label>
          <input
            type="text"
            className="form-control"
            name="total"
            value={formData.total}
            onChange={handleChange}
            disabled
          />
        </div>

       {/* Agregar productos */}
{formData.items.map((item, index) => (
  <div key={index} className="mb-3">
    <label className="form-label">Producto {index + 1}:</label>
    <select
      className="form-select"
      onChange={(e) => handleProductChange(index, JSON.parse(e.target.value))}
    >
      <option value="">Selecciona un producto</option>
      {products.map((product) => (
        <option key={product.id} value={JSON.stringify(product)}>
          {product.name}
        </option>
      ))}
    </select>

    <label className="form-label">Descripción:</label>
    <input
      type="text"
      className="form-control"
      value={item.description}
      readOnly
    />

    <label className="form-label">Cantidad:</label>
    <input
      type="number"
      className="form-control"
      value={item.quantity}
      onChange={(e) => handleQuantityChange(index, parseInt(e.target.value, 10))}
    />

    <label className="form-label">Precio Unitario:</label>
    <input
      type="text"
      className="form-control"
      value={item.unitPrice}
      readOnly
    />

<label className="form-label">Descuento:</label>
    <input
      type="text"
      className="form-control"
      value={item.discount}
      onChange={(e) => handleDiscountChange(index, parseInt(e.target.value,10))}
    />

    <label className="form-label">Total:</label>
    <input
      type="text"
      className="form-control"
      value={item.total}
      readOnly
    />
  </div>
))}

        <button type="button" className="btn btn-primary" onClick={() => setFormData((prev) => ({ ...prev, items: [...prev.items, {}] }))}>
          Agregar Producto
        </button>

        <button type="submit" className="btn btn-success">
          Crear Venta
        </button>
      </form>
    </div>
  );
};

export { CreateSaleForm };
