'use client';

import React from 'react';
import { Container, Typography, Box, Paper, Grid, Card, CardMedia, Button } from '@mui/material';

export default function AboutPage() {
  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', pt: 8 }}>
      <Container maxWidth="lg">
        {/* Sección Hero */}
        <Box sx={{ mb: 8, textAlign: 'center' }}>
          <Typography variant="h2" gutterBottom fontWeight="bold">
            Sobre Nosotros
          </Typography>
          <Typography variant="h5" color="text.secondary">
            Innovando en salud digital para un mundo más saludable
          </Typography>
        </Box>

        {/* Nuestra Historia */}
        <Paper sx={{ p: 4, mb: 8 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <CardMedia
                component="img"
                image="https://source.unsplash.com/800x600/?health,technology"
                alt="Historia"
                sx={{ borderRadius: 2 }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h3" gutterBottom fontWeight="bold">
                Nuestra Historia
              </Typography>
              <Typography variant="body1" paragraph>
                Comenzamos como un pequeño equipo de desarrolladores y profesionales de la salud con una visión clara: hacer que el cuidado de la salud sea accesible para todos a través de la tecnología.
              </Typography>
              <Typography variant="body1">
                Hoy, nuestro proyecto ha ayudado a miles de personas a mejorar su bienestar y calidad de vida.
              </Typography>
            </Grid>
          </Grid>
        </Paper>

        {/* Nuestro Equipo */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h3" align="center" gutterBottom fontWeight="bold">
            Nuestro Equipo
          </Typography>
          <Grid container spacing={4}>
            {[
              'https://source.unsplash.com/400x400/?doctor',
              'https://source.unsplash.com/400x400/?developer',
              'https://source.unsplash.com/400x400/?designer'
            ].map((img, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card>
                  <CardMedia
                    component="img"
                    height="300"
                    image={img}
                    alt={`Miembro del equipo ${index + 1}`}
                  />
                  <Box sx={{ p: 2 }}>
                    <Typography variant="h6" align="center">
                      Miembro del equipo
                    </Typography>
                    <Typography variant="body2" color="text.secondary" align="center">
                      Especialista en {['Salud', 'Desarrollo', 'Diseño'][index]}
                    </Typography>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Nuestra Misión */}
        <Paper sx={{ p: 4, mb: 8 }}>
          <Typography variant="h3" gutterBottom fontWeight="bold" align="center">
            Nuestra Misión
          </Typography>
          <Typography variant="body1" paragraph align="center">
            Empoderar a las personas para que tomen el control de su salud y bienestar mediante herramientas digitales innovadoras y accesibles.
          </Typography>
        </Paper>

        {/* Nuestros Valores */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h3" align="center" gutterBottom fontWeight="bold">
            Nuestros Valores
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {[
              { title: 'Innovación', description: 'Buscamos constantemente nuevas formas de mejorar la salud digital.' },
              { title: 'Accesibilidad', description: 'Hacemos que nuestras herramientas sean fáciles de usar y accesibles para todos.' },
              { title: 'Compromiso', description: 'Estamos dedicados a mejorar la calidad de vida de nuestros usuarios.' }
            ].map((value, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Paper sx={{ p: 4, textAlign: 'center' }}>
                  <Typography variant="h6" gutterBottom fontWeight="bold">
                    {value.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {value.description}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Testimonios */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h3" align="center" gutterBottom fontWeight="bold">
            Testimonios
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {[
              { name: 'Juan Pérez', feedback: 'HealthTrackFit ha transformado mi forma de monitorear mi salud diaria.' },
              { name: 'María González', feedback: 'Gracias a esta plataforma, ahora entiendo mejor mis hábitos y cómo mejorarlos.' }
            ].map((testimonial, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Paper sx={{ p: 4 }}>
                  <Typography variant="body1" paragraph>
                    &quot;{testimonial.feedback}&quot;
                  </Typography>
                  <Typography variant="body2" color="text.secondary" align="right">
                    - {testimonial.name}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Llamado a la Acción */}
        <Paper sx={{ p: 4, mb: 8, textAlign: 'center', bgcolor: 'primary.light' }}>
          <Typography variant="h3" gutterBottom fontWeight="bold">
            ¿Te interesa nuestro proyecto?
          </Typography>
          <Typography variant="h5" gutterBottom sx={{ mb: 4 }}>
            Puedes adquirir el template o el proyecto completo
          </Typography>
          <Button
            variant="contained"
            size="large"
            href="mailto:devlewiso@gmail.com"
            sx={{ px: 6, py: 2, fontSize: '1.2rem' }}
          >
            Contáctanos
          </Button>
        </Paper>
      </Container>
    </Box>
  );
}
