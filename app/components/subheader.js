import { Box, Typography, Button } from '@mui/material';

const SubHeader = () => {
  return (
    <Box 
      suppressHydrationWarning
      sx={{ 
        width: '100%', 
        bgcolor: 'primary.main', 
        py: 1, 
        textAlign: 'center',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}
    >
      <Typography variant="body2" sx={{ color: 'white' }}>
        ¿Interesado en nuestro proyecto? Envía un correo a {' '}
        <Button 
          variant="text" 
          href="mailto:devlewiso@gmail.com?subject=HealthTrack" 
          sx={{ 
            color: 'white', 
            textDecoration: 'underline', 
            p: 0, 
            minWidth: 'auto',
            '&:hover': { color: 'secondary.main' }
          }}
        >
          devlewiso@gmail.com
        </Button>
      </Typography>
    </Box>
  );
};

export default SubHeader;