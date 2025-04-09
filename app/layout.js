import Header from './components/header'; // Asegúrate de que la ruta sea correcta
import SubHeader from './components/subheader';
import Footer from './components/footer';
import Script from 'next/script';

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="author" content="Iran Trinidad" />
        <meta name="description" content="Calculadora de IMC para conocer tu índice de masa corporal y recomendaciones de salud." />
        <link rel="canonical" href="https://healthtrackfit.netlify.app/" />
        <meta property="og:title" content="Calculadora de IMC" />
        <meta property="og:description" content="Calcula tu índice de masa corporal con nuestra herramienta." />
        <meta property="og:image" content="https://tu-dominio.com/imagen-og.jpg" />
        <meta property="og:url" content="https://healthtrackfit.netlify.app/" />
        
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-WRJ202WNE7"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-WRJ202WNE7');
          `}
        </Script>
      </head>
      <body>
        <SubHeader />
        <Header /> {/* Aquí se agrega el Header */}
        {children}  
        <Footer /> {/* Aquí se agrega el Footer */}
      </body>
    </html>
  );
}
