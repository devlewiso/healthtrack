'use client';

import React from 'react';
import { Container, Typography, Box, Paper, Grid, Button } from '@mui/material';
import Image from 'next/image';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';

export default function AboutPage() {
  const theme = {
    palette: {
      primary: {
        main: '#1976d2',
        dark: '#115293'
      }
    }
  };

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', pt: 8 }}>
      <Container maxWidth="lg">
        <Typography variant="h2" align="center" gutterBottom fontWeight="bold">
          Sobre Nosotros
        </Typography>
        <Typography variant="h5" align="center" gutterBottom>
          Nuestra misión es mejorar tu salud y bienestar a través de la tecnología.
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
          <Link href="/" passHref>
            <Button 
              variant="contained" 
              startIcon={<ArrowBackIcon />}
              sx={{ 
                mt: 2,
                backgroundColor: theme.palette.primary.main,
                '&:hover': {
                  backgroundColor: theme.palette.primary.dark,
                }
              }}
            >
              Volver al inicio
            </Button>
          </Link>
        </Box>

        <Grid container spacing={4} sx={{ mt: 4 }}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ 
              p: 4, 
              height: '100%',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              '&:hover': {
                transform: 'translateY(-10px)',
                boxShadow: '0 10px 20px rgba(0,0,0,0.2)'
              }
            }}>
              <Image 
                src='https://dummyimage.com/600x400/2196f3/ffffff&text=Vision+de+Salud' 
                alt='Visión de salud digital' 
                width={600} 
                height={400} 
                style={{ marginBottom: '16px', borderRadius: '8px', objectFit: 'cover' }} 
              />
              <Typography variant="h4" gutterBottom fontWeight="bold">
                Nuestra Visión
              </Typography>
              <Typography variant="body1">
                Creemos que la tecnología puede empoderar a las personas para tomar el control de su salud. Nuestras apps están diseñadas para ser accesibles, intuitivas y efectivas.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ 
              p: 4, 
              height: '100%',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              '&:hover': {
                transform: 'translateY(-10px)',
                boxShadow: '0 10px 20px rgba(0,0,0,0.2)'
              }
            }}>
              <Image 
                src='https://dummyimage.com/600x400/4caf50/ffffff&text=Equipo+Profesional' 
                alt='Equipo de profesionales de salud' 
                width={600} 
                height={400} 
                style={{ marginBottom: '16px', borderRadius: '8px', objectFit: 'cover' }} 
              />
              <Typography variant="h4" gutterBottom fontWeight="bold">
                Nuestro Equipo
              </Typography>
              <Typography variant="body1">
                Contamos con un equipo multidisciplinario de desarrolladores, diseñadores y profesionales de la salud comprometidos con crear las mejores herramientas para tu bienestar.
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Nueva sección: Nuestros Valores */}
        <Box sx={{ mt: 8 }}>
          <Typography variant="h3" align="center" gutterBottom fontWeight="bold">
            Nuestros Valores
          </Typography>
          <Grid container spacing={4}>
            {[
              { title: 'Innovación', description: 'Nos mantenemos a la vanguardia de la tecnología en salud.' },
              { title: 'Accesibilidad', description: 'Creamos herramientas que todos puedan usar, sin importar su nivel de conocimiento tecnológico.' },
              { title: 'Compromiso', description: 'Estamos comprometidos con mejorar la salud y bienestar de nuestros usuarios.' }
            ].map((value, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Paper sx={{ 
                  p: 4, 
                  height: '100%',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 8px 16px rgba(0,0,0,0.2)'
                  }
                }}>
                  <Image 
                    src={[
                      'https://dummyimage.com/400x300/ff9800/ffffff&text=Innovacion',
                      'https://dummyimage.com/400x300/9c27b0/ffffff&text=Accesibilidad',
                      'https://dummyimage.com/400x300/f44336/ffffff&text=Compromiso'
                    ][index]} 
                    alt={value.title} 
                    width={400} 
                    height={300} 
                    style={{ marginBottom: '16px', borderRadius: '8px', objectFit: 'cover' }} 
                  />
                  <Typography variant="h6" gutterBottom fontWeight="bold">
                    {value.title}
                  </Typography>
                  <Typography variant="body2">
                    {value.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Nueva sección: Testimonios */}
        <Box sx={{ mt: 8 }}>
          <Typography variant="h3" align="center" gutterBottom fontWeight="bold">
            Testimonios
          </Typography>
          <Grid container spacing={4}>
            {[
              { name: 'Juan Pérez', feedback: 'HealthTrackFit ha cambiado mi vida para mejor.' },
              { name: 'Ana Gómez', feedback: 'Ahora entiendo cómo mejorar mi bienestar de manera sencilla.' }
            ].map((testimonial, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Paper sx={{ 
                  p: 4,
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 8px 16px rgba(0,0,0,0.2)'
                  }
                }}>
                  <Image 
                    src={[
                      'https://dummyimage.com/600x400/607d8b/ffffff&text=Testimonio+1',
                      'https://dummyimage.com/600x400/795548/ffffff&text=Testimonio+2'
                    ][index]} 
                    alt={testimonial.name} 
                    width={600} 
                    height={400} 
                    style={{ marginBottom: '16px', borderRadius: '8px', objectFit: 'cover' }} 
                  />
                  <Typography variant="body1" paragraph>
                    &quot;{testimonial.feedback}&quot;
                  </Typography>
                  <Typography variant="body2" align="right" fontWeight="bold">
                    - {testimonial.name}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
