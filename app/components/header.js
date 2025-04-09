"use client"; // Agrega esta línea

import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link'; // Importa Link de next/link

import '../styles/Header.css'; // Asegúrate de que la ruta sea correcta
=======

const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="sticky" color="primary" suppressHydrationWarning>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {/* Usa el componente Link en lugar de un elemento <a> */}
          <Link href="/" style={{ color: 'white', textDecoration: 'none' }}>
            HealthTrack
          </Link>
        </Typography>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={handleMenuClick}
          sx={{ display: { xs: 'block', md: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          sx={{ display: { xs: 'block', md: 'none' } }}
        >
          <MenuItem onClick={handleMenuClose}>
            {/* Cambia los elementos <a> por Link */}
            <Link href="/wellcome" style={{ textDecoration: 'none', color: 'inherit' }}>Inicio</Link>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <Link href="/about" style={{ textDecoration: 'none', color: 'inherit' }}>Sobre Nosotros</Link>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <Link href="/contact" style={{ textDecoration: 'none', color: 'inherit' }}>Contacto</Link>
          </MenuItem>
        </Menu>
        <Button color="inherit" sx={{ display: { xs: 'none', md: 'block' } }} component={Link} href="/wellcome">
          Inicio
        </Button>
        <Button color="inherit" sx={{ display: { xs: 'none', md: 'block' } }} component={Link} href="/about">
          Sobre Nosotros
        </Button>
        <Button color="inherit" sx={{ display: { xs: 'none', md: 'block' } }} component={Link} href="/contact">
          Contacto
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
