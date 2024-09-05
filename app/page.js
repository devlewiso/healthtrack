'use client';

import { useState } from 'react';
import Head from 'next/head';
import styles from '../app/styles/App.module.css';

export default function Home() {
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [unidadPeso, setUnidadPeso] = useState('kg');
  const [unidadAltura, setUnidadAltura] = useState('cm');
  const [resultado, setResultado] = useState('');
  const [recomendacion, setRecomendacion] = useState('');
  const [error, setError] = useState('');

  const calcularIMC = () => {
    setError('');
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

    let pesoEnKg = unidadPeso === 'lb' ? pesoNum * 0.453592 : pesoNum;
    let alturaEnM = unidadAltura === 'in' ? alturaNum * 0.0254 : alturaNum / 100;

    const imc = pesoEnKg / (alturaEnM ** 2);
    setResultado(imc.toFixed(2));

    if (imc < 18.5) {
      setRecomendacion('Bajo peso. Considera consultar a un especialista en nutrición.');
    } else if (imc >= 18.5 && imc < 24.9) {
      setRecomendacion('Peso normal. ¡Mantén tus hábitos saludables!');
    } else if (imc >= 25 && imc < 29.9) {
      setRecomendacion('Sobrepeso. Considera aumentar tu actividad física y revisar tu dieta.');
    } else {
      setRecomendacion('Obesidad. Es recomendable buscar asesoramiento médico para un plan personalizado.');
    }
  };

  return (
    <>
      <Head>
        <title>HealthTrack: Tu Calculadora de IMC Personalizada</title>
        <meta name="description" content="Calcula tu Índice de Masa Corporal (IMC) con HealthTrack y obtén recomendaciones personalizadas para tu salud." />
        <meta name="keywords" content="IMC, Índice de Masa Corporal, salud, peso, altura, calcular IMC, HealthTrack" />
        <meta name="author" content="Tu nombre" />
        <meta property="og:title" content="HealthTrack: Tu Calculadora de IMC Personalizada" />
        <meta property="og:description" content="Calcula tu IMC fácilmente y obtén consejos de salud con HealthTrack." />
        <meta property="og:image" content="/path-to-your-image.jpg" />
        <meta property="og:url" content="https://tu-dominio.com/healthtrack-imc" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className={styles.container}>
        <h1 className={styles.title}>HealthTrack: Tu Calculadora de IMC Personalizada</h1>
        <div className={styles.formGroup}>
          <label htmlFor="peso">Peso:</label>
          <div className={styles.inputWrapper}>
            <input
              id="peso"
              type="number"
              value={peso}
              onChange={(e) => setPeso(e.target.value)}
              placeholder={`Peso en ${unidadPeso}`}
              className={styles.input}
            />
            <select 
              value={unidadPeso} 
              onChange={(e) => setUnidadPeso(e.target.value)}
              className={styles.select}
            >
              <option value="kg">kg</option>
              <option value="lb">lb</option>
            </select>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="altura">Altura:</label>
          <div className={styles.inputWrapper}>
            <input
              id="altura"
              type="number"
              value={altura}
              onChange={(e) => setAltura(e.target.value)}
              placeholder={`Altura en ${unidadAltura}`}
              className={styles.input}
            />
            <select 
              value={unidadAltura} 
              onChange={(e) => setUnidadAltura(e.target.value)}
              className={styles.select}
            >
              <option value="cm">cm</option>
              <option value="in">in</option>
            </select>
          </div>
        </div>

        <button onClick={calcularIMC} className={styles.button}>Calcular IMC</button>

        {error && <p className={styles.error}>{error}</p>}

        {resultado && (
          <div className={styles.resultado}>
            <h2>Resultados</h2>
            <p>Tu IMC es: <strong>{resultado}</strong></p>
            <p className={styles.recomendacion}>{recomendacion}</p>
            <h2>Creada por Neuralcodelab.com</h2>
          </div>
        )}
      </div>
    </>
  );
}