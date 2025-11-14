import React from 'react'
import { Typography } from '@mui/material'
import { Button } from '@mui/material'

const ProductEdit = () => {
  return (
    <div>
       <Typography variant='h3'align='center'>Add Product</Typography>
    <form action="">
      <label htmlFor="">Title</label><br />
      <input type="text" /><br />
      <label htmlFor="">Price</label><br />
      <input type="text" /><br />
      <label htmlFor="">Description</label><br />
      <input type="text" /><br />

       <Button variant="contained">Save</Button>
    </form>
    </div>
  )
}

export default ProductEdit
