"use client";
import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, CircularProgress } from '@mui/material';
import '../styles/medichat.css';

const { GoogleGenerativeAI } = require('@google/generative-ai');

const apiKey = 'AIzaSyBwCbo-MSfk0ycgHQx7NN9sw7YZK60Vntc';
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash',
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: 'text/plain',
};

export default function MediChat() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setInput(e.target.value);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    setError('');

    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });

    try {
      const result = await chatSession.sendMessage(input);
      setResponse(result.response.text());
    } catch (error) {
      console.error('Error al enviar el mensaje:', error);
      setError('Error al obtener respuesta. Por favor, intenta de nuevo.');
    } finally {
      setLoading(false);
    }
    setInput('');
  };

  return (
    <Container maxWidth={false} sx={{ mt: 5, width: '80%' }}>
      <div className="chat-container">
        <div className="chat-header">
          <Typography variant="h4" gutterBottom align="center">
            MediChat
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" align="center">
            Tu asistente médico virtual
          </Typography>
        </div>

        <form className="chat-form" onSubmit={handleSubmit}>
          <Typography variant="h6" gutterBottom>
            ¿Qué te gustaría consultar?
          </Typography>
          <TextField
            className="chat-input"
            variant="outlined"
            fullWidth
            value={input}
            onChange={handleInputChange}
            disabled={loading}
            multiline
            rows={3}
            inputProps={{ style: { resize: 'vertical' } }} // Permite redimensionar verticalmente
            sx={{ mt: 2 }} // Margen superior
          />

          <Button
            className="submit-button"
            type="submit"
            disabled={loading || !input.trim()}
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Enviar Consulta'}
          </Button>
        </form>

        {error && (
          <Box className="error-message" sx={{ color: 'red', mt: 2 }}>
            {error}
          </Box>
        )}

        {response && (
          <Box className="response-container" sx={{ mt: 2, p: 2, bgcolor: 'grey.200', borderRadius: 2 }}>
            <Typography variant="h6">Respuesta:</Typography>
            <Typography>{response}</Typography>
          </Box>
        )}
      </div>
    </Container>
  );
}
