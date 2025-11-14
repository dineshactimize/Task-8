import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Stack, Box } from '@mui/material';
import { Edit, Visibility, Delete } from '@mui/icons-material';
import { Link } from 'react-router-dom';

function createData(id, name, calories, fat, carbs, protein) {
  return { id, name, calories, fat, carbs, protein };
}

const rows = [
  createData(1, 'Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData(2, 'Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData(3, 'Eclair', 262, 16.0, 24, 6.0),
  createData(4, 'Cupcake', 305, 3.7, 67, 4.3),
  createData(5, 'Gingerbread', 356, 16.0, 49, 3.9),
];

export default function BasicTable() {
  const handleDelete = (id) => {
    alert(`Delete item ${id}`);
  };

  return (
    <Box sx={{ margin: '20px 0' }}>
      <TableContainer component={Paper} sx={{ boxShadow: '0 4px 6px rgba(17, 196, 118, 0.1)' }}>
        <Table sx={{ width:850,ml:40 }} aria-label="products table">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#1976d2' }}>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Product</TableCell>
              <TableCell align="right" sx={{ color: 'white', fontWeight: 'bold' }}>Calories</TableCell>
              <TableCell align="right" sx={{ color: 'white', fontWeight: 'bold' }}>Fat (g)</TableCell>
              <TableCell align="right" sx={{ color: 'white', fontWeight: 'bold' }}>Carbs (g)</TableCell>
              <TableCell align="right" sx={{ color: 'white', fontWeight: 'bold' }}>Protein (g)</TableCell>
              <TableCell align="center" sx={{ color: 'white', fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ 
                  '&:hover': { backgroundColor: '#f5f5f5' },
                  '&:last-child td, &:last-child th': { border: 0 }
                }}
              >
                <TableCell component="th" scope="row" sx={{ fontWeight: 500 }}>
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell>
                <TableCell align="center">
                  <Stack direction="row" spacing={1} justifyContent="center">
                    <Button
                      variant="outlined"
                      size="small"
                      color="primary"
                      startIcon={<Visibility />}
                      component={Link}
                      to={`/admin/products/${row.id}`}
                      sx={{ textTransform: 'none' }}
                    >
                      View
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      color="success"
                      startIcon={<Edit />}
                      component={Link}
                      to={`/admin/products/edit/${row.id}`}
                      sx={{ textTransform: 'none' }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      color="error"
                      startIcon={<Delete />}
                      onClick={() => handleDelete(row.id)}
                      sx={{ textTransform: 'none' }}
                    >
                      Delete
                    </Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
    </Box>



  );
}
