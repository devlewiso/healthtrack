'use client';

import React from 'react';
import { Box, Container, Typography, Link, Grid, Divider, IconButton, useTheme } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import CodeIcon from '@mui/icons-material/Code';
import FavoriteIcon from '@mui/icons-material/Favorite';

const Footer = () => {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        py: { xs: 3, md: 4 },
        px: { xs: 1, sm: 2 },
        mt: 'auto',
        backgroundColor: theme.palette.primary.main,
        color: '#fff',
        borderTop: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 2, md: 4 }}>
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <CodeIcon sx={{ mr: 1 }} />
              <Typography variant="h6" fontWeight="bold">
                NeuralCodeLab
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Diseñamos soluciones innovadoras con inteligencia artificial.
              Nuestros prototipos demuestran el potencial de la tecnología moderna.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton 
                size="small" 
                aria-label="github" 
                sx={{ color: 'white', '&:hover': { color: '#f0f0f0' } }}
              >
                <GitHubIcon fontSize="small" />
              </IconButton>
              <IconButton 
                size="small" 
                aria-label="linkedin" 
                sx={{ color: 'white', '&:hover': { color: '#f0f0f0' } }}
              >
                <LinkedInIcon fontSize="small" />
              </IconButton>
              <IconButton 
                size="small" 
                aria-label="twitter" 
                sx={{ color: 'white', '&:hover': { color: '#f0f0f0' } }}
              >
                <TwitterIcon fontSize="small" />
              </IconButton>
              <IconButton 
                size="small" 
                aria-label="email" 
                sx={{ color: 'white', '&:hover': { color: '#f0f0f0' } }}
              >
                <MailOutlineIcon fontSize="small" />
              </IconButton>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
              Navegación
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
              <Link href="/" color="inherit" underline="hover">
                Inicio
              </Link>
              <Link href="/medichat" color="inherit" underline="hover">
                MediChat
              </Link>
              <Link href="/dashboard" color="inherit" underline="hover">
                Dashboard
              </Link>
              <Link href="/about" color="inherit" underline="hover">
                Acerca de
              </Link>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
              Aviso Legal
            </Typography>
            <Typography variant="body2">
              Todos nuestros proyectos son prototipos experimentales y no están destinados a uso comercial.
              No ofrecemos servicios de facturación ni comercialización de productos.
            </Typography>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: { xs: 2, md: 3 }, borderColor: 'rgba(255,255,255,0.2)' }} />
        
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' }, 
          justifyContent: 'space-between', 
          alignItems: 'center',
          textAlign: { xs: 'center', sm: 'left' }
        }}>
          <Typography variant="body2" sx={{ mb: { xs: 1, sm: 0 }, fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
            {currentYear} NeuralCodeLab. Todos los derechos reservados.
          </Typography>
          <Typography variant="body2" sx={{ 
            display: 'flex', 
            alignItems: 'center',
            justifyContent: { xs: 'center', sm: 'flex-start' },
            fontSize: { xs: '0.7rem', sm: '0.75rem' }
          }}>
            Hecho con <FavoriteIcon sx={{ mx: 0.5, fontSize: '0.8rem', color: '#ff6d75' }} /> en neuralcodelab.com
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;