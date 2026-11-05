import React from 'react';
import { X, CheckCircle, Sparkles, ExternalLink } from 'lucide-react';

interface PhysicalMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PhysicalMenuModal: React.FC<PhysicalMenuModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Click outside backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-4xl bg-[#14141a] border border-[#27272e] rounded-2xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden z-10">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#27272e] bg-[#0e0e11] flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-[#e2ba60] font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Referência Físico vs. Digital</span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#f4f4f5]">
              Cardápio Físico Original da Magnífico
            </h3>
          </div>

          <button
            onClick={onClose}
            aria-label="Fechar"
            className="p-2 rounded-lg text-[#a1a1aa] hover:text-[#f4f4f5] hover:bg-[#1f1f28] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content: Image comparison & item check */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-6 no-scrollbar">
          
          {/* Photo viewer */}
          <div className="md:col-span-6 bg-[#0a0a0d] rounded-xl border border-[#27272e] overflow-hidden flex items-center justify-center p-2">
            <img
              src="/public/assets/aistudio/WhatsApp_Image_2026-11-04_at_21.31.16_34621082.jpeg"
              alt="Foto do cardápio físico original da Magnífico Burguer e Pizza"
              className="max-h-[65vh] w-auto object-contain rounded-lg shadow-md"
            />
          </div>

          {/* Translation into Digital Architecture */}
          <div className="md:col-span-6 space-y-4 text-xs sm:text-sm text-[#a1a1aa]">
            <div className="p-4 rounded-xl bg-[#1c1c24] border border-[#2e2e38] space-y-2">
              <h4 className="font-serif text-base font-bold text-[#f4f4f5] flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#e2ba60]" />
                100% dos Itens Mapeados
              </h4>
              <p className="text-xs text-[#a1a1aa] leading-relaxed">
                Todos os itens do cardápio impresso foram categorizados, enriquecidos com storytelling sensorial e organizados em fluxo de compra de alta conversão.
              </p>
            </div>

            <div className="space-y-3">
              <div className="border-l-2 border-[#c59b27] pl-3 py-1">
                <strong className="text-[#f4f4f5] block">1. Rodízio de Burguer Gourmet, Pizza Premium e Refri</strong>
                <span className="text-xs text-[#71717a]">
                  Elevado a produto flagship "Rodízio Magnífico Experience" com chamada no Hero e nos Favoritos.
                </span>
              </div>

              <div className="border-l-2 border-[#c59b27] pl-3 py-1">
                <strong className="text-[#f4f4f5] block">2. Entradas Especiais</strong>
                <span className="text-xs text-[#71717a]">
                  Batata, Batata com Bacon, Batata com Cheddar, Onion Rings, Polenta, Mandioca, Coxinha e Pão de Queijo Frito.
                </span>
              </div>

              <div className="border-l-2 border-[#c59b27] pl-3 py-1">
                <strong className="text-[#f4f4f5] block">3. Burguer Gourmet</strong>
                <span className="text-xs text-[#71717a]">
                  Tradicional, Pepper, Bacon, Catupiry, Salada, Cheddar e Gorgonzola (com ponto da carne selecionável).
                </span>
              </div>

              <div className="border-l-2 border-[#c59b27] pl-3 py-1">
                <strong className="text-[#f4f4f5] block">4. Pizzas Salgadas & Especiais</strong>
                <span className="text-xs text-[#71717a]">
                  Atum, Bacon, Baiana, Beringela, Brócolis, Moda do Chefe, Calabresa Especial, Escarola, Marguerita, Palmito, Pepperoni, Quatro Queijos, Rúcula e mais.
                </span>
              </div>

              <div className="border-l-2 border-[#c59b27] pl-3 py-1">
                <strong className="text-[#f4f4f5] block">5. Pizzas Doces & Sobremesas</strong>
                <span className="text-xs text-[#71717a]">
                  Chocolate, Ninho, Banana Magnífico e Chocolate ao Leite.
                </span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onClose}
                className="w-full py-2.5 px-4 rounded-lg bg-[#c59b27] hover:bg-[#d4af37] text-[#0e0e11] font-semibold text-xs tracking-wide transition-colors"
              >
                Voltar e Interagir com o Cardápio Digital
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
