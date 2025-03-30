'use client';

import { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  TextField, 
  Select, 
  MenuItem, 
  Button, 
  Grid, 
  Paper, 
  Slider, 
  FormControl, 
  InputLabel,
  Alert,
  Card,
  CardContent,
  LinearProgress,
  Divider,
  Tooltip,
  IconButton,
  InputAdornment,
  useTheme
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import HeightIcon from '@mui/icons-material/Height';
import CalculateIcon from '@mui/icons-material/Calculate';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import Image from 'next/image';

export default function CalculatorPage() {
  const theme = useTheme();
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [unidadPeso, setUnidadPeso] = useState('kg');
  const [unidadAltura, setUnidadAltura] = useState('cm');
  const [resultado, setResultado] = useState('');
  const [recomendacion, setRecomendacion] = useState('');
  const [error, setError] = useState('');
  const [categoria, setCategoria] = useState('');
  const [progreso, setProgreso] = useState(0);
  const [animarProgreso, setAnimarProgreso] = useState(false);
  const [mostrarResultado, setMostrarResultado] = useState(false);

  // Categorías de IMC con información detallada
  const categorias = [
    { 
      rango: 'Bajo peso', 
      min: 0, 
      max: 18.5, 
      color: '#3498db', 
      descripcion: 'Un IMC por debajo de 18.5 indica que podrías tener un peso insuficiente. Esto podría estar asociado con desnutrición o problemas de salud subyacentes.',
      recomendacion: 'Considera consultar a un especialista en nutrición para desarrollar un plan de alimentación adecuado.'
    },
    { 
      rango: 'Peso normal', 
      min: 18.5, 
      max: 24.9, 
      color: '#2ecc71', 
      descripcion: 'Un IMC entre 18.5 y 24.9 indica un peso saludable para la mayoría de las personas.',
      recomendacion: '¡Mantén tus hábitos saludables! Continúa con una dieta equilibrada y actividad física regular.'
    },
    { 
      rango: 'Sobrepeso', 
      min: 25, 
      max: 29.9, 
      color: '#f39c12', 
      descripcion: 'Un IMC entre 25 y 29.9 indica sobrepeso. Esto puede aumentar el riesgo de desarrollar ciertos problemas de salud.',
      recomendacion: 'Considera aumentar tu actividad física y revisar tu dieta. Pequeños cambios pueden marcar una gran diferencia.'
    },
    { 
      rango: 'Obesidad', 
      min: 30, 
      max: 100, 
      color: '#e74c3c', 
      descripcion: 'Un IMC de 30 o más indica obesidad. Esto aumenta significativamente el riesgo de problemas de salud como enfermedades cardíacas y diabetes.',
      recomendacion: 'Es recomendable buscar asesoramiento médico para un plan personalizado de pérdida de peso y mejora de la salud.'
    }
  ];

  // Resetear el formulario
  const resetearFormulario = () => {
    setPeso('');
    setAltura('');
    setResultado('');
    setRecomendacion('');
    setError('');
    setCategoria('');
    setProgreso(0);
    setAnimarProgreso(false);
    setMostrarResultado(false);
  };

  // Calcular el IMC
  const calcularIMC = () => {
    setError('');
    setMostrarResultado(false);
    
    if (!peso || !altura) {
      setError('Por favor, ingresa tanto el peso como la altura.');
      return;
    }

    const pesoNum = parseFloat(peso);
    const alturaNum = parseFloat(altura);

    if (isNaN(pesoNum) || isNaN(alturaNum)) {
      setError('Por favor, ingresa valores numéricos válidos.');
      return;
    }

    if (pesoNum <= 0 || alturaNum <= 0) {
      setError('Los valores deben ser mayores que cero.');
      return;
    }

    let pesoEnKg = unidadPeso === 'lb' ? pesoNum * 0.453592 : pesoNum;
    let alturaEnM = unidadAltura === 'in' ? alturaNum * 0.0254 : alturaNum / 100;

    const imc = pesoEnKg / (alturaEnM ** 2);
    setResultado(imc.toFixed(2));

    // Determinar categoría y progreso
    let categoriaEncontrada = categorias.find(cat => imc >= cat.min && imc < cat.max);
    if (!categoriaEncontrada) {
      categoriaEncontrada = categorias[categorias.length - 1]; // Por defecto la última categoría
    }
    
    setCategoria(categoriaEncontrada);
    
    // Calcular el progreso para la barra (de 0 a 50)
    const progresoCalculado = Math.min(Math.max(imc, 10), 40) - 10; // Limitar entre 10 y 40, luego restar 10
    const progresoNormalizado = (progresoCalculado / 30) * 100; // Convertir a porcentaje (0-100)
    
    // Animar el progreso
    setAnimarProgreso(true);
    setProgreso(progresoNormalizado);
    
    // Mostrar el resultado después de un breve retraso para la animación
    setTimeout(() => {
      setMostrarResultado(true);
    }, 500);
  };

  return (
    <Box sx={{ 
      bgcolor: 'background.default', 
      minHeight: '100vh', 
      py: 8,
      backgroundImage: 'linear-gradient(to bottom right, #f5f7fa, #e4e7eb)'
    }}>
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ 
          p: 4, 
          borderRadius: 2,
          background: 'white',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
        }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h3" component="h1" gutterBottom fontWeight="bold" color="primary">
              Calculadora de IMC
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              El Índice de Masa Corporal (IMC) es un indicador que relaciona el peso y la altura para identificar posibles problemas de salud.
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {/* Formulario */}
            <Grid item xs={12} md={6}>
              <Card sx={{ height: '100%', boxShadow: 'none', border: `1px solid ${theme.palette.divider}` }}>
                <CardContent>
                  <Typography variant="h5" component="h2" gutterBottom fontWeight="bold" sx={{ display: 'flex', alignItems: 'center' }}>
                    <CalculateIcon sx={{ mr: 1 }} /> Ingresa tus datos
                  </Typography>
                  
                  <Box sx={{ mt: 3 }}>
                    <Grid container spacing={3}>
                      {/* Campo de peso */}
                      <Grid item xs={12}>
                        <FormControl fullWidth variant="outlined">
                          <TextField
                            label="Peso"
                            value={peso}
                            onChange={(e) => setPeso(e.target.value)}
                            variant="outlined"
                            type="number"
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <FitnessCenterIcon color="primary" />
                                </InputAdornment>
                              ),
                              endAdornment: (
                                <InputAdornment position="end">
                                  <Select
                                    value={unidadPeso}
                                    onChange={(e) => setUnidadPeso(e.target.value)}
                                    sx={{ minWidth: 60 }}
                                  >
                                    <MenuItem value="kg">kg</MenuItem>
                                    <MenuItem value="lb">lb</MenuItem>
                                  </Select>
                                </InputAdornment>
                              ),
                            }}
                          />
                        </FormControl>
                      </Grid>

                      {/* Campo de altura */}
                      <Grid item xs={12}>
                        <FormControl fullWidth variant="outlined">
                          <TextField
                            label="Altura"
                            value={altura}
                            onChange={(e) => setAltura(e.target.value)}
                            variant="outlined"
                            type="number"
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <HeightIcon color="primary" />
                                </InputAdornment>
                              ),
                              endAdornment: (
                                <InputAdornment position="end">
                                  <Select
                                    value={unidadAltura}
                                    onChange={(e) => setUnidadAltura(e.target.value)}
                                    sx={{ minWidth: 60 }}
                                  >
                                    <MenuItem value="cm">cm</MenuItem>
                                    <MenuItem value="in">in</MenuItem>
                                  </Select>
                                </InputAdornment>
                              ),
                            }}
                          />
                        </FormControl>
                      </Grid>

                      {/* Botones */}
                      <Grid item xs={12}>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                          <Button 
                            variant="contained" 
                            color="primary" 
                            fullWidth 
                            size="large"
                            onClick={calcularIMC}
                            startIcon={<CalculateIcon />}
                            sx={{ 
                              py: 1.5,
                              boxShadow: '0 4px 14px rgba(0, 0, 0, 0.1)',
                              transition: 'all 0.3s',
                              '&:hover': {
                                transform: 'translateY(-2px)',
                                boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)'
                              }
                            }}
                          >
                            Calcular
                          </Button>
                          <Button 
                            variant="outlined" 
                            color="secondary"
                            onClick={resetearFormulario}
                            startIcon={<RestartAltIcon />}
                          >
                            Reiniciar
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>

                  {/* Mensaje de error */}
                  {error && (
                    <Alert severity="error" sx={{ mt: 2 }}>
                      {error}
                    </Alert>
                  )}
                </CardContent>
              </Card>
            </Grid>

            {/* Resultados */}
            <Grid item xs={12} md={6}>
              <Card sx={{ height: '100%', boxShadow: 'none', border: `1px solid ${theme.palette.divider}` }}>
                <CardContent>
                  <Typography variant="h5" component="h2" gutterBottom fontWeight="bold">
                    Resultados
                  </Typography>

                  {/* Escala visual de IMC */}
                  <Box sx={{ mt: 2, mb: 4 }}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Escala de IMC
                    </Typography>
                    <Box sx={{ position: 'relative', height: 24, borderRadius: 1, overflow: 'hidden', mb: 1 }}>
                      <Box sx={{ 
                        display: 'flex', 
                        height: '100%',
                        borderRadius: 1,
                        overflow: 'hidden'
                      }}>
                        {categorias.map((cat, index) => (
                          <Box 
                            key={index} 
                            sx={{ 
                              flex: cat.max - cat.min, 
                              bgcolor: cat.color,
                              position: 'relative'
                            }}
                          />
                        ))}
                      </Box>
                      {animarProgreso && (
                        <Box 
                          sx={{ 
                            position: 'absolute', 
                            left: `${progreso}%`, 
                            top: 0,
                            height: '100%', 
                            width: 4,
                            bgcolor: 'black',
                            transform: 'translateX(-50%)',
                            transition: 'left 0.5s ease-out',
                            zIndex: 2
                          }}
                        />
                      )}
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="caption">15</Typography>
                      <Typography variant="caption">25</Typography>
                      <Typography variant="caption">30</Typography>
                      <Typography variant="caption">40</Typography>
                    </Box>
                  </Box>

                  {/* Resultado del IMC */}
                  {mostrarResultado ? (
                    <Box sx={{ 
                      mt: 2, 
                      p: 3, 
                      borderRadius: 2, 
                      bgcolor: categoria.color + '20',
                      border: `1px solid ${categoria.color}`
                    }}>
                      <Typography variant="h4" align="center" gutterBottom fontWeight="bold">
                        {resultado}
                      </Typography>
                      <Typography variant="h6" align="center" gutterBottom>
                        {categoria.rango}
                      </Typography>
                      <Divider sx={{ my: 2 }} />
                      <Typography variant="body2" paragraph>
                        {categoria.descripcion}
                      </Typography>
                      <Typography variant="body2" fontWeight="medium">
                        Recomendación:
                      </Typography>
                      <Typography variant="body2" paragraph>
                        {categoria.recomendacion}
                      </Typography>
                    </Box>
                  ) : (
                    <Box sx={{ 
                      display: 'flex', 
                      flexDirection: 'column', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      height: 200,
                      mt: 2
                    }}>
                      <Image 
                        src="https://placehold.co/300x200" 
                        alt="Calculadora de IMC" 
                        width={300} 
                        height={200} 
                        style={{ opacity: 0.7 }}
                      />
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                        Ingresa tus datos y presiona calcular para ver tus resultados
                      </Typography>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Información adicional */}
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              ¿Qué es el IMC?
            </Typography>
            <Typography variant="body2" paragraph>
              El Índice de Masa Corporal (IMC) es una medida que relaciona el peso y la altura. Es ampliamente utilizado como un indicador para categorizar si una persona tiene un peso saludable. Sin embargo, es importante recordar que el IMC es solo una herramienta de evaluación general y no tiene en cuenta factores como la composición corporal, distribución de grasa o masa muscular.
            </Typography>
            <Typography variant="body2">
              Esta calculadora es solo para fines informativos y no sustituye el consejo médico profesional. Consulta siempre con un profesional de la salud para una evaluación completa.
            </Typography>
          </Box>


        </Paper>
      </Container>
    </Box>
  );
}
