import React, { useEffect, useState } from 'react'
import { Box, Typography, TextField, Button, Snackbar, Alert, Stack } from '@mui/material'
import { Link } from 'react-router-dom'
import ProductTable from '../../components/ProductTable/ProductTable'
import ConfirmDialog from '../../components/ConfirmDialog/ConfirmDialog'
import Loader from '../../components/Loader/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { getProductDataActionInitiate } from '../../redux/actions/getProductAction'

const AdminProducts = () => {
  const [products, setProducts] = useState([])
  const [filtered, setFiltered] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchText, setSearchText] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [confirmDialog, setConfirmDialog] = useState({ open: false, productId: null })
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })

  const handleSearch = (e) => {
    const text = e.target.value
    setSearchText(text)
    filterProducts(text, selectedCategory)
  }

  const handleCategoryFilter = (e) => {
    const cat = e.target.value
    setSelectedCategory(cat)
    filterProducts(searchText, cat)
  }

  const filterProducts = (search, cat) => {
    let result = products
    if (search) result = result.filter(p => p.title.toLowerCase().includes(search.toLowerCase()))
    if (cat) result = result.filter(p => p.category === cat)
    setFiltered(result)
  }

  const handleDeleteClick = (id) => {
    setConfirmDialog({ open: true, productId: id })
  }


const dispatch=useDispatch();
  useEffect(() => {
    dispatch(getProductDataActionInitiate());
  }, [dispatch]);
  
  const getproductdata = useSelector((state) => state.getproductdata.data);
  useEffect(()=> {
    if (getproductdata){
      setProducts(getproductdata)
    }
  },[getproductdata]);
  
  const categories = new Set(products.map(row => row.category)).size

  // if (loading) return <Loader />

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h3" align="center" mb={3} sx={{ fontWeight: 'bold' }}>
        Manage Products
      </Typography>

      <Stack direction="row" spacing={2} sx={{ mb: 3, justifyContent: 'space-between' }}>
        <TextField
          label="Search products"
          variant="outlined"
          value={searchText}
          onChange={handleSearch}
          sx={{ flex: 1 }}
        />
        <Button
          variant="contained"
          component={Link}
          to="/admin/products/new"
          sx={{ textTransform: 'none' }}
        >
          Add Product
        </Button>
      </Stack>

      <ProductTable products={filtered} onDelete={handleDeleteClick} />

      <ConfirmDialog
        open={confirmDialog.open}
        title="Delete Product"
        message="Are you sure you want to delete this product?"
        // onConfirm={handleConfirmDelete}
        onCancel={() => setConfirmDialog({ open: false, productId: null })}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  )
}

export default AdminProducts
