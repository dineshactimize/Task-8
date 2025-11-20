import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Paper, Typography, Box, Button, Stack, Snackbar, Alert } from '@mui/material'
import Loader from '../../components/Loader/Loader'
import ConfirmDialog from '../../components/ConfirmDialog/ConfirmDialog'
import { getProductDataActionInitiate } from '../../redux/actions/getProductAction'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProductDataActionInitiate } from '../../redux/actions/deleteProductAction'

const ProductDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })

 


  const dispatch = useDispatch()
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
  const handleDelete = async (id) => {
    try {
      await dispatch(deleteProductDataActionInitiate(id))
      setConfirmOpen(false)
      setSnackbar({ open: true, message: 'Product deleted', severity: 'success' })
      navigate('/admin/products')
    } catch (error) {
      console.error('Delete failed', error)
      setSnackbar({ open: true, message: 'Delete failed', severity: 'error' })
      setConfirmOpen(false)
    }
  }
  

  if (loading) return <Loader />
  if (!product) return <Typography>Product not found</Typography>

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={4}>
          <Box sx={{ flex: 1, textAlign: 'center' }}>
            <img src={product.image} alt={product.title} style={{ maxWidth: '100%', height: 'auto', maxHeight: 400 }} />
          </Box>

          <Box sx={{ flex: 1 }}>
            <Typography variant="h4" mb={2} sx={{ fontWeight: 'bold' }}>
              {product.title}
            </Typography>

            <Typography variant="h5" color="primary" mb={2}>
              ₹{Number(product.price).toFixed(2)}
            </Typography>

            <Typography variant="body1" mb={2} color="textSecondary">
              <strong>Category:</strong> {product.category}
            </Typography>

            <Typography variant="body2" mb={4}>
              <strong>Description:</strong>
            </Typography>
            <Typography variant="body2" mb={4} sx={{ whiteSpace: 'pre-wrap' }}>
              {product.description}
            </Typography>

            <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                color="info"
                onClick={() => navigate(`/admin/products/${id}/edit`)}
                sx={{ textTransform: 'none' }}
              >
                Edit
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={() => setConfirmOpen(true)}
                sx={{ textTransform: 'none' }}
              >
                Delete
              </Button>
              <Button
                variant="outlined"
                onClick={() => navigate('/admin/products')}
                sx={{ textTransform: 'none' }}
              >
                Back
              </Button>
            </Stack>
          </Box>
        </Stack>
      </Paper>

      <ConfirmDialog
        open={confirmOpen}
        title="Delete Product"
        message="Are you sure you want to delete this product?"
        onConfirm={() => handleDelete(id)}
        onCancel={() => setConfirmOpen(false)}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </Container>
  )
}

export default ProductDetails
