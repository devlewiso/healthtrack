"use client";

import { useState, useRef, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Image from "next/image";
import { 
  Container, 
  Typography, 
  Box, 
  Button, 
  Paper, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  CircularProgress, 
  Alert, 
  Divider,
  Fade,
  Chip,
  IconButton,
  useTheme,
  Tooltip,
  Link
} from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import ChatIcon from '@mui/icons-material/Chat';
import InfoIcon from '@mui/icons-material/Info';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';

export default function DermaAIPage() {
  const theme = useTheme();
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [capturing, setCapturing] = useState(false);
  const [queryCount, setQueryCount] = useState(0);
  const [showDonationPrompt, setShowDonationPrompt] = useState(false);
  const [showChatOption, setShowChatOption] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const videoRef = useRef(null);
  const fileInputRef = useRef(null);

  // Cargar el contador de consultas desde localStorage al iniciar
  useEffect(() => {
    const savedCount = localStorage.getItem('dermaAIQueryCount');
    if (savedCount) {
      const count = parseInt(savedCount, 10);
      setQueryCount(count);
      if (count >= 5) {
        setShowDonationPrompt(true);
      }
    }
  }, []);

  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleCapture = async () => {
    setCapturing(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (err) {
      console.error("Error accessing the camera:", err);
    }
  };

  const takePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      canvas.getContext("2d")?.drawImage(videoRef.current, 0, 0);
      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], "captured.png", { type: "image/png" });
          setImage(file);
          setImagePreview(URL.createObjectURL(file));
          setCapturing(false);
          if (videoRef.current?.srcObject instanceof MediaStream) {
            videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
          }
        }
      });
    }
  };

  const cancelCapture = () => {
    setCapturing(false);
    if (videoRef.current?.srcObject instanceof MediaStream) {
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
    }
  };

  const resetAnalysis = () => {
    setImage(null);
    setImagePreview(null);
    setResult(null);
    setShowChatOption(false);
  };

  const analyzeRash = async () => {
    if (!image) return;

    if (queryCount >= 5 && !showDonationPrompt) {
      setShowDonationPrompt(true);
      return;
    }

    setLoading(true);
    setResult(null);
    setShowChatOption(false);

    const genAI = new GoogleGenerativeAI("AIzaSyC5tFsVKEc--wGtfrGhRTJBaH262MY_qpk");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    try {
      const imageBytes = await image.arrayBuffer();

      const result = await model.generateContent([
        "Identifica esta erupción cutánea y proporciona información relevante sobre ella en español. Incluye posibles causas, recomendaciones de tratamiento y cuándo consultar a un dermatólogo. Estructura tu respuesta en secciones claras.",
        {
          inlineData: {
            data: Buffer.from(imageBytes).toString("base64"),
            mimeType: image.type,
          },
        },
      ]);

      if (result.response) {
        const responseText = result.response.text();
        setResult(responseText);
        
        // Actualizar contador y guardarlo en localStorage
        const newCount = queryCount + 1;
        setQueryCount(newCount);
        localStorage.setItem('dermaAIQueryCount', newCount.toString());
        
        if (newCount >= 5) {
          setShowDonationPrompt(true);
        }

        // Mostrar opción de chat si la respuesta contiene información relevante
        if (responseText.includes("dermatólogo") || responseText.includes("médico") || responseText.includes("consultar")) {
          setShowChatOption(true);
        }
      } else {
        setResult("No se pudo obtener una respuesta del modelo. Por favor, intenta de nuevo.");
      }
    } catch (error) {
      console.error("Error al analizar la erupción cutánea:", error);
      setResult(
        error instanceof Error
          ? `Error al analizar la erupción: ${error.message}. Por favor, verifica tu conexión a internet y la clave API.`
          : "Error desconocido al analizar la erupción. Por favor, intenta de nuevo."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChat = () => {
    // Redirigir a la página de chat o iniciar el servicio de chat aquí
    window.location.href = "/chat"; // Ajusta esto para tu configuración de chat
  };

  return (
    <Box sx={{ 
      bgcolor: 'background.default', 
      minHeight: '100vh',
      backgroundImage: 'linear-gradient(to bottom, #f0f4f8, #d7e3f0)',
      py: 4
    }}>
      <Container maxWidth="lg">
        {/* Encabezado */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography 
            variant="h2" 
            component="h1" 
            gutterBottom 
            fontWeight="bold"
            sx={{ 
              color: theme.palette.primary.main,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 2
            }}
          >
            <MedicalServicesIcon fontSize="large" />
            DermaAI
          </Typography>
          <Typography variant="h5" color="text.secondary" gutterBottom>
            Análisis de Erupciones Cutáneas con Inteligencia Artificial
          </Typography>
          <Chip 
            label="Herramienta de Asistencia Médica" 
            color="primary" 
            variant="outlined" 
            icon={<InfoIcon />} 
          />
        </Box>

        <Grid container spacing={4}>
          {/* Panel Principal */}
          <Grid item xs={12} md={7}>
            <Paper 
              elevation={3} 
              sx={{ 
                p: 4, 
                borderRadius: 2,
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <Typography variant="h5" component="h2" gutterBottom fontWeight="bold" sx={{ mb: 3 }}>
                Análisis de Imágenes
              </Typography>

              {/* Área de captura de cámara */}
              {capturing ? (
                <Box sx={{ mb: 3, position: 'relative' }}>
                  <Box 
                    component="video" 
                    ref={videoRef} 
                    sx={{ 
                      width: '100%', 
                      borderRadius: 2,
                      border: '1px solid',
                      borderColor: 'divider'
                    }} 
                  />
                  <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<CameraAltIcon />}
                      onClick={takePhoto}
                      fullWidth
                    >
                      Capturar Foto
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      startIcon={<CloseIcon />}
                      onClick={cancelCapture}
                    >
                      Cancelar
                    </Button>
                  </Box>
                </Box>
              ) : (
                <Box sx={{ mb: 3 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Button
                        variant="contained"
                        color="primary"
                        startIcon={<PhotoLibraryIcon />}
                        onClick={() => fileInputRef.current?.click()}
                        fullWidth
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
                        Elegir Imagen
                      </Button>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        style={{ display: 'none' }}
                        ref={fileInputRef}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Button
                        variant="outlined"
                        color="primary"
                        startIcon={<CameraAltIcon />}
                        onClick={handleCapture}
                        fullWidth
                        sx={{ py: 1.5 }}
                      >
                        Usar Cámara
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              )}

              {/* Previsualización de imagen */}
              {imagePreview && !capturing && (
                <Box sx={{ 
                  mb: 3, 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center',
                  position: 'relative'
                }}>
                  <Box 
                    sx={{ 
                      position: 'relative', 
                      width: '100%', 
                      maxWidth: 400,
                      height: 300,
                      mx: 'auto',
                      borderRadius: 2,
                      overflow: 'hidden',
                      border: '1px solid',
                      borderColor: 'divider'
                    }}
                  >
                    <Image
                      src={imagePreview}
                      alt="Imagen para análisis"
                      fill
                      style={{ objectFit: 'contain' }}
                    />
                  </Box>
                  <Button
                    variant="text"
                    color="secondary"
                    onClick={resetAnalysis}
                    sx={{ mt: 1 }}
                  >
                    Cambiar imagen
                  </Button>
                </Box>
              )}

              {/* Botón de análisis */}
              <Box sx={{ mt: 'auto' }}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                  disabled={!image || loading}
                  onClick={analyzeRash}
                  startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <AnalyticsIcon />}
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
                  {loading ? "Analizando..." : "Analizar Erupción"}
                </Button>
              </Box>
            </Paper>
          </Grid>

          {/* Panel de Resultados */}
          <Grid item xs={12} md={5}>
            <Paper 
              elevation={3} 
              sx={{ 
                p: 4, 
                borderRadius: 2,
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <Typography variant="h5" component="h2" gutterBottom fontWeight="bold">
                Resultados
              </Typography>

              {loading ? (
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  flexGrow: 1,
                  py: 8
                }}>
                  <CircularProgress size={60} sx={{ mb: 3 }} />
                  <Typography variant="body1" color="text.secondary">
                    Analizando la imagen con IA...
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    Esto puede tomar unos segundos
                  </Typography>
                </Box>
              ) : result ? (
                <Fade in={true} timeout={500}>
                  <Box sx={{ mt: 2, overflowY: 'auto', flexGrow: 1 }}>
                    <Card variant="outlined" sx={{ mb: 3 }}>
                      <CardContent>
                        <Typography variant="body1" component="div" sx={{ whiteSpace: 'pre-line' }}>
                          {result}
                        </Typography>
                      </CardContent>
                    </Card>
                    
                    {showChatOption && (
                      <Button
                        variant="contained"
                        color="success"
                        startIcon={<ChatIcon />}
                        onClick={handleChat}
                        fullWidth
                        sx={{ mt: 2 }}
                      >
                        Consultar con un especialista
                      </Button>
                    )}
                    
                    <Alert severity="info" sx={{ mt: 3 }}>
                      <Typography variant="body2">
                        Esta información es solo orientativa y no sustituye el diagnóstico profesional. Consulte siempre con un dermatólogo.
                      </Typography>
                    </Alert>
                  </Box>
                </Fade>
              ) : (
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  flexGrow: 1,
                  py: 4
                }}>
                  <Box 
                    sx={{ 
                      width: 200,
                      height: 200,
                      position: 'relative',
                      mb: 3
                    }}
                  >
                    <Image 
                      src="https://placehold.co/400x400/e3f2fd/0d47a1?text=DermaAI" 
                      alt="DermaAI" 
                      fill
                      style={{ objectFit: 'contain', opacity: 0.8 }}
                    />
                  </Box>
                  <Typography variant="body1" color="text.secondary" align="center">
                    Sube o captura una imagen de la erupción cutánea para recibir un análisis preliminar
                  </Typography>
                </Box>
              )}
            </Paper>
          </Grid>
        </Grid>

        {/* Mensaje de donación */}
        {showDonationPrompt && (
          <Fade in={true}>
            <Paper 
              elevation={2} 
              sx={{ 
                mt: 4, 
                p: 3, 
                borderRadius: 2,
                bgcolor: theme.palette.primary.light + '20',
                border: `1px solid ${theme.palette.primary.light}`
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <FavoriteIcon color="primary" fontSize="large" />
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      ¡Gracias por usar nuestra aplicación!
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Hemos notado que has usado el servicio varias veces. Si te ha sido útil, considera apoyarnos.
                    </Typography>
                  </Box>
                </Box>
                <IconButton 
                  size="small" 
                  onClick={() => setShowDonationPrompt(false)}
                  sx={{ mt: -1, mr: -1 }}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Box>
              <Box sx={{ mt: 2, textAlign: 'right' }}>
                <Button
                  variant="contained"
                  color="primary"
                  component={Link}
                  href="https://www.patreon.com/neuralcodelab"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Apoyar el proyecto
                </Button>
              </Box>
            </Paper>
          </Fade>
        )}

        {/* Información adicional */}
        <Paper elevation={1} sx={{ mt: 12, p: 3, borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>
            Acerca de DermaAI
          </Typography>
          <Typography variant="body2" paragraph>
            DermaAI utiliza inteligencia artificial avanzada para analizar imágenes de erupciones cutáneas y proporcionar información preliminar sobre posibles condiciones dermatológicas. Esta herramienta está diseñada como un recurso educativo y de asistencia, no como un sustituto del diagnóstico médico profesional.
          </Typography>
          <Typography variant="body2">
            Siempre consulte con un dermatólogo o profesional de la salud para un diagnóstico preciso y un plan de tratamiento adecuado.
          </Typography>
        </Paper>


      </Container>
    </Box>
  );
}
