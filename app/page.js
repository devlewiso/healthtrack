"use client"; // Asegúrate de tener esta línea al principio del archivo

import React, { useEffect, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { keyframes } from '@emotion/react';
import { useRouter } from 'next/navigation'; // Asegúrate de importar desde 'next/navigation'

const slideIn = keyframes`
  from {
    transform: translateY(-50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const WelcomePage = () => {
  const [visible, setVisible] = useState(false);
  const router = useRouter(); // Inicializa el router

  const handleGetStarted = () => {
    router.push('/wellcome'); // Navega a la página Welcome
  };

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <Box 
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: `url('/img/background.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        textAlign: 'center',
        padding: '2rem',
        animation: visible ? `${slideIn} 0.5s ease-out` : 'none',
      }}
    >
      <Typography variant="h2" gutterBottom sx={{ color: 'white', textShadow: '1px 1px 2px blue, -1px -1px 2px black, 1px -1px 2px white, -1px 1px 2px black' }}>
        Bienvenido a Nuestras Apps de Salud
      </Typography>
      <Typography variant="h5" gutterBottom sx={{ color: 'white', textShadow: '1px 1px 2px blue, -1px -1px 2px black, 1px -1px 2px white, -1px 1px 2px black' }}>
        Controla tu salud de manera fácil y efectiva con nuestras herramientas diseñadas especialmente para ti.
      </Typography>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleGetStarted}
        sx={{
          mt: 2,
          textTransform: 'none',
          fontSize: '1.2rem',
          fontWeight: 'bold',
        }}
      >
        Iniciar
      </Button>
    </Box>
  );
};

export default WelcomePage;
