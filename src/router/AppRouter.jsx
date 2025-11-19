import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'
import AdminDashboard from '../pages/AdminDashboard/AdminDashboard'
import AdminProducts from '../pages/AdminProducts/AdminProducts'
import ProductForm from '../pages/ProductForm/ProductForm'
import ProductEdit from '../pages/ProductEdit/ProductEdit'
import ProductDetails from '../pages/ProductDetails/ProductDetails'
import { useDispatch } from 'react-redux'
import { postProductDataActionInitiate } from '../redux/actions/addProductAction'
// import { createProduct } from '../api/products.api'

const AppRouter = () => {
  const dispatch = useDispatch();
  const handleCreateProduct = async(formData) => {
    // return createProduct(formData)
    await dispatch(postProductDataActionInitiate(formData))
  }

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/admin" />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/products" element={<AdminProducts />} />
        <Route
          path="/admin/products/new"
          element={<ProductForm onSubmit={handleCreateProduct} isEdit={false} />}
        />
        <Route path="/admin/products/:id/edit" element={<ProductEdit />} />
        <Route path="/admin/products/:id" element={<ProductDetails />} />
        <Route path="*" element={<Navigate to="/admin" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
