import React from 'react'
import { AppBar, Toolbar, Box, Button } from '@mui/material'
import { Link } from 'react-router-dom'
import DashboardIcon from '@mui/icons-material/Dashboard'
import StorageIcon from '@mui/icons-material/Storage'

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Button
            color="inherit"
            component={Link}
            to="/admin"
            sx={{ mr: 2, textTransform: 'none', fontSize: '1rem' }}
          >
            Dashboard
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/admin/products"
            sx={{ textTransform: 'none', fontSize: '1rem' }}
          >
            Manage Products
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
