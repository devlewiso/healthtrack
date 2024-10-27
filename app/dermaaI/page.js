"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Camera } from "lucide-react";
import '../styles/dermaAI.css';

export default function Home() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [capturing, setCapturing] = useState(false);
  const [queryCount, setQueryCount] = useState(0);
  const [showDonationPrompt, setShowDonationPrompt] = useState(false);
  const [showChatOption, setShowChatOption] = useState(false);
  const videoRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
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
          setImage(new File([blob], "captured.png", { type: "image/png" }));
          setCapturing(false);
          if (videoRef.current?.srcObject instanceof MediaStream) {
            videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
          }
        }
      });
    }
  };

  const analyzeRash = async () => {
    if (!image) return;

    if (queryCount >= 5) {
      setShowDonationPrompt(true);
      return;
    }

    setLoading(true);
    setResult(null);
    setShowChatOption(false);

    const genAI = new GoogleGenerativeAI("AIzaSyBwCbo-MSfk0ycgHQx7NN9sw7YZK60Vntc");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    try {
      const imageBytes = await image.arrayBuffer();

      const result = await model.generateContent([
        "Identifica esta erupción cutánea y proporciona información relevante sobre ella en español.",
        {
          inlineData: {
            data: Buffer.from(imageBytes).toString("base64"),
            mimeType: image.type,
          },
        },
      ]);

      if (result.response) {
        setResult(result.response.text());
        setQueryCount(queryCount + 1);

        // Mostrar opción de chat si la respuesta contiene información relevante
        if (result.response.text().includes("sugerencia") || result.response.text().includes("dermatólogo")) {
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
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-red-600 text-white p-4">
        <h1 className="text-3xl font-bold">DermAI - Análisis de Erupciones</h1>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 text-red-700">
            DermAI - Identificador de Erupciones Cutáneas
          </h1>
          <p className="text-xl text-gray-700">
            Analiza tu piel con IA y obtén orientación profesional.
          </p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
          {capturing ? (
            <>
              <video ref={videoRef} className="w-full rounded-lg mb-4" />
              <button
                onClick={takePhoto}
                className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors w-full mb-4"
              >
                Capturar Foto
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors mb-4 w-full"
              >
                Elegir Imagen
              </button>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                ref={fileInputRef}
              />
              <button
                onClick={handleCapture}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors mb-4 w-full"
              >
                Usar Cámara
              </button>
            </>
          )}
          {image && (
            <div className="mb-4">
              <Image
                src={URL.createObjectURL(image)}
                alt="Erupción cargada"
                width={300}
                height={300}
                className="rounded-lg mx-auto"
              />
            </div>
          )}
          <button
            onClick={analyzeRash}
            disabled={!image || loading}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors w-full"
          >
            {loading ? "Analizando..." : "Analizar Erupción"}
          </button>
          {result && (
            <div className="mt-8 p-6 bg-white rounded-lg shadow-lg">
              <h2 className="text-2xl font-semibold mb-4 text-red-700">
                Resultado:
              </h2>
              <p className="text-lg mb-4">{result}</p>
              {showChatOption && (
                <button
                  onClick={handleChat}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors mt-4"
                >
                  Hablar con un especialista
                </button>
              )}
            </div>
          )}
          {showDonationPrompt && (
            <div className="mt-8 p-6 bg-yellow-100 rounded-lg shadow-lg text-center">
              <p className="text-lg font-semibold mb-4">
                ¡Gracias por usar nuestra aplicación!
              </p>
              <p className="text-gray-600 mb-4">
                Hemos notado que has usado el servicio varias veces. Si te ha sido útil, considera apoyarnos en Patreon.
              </p>
              <a
                href="https://www.patreon.com/neuralcodelab"
                className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Apóyanos
              </a>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
