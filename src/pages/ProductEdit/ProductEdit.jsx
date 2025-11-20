import React, { useState, useEffect } from 'react'
import { Snackbar, Alert } from '@mui/material'
import { useParams } from 'react-router-dom'
import ProductForm from '../ProductForm/ProductForm'
import Loader from '../../components/Loader/Loader'
import { getProductDataActionInitiate } from '../../redux/actions/getProductAction'
import { putProductDataActionInitiate } from '../../redux/actions/updateProductAction'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const ProductEdit = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const getproductdata = useSelector((state) => state.getproductdata.data)
  const loading = useSelector((state) => state.getproductdata.loading)

  useEffect(() => {
    dispatch(getProductDataActionInitiate())
  }, [dispatch])
  useEffect(() => {
    if (!getproductdata) return
    if (Array.isArray(getproductdata)) {
      const found = getproductdata.find((p) => String(p.id) === String(id))
      setProduct(found || null)
    } else if (typeof getproductdata === 'object' && getproductdata !== null) {
      setProduct(String(getproductdata.id) === String(id) ? getproductdata : null)
    } else {
      setProduct(null)
    }
  }, [getproductdata, id])

  const handleSubmit = async (form) => {
    try {
      await dispatch(putProductDataActionInitiate(form, id))
      setSnackbar({ open: true, message: 'Product updated successfully!', severity: 'success' })
      setTimeout(() => navigate('/admin/products'), 1000)
    } catch (error) {
      console.error('Update failed', error)
      setSnackbar({ open: true, message: 'Update failed', severity: 'error' })
      throw error
    }
  }

  if (loading) return <Loader />
  if (!product) return <div>Product not found</div>

  return (
    <>
      <ProductForm initialValues={product} isEdit={true} onSubmit={handleSubmit} />
      <Snackbar
        open={snackbar.open}
        autoHideDuration={2500}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </>
  )
}

export default ProductEdit

