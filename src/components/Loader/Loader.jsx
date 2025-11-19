import React from 'react'
import { Box, CircularProgress, Typography } from '@mui/material'

const Loader = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '400px',
        gap: 2
      }}
    >
      <CircularProgress />
      <Typography>Loading...</Typography>
    </Box>
  )
}

export default Loader
