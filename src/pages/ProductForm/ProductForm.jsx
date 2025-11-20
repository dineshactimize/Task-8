import React, { useState, useEffect } from 'react'
import {Box,TextField,Button,Snackbar,Alert,Paper,Typography,Stack,Container,} from '@mui/material'
import { useNavigate } from 'react-router-dom'

export default function ProductForm({ initialValues, onSubmit, isEdit }) {
  const navigate = useNavigate()

  const defaults = {
    title: '',
    price: '',
    description: '',
    category: '',
    image: '',
  }

  const [form, setForm] = useState(initialValues || defaults)
  const [errors, setErrors] = useState({})
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })

  useEffect(() => {
    setForm(initialValues || defaults)
  }, [initialValues])

  const validate = () => {
    const e = {}
    if (!form.title || form.title.trim().length < 3) e.title = 'Enter a title (min 3 chars)'
    if (!form.price || Number(form.price) <= 0) e.price = 'Enter a valid price'
    if (!form.description || form.description.trim().length < 10) e.description = 'Description must be at least 10 characters'
    if (!form.category) e.category = 'Category is required'
    if (!form.image || !form.image.startsWith('http')) e.image = 'Provide a valid image URL (http...)'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    if (!validate()) return
    try {
      await onSubmit(form)
      setSnackbar({ open: true, message: isEdit ? 'Product updated' : 'Product created', severity: 'success' })
      setTimeout(() => navigate('/admin/products'), 800)
    } catch {
      setSnackbar({ open: true, message: 'Something went wrong', severity: 'error' })
    }
  }

  return (
    <Container maxWidth="sm">
      <Paper sx={{ p: 3, mt: 3, boxShadow: '0 6px 18px rgba(0,0,0,0.06)' }}>
        <Typography variant="h5" mb={2} sx={{ fontWeight: 'bold' }}>
          {isEdit ? 'Edit Product' : 'Add New Product'}
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Title"
            fullWidth
            margin="normal"
            value={form.title}
            error={!!errors.title}
            helperText={errors.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />

          <TextField
            label="Price"
            type="number"
            fullWidth
            margin="normal"
            value={form.price}
            error={!!errors.price}
            helperText={errors.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />

          <TextField
            label="Category"
            fullWidth
            margin="normal"
            value={form.category}
            error={!!errors.category}
            helperText={errors.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          />

          <TextField
            label="Image URL"
            fullWidth
            margin="normal"
            value={form.image}
            error={!!errors.image}
            helperText={errors.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
          />

          <TextField
            label="Description"
            fullWidth
            multiline
            rows={4}
            margin="normal"
            value={form.description}
            error={!!errors.description}
            helperText={errors.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />

          <Stack direction="row" spacing={2} mt={2}>
            <Button type="submit" variant="contained" sx={{ textTransform: 'none' }}>
              {isEdit ? 'Update' : 'Create'}
            </Button>

            <Button variant="outlined" sx={{ textTransform: 'none' }} onClick={() => navigate('/admin/products')}>
              Cancel
            </Button>
          </Stack>
        </Box>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={2500}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
        </Snackbar>
      </Paper>
    </Container>
  )
}

