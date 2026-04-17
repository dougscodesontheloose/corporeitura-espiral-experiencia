import React, { useState, Suspense, useMemo, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion, AnimatePresence } from 'framer-motion';
import Spiral3D from './components/Spiral3D';
import InfoPanel from './components/InfoPanel';
import CarouselOverlay from './components/CarouselOverlay';
import { ExperiencePoint, VisualMode } from './types';
import { SPIRAL_STAGES } from './constants';
import './index.css';

const App: React.FC = () => {
  const [selectedPoint, setSelectedPoint] = useState<ExperiencePoint | null>(null);
  const [zoom, setZoom] = useState<number>(30);
  const [mode, setMode] = useState<VisualMode>('abissal');
  const [showCarousel, setShowCarousel] = useState<boolean>(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isInfoOpen, setIsInfoOpen] = useState<boolean>(false);
  const [visibleStages, setVisibleStages] = useState<string[]>(SPIRAL_STAGES.map(s => s.title));
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') setDeferredPrompt(null);
  };

  const isDark = mode === 'abissal';
  const isClaudinho = mode === 'claudinho';

  const toggleStage = (title: string) => {
    setVisibleStages(prev => 
      prev.includes(title) ? prev.filter(t => t !== title) : [...prev, title]
    );
  };

  const handlePointClick = (point: ExperiencePoint) => {
    setSelectedPoint(point);
    setIsInfoOpen(true);
  };

  // Theme-specific backgrounds
  const backgroundStyle = useMemo(() => {
    switch(mode) {
      case 'abissal': return 'radial-gradient(circle at center, #1a2c4e 0%, #0a1628 100%)';
      case 'raso': return 'radial-gradient(circle at center, #ffffff 0%, #e0f7fa 100%)';
      case 'claudinho': return 'radial-gradient(circle at center, #FDFCFB 0%, #F2F0EB 100%)';
      default: return '';
    }
  }, [mode]);

  return (
    <div className={`relative w-full h-screen overflow-hidden transition-colors duration-700 ${isDark ? 'bg-ocean-deep' : isClaudinho ? 'bg-[#F2F0EB]' : 'bg-jelly-blue/20'}`}>
      
      {/* Intro Carousel */}
      <CarouselOverlay 
        isOpen={showCarousel} 
        onClose={() => setShowCarousel(false)} 
        mode={mode}
      />

      {/* Radial Gradient Background for Depth */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none transition-all duration-700"
        style={{ background: backgroundStyle }}
      />

      {/* 3D Scene */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 20, 5], fov: 45 }}>
          <Suspense fallback={null}>
            <Spiral3D 
              onPointClick={handlePointClick} 
              zoomLevel={zoom}
              mode={mode}
              visibleStages={visibleStages}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* UI Overlay - Only visible if carousel is closed */}
      {!showCarousel && (
        <>
          <InfoPanel 
            selectedPoint={selectedPoint} 
            mode={mode} 
            isOpen={isInfoOpen}
            onClose={() => setIsInfoOpen(false)}
            onOpenSettings={() => setIsDrawerOpen(true)}
          />

          {/* Info Toggle Button (Left) */}
          <button
            onClick={() => setIsInfoOpen(true)}
            className={`fixed bottom-8 left-8 w-14 h-14 rounded-full border backdrop-blur-xl shadow-2xl z-30 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 ${
              isInfoOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
            } ${
              isDark 
                ? 'border-white/10 bg-[#0a1628]/40 text-jelly-blue' 
                : isClaudinho
                ? 'border-[#D1CFC9]/30 bg-white/40 text-[#1A1A1A]'
                : 'border-ocean-deep/10 bg-white/60 text-ocean-deep'
            }`}
          >
            <span className="text-xl">📖</span>
          </button>

          {/* Drawer Trigger Button (Right) */}
          <button
            onClick={() => setIsDrawerOpen(true)}
            className={`fixed bottom-8 right-8 w-14 h-14 rounded-full border backdrop-blur-xl shadow-2xl z-30 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 ${
              isDrawerOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
            } ${
              isDark 
                ? 'border-white/10 bg-[#0a1628]/40 text-jelly-turquoise' 
                : isClaudinho
                ? 'border-[#D1CFC9]/30 bg-white/40 text-[#1A1A1A]'
                : 'border-ocean-deep/10 bg-white/60 text-ocean-deep'
            }`}
          >
            <span className="text-xl">⚙️</span>
          </button>

          {/* ... AnimatePresence for isDrawerOpen remains ... */}
          <AnimatePresence>
            {isDrawerOpen && (
              <>
                {/* Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsDrawerOpen(false)}
                  className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-40"
                />

                {/* Drawer Content */}
                <motion.div
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '100%' }}
                  transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                  className={`fixed top-0 right-0 bottom-0 w-80 md:w-96 border-l backdrop-blur-2xl shadow-[-20px_0_50px_rgba(0,0,0,0.1)] z-50 p-8 flex flex-col gap-10 transition-colors duration-500 ${
                    isDark 
                      ? 'border-white/10 bg-[#0a1628]/60 text-white' 
                      : isClaudinho
                      ? 'border-[#D1CFC9]/30 bg-white/60 text-[#1A1A1A]'
                      : 'border-ocean-deep/10 bg-white/80 text-ocean-deep'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <h2 className="text-sm font-bold uppercase tracking-[0.3em] opacity-50">Configurações</h2>
                    <button onClick={() => setIsDrawerOpen(false)} className="text-2xl hover:scale-110 transition-transform">✕</button>
                  </div>

                  {/* Mode Selector */}
                  <div className="flex flex-col gap-4">
                    <h3 className="text-[10px] font-bold uppercase tracking-widest opacity-40">Modo Visual</h3>
                    <div className={`flex p-1 rounded-xl h-10 ${isDark ? 'bg-white/5' : 'bg-black/5'}`}>
                      {(['abissal', 'raso', 'claudinho'] as VisualMode[]).map((m) => (
                        <button
                          key={m}
                          onClick={() => setMode(m)}
                          className={`flex-1 flex items-center justify-center text-[10px] font-bold uppercase tracking-tight transition-all duration-300 rounded-lg ${
                            mode === m 
                              ? isDark 
                                ? 'bg-white/20 text-white shadow-sm' 
                                : isClaudinho
                                ? 'bg-white text-[#1A1A1A] shadow-md'
                                : 'bg-ocean-deep text-white shadow-sm'
                              : 'text-gray-500 hover:text-gray-400'
                          }`}
                        >
                          {m === 'claudinho' ? 'Claude' : m}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Layer Toggles */}
                  <div className="flex flex-col gap-4">
                    <h3 className="text-[10px] font-bold uppercase tracking-widest opacity-40">Camadas da Espiral</h3>
                    <div className="grid grid-cols-1 gap-2">
                      {SPIRAL_STAGES.map((stage) => (
                        <button
                          key={stage.title}
                          onClick={() => toggleStage(stage.title)}
                          className={`flex items-center justify-between p-3 rounded-xl border transition-all duration-300 ${
                            visibleStages.includes(stage.title)
                              ? isDark 
                                ? 'bg-white/10 border-white/20 text-white' 
                                : isClaudinho
                                ? 'bg-[#1A1A1A] border-[#1A1A1A] text-white'
                                : 'bg-ocean-deep border-ocean-deep text-white'
                              : isDark
                              ? 'bg-transparent border-white/5 text-white/30'
                              : 'bg-transparent border-black/5 text-black/20'
                          }`}
                        >
                          <span className="text-xs font-medium">{stage.title}</span>
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                            visibleStages.includes(stage.title) ? 'bg-current border-transparent' : 'border-current'
                          }`}>
                            {visibleStages.includes(stage.title) && <span className="text-[8px]">✓</span>}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Zoom Slider */}
                  <div className="flex flex-col gap-4 mt-auto">
                    <h3 className="text-[10px] font-bold uppercase tracking-widest opacity-40">Escala (Macro/Micro)</h3>
                    <div className="flex flex-col gap-3">
                      <div className={`flex justify-between text-[9px] uppercase tracking-[0.2em] font-bold opacity-40`}>
                        <span>Macro</span>
                        <span>Micro</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={zoom}
                        onChange={(e) => setZoom(Number(e.target.value))}
                        className={`w-full h-1 rounded-full appearance-none cursor-pointer accent-current ${isDark ? 'bg-white/10' : 'bg-black/10'}`}
                      />
                    </div>
                  </div>

                  {/* Secondary Actions */}
                  <div className="flex flex-col gap-4 pt-6 border-t border-black/5">
                    <button 
                      onClick={() => { setShowCarousel(true); setIsDrawerOpen(false); }}
                      className={`text-[10px] font-bold uppercase tracking-widest hover:underline text-left ${isDark ? 'text-jelly-turquoise' : isClaudinho ? 'text-[#1A1A1A]' : 'text-teal-600'}`}
                    >
                      📖 Abrir Guia de Leitura
                    </button>
                    {deferredPrompt && (
                      <button 
                        onClick={handleInstallClick}
                        className={`text-[10px] font-bold uppercase tracking-widest hover:underline text-left ${isDark ? 'text-jelly-turquoise' : isClaudinho ? 'text-[#1A1A1A]' : 'text-teal-600'}`}
                      >
                        📥 Instalar App p/ uso Offline
                      </button>
                    )}
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Reset Button (Only visible when a point is selected) */}
          {selectedPoint && (
            <button 
              onClick={() => { setSelectedPoint(null); setIsInfoOpen(false); }}
              className={`fixed bottom-28 right-8 px-8 py-3 rounded-full shadow-xl font-bold text-sm hover:scale-105 active:scale-95 transition-all z-20 ${
                isDark 
                  ? 'bg-gradient-to-r from-jelly-turquoise to-jelly-blue text-ocean-deep' 
                  : isClaudinho
                  ? 'bg-[#1A1A1A] text-white'
                  : 'bg-gradient-to-r from-teal-500 to-blue-500 text-white'
              }`}
            >
              Voltar à Espiral
            </button>
          )}

          <div className={`fixed bottom-4 left-1/2 -translate-x-1/2 text-[10px] pointer-events-none z-10 hidden md:block whitespace-nowrap ${isDark ? 'text-white/20' : 'text-black/20'}`}>
            Obra Original: Bruna de Paula Moura da Silva (2024)
          </div>
        </>
      )}
    </div>
  );
};

export default App;
