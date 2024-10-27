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
        backgroundColor: '#f9f9f9',
        textAlign: 'center',
        padding: '2rem',
        animation: visible ? `${slideIn} 0.5s ease-out` : 'none',
      }}
    >
      <Typography variant="h2" gutterBottom>
        Bienvenido a Nuestras Apps de Salud
      </Typography>
      <Typography variant="h5" gutterBottom>
        Controla tu salud de manera fácil y efectiva con nuestras herramientas diseñadas especialmente para ti.
      </Typography>
      
    </Box>
  );
};

export default WelcomePage;
