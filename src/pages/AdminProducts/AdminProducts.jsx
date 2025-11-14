import React from 'react'
import BasicTable from '../../components/ProductTable/ProductTable'
import { Button, Typography } from '@mui/material'
import {TextField} from '@mui/material'
import { Link } from 'react-router-dom'

const Linkstyle={
  textDecoration:'none',
  color:'white'
}
const AdminProducts = () => {
  return (
    <div>
     <Typography variant='h3'align='center'>Edit Products</Typography>
     <TextField id="outlined-basic" label="Search" variant="outlined" sx={{ml:30}}  />
      {/* <Button variant="contained"><Link style={Linkstyle}  to="/admin/products/edit">Edit</Link></Button> */}
      <Button variant="contained" sx={{ml:80}}><Link style={Linkstyle}  to="/admin/products/new">Add Product</Link></Button>
      <BasicTable/>
    </div>
  )
}

export default AdminProducts
