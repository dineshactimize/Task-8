import React, { useEffect, useState } from 'react'
import { Box, Typography, TextField, Button, Snackbar, Alert, Stack } from '@mui/material'
import { Link } from 'react-router-dom'
import ProductTable from '../../components/ProductTable/ProductTable'
import ConfirmDialog from '../../components/ConfirmDialog/ConfirmDialog'
import Loader from '../../components/Loader/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { getProductDataActionInitiate } from '../../redux/actions/getProductAction'
import { deleteProductDataActionInitiate } from '../../redux/actions/deleteProductAction'

const AdminProducts = () => {
  const [products, setProducts] = useState([])
  const [filtered, setFiltered] = useState([])
  const [searchText, setSearchText] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [confirmDialog, setConfirmDialog] = useState({ open: false, productId: null })
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })

  const handleSearch = (e) => {
    const text = e.target.value
    setSearchText(text)
    filterProducts(text, selectedCategory)
  }

  const filterProducts = (search) => {
    let result = products
    if (search) result = result.filter(p => p.title.toLowerCase().includes(search.toLowerCase()))
    setFiltered(result)
  }

  const handleDeleteClick = (id) => {
    setConfirmDialog({ open: true, productId: id })
  }

  const handleConfirmDelete = async () => {
    const id = confirmDialog.productId
    try {
      dispatch(deleteProductDataActionInitiate(id))
      setConfirmDialog({ open: false, productId: null })
      setSnackbar({ open: true, message: 'Product deleted', severity: 'success' })
      dispatch(getProductDataActionInitiate())
    } catch (error) {
      console.error('Delete failed', error)
      setSnackbar({ open: true, message: 'Delete failed', severity: 'error' })
      setConfirmDialog({ open: false, productId: null })
    }
  }


const dispatch=useDispatch();
  useEffect(() => {
    dispatch(getProductDataActionInitiate());
  }, [dispatch]);
  
  const getproductdata = useSelector((state) => state.getproductdata.data);
  const loading = useSelector((state) => state.getproductdata.loading);
  console.log(getproductdata,"getproductdata");

  useEffect(()=> {
    if(searchText && searchText.length>0){
      let result = getproductdata
      if (searchText) result = result.filter(p => p.title.toLowerCase().includes(searchText.toLowerCase()))
      setProducts(result)
    }
    else if (getproductdata){
      setProducts(getproductdata)
    }
  },[getproductdata,searchText]);
  

  if (loading) return <Loader />
 


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

      <ProductTable products={products} onDelete={handleDeleteClick} />

      <ConfirmDialog
        open={confirmDialog.open}
        title="Delete Product"
        message="Are you sure you want to delete this product?"
        onConfirm={handleConfirmDelete}
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
