import { motion, AnimatePresence } from 'framer-motion';
import { ExperiencePoint, VisualMode } from '../types';

interface InfoPanelProps {
  selectedPoint: ExperiencePoint | null;
  mode: VisualMode;
  onOpenSettings: () => void;
  isOpen: boolean;
  onClose: () => void;
}

const InfoPanel: React.FC<InfoPanelProps> = ({ selectedPoint, mode, onOpenSettings, isOpen, onClose }) => {
  const isDark = mode === 'abissal';
  const isClaudinho = mode === 'claudinho';
  
  // Dynamic styles based on theme
  const containerClass = isDark 
    ? "bg-[#0a1628]/60 border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.3)] text-white"
    : isClaudinho
    ? "bg-white/60 border-[#D1CFC9]/30 shadow-[0_8px_32px_rgba(0,0,0,0.05)] text-[#1A1A1A]"
    : "bg-white/80 border-ocean-deep/10 shadow-[0_0_30px_rgba(64,224,208,0.1)] text-ocean-deep";
  
  const subtitleClass = isDark ? "text-jelly-blue" : isClaudinho ? "text-[#1A1A1A]/50" : "text-ocean-deep/60";
  const bodyTextClass = isDark ? "text-gray-200" : "text-gray-700";
  const boxClass = isDark ? "bg-white/5 border-white/10" : "bg-ocean-deep/5 border-ocean-deep/10";
  const boxTitleClass = isDark ? "text-jelly-turquoise" : "text-ocean-deep";
  const highlightBoxClass = isDark ? "bg-gradient-to-br from-jelly-turquoise/20 to-transparent border-jelly-turquoise/30" : "bg-gradient-to-br from-jelly-turquoise/10 to-transparent border-jelly-turquoise/20";
  const highlightTextClass = isDark ? "text-jelly-aqua" : "text-teal-700";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ x: '-100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className={`fixed left-0 top-0 bottom-0 w-80 md:w-96 border-r backdrop-blur-2xl p-8 overflow-y-auto z-40 transition-colors duration-500 ${containerClass}`}
        >
          {/* Close Button Inside Drawer */}
          <button 
            onClick={onClose}
            className="absolute right-6 top-8 text-2xl opacity-40 hover:opacity-100 hover:scale-110 transition-all z-30"
          >
            ✕
          </button>

          {/* Header */}
          <div className={`mb-8 border-b pb-6 relative ${isDark ? 'border-white/10' : 'border-gray-200/50'}`}>
            <button 
              onClick={onOpenSettings}
              className="absolute right-10 top-1 w-8 h-8 rounded-full flex items-center justify-center hover:bg-black/5 transition-colors opacity-40 hover:opacity-100 z-20"
              title="Configurações"
            >
              ⚙️
            </button>
            <h1 className={`font-serif text-3xl italic font-semibold mb-2 ${isClaudinho ? 'text-[#1A1A1A]' : 'text-transparent bg-clip-text bg-gradient-to-r from-jelly-turquoise to-jelly-lavender'}`}>
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
                <strong className={isDark ? "text-jelly-aqua" : isClaudinho ? "text-[#1A1A1A]" : "text-teal-600"}>Bem-vindo à Espiral.</strong> Este modelo didático visualiza a obra de Bruna de Paula Moura da Silva.
              </p>
              <p>
                A <strong>Corporeitura</strong> é uma leitura colaborativa entre-linguagens. Não é apenas ler o texto, mas ler com o corpo inteiro, onde a dança encontra a literatura de Clarice Lispector.
              </p>
              
              <div className="mt-6">
                <h3 className={`font-serif text-lg mb-2 ${isDark ? 'text-jelly-lavender' : isClaudinho ? 'text-[#1A1A1A]' : 'text-purple-600'}`}>Tempo Espiralar</h3>
                <p className={`text-xs mb-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  Conceito de Leda Maria Martins.
                </p>
                <p>
                  Diferente da linha reta (passado-presente-futuro), a espiral acumula experiência. Nada se perde. O passado (ancestralidade) se enovela com o presente (instante-já) para criar o novo.
                </p>
              </div>

              <div className="mt-6">
                <h3 className={`font-serif text-lg mb-2 ${isDark ? 'text-jelly-pink' : isClaudinho ? 'text-[#1A1A1A]' : 'text-pink-600'}`}>Água Viva</h3>
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
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InfoPanel;