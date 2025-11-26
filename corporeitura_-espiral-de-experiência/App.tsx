
import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import Spiral3D from './components/Spiral3D';
import InfoPanel from './components/InfoPanel';
import CarouselOverlay from './components/CarouselOverlay';
import { ExperiencePoint } from './types';

const App: React.FC = () => {
  const [selectedPoint, setSelectedPoint] = useState<ExperiencePoint | null>(null);
  const [zoom, setZoom] = useState<number>(30);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [showCarousel, setShowCarousel] = useState<boolean>(true);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <div className={`relative w-full h-screen overflow-hidden transition-colors duration-700 ${isDarkMode ? 'bg-ocean-deep' : 'bg-jelly-blue/20'}`}>
      
      {/* Intro Carousel */}
      <CarouselOverlay 
        isOpen={showCarousel} 
        onClose={() => setShowCarousel(false)} 
        isDarkMode={isDarkMode}
      />

      {/* Radial Gradient Background for Depth - Dynamic based on theme */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-700"
        style={{
          background: isDarkMode 
            ? 'radial-gradient(circle at center, #1a2c4e 0%, #0a1628 100%)' 
            : 'radial-gradient(circle at center, #ffffff 0%, #e0f7fa 100%)'
        }}
      />

      {/* 3D Scene */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 20, 5], fov: 45 }}>
          <Suspense fallback={null}>
            <Spiral3D 
              onPointClick={setSelectedPoint} 
              zoomLevel={zoom}
              isDarkMode={isDarkMode}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* UI Overlay - Only visible if carousel is closed */}
      {!showCarousel && (
        <>
          <InfoPanel selectedPoint={selectedPoint} isDarkMode={isDarkMode} />

          {/* Controls Container (Zoom + Theme Toggle + Carousel Trigger) */}
          <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-8 w-72 p-4 rounded-xl border backdrop-blur-md shadow-lg z-20 flex flex-col gap-4 transition-all duration-500 ${
            isDarkMode 
              ? 'border-white/10 bg-[#0a1628]/60 shadow-[0_0_20px_rgba(64,224,208,0.1)]' 
              : 'border-ocean-deep/10 bg-white/60 shadow-[0_0_20px_rgba(64,224,208,0.2)]'
          }`}>
            
            {/* Top Row Controls */}
            <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)' }}>
              <button 
                onClick={() => setShowCarousel(true)}
                className={`text-xs font-bold uppercase tracking-widest px-2 hover:underline ${isDarkMode ? 'text-jelly-turquoise' : 'text-teal-600'}`}
              >
                📖 Guia
              </button>

              <button 
                onClick={toggleTheme}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                  isDarkMode 
                    ? 'bg-white/10 text-white hover:bg-white/20' 
                    : 'bg-ocean-deep/10 text-ocean-deep hover:bg-ocean-deep/20'
                }`}
              >
                {isDarkMode ? '🌙 Abissal' : '☀️ Raso'}
              </button>
            </div>

            {/* Zoom Slider */}
            <div className="flex flex-col gap-2">
              <div className={`flex justify-between text-[10px] uppercase tracking-widest font-semibold ${isDarkMode ? 'text-jelly-turquoise' : 'text-ocean-deep/70'}`}>
                <span>Visão Geral</span>
                <span>Detalhe</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: isDarkMode ? 'rgba(75, 85, 99, 0.5)' : 'rgba(200, 200, 200, 0.5)'
                }}
              />
            </div>
          </div>

          {/* Reset Button (Only visible when a point is selected) */}
          {selectedPoint && (
            <button 
              onClick={() => setSelectedPoint(null)}
              className="fixed bottom-44 right-8 md:bottom-48 md:right-8 px-6 py-3 bg-gradient-to-r from-jelly-turquoise to-jelly-blue rounded-full shadow-[0_0_20px_rgba(64,224,208,0.4)] text-ocean-deep font-bold text-sm hover:scale-105 transition-transform z-20"
            >
              Voltar à Visão Geral
            </button>
          )}

          {/* Author Credit */}
          <div className={`fixed bottom-4 right-4 text-[10px] pointer-events-none z-10 hidden md:block ${isDarkMode ? 'text-white/20' : 'text-ocean-deep/40'}`}>
            Baseado na obra de Bruna de Paula Moura da Silva
          </div>
        </>
      )}
    </div>
  );
};

export default App;
