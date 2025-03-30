"use client";
import React, { useState, useEffect } from 'react';
import { 
  Container, 
  TextField, 
  Button, 
  Typography, 
  Box, 
  CircularProgress, 
  Paper, 
  Grid, 
  Card, 
  CardContent, 
  Divider, 
  IconButton, 
  Fade, 
  Chip, 
  Alert,
  useTheme,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Link
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ChatIcon from '@mui/icons-material/Chat';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import HistoryIcon from '@mui/icons-material/History';
import InfoIcon from '@mui/icons-material/Info';
import DeleteIcon from '@mui/icons-material/Delete';
import TimerIcon from '@mui/icons-material/Timer';
import LockIcon from '@mui/icons-material/Lock';

const { GoogleGenerativeAI } = require('@google/generative-ai');

const apiKey = 'AIzaSyC5tFsVKEc--wGtfrGhRTJBaH262MY_qpk';
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash',
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 512,
  responseMimeType: 'text/plain',
};

// Constantes para el límite de consultas
const MAX_QUERIES = 10;
const COOLDOWN_DAYS = 15;

// Función para formatear la fecha actual
const getFormattedDate = () => {
  const now = new Date();
  return now.toLocaleString('es-ES', { 
    day: '2-digit', 
    month: '2-digit', 
    year: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit' 
  });
};

