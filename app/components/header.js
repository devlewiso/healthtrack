"use client"; // Agrega esta línea

import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import '../styles/Header.css'; // Asegúrate de que la ruta sea correcta

const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="sticky" color="primary">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <a href="/" style={{ color: 'white', textDecoration: 'none' }}>
            HealthTrack
          </a>
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
            <a href="/wellcome" style={{ textDecoration: 'none', color: 'inherit' }}>Inicio</a>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <a href="/about" style={{ textDecoration: 'none', color: 'inherit' }}>Sobre Nosotros</a>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <a href="/contact" style={{ textDecoration: 'none', color: 'inherit' }}>Contacto</a>
          </MenuItem>
        </Menu>
        <Button color="inherit" sx={{ display: { xs: 'none', md: 'block' } }} href="/wellcome">
          Inicio
        </Button>
        <Button color="inherit" sx={{ display: { xs: 'none', md: 'block' } }} href="/about">
          Sobre Nosotros
        </Button>
        <Button color="inherit" sx={{ display: { xs: 'none', md: 'block' } }} href="/contact">
          Contacto
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
