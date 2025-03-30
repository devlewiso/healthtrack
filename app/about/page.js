'use client';

import React from 'react';
import { Container, Typography, Box, Paper, Grid } from '@mui/material';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', pt: 8 }}>
      <Container maxWidth="lg">
        <Typography variant="h2" align="center" gutterBottom fontWeight="bold">
          Sobre Nosotros
        </Typography>
        <Typography variant="h5" align="center" gutterBottom>
          Nuestra misión es mejorar tu salud y bienestar a través de la tecnología.
        </Typography>

        <Grid container spacing={4} sx={{ mt: 4 }}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 4, height: '100%' }}>
              <Image src='https://placehold.co/600x400' alt='Visión' width={600} height={400} style={{ marginBottom: '16px' }} />
              <Typography variant="h4" gutterBottom fontWeight="bold">
                Nuestra Visión
              </Typography>
              <Typography variant="body1">
                Creemos que la tecnología puede empoderar a las personas para tomar el control de su salud. Nuestras apps están diseñadas para ser accesibles, intuitivas y efectivas.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 4, height: '100%' }}>
              <Image src='https://placehold.co/600x400' alt='Equipo' width={600} height={400} style={{ marginBottom: '16px' }} />
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
              { title: 'Accesibilidad', description: 'Creamos herramientas fáciles de usar para todos.' },
              { title: 'Compromiso', description: 'Nos enfocamos en mejorar la vida de nuestros usuarios.' }
            ].map((value, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Paper sx={{ p: 4, textAlign: 'center' }}>
                  <Image src='https://placehold.co/400x300' alt={value.title} width={400} height={300} style={{ marginBottom: '16px' }} />
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
                <Paper sx={{ p: 4 }}>
                  <Image src='https://placehold.co/600x400' alt={testimonial.name} width={600} height={400} style={{ marginBottom: '16px' }} />
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
