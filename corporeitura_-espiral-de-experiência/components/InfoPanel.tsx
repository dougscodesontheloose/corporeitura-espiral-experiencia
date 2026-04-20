import React from 'react';
import { ExperiencePoint } from '../types';

interface InfoPanelProps {
  selectedPoint: ExperiencePoint | null;
  isDarkMode: boolean;
}

const InfoPanel: React.FC<InfoPanelProps> = ({ selectedPoint, isDarkMode }) => {
  
  // Dynamic styles based on theme
  const containerClass = isDarkMode 
    ? "bg-[#0a1628]/60 border-white/20 shadow-[0_0_30px_rgba(64,224,208,0.1)] text-white"
    : "bg-white/60 border-ocean-deep/10 shadow-[0_0_30px_rgba(64,224,208,0.2)] text-ocean-deep";
  
  const subtitleClass = isDarkMode ? "text-jelly-blue" : "text-ocean-deep/60";
  const bodyTextClass = isDarkMode ? "text-gray-200" : "text-gray-700";
  const boxClass = isDarkMode ? "bg-white/5 border-white/10" : "bg-ocean-deep/5 border-ocean-deep/10";
  const boxTitleClass = isDarkMode ? "text-jelly-turquoise" : "text-ocean-deep";
  const highlightBoxClass = isDarkMode ? "bg-gradient-to-br from-jelly-turquoise/20 to-transparent border-jelly-turquoise/30" : "bg-gradient-to-br from-jelly-turquoise/10 to-transparent border-jelly-turquoise/20";
  const highlightTextClass = isDarkMode ? "text-jelly-aqua" : "text-teal-700";

  return (
    <div className={`fixed left-4 top-4 bottom-4 w-80 md:w-96 rounded-2xl border backdrop-blur-lg p-6 overflow-y-auto z-10 transition-all duration-500 ${containerClass}`}>
      
      {/* Header */}
      <div className={`mb-8 border-b pb-4 ${isDarkMode ? 'border-white/10' : 'border-ocean-deep/10'}`}>
        <h1 className="font-serif text-3xl italic font-semibold text-transparent bg-clip-text bg-gradient-to-r from-jelly-turquoise to-jelly-lavender mb-2">
          Corporeitura
        </h1>
        <p className={`text-xs uppercase tracking-widest font-semibold ${subtitleClass}`}>
          Literatura e Dança em <br/> "Água Viva"
        </p>
      </div>

      {/* Dynamic Content based on Selection */}
      {selectedPoint ? (
        <div className="animate-fade-in">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-3 h-3 rounded-full shadow-[0_0_10px]" style={{ backgroundColor: selectedPoint.color, boxShadow: `0 0 10px ${selectedPoint.color}` }}></div>
            <h2 className="text-xl font-bold">{selectedPoint.label}</h2>
          </div>
          <p className={`leading-relaxed mb-6 text-sm ${bodyTextClass}`}>
            {selectedPoint.description}
          </p>
          <div className={`p-4 rounded-lg border ${boxClass}`}>
            <h3 className={`text-xs font-bold uppercase mb-2 ${boxTitleClass}`}>Conceito Relacionado</h3>
            <p className="text-xs italic opacity-80">
              "Cada volta da espiral traz experiências amadurecidas pelo contato com as outras... assim nasce a Corporeitura."
            </p>
          </div>
        </div>
      ) : (
        <div className={`space-y-6 text-sm leading-relaxed ${bodyTextClass}`}>
          <p>
            <strong className={isDarkMode ? "text-jelly-aqua" : "text-teal-600"}>Bem-vindo à Espiral.</strong> Este modelo didático visualiza a obra de Bruna de Paula Moura da Silva.
          </p>
          <p>
            A <strong>Corporeitura</strong> é uma leitura colaborativa entre-linguagens. Não é apenas ler o texto, mas ler com o corpo inteiro, onde a dança encontra a literatura de Clarice Lispector.
          </p>
          
          <div className="mt-6">
            <h3 className={`font-serif text-lg mb-2 ${isDarkMode ? 'text-jelly-lavender' : 'text-purple-600'}`}>Tempo Espiralar</h3>
            <p className={`text-xs mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Conceito de Leda Maria Martins.
            </p>
            <p>
              Diferente da linha reta (passado-presente-futuro), a espiral acumula experiência. Nada se perde. O passado (ancestralidade) se enovela com o presente (instante-já) para criar o novo.
            </p>
          </div>

          <div className="mt-6">
            <h3 className={`font-serif text-lg mb-2 ${isDarkMode ? 'text-jelly-pink' : 'text-pink-600'}`}>Água Viva</h3>
            <p>
              A estética fluida e bioluminescente reflete a obra de Clarice. Um organismo vivo, em constante movimento, sem molduras rígidas.
            </p>
          </div>

          <div className={`mt-8 p-4 rounded-xl border ${highlightBoxClass}`}>
            <p className={`text-xs text-center ${highlightTextClass}`}>
              Clique nos pontos da espiral para explorar os estágios da experiência.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default InfoPanel;