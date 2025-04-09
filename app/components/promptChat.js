"use client";

import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Chip, 
  Grid, 
  useTheme,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import MedicationIcon from '@mui/icons-material/Medication';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const PromptChat = ({ onSelectPrompt }) => {
  const theme = useTheme();
  
  // Categorías de prompts médicos
  const promptCategories = [
    {
      title: "Síntomas",
      icon: <MonitorHeartIcon fontSize="small" />,
      prompts: [
        "Tengo dolor de cabeza y fiebre desde hace 2 días",
        "Estoy experimentando mareos frecuentes",
        "Tengo dolor en las articulaciones",
        "Siento fatiga constante"
      ]
    },
    {
      title: "Medicamentos",
      icon: <MedicationIcon fontSize="small" />,
      prompts: [
        "¿Cuáles son los efectos secundarios de [medicamento]?",
        "¿Puedo tomar paracetamol con ibuprofeno?",
        "¿Qué debo saber sobre los antibióticos?",
        "¿Cómo debo almacenar mis medicamentos?"
      ]
    },
    {
      title: "Condiciones",
      icon: <LocalHospitalIcon fontSize="small" />,
      prompts: [
        "¿Qué es la hipertensión?",
        "¿Cuáles son los síntomas de la diabetes?",
        "¿Cómo puedo controlar mi asma?",
        "¿Qué debo saber sobre las alergias estacionales?"
      ]
    },
    {
      title: "Prevención",
      icon: <HelpOutlineIcon fontSize="small" />,
      prompts: [
        "¿Cómo puedo mejorar mi sistema inmunológico?",
        "¿Qué vacunas necesito este año?",
        "¿Cuáles son las mejores prácticas para prevenir resfriados?",
        "¿Qué ejercicios son buenos para la salud cardiovascular?"
      ]
    }
  ];

  return (
    <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Selecciona una consulta o escribe la tuya propia:
      </Typography>
      
      {promptCategories.map((category, index) => (
        <Accordion 
          key={index} 
          disableGutters 
          elevation={0}
          sx={{ 
            mb: 1, 
            '&:before': { display: 'none' },
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: '8px',
            overflow: 'hidden'
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{ 
              backgroundColor: theme.palette.background.default,
              minHeight: '48px',
              '& .MuiAccordionSummary-content': {
                margin: '8px 0'
              }
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {category.icon}
              <Typography variant="subtitle2" sx={{ ml: 1 }}>
                {category.title}
              </Typography>
            </Box>
          </AccordionSummary>
          <AccordionDetails sx={{ p: 1, pt: 0 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {category.prompts.map((prompt, i) => (
                <Chip
                  key={i}
                  label={prompt}
                  onClick={() => onSelectPrompt(prompt)}
                  sx={{ 
                    mb: 1,
                    textAlign: 'left',
                    height: 'auto',
                    '& .MuiChip-label': {
                      whiteSpace: 'normal',
                      padding: '8px 12px',
                    },
                    '&:hover': {
                      backgroundColor: '#1976d2',
                      color: 'blue'
                    }
                  }}
                  variant="outlined"
                  color="primary"
                  clickable
                />
              ))}
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default PromptChat;