'use client';

import React from 'react';
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  Paper
} from '@mui/material';
import {
  Favorite as HeartIcon,
  FitnessCenter as FitnessCenterIcon,
  LocalHospital as LocalHospitalIcon,
  NotificationsActive as BellIcon,
  Psychology as BrainIcon,
  Restaurant as DiningIcon
} from '@mui/icons-material';
import Link from 'next/link'; // Importa Link de Next.js

const HEALTH_APPS = [
  {
    title: 'App PesoSalud',
    description: "PesoSalud: Tu compañero de salud personal que calcula tu peso y te proporciona tu masa corporal de forma rápida y sencilla.",
    imageUrl: '/img/pesoSalud.jpg',
    href: '/calculator', // Ruta a la página correspondiente
  },
  {
    title: 'Medichat',
    description: 'Medichat: Comunícate con profesionales de la salud y recibe asesoramiento médico en tiempo real.',
    imageUrl: '/img/medichat.jpeg', // Asegúrate de que la imagen exista
    href: '/medichat', // Ruta a la página correspondiente
  },
  {
    title: 'DermaAI Bot',
    description: 'Analiza Erupciones Cutaneas con AI.',
    imageUrl: '/img/analisis-piel.jpeg',
    href: '/dermaaI', // Ruta a la página correspondiente
  },
];

const HEALTH_FEATURES = [
  {
    Icon: HeartIcon,
    title: 'Salud Preventiva',
    description: 'Las apps te ayudan a realizar un seguimiento de tu salud para prevenir enfermedades.',
  },
  {
    Icon: FitnessCenterIcon,
    title: 'Ejercicio Efectivo',
    description: 'Accede a rutinas de ejercicio que se adaptan a tus necesidades y objetivos.',
  },
  {
    Icon: LocalHospitalIcon,
    title: 'Atención Médica',
    description: 'Consulta con profesionales de la salud directamente desde tu dispositivo.',
  },
  {
    Icon: BellIcon,
    title: 'Control de Medicamentos',
    description: 'Recibe recordatorios para tomar tus medicamentos a tiempo.',
  },
  {
    Icon: BrainIcon,
    title: 'Bienestar Mental',
    description: 'Encuentra recursos y herramientas para cuidar tu salud mental.',
  },
  {
    Icon: DiningIcon,
    title: 'Nutrición Balanceada',
    description: 'Planifica tus comidas y lleva un seguimiento de tu ingesta nutricional.',
  },
];

const HeroSection = () => (
  <Box 
    sx={{ 
      position: 'relative', 
      mb: 8, 
      pt: 2,
      height: 600,
      borderRadius: 2,
      overflow: 'hidden',
      backgroundAttachment: 'fixed',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
    }}
  >
    <CardMedia
      component="img"
      image="/img/heroImage.jpg"
      alt="Imagen Destacada"
      sx={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1,
      }}
    />
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 2,
      }}
    />
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 3,
      }}
    >
      <Typography 
        variant="h2" 
        color="white" 
        align="center"
        sx={{ 
          maxWidth: 'lg',
          px: 4,
          fontWeight: 'bold',
          textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
        }}
      >
        Bienvenido a Nuestras Apps de Salud
      </Typography>
      <Button 
        variant="contained" 
        color="primary" 
        size="large"
        sx={{ mt: 4 }}
      >
        Explorar Apps
      </Button>
    </Box>
  </Box>
);

const AppCard = ({ title, description, imageUrl, href }) => (
  <Card 
    sx={{ 
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      transition: 'all 0.3s ease-in-out',
      '&:hover': {
        transform: 'translateY(-8px)',
        boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
      },
    }}
  >
    <Box sx={{ height: 200, overflow: 'hidden', position: 'relative' }}>
      <CardMedia
        component="img"
        height="200"
        image={imageUrl}
        alt={title}
        sx={{
          transition: 'transform 0.3s ease-in-out',
          '&:hover': {
            transform: 'scale(1.1)',
          },
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          p: 2,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
        }}
      >
        <Typography variant="h6" color="white">
          {title}
        </Typography>
      </Box>
    </Box>
    <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
      <Typography 
        variant="body2" 
        color="text.secondary" 
        sx={{ mb: 2, flexGrow: 1 }}
      >
        {description}
      </Typography>
      <Link href={href} passHref>
        <Button 
          variant="contained" 
          color="primary" 
          fullWidth
          sx={{ mt: 'auto' }}
        >
          Ir a {title}
        </Button>
      </Link>
    </CardContent>
  </Card>
);

const FeatureCard = ({ Icon, title, description }) => (
  <Paper
    elevation={2}
    sx={{
      p: 3,
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      transition: 'all 0.3s ease-in-out',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
      },
    }}
  >
    <Box
      sx={{
        width: 64,
        height: 64,
        mb: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        backgroundColor: 'primary.main',
        color: 'white',
      }}
    >
      <Icon fontSize="large" />
    </Box>
    <Typography variant="h6" gutterBottom>
      {title}
    </Typography>
    <Typography variant="body2" color="text.secondary">
      {description}
    </Typography>
  </Paper>
);

const InfoSection = () => (
  <Paper
    sx={{
      bgcolor: 'primary.light',
      p: 4,
      borderRadius: 2,
      mb: 8,
    }}
  >
    <Grid container spacing={4} alignItems="center">
      <Grid item xs={12} md={6}>
        <CardMedia
          component="img"
          image="/img/health.jpg"
          alt="Salud y bienestar"
          sx={{
            width: '100%',
            borderRadius: 2,
            height: 400,
            objectFit: 'cover',
          }}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant="h4" gutterBottom fontWeight="bold">
          Cuida tu salud con tecnología
        </Typography>
        <Typography variant="body1">
          Nuestras apps de salud están diseñadas para ayudarte a mantener un estilo de vida saludable
          de manera fácil y efectiva. Con herramientas intuitivas y seguimiento personalizado,
          alcanzar tus objetivos de salud nunca había sido tan sencillo.
        </Typography>
      </Grid>
    </Grid>
  </Paper>
);

export default function HealthAppLandingPage() {
  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <HeroSection />

        <Typography 
          variant="h3" 
          align="center" 
          gutterBottom
          fontWeight="bold"
          sx={{ mb: 6 }}
        >
          Descubre Nuestras Apps de Salud
        </Typography>
        <Grid container spacing={4} sx={{ mb: 8 }} justifyContent="center">
          {HEALTH_APPS.map((app, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <AppCard {...app} />
            </Grid>
          ))}
        </Grid>

        <InfoSection />

        <Typography 
          variant="h3" 
          align="center" 
          gutterBottom
          fontWeight="bold"
          sx={{ mb: 6 }}
        >
          ¿Por qué tener Apps de Salud?
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {HEALTH_FEATURES.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <FeatureCard {...feature} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
