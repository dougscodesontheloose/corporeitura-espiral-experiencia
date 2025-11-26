
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SPIRAL_STAGES } from '../constants';

interface CarouselOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
}

const CarouselOverlay: React.FC<CarouselOverlayProps> = ({ isOpen, onClose, isDarkMode }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!isOpen) return null;

  const nextSlide = () => {
    if (currentIndex < SPIRAL_STAGES.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onClose();
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Styles based on theme
  const bgOverlay = isDarkMode ? "bg-ocean-deep/90" : "bg-white/90";
  const cardBg = isDarkMode ? "bg-[#0a1628]/80 border-white/10" : "bg-white/80 border-ocean-deep/10";
  const textColor = isDarkMode ? "text-white" : "text-ocean-deep";
  const subTextColor = isDarkMode ? "text-gray-300" : "text-gray-600";

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center ${bgOverlay} backdrop-blur-sm transition-colors duration-500`}>
      <div className="relative w-full max-w-2xl px-4">
        
        {/* Progress Bar */}
        <div className="absolute top-[-40px] left-4 right-4 flex gap-2 justify-center">
          {SPIRAL_STAGES.map((_, idx) => (
            <div 
              key={idx}
              className={`h-1 rounded-full transition-all duration-300 ${
                idx === currentIndex 
                  ? `w-8 ${isDarkMode ? 'bg-jelly-turquoise' : 'bg-teal-500'}` 
                  : `w-2 ${isDarkMode ? 'bg-white/20' : 'bg-black/10'}`
              }`}
            />
          ))}
        </div>

        <div className={`relative overflow-hidden rounded-2xl border shadow-2xl ${cardBg} p-8 md:p-12 min-h-[400px] flex flex-col justify-center items-center text-center`}>
          
          <AnimatePresence mode='wait'>
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center"
            >
              {/* Color Dot */}
              <div 
                className="w-6 h-6 rounded-full mb-6 shadow-[0_0_15px]"
                style={{ 
                  backgroundColor: SPIRAL_STAGES[currentIndex].color,
                  boxShadow: `0 0 20px ${SPIRAL_STAGES[currentIndex].color}`
                }}
              />

              <h2 className={`text-4xl md:text-5xl font-serif font-bold mb-6 ${textColor}`}>
                {SPIRAL_STAGES[currentIndex].title}
              </h2>

              <p className={`text-lg md:text-xl leading-relaxed max-w-lg ${subTextColor}`}>
                {SPIRAL_STAGES[currentIndex].desc}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex items-center gap-4 mt-12 w-full justify-between">
            <button 
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                currentIndex === 0 
                  ? 'opacity-0 cursor-default' 
                  : isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-black'
              }`}
            >
              Voltar
            </button>

            <div className="flex gap-3">
              <button
                onClick={onClose}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-widest transition-colors ${
                  isDarkMode ? 'text-gray-500 hover:text-white' : 'text-gray-400 hover:text-black'
                }`}
              >
                Pular
              </button>
              
              <button 
                onClick={nextSlide}
                className={`px-8 py-3 rounded-full font-bold shadow-lg transition-transform hover:scale-105 active:scale-95 ${
                  isDarkMode 
                    ? 'bg-gradient-to-r from-jelly-turquoise to-jelly-blue text-ocean-deep' 
                    : 'bg-gradient-to-r from-teal-500 to-blue-500 text-white'
                }`}
              >
                {currentIndex === SPIRAL_STAGES.length - 1 ? 'Explorar Espiral' : 'Próximo'}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CarouselOverlay;
