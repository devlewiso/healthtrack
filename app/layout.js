import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="author" content="Tu nombre" />
        <meta name="description" content="Calculadora de IMC para conocer tu índice de masa corporal y recomendaciones de salud." />
        <link rel="canonical" href="https://tu-dominio.com" />
        <meta property="og:title" content="Calculadora de IMC" />
        <meta property="og:description" content="Calcula tu índice de masa corporal con nuestra herramienta." />
        <meta property="og:image" content="https://tu-dominio.com/imagen-og.jpg" />
        <meta property="og:url" content="https://tu-dominio.com" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
