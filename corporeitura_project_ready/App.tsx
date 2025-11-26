import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import Spiral3D from './components/Spiral3D';
import InfoPanel from './components/InfoPanel';
import { ExperiencePoint } from './types';

const App: React.FC = () => {
  const [selectedPoint, setSelectedPoint] = useState<ExperiencePoint | null>(null);
  // Zoom state: 0 = Far (Overview), 100 = Close (Detail)
  const [zoom, setZoom] = useState<number>(30);

  return (
    <div className="relative w-full h-screen bg-ocean-deep overflow-hidden">
      {/* Radial Gradient Background for Depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#1a2c4e_0%,_#0a1628_100%)] z-0 pointer-events-none" />

      {/* 3D Scene */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 20, 5], fov: 45 }}>
          <Suspense fallback={null}>
            <Spiral3D 
              onPointClick={setSelectedPoint} 
              zoomLevel={zoom}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* UI Overlay */}
      <InfoPanel selectedPoint={selectedPoint} />

      {/* Zoom Control Slider */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-8 w-64 p-4 rounded-xl border border-white/10 bg-[#0a1628]/60 backdrop-blur-md shadow-[0_0_20px_rgba(64,224,208,0.1)] z-20 flex flex-col gap-2">
        <div className="flex justify-between text-[10px] uppercase tracking-widest font-semibold text-jelly-turquoise">
          <span>Visão Geral</span>
          <span>Detalhe</span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={zoom}
          onChange={(e) => setZoom(Number(e.target.value))}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
        />
      </div>

      {/* Reset Button (Only visible when a point is selected) */}
      {selectedPoint && (
        <button 
          onClick={() => setSelectedPoint(null)}
          className="fixed bottom-28 right-8 px-6 py-3 bg-gradient-to-r from-jelly-turquoise to-jelly-blue rounded-full shadow-[0_0_20px_rgba(64,224,208,0.4)] text-ocean-deep font-bold text-sm hover:scale-105 transition-transform z-20"
        >
          Voltar à Visão Geral
        </button>
      )}

      {/* Author Credit */}
      <div className="fixed bottom-4 right-4 text-white/20 text-[10px] pointer-events-none z-10 hidden md:block">
        Baseado na obra de Bruna de Paula Moura da Silva
      </div>
    </div>
  );
};

export default App;