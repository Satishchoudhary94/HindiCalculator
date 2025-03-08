import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import Calculator from './components/Calculator';

function App() {
  return (
    <Container>
      <Box sx={{ textAlign: 'center', my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          हिंदी कैलकुलेटर
        </Typography>
        <Calculator />
      </Box>
    </Container>
  );
}

export default App; 