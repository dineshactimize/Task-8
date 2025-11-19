import React, { useState, useEffect } from 'react'
import { Typography, Box, Paper, Grid, Button, Stack } from '@mui/material'
import { Link } from 'react-router-dom'
import Loader from '../../components/Loader/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { getProductDataActionInitiate } from '../../redux/actions/getProductAction'

function AdminDashboard() {
  const [products, setProducts] = useState([])
  
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


  return (
    <Box sx={{ row: 4 }}>
      <Typography variant="h3" align="center" mb={4} sx={{ fontWeight: 'bold' }}>
        Admin Dashboard
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Paper sx={{ row: 3, textAlign: 'center', backgroundColor: '#93c9edff' }}>
            <Typography variant="h6" color="textSecondary">
              Total Products
            </Typography>
            <Typography variant="h3" color="primary" sx={{ fontWeight: 'bold' }}>
              {products.length}
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Paper sx={{ row: 3, textAlign: 'center', backgroundColor: '#7db0eeff' }}>
            <Typography variant="h6" color="textSecondary">
              Total Categories
            </Typography>
            <Typography variant="h3" color="secondary" sx={{ fontWeight: 'bold' }}>
              {categories}
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <Stack direction="row" spacing={2} sx={{ mt: 4, justifyContent: 'center' }}>
        <Button variant="contained" size="large"component={Link} to="/admin/products"sx={{ textTransform: 'none' }}>
          Manage Products
        </Button>
        <Button variant="outlined"size="large" component={Link} to="/admin/products/new" sx={{ textTransform: 'none' }}>
          Add Product
        </Button>
      </Stack>
    </Box>
  )
}



export default AdminDashboard