export default function MediChat() {
  const theme = useTheme();
  const [input, setInput] = useState('');
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  
  // Estados para el límite de consultas
  const [queryCount, setQueryCount] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockUntil, setLockUntil] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [showLimitPopup, setShowLimitPopup] = useState(false);

  // Cargar estados desde localStorage
  useEffect(() => {
    const savedCount = localStorage.getItem('mediChatQueryCount');
    const savedLockUntil = localStorage.getItem('mediChatLockUntil');
    
    if (savedCount) setQueryCount(parseInt(savedCount, 10));
    
    if (savedLockUntil) {
      const lockDate = new Date(savedLockUntil);
      if (lockDate > new Date()) {
        setIsLocked(true);
        setLockUntil(lockDate);
      }
    }
  }, []);

  // Actualizar tiempo restante
  useEffect(() => {
    if (!isLocked || !lockUntil) return;

    const interval = setInterval(() => {
      const now = new Date();
      const diff = lockUntil - now;

      if (diff <= 0) {
        setIsLocked(false);
        setLockUntil(null);
        setQueryCount(0);
        localStorage.removeItem('mediChatLockUntil');
        localStorage.setItem('mediChatQueryCount', '0');
        clearInterval(interval);
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        setTimeRemaining(`${days}d ${hours}h ${minutes}m`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isLocked, lockUntil]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLocked) return;

    // Verificar límite de consultas
    if (queryCount >= MAX_QUERIES) {
      const unlockDate = new Date();
      unlockDate.setDate(unlockDate.getDate() + COOLDOWN_DAYS);
      setIsLocked(true);
      setLockUntil(unlockDate);
      setShowLimitPopup(true);
      localStorage.setItem('mediChatLockUntil', unlockDate.toISOString());
      return;
    }

    const userMessage = input.trim();
    setConversations([...conversations, { type: 'user', text: userMessage }]);
    setInput('');
    setLoading(true);
    setError('');

    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });

    try {
      const result = await chatSession.sendMessage(
        `Actúa como un asistente médico virtual profesional. Responde a la siguiente consulta de manera informativa, clara y útil, pero siempre recordando que no eres un médico real y que el usuario debe consultar con un profesional de la salud para diagnósticos o tratamientos. Proporciona respuestas breves y directas. La consulta es: ${userMessage}`
      );
      
      const responseText = result.response.text();
      
      // Incrementar el contador de consultas
      const newCount = queryCount + 1;
      setQueryCount(newCount);
      localStorage.setItem('mediChatQueryCount', newCount.toString());
      
      // Agregar a la conversación actual
      setConversations(prev => [...prev, { type: 'assistant', text: responseText }]);
      
      // Guardar en el historial
      const newChat = {
        id: Date.now(),
        date: getFormattedDate(),
        query: userMessage,
        response: responseText,
      };
      
      setChatHistory(prev => [newChat, ...prev].slice(0, 10)); // Mantener solo las 10 conversaciones más recientes
      
    } catch (error) {
      console.error('Error al enviar el mensaje:', error);
      setError('Error al obtener respuesta. Por favor, verifica tu conexión a internet e intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const startNewChat = () => {
    setConversations([]);
    setError('');
  };

  const loadChatFromHistory = (chat) => {
    setConversations([
      { type: 'user', text: chat.query },
      { type: 'assistant', text: chat.response }
    ]);
    setShowHistory(false);
  };

  const deleteChatFromHistory = (id) => {
    setChatHistory(prev => prev.filter(chat => chat.id !== id));
  };

  return (
    <Box 
      sx={{ 
        width: '100%', 
        minHeight: '100vh',
        bgcolor: theme.palette.background.paper,
        pt: 10, // Añadir padding top para bajar el contenido
      }}
    >
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
            <ChatIcon fontSize="large" />
            MediChat
          </Typography>
          <Typography variant="h5" color="text.secondary" gutterBottom>
            Tu asistente médico virtual con IA
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Chip 
              label="Consulta Médica Virtual" 
              color="primary" 
              variant="outlined" 
              icon={<MedicalServicesIcon />} 
            />
            <Chip 
              label={isLocked ? `Bloqueado (${timeRemaining})` : `${MAX_QUERIES - queryCount} consultas restantes`}
              color={isLocked ? "error" : "success"}
              icon={isLocked ? <LockIcon /> : <TimerIcon />}
            />
          </Box>
        </Box>

        <Grid container spacing={4}>
          {/* Panel Principal */}
          <Grid item xs={12} md={8}>
            {isLocked ? (
              <Paper 
                elevation={3} 
                sx={{ 
                  p: 4, 
                  borderRadius: 2,
                  textAlign: 'center',
                  mb: 4,
                  minHeight: 600,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <LockIcon sx={{ fontSize: 60, color: theme.palette.error.main, mb: 2 }} />
                <Typography variant="h4" gutterBottom color="error">
                  Servicio temporalmente bloqueado
                </Typography>
                <Typography variant="body1" paragraph>
                  Has alcanzado el límite de {MAX_QUERIES} consultas gratuitas. El servicio estará disponible nuevamente en:
                </Typography>
                <Box sx={{ 
                  display: 'inline-block', 
                  p: 2, 
                  bgcolor: theme.palette.error.light + '20',
                  borderRadius: 2,
                  mb: 3
                }}>
                  <Typography variant="h5" fontWeight="bold">
                    {timeRemaining}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Para acceder a consultas ilimitadas, considera actualizar a nuestra versión premium o esperar hasta que finalice el período de enfriamiento.
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  component={Link}
                  href="https://www.patreon.com/neuralcodelab"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ mt: 3 }}
                >
                  Obtener acceso premium
                </Button>
              </Paper>
            ) : (
              <Paper 
                elevation={3} 
                sx={{ 
                  p: 4, 
                  borderRadius: 2,
                  minHeight: 600,
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h5" component="h2" fontWeight="bold">
                    Consulta Médica
                  </Typography>
                  <Button 
                    variant="outlined" 
                    color="primary" 
                    size="small"
                    onClick={startNewChat}
                    disabled={conversations.length === 0}
                  >
                    Nueva Consulta
                  </Button>
                </Box>

                {/* Área de conversación */}
                <Box 
                  sx={{ 
                    flexGrow: 1, 
                    mb: 3, 
                    overflowY: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    p: 2,
                    bgcolor: theme.palette.background.default,
                    borderRadius: 1,
                    minHeight: 300,
                    maxHeight: 400
                  }}
                >
                  {conversations.length === 0 ? (
                    <Box sx={{ 
                      display: 'flex', 
                      flexDirection: 'column', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      height: '100%',
                      opacity: 0.7
                    }}>
                      <MedicalServicesIcon sx={{ fontSize: 60, color: theme.palette.primary.main, mb: 2 }} />
                      <Typography variant="body1" color="textSecondary" align="center">
                        Haz una consulta médica y recibe orientación basada en IA
                      </Typography>
                    </Box>
                  ) : (
                    conversations.map((msg, index) => (
                      <Box 
                        key={index} 
                        sx={{ 
                          alignSelf: msg.type === 'user' ? 'flex-end' : 'flex-start',
                          maxWidth: '80%'
                        }}
                      >
                        <Paper 
                          elevation={1} 
                          sx={{ 
                            p: 2, 
                            bgcolor: msg.type === 'user' ? theme.palette.primary.light : theme.palette.background.paper,
                            color: msg.type === 'user' ? theme.palette.primary.contrastText : 'inherit',
                            borderRadius: 2,
                            borderTopRightRadius: msg.type === 'user' ? 0 : 2,
                            borderTopLeftRadius: msg.type === 'user' ? 2 : 0
                          }}
                        >
                          <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
                            {msg.text}
                          </Typography>
                        </Paper>
                      </Box>
                    ))
                  )}
                  {loading && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, alignSelf: 'flex-start' }}>
                      <CircularProgress size={20} />
                      <Typography variant="body2" color="textSecondary">
                        Procesando tu consulta...
                      </Typography>
                    </Box>
                  )}
                </Box>

                {/* Área de entrada */}
                <form onSubmit={handleSubmit}>
                  <Box sx={{ position: 'relative' }}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      value={input}
                      onChange={handleInputChange}
                      disabled={loading}
                      multiline
                      rows={3}
                      placeholder="Describe tus síntomas o haz una pregunta médica..."
                      sx={{ 
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          pr: 7
                        }
                      }}
                    />
                    <IconButton 
                      type="submit" 
                      disabled={loading || !input.trim()} 
                      sx={{ 
                        position: 'absolute', 
                        right: 8, 
                        bottom: 8,
                        bgcolor: theme.palette.primary.main,
                        color: 'white',
                        '&:hover': {
                          bgcolor: theme.palette.primary.dark,
                        },
                        '&.Mui-disabled': {
                          bgcolor: theme.palette.action.disabledBackground,
                        }
                      }}
                    >
                      {loading ? <CircularProgress size={24} color="inherit" /> : <SendIcon />}
                    </IconButton>
                  </Box>
                </form>

                {error && (
                  <Alert severity="error" sx={{ mt: 2 }}>
                    {error}
                  </Alert>
                )}
              </Paper>
            )}
          </Grid>

          {/* Panel Lateral */}
          <Grid item xs={12} md={4}>
            <Paper 
              elevation={3} 
              sx={{ 
                p: 4, 
                borderRadius: 2,
                height: '100%',
                minHeight: 600,
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h5" component="h2" fontWeight="bold">
                  Historial
                </Typography>
                <Button 
                  variant="outlined" 
                  color="primary" 
                  size="small"
                  onClick={() => setShowHistory(!showHistory)}
                  startIcon={<HistoryIcon />}
                >
                  {showHistory ? 'Ocultar' : 'Ver'}
                </Button>
              </Box>

              {showHistory ? (
                <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
                  {chatHistory.length > 0 ? (
                    <List>
                      {chatHistory.map((chat) => (
                        <Card key={chat.id} variant="outlined" sx={{ mb: 2 }}>
                          <CardContent sx={{ pb: 1 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                              <Typography variant="caption" color="textSecondary">
                                {chat.date}
                              </Typography>
                              <IconButton 
                                size="small" 
                                onClick={() => deleteChatFromHistory(chat.id)}
                                sx={{ color: theme.palette.error.main }}
                              >
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </Box>
                            <Typography variant="subtitle2" noWrap sx={{ fontWeight: 'bold' }}>
                              {chat.query.length > 60 ? chat.query.substring(0, 60) + '...' : chat.query}
                            </Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                              <Button 
                                size="small" 
                                onClick={() => loadChatFromHistory(chat)}
                                color="primary"
                              >
                                Ver
                              </Button>
                            </Box>
                          </CardContent>
                        </Card>
                      ))}
                    </List>
                  ) : (
                    <Box sx={{ textAlign: 'center', py: 4 }}>
                      <Typography variant="body2" color="textSecondary">
                        No hay consultas previas
                      </Typography>
                    </Box>
                  )}
                </Box>
              ) : (
                <Box sx={{ flexGrow: 1 }}>
                  <Alert severity="info" sx={{ mb: 3 }}>
                    <Typography variant="body2">
                      Este chat utiliza IA para proporcionar información médica general. No sustituye la consulta con un profesional de la salud.
                    </Typography>
                  </Alert>
                  
                  <Typography variant="h6" gutterBottom>
                    Recomendaciones
                  </Typography>
                  
                  <List>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: theme.palette.primary.main }}>1</Avatar>
                      </ListItemAvatar>
                      <ListItemText 
                        primary="Sé específico" 
                        secondary="Describe tus síntomas con detalle para obtener mejores respuestas" 
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: theme.palette.primary.main }}>2</Avatar>
                      </ListItemAvatar>
                      <ListItemText 
                        primary="Menciona tu contexto" 
                        secondary="Incluye información relevante como edad, género y condiciones previas" 
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: theme.palette.primary.main }}>3</Avatar>
                      </ListItemAvatar>
                      <ListItemText 
                        primary="Consulta a un médico" 
                        secondary="Siempre verifica la información con un profesional de la salud" 
                      />
                    </ListItem>
                  </List>
                </Box>
              )}
            </Paper>
          </Grid>
        </Grid>

        {/* Información adicional */}
        <Paper elevation={1} sx={{ mt: 12, p: 3, borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>
            Acerca de MediChat
          </Typography>
          <Typography variant="body2" paragraph>
            MediChat utiliza inteligencia artificial avanzada para proporcionar información médica general y orientativa. Esta herramienta está diseñada como un recurso educativo y de asistencia, no como un sustituto del diagnóstico médico profesional.
          </Typography>
          <Typography variant="body2">
            Siempre consulte con un médico o profesional de la salud para un diagnóstico preciso y un plan de tratamiento adecuado.
          </Typography>
        </Paper>


      </Container>

      {showLimitPopup && (
        <Dialog open={showLimitPopup} onClose={() => setShowLimitPopup(false)}>
          <DialogTitle>Límite alcanzado</DialogTitle>
          <DialogContent>
            <Typography>Has alcanzado el límite de {MAX_QUERIES} consultas. Podrás usar el servicio nuevamente en {timeRemaining}.</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowLimitPopup(false)}>Cerrar</Button>
            <Button component={Link} href="/premium" color="primary">
              Obtener Premium
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
}
