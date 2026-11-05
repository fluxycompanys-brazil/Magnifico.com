import React, { useState } from 'react';
import { X, BookOpen, Layers, Palette, Terminal, Sparkles, CheckCircle2, ChevronRight, MessageSquareText } from 'lucide-react';

interface DesignSpecModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DesignSpecModal: React.FC<DesignSpecModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'arquitetura' | 'componentes' | 'copywriting' | 'frontend'>('arquitetura');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Dimmed backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-5xl bg-[#14141a] border border-[#27272e] rounded-2xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden z-10">
        
        {/* Header */}
        <div className="p-5 border-b border-[#27272e] bg-[#0e0e11] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#c59b27]/20 border border-[#c59b27]/40 flex items-center justify-center text-[#e2ba60]">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#e2ba60] block">
                Diretoria de Arte & UX/UI Especializada
              </span>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#f4f4f5]">
                Especificação de Design: Magnífico Burger & Pizza
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Fechar especificações"
            className="p-2 rounded-lg text-[#a1a1aa] hover:text-[#f4f4f5] hover:bg-[#1f1f28] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 p-2 bg-[#101015] border-b border-[#27272e] overflow-x-auto no-scrollbar">
          {[
            { id: 'arquitetura', label: '1. Arquitetura & Fluxo', icon: Layers },
            { id: 'componentes', label: '2. Componentes UI & Visual', icon: Palette },
            { id: 'copywriting', label: '3. Copywriting Sensorial', icon: MessageSquareText },
            { id: 'frontend', label: '4. Diretrizes Frontend', icon: Terminal },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-lg text-xs font-semibold whitespace-nowrap flex items-center gap-2 transition-all ${
                  isActive
                    ? 'bg-[#c59b27] text-[#0e0e11] shadow-sm'
                    : 'text-[#a1a1aa] hover:text-[#f4f4f5] hover:bg-[#191921]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm text-[#d4d4d8] leading-relaxed no-scrollbar">
          
          {/* TAB 1: ARQUITETURA & FLUXO */}
          {activeTab === 'arquitetura' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-serif text-xl font-bold text-[#f4f4f5] mb-2">
                  1. Arquitetura da Informação & Jornada do Cliente de Alto Padrão
                </h3>
                <p className="text-[#a1a1aa] text-xs sm:text-sm">
                  A experiência de compra foi desenhada para emular o atendimento personalizado de um salão gastronômico sofisticado, reduzindo o esforço cognitivo do cliente e maximizando o Ticket Médio (AOV).
                </p>
              </div>

              {/* Journey Steps */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#181820] border border-[#27272e] space-y-2">
                  <span className="text-[11px] font-mono text-[#e2ba60] font-bold block">
                    ETAPA 01 · DESCOBERTA VISUAL
                  </span>
                  <h4 className="font-serif text-base font-bold text-[#f4f4f5]">
                    Hero Teaser & Favoritos da Casa
                  </h4>
                  <p className="text-xs text-[#a1a1aa]">
                    O usuário é recepcionado por iluminação de estúdio gastronômica com foco nos carros-chefes (Rodízio Magnífico e Burgers artesanais). Prova social imediata (avaliação 4.7★ com +1.200 reviews) valida a autoridade da marca antes de qualquer rolagem.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#181820] border border-[#27272e] space-y-2">
                  <span className="text-[11px] font-mono text-[#e2ba60] font-bold block">
                    ETAPA 02 · NAVEGAÇÃO THUMB-FRIENDLY
                  </span>
                  <h4 className="font-serif text-base font-bold text-[#f4f4f5]">
                    Barra de Categorias Sticky & Busca Dinâmica
                  </h4>
                  <p className="text-xs text-[#a1a1aa]">
                    Categorias exatas em rolagem horizontal sem scrollbars intrusivas. Respostas instantâneas a toques com debounce de busca (&lt;100ms) para quem já sabe exatamente o que deseja pedir.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#181820] border border-[#27272e] space-y-2">
                  <span className="text-[11px] font-mono text-[#e2ba60] font-bold block">
                    ETAPA 03 · PERSONALIZAÇÃO SENSORIAL
                  </span>
                  <h4 className="font-serif text-base font-bold text-[#f4f4f5]">
                    Modal de Detalhes Contíguo & Cross-selling
                  </h4>
                  <p className="text-xs text-[#a1a1aa]">
                    Cada item é acompanhado de texto sensorial detalhando ingredientes selecionados, pontos da carne, tamanhos de pizza e opcionais com cálculo em tempo real no rodapé fixo.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#181820] border border-[#27272e] space-y-2">
                  <span className="text-[11px] font-mono text-[#e2ba60] font-bold block">
                    ETAPA 04 · CHECKOUT EM DRAWER
                  </span>
                  <h4 className="font-serif text-base font-bold text-[#f4f4f5]">
                    Carrinho Lateral & Disparo WhatsApp / PIX
                  </h4>
                  <p className="text-xs text-[#a1a1aa]">
                    Carrinho transparente com alternância entre 'Delivery' e 'Consumo na Mesa'. Fechamento ágil com cálculo de taxa de entrega, cópia de chave Pix instantânea e integração com WhatsApp.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: COMPONENTES UI */}
          {activeTab === 'componentes' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-serif text-xl font-bold text-[#f4f4f5] mb-2">
                  2. Anatomia de Componentes UI & Visual Polishing
                </h3>
                <p className="text-[#a1a1aa] text-xs sm:text-sm">
                  Cada componente foi calibrado com base no Design System de Luxo: proporções matemáticas, ausência de 'pílulas' estáticas sem função e feedback táctil.
                </p>
              </div>

              <div className="space-y-4">
                {/* Component 1 */}
                <div className="p-4 rounded-xl bg-[#181820] border border-[#27272e] space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-serif text-base font-bold text-[#e2ba60]">
                      Product Card Master (60-70% Imagem)
                    </h4>
                    <span className="text-[11px] font-mono text-[#71717a]">Ratio 4:3 / 1:1</span>
                  </div>
                  <ul className="text-xs text-[#a1a1aa] space-y-1 list-disc pl-4">
                    <li><strong className="text-[#f4f4f5]">Fotografia dominante:</strong> Ocupa 65% do card com gradiente escuro inferior suave para acomodar texto de porção sem poluição.</li>
                    <li><strong className="text-[#f4f4f5]">Tipografia de Prato:</strong> Título em Playfair Display com contraste alto (#f4f4f5) e descritor curto em Plus Jakarta Sans (#a1a1aa).</li>
                    <li><strong className="text-[#f4f4f5]">Preço em Numerais Tabulares:</strong> Números com largura consistente (`tabular-nums font-mono`) para alinhamento vertical estrito.</li>
                    <li><strong className="text-[#f4f4f5]">Touch Target de 44px:</strong> Botão de adicionar ou opções com área de toque mínima de 44x44px.</li>
                  </ul>
                </div>

                {/* Component 2 */}
                <div className="p-4 rounded-xl bg-[#181820] border border-[#27272e] space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-serif text-base font-bold text-[#e2ba60]">
                      Botão Primário 'Adicionar ao Pedido'
                    </h4>
                    <span className="text-[11px] font-mono text-[#71717a]">Dourado Metálico #c59b27</span>
                  </div>
                  <ul className="text-xs text-[#a1a1aa] space-y-1 list-disc pl-4">
                    <li><strong className="text-[#f4f4f5]">Hierarquia Cromática:</strong> Dourado acetinado (#c59b27) com texto em preto profundo (#0e0e11) e micro-sombra dourada translúcida.</li>
                    <li><strong className="text-[#f4f4f5]">Micro-interação:</strong> Efeito `active:scale-98` com transição de 150ms e vibração háptica (`navigator.vibrate(30)`).</li>
                    <li><strong className="text-[#f4f4f5]">Feedback Visual Imediato:</strong> Transição instantânea de texto para 'Adicionando...' antes de fechar o modal.</li>
                  </ul>
                </div>

                {/* Component 3 */}
                <div className="p-4 rounded-xl bg-[#181820] border border-[#27272e] space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-serif text-base font-bold text-[#e2ba60]">
                      Organizador de Adicionais & Checkboxes
                    </h4>
                    <span className="text-[11px] font-mono text-[#71717a]">Real-Time Price Sync</span>
                  </div>
                  <ul className="text-xs text-[#a1a1aa] space-y-1 list-disc pl-4">
                    <li><strong className="text-[#f4f4f5]">Linhas de Altura Generosa:</strong> Checkbox customizado quadrado com borda fina e check dourado quando ativo.</li>
                    <li><strong className="text-[#f4f4f5]">Destaque de Preço Claro:</strong> Preço adicional alinhado à direita com sinal positivo (+R$ 7,00) em tom dourado suave.</li>
                    <li><strong className="text-[#f4f4f5]">Recalculo Dinâmico:</strong> O botão fixo do rodapé soma base + tamanho + extras * quantidade em tempo real.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: COPYWRITING */}
          {activeTab === 'copywriting' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-serif text-xl font-bold text-[#f4f4f5] mb-2">
                  3. Copywriting Sensorial & Micro-copy de Alta Conversão
                </h3>
                <p className="text-[#a1a1aa] text-xs sm:text-sm">
                  Substituição de termos frios e técnicos por vocabulário apetitoso, focado em texturas, métodos de cocção e exclusividade artesanal.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#181820] border border-[#27272e] space-y-2">
                  <span className="text-[11px] text-[#e63946] font-bold font-mono">
                    ANTES (CARDÁPIO GENÉRICO)
                  </span>
                  <p className="text-xs text-[#71717a] line-through">
                    "Hambúrguer de bacon: pão, carne, bacon, queijo e molho."
                  </p>
                  <span className="text-[11px] text-[#e2ba60] font-bold font-mono block pt-2">
                    DEPOIS (MAGNÍFICO COPY SENSORIAL)
                  </span>
                  <p className="text-xs text-[#f4f4f5]">
                    "Blend bovino artesanal de 180g grelhado na brasa, quatro fatias grossas de bacon defumado em lenha de macieira, creme de cheddar inglês fundido e molho barbecue rústico no brioche amanteigado."
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#181820] border border-[#27272e] space-y-2">
                  <span className="text-[11px] text-[#e63946] font-bold font-mono">
                    ANTES (BOTÕES COMUNS)
                  </span>
                  <p className="text-xs text-[#71717a] line-through">
                    "Comprar", "OK", "Enviar", "Mais"
                  </p>
                  <span className="text-[11px] text-[#e2ba60] font-bold font-mono block pt-2">
                    DEPOIS (MICRO-COPY ORIENTADA À CONVERSÃO)
                  </span>
                  <p className="text-xs text-[#f4f4f5]">
                    "Adicionar ao Pedido", "Personalizar Ponto & Extras", "Garantir Rodízio Magnífico", "Enviar Pedido pelo WhatsApp".
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: FRONTEND GUIDELINES */}
          {activeTab === 'frontend' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-serif text-xl font-bold text-[#f4f4f5] mb-2">
                  4. Diretrizes Técnicas para Desenvolvedores Frontend
                </h3>
                <p className="text-[#a1a1aa] text-xs sm:text-sm">
                  Arquitetura recomendada para entregar uma aplicação ultraleve, com carregamento instantâneo no 4G/5G do cliente no salão ou em casa.
                </p>
              </div>

              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-[#181820] border border-[#27272e]">
                  <strong className="text-[#f4f4f5] block mb-1">Stack Tecnológica Recomendada</strong>
                  <p className="text-xs text-[#a1a1aa]">
                    React 19 + TypeScript + Tailwind CSS v4 + Vite. Bundle leve (&lt;120kb gz), sem runtime de CSS-in-JS pesado, garantindo FPS constante a 60-120hz em iPhones e Androids.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#181820] border border-[#27272e]">
                  <strong className="text-[#f4f4f5] block mb-1">Estratégia de Performance de Imagens</strong>
                  <p className="text-xs text-[#a1a1aa]">
                    Uso de formatos modernos WebP/AVIF com dimensões explícitas para prevenir Cumulative Layout Shift (CLS). Imagens abaixo da dobra carregadas via `loading="lazy"`. Hero image pré-carregada via `fetchpriority="high"`.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#181820] border border-[#27272e]">
                  <strong className="text-[#f4f4f5] block mb-1">Acessibilidade & Ergonomia</strong>
                  <p className="text-xs text-[#a1a1aa]">
                    Contraste em conformidade com WCAG AA (texto #f4f4f5 sobre fundo #0e0e11 = ratio 16.5:1). Áreas clicáveis com `min-h-[44px]` e suporte a navegação por teclado (`focus-visible`).
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 bg-[#0e0e11] border-t border-[#27272e] flex items-center justify-between text-xs text-[#71717a]">
          <span>Magnífico Burger & Pizza · Direção de Arte de Alto Padrão</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-[#1f1f28] hover:bg-[#282836] text-[#f4f4f5] font-medium transition-colors"
          >
            Fechar Especificação
          </button>
        </div>

      </div>
    </div>
  );
};
