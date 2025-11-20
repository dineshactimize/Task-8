import React, { useState } from 'react'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, IconButton, Stack, Box } from '@mui/material'
import { Visibility, Edit, Delete } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

export default function ProductTable({ products = [], onDelete = () => {} }) {
  console.log("products",products)
  const navigate = useNavigate()
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const empty = !products || products.length === 0
  const visibleRows = empty ? [] : products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

  return (
    <Paper sx={{ width: '100%', mt: 3 }}>
      <TableContainer sx={{ maxHeight: 600 }}>
        <Table stickyHeader aria-label="products table">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#1976d2' }}>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', backgroundColor: '#1976d2' }}>Image</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', backgroundColor: '#1976d2' }}>Title</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', backgroundColor: '#1976d2' }}>Price</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold', backgroundColor: '#1976d2' }}>Category</TableCell>
              <TableCell align="center" sx={{ color: 'white', fontWeight: 'bold', backgroundColor: '#1976d2' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {visibleRows.map((p) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={p.id}>
                <TableCell>
                  <img src={p.image} alt={p.title} height="50" style={{ objectFit: 'contain' }} />
                </TableCell>
                <TableCell sx={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.title}</TableCell>
                <TableCell>₹{Number(p.price).toFixed(2)}</TableCell>
                <TableCell>{p.category}</TableCell>
                <TableCell align="center">
                  <Stack direction="row" spacing={1} justifyContent="center">
                    <IconButton size="small" color="primary" onClick={() => navigate(`/admin/products/${p.id}`)}>
                      <Visibility />
                    </IconButton>
                    <IconButton size="small" color="info" onClick={() => navigate(`/admin/products/${p.id}/edit`)}>
                      <Edit />
                    </IconButton>
                    <IconButton size="small" color="error" onClick={() => onDelete(p.id)}>
                      <Delete />
                    </IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}

            {empty && (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                  No products found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={products.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  )
}
