import React from 'react';
import { ExperiencePoint } from '../types';

interface InfoPanelProps {
  selectedPoint: ExperiencePoint | null;
}

const InfoPanel: React.FC<InfoPanelProps> = ({ selectedPoint }) => {
  return (
    <div className="fixed left-4 top-4 bottom-4 w-80 md:w-96 rounded-2xl border border-white/20 bg-[#0a1628]/60 backdrop-blur-lg shadow-[0_0_30px_rgba(64,224,208,0.1)] p-6 overflow-y-auto text-white z-10 transition-all duration-500">
      
      {/* Header */}
      <div className="mb-8 border-b border-white/10 pb-4">
        <h1 className="font-serif text-3xl italic font-semibold text-transparent bg-clip-text bg-gradient-to-r from-jelly-turquoise to-jelly-lavender mb-2">
          Corporeitura
        </h1>
        <p className="text-jelly-blue text-xs uppercase tracking-widest font-semibold">
          Literatura e Dança em <br/> "Água Viva"
        </p>
      </div>

      {/* Dynamic Content based on Selection */}
      {selectedPoint ? (
        <div className="animate-fade-in">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-3 h-3 rounded-full shadow-[0_0_10px]" style={{ backgroundColor: selectedPoint.color, boxShadow: `0 0 10px ${selectedPoint.color}` }}></div>
            <h2 className="text-xl font-bold text-white">{selectedPoint.label}</h2>
          </div>
          <p className="text-jelly-blue/90 leading-relaxed mb-6 text-sm">
            {selectedPoint.description}
          </p>
          <div className="p-4 rounded-lg bg-white/5 border border-white/10">
            <h3 className="text-jelly-turquoise text-xs font-bold uppercase mb-2">Conceito Relacionado</h3>
            <p className="text-xs text-gray-300 italic">
              "Cada volta da espiral traz experiências amadurecidas pelo contato com as outras... assim nasce a Corporeitura."
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-6 text-sm text-gray-200 leading-relaxed">
          <p>
            <strong className="text-jelly-aqua">Bem-vindo à Espiral.</strong> Este modelo didático visualiza a obra de Bruna de Paula Moura da Silva.
          </p>
          <p>
            A <strong>Corporeitura</strong> é uma leitura colaborativa entre-linguagens. Não é apenas ler o texto, mas ler com o corpo inteiro, onde a dança encontra a literatura de Clarice Lispector.
          </p>
          
          <div className="mt-6">
            <h3 className="font-serif text-lg text-jelly-lavender mb-2">Tempo Espiralar</h3>
            <p className="text-gray-400 text-xs mb-2">
              Conceito de Leda Maria Martins.
            </p>
            <p>
              Diferente da linha reta (passado-presente-futuro), a espiral acumula experiência. Nada se perde. O passado (ancestralidade) se enovela com o presente (instante-já) para criar o novo.
            </p>
          </div>

          <div className="mt-6">
            <h3 className="font-serif text-lg text-jelly-pink mb-2">Água Viva</h3>
            <p>
              A estética fluida e bioluminescente reflete a obra de Clarice. Um organismo vivo, em constante movimento, sem molduras rígidas.
            </p>
          </div>

          <div className="mt-8 p-4 bg-gradient-to-br from-jelly-turquoise/20 to-transparent rounded-xl border border-jelly-turquoise/30">
            <p className="text-xs text-center text-jelly-aqua">
              Clique nos pontos da espiral para explorar os estágios da experiência.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default InfoPanel;