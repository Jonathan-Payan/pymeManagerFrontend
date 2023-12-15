import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home } from "../components/Home";
import { LoginForm } from "../components/Login";
import { RegisterForm } from "../components/RegisterForm";
import { ProductsList } from "../components/ProductsList";
import { PriceList } from "../components/PriceList";
import { CreateProductForm } from "../components/CreateProductForm";
import { Nav } from "../components/Nav";
import { EditProductForm } from "../components/EditProductForm";
import { PurchaseOrders } from "../components/PurchaseOrders";
import { AddPrice } from "../components/AddPrice";
import { SupplierList } from "../components/SuppliersList";
import { CustomerList } from "../components/CustomerList";
import { SalesList } from "../components/SalesList";
import { SaleDetails } from "../components/SaleDetails";
import { Inventory } from "../components/Inventory";
import { CreateSaleForm } from "../components/CreateSaleForm";
import { CreateSupplierForm } from "../components/CreateSupplierForm";
import { CreateCustomerForm } from "../components/CreateCustomerForm";
import { AddSalePrice } from "../components/AddSalePrice";





const AppRouter = () => {
    return (
        <Router>
            <Nav /> 
            <Routes>
            <Route path="/create-form" element={<CreateProductForm />} />
                <Route path="/" element={<Home />} />
                <Route path="/register-form" element={<RegisterForm />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/products-list" element={<ProductsList />} />
                <Route path="/price-list/:productCode" element={<PriceList />} />
                <Route path="/edit-form/:productCode" element={<EditProductForm />} />
                <Route path="/add-price/:productId" element={<AddPrice />} /> 
                <Route path="/supplier-list" element={<SupplierList />} />
                <Route path="/customer-list" element={<CustomerList />} />
                <Route path="/sales-list" element={<SalesList />} />
                <Route path="/inventory" element={<Inventory />} />
                <Route path="/add-sale-price/:productId" element={<AddSalePrice />} />
                <Route path="/create-customer" element={<CreateCustomerForm />} />
                <Route path="/create-supplier" element={<CreateSupplierForm />} />
                <Route path="/create-sale" element={<CreateSaleForm />} />
                <Route path="/purchase-orders" element={<PurchaseOrders />} />
                <Route path="/sale-details/:saleId" element={<SaleDetails />} />

                


            </Routes>
        </Router>
    );
};

export default AppRouter;

