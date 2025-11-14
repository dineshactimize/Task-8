import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import AdminDashboard from '../pages/AdminDashboard/AdminDashboard'
import AdminProducts from '../pages/AdminProducts/AdminProducts'
import ProductForm from '../pages/ProductForm/ProductForm'
import ProductEdit from '../pages/ProductEdit/ProductEdit'
import ProductDetails from '../pages/ProductDetails/ProductDetails'
const AppRouter = () => {

    return (

        <div>
            
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Navigate to="/admin" />} />
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/admin/products" element={<AdminProducts />} />
                    <Route path="/admin/products/new" element={<ProductForm/>}/>
                    <Route path ="/admin/products/edit/:id" element={<ProductEdit/>}/>
                    
                    <Route path="/admin/products/details" element={<ProductDetails/>}/>
                    <Route path="/admin/products/:id" element={<ProductDetails/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default AppRouter
