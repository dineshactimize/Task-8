import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
  </Box>
);
const Linkstyle={
  textDecoration:'none',
  color:'white'
}
const card = (
  <React.Fragment >
    <CardContent >
      <Typography variant='h5'>
        Total Products :- 100 <br />
        Total Categories :- 10
      </Typography>
    </CardContent>
    <CardActions>
    <Button variant="contained"><Link style={Linkstyle}  to="/admin/products">Manage Products</Link></Button>
    <Button variant="contained"><Link style={Linkstyle}  to="/admin/products/new">Add Products</Link></Button>
    </CardActions>
  </React.Fragment>
);
export default function OutlinedCard(z) {
  return (
    <Box sx={{ minWidth: 275, maxWidth: 400, margin: 'auto', mt: 5,bgcolor:'lightgray'}}>
      <Card variant="outlined">{card}</Card>
    </Box>
  );
}
