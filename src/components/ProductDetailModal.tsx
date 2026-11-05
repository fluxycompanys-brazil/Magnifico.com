import React, { useState, useEffect } from 'react';
import { X, Plus, Minus, Check, Flame, Clock, Users, Sparkles } from 'lucide-react';
import { MenuItem, ExtraOption, SelectedExtra } from '../types/menu';
import { formatBRL, triggerHaptic } from '../utils/formatters';

interface ProductDetailModalProps {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (
    item: MenuItem,
    quantity: number,
    selectedDoneness?: string,
    selectedSize?: string,
    selectedExtras?: SelectedExtra[],
    observation?: string
  ) => void;
}

const DONENESS_OPTIONS = [
  { id: 'ao-ponto', label: 'Ao Ponto', desc: 'Centro rosado e suculento (Recomendado)' },
  { id: 'ao-ponto-menos', label: 'Ao Ponto para Menos', desc: 'Centro bem vermelho e ultra macio' },
  { id: 'bem-passado', label: 'Bem Passado', desc: 'Totalmente cozido, sem sangue' },
];

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  item,
  isOpen,
  onClose,
  onAddToCart,
}) => {
  if (!isOpen || !item) return null;

  const [quantity, setQuantity] = useState(1);
  const [selectedDoneness, setSelectedDoneness] = useState<string>(
    item.availableDoneness ? 'Ao Ponto' : ''
  );
  const [selectedSize, setSelectedSize] = useState<string>(
    item.availableSizes && item.availableSizes.length > 0 ? item.availableSizes[1]?.name || item.availableSizes[0].name : ''
  );
  const [selectedExtras, setSelectedExtras] = useState<Record<string, number>>({});
  const [observation, setObservation] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  // Reset state when a new item is opened
  useEffect(() => {
    if (item) {
      setQuantity(1);
      setSelectedDoneness(item.availableDoneness ? 'Ao Ponto' : '');
      setSelectedSize(item.availableSizes && item.availableSizes.length > 0 ? item.availableSizes[1]?.name || item.availableSizes[0].name : '');
      setSelectedExtras({});
      setObservation('');
      setIsAdding(false);
    }
  }, [item]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Calculate size multiplier
  const sizeMultiplier = item.availableSizes?.find((s) => s.name === selectedSize)?.priceMultiplier || 1.0;
  const basePrice = (item.promotionalPrice || item.price) * sizeMultiplier;

  // Calculate extras total
  const extrasTotal = Object.entries(selectedExtras).reduce((acc, [extraId, qty]) => {
    const extra = item.availableExtras?.find((e) => e.id === extraId);
    return acc + (extra ? extra.price * qty : 0);
  }, 0);

  const unitPrice = basePrice + extrasTotal;
  const totalPrice = unitPrice * quantity;

  const toggleExtra = (extra: ExtraOption) => {
    triggerHaptic();
    setSelectedExtras((prev) => {
      const current = prev[extra.id] || 0;
      if (current > 0) {
        const next = { ...prev };
        delete next[extra.id];
        return next;
      } else {
        return { ...prev, [extra.id]: 1 };
      }
    });
  };

  const handleAdd = () => {
    triggerHaptic();
    setIsAdding(true);

    const mappedExtras: SelectedExtra[] = Object.entries(selectedExtras)
      .map(([extraId, qty]) => {
        const extra = item.availableExtras?.find((e) => e.id === extraId);
        return extra ? { extra, quantity: qty } : null;
      })
      .filter((e): e is SelectedExtra => e !== null);

    setTimeout(() => {
      onAddToCart(
        item,
        quantity,
        selectedDoneness || undefined,
        selectedSize || undefined,
        mappedExtras,
        observation.trim() || undefined
      );
      setIsAdding(false);
      onClose();
    }, 280);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      
      {/* Click outside backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal Card */}
      <div className="relative w-full sm:max-w-2xl max-h-[92vh] sm:max-h-[88vh] bg-[#14141a] border border-[#27272e] rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden z-10 animate-in slide-in-from-bottom-6 duration-200">
        
        {/* Header / Close button */}
        <div className="absolute top-4 right-4 z-20">
          <button
            onClick={onClose}
            aria-label="Fechar detalhes"
            className="w-9 h-9 rounded-full bg-[#0e0e11]/80 hover:bg-[#1f1f28] text-[#f4f4f5] flex items-center justify-center backdrop-blur-md border border-[#2e2e38] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1 no-scrollbar">
          
          {/* Main Visual Image Banner */}
          <div className="relative h-64 sm:h-72 w-full bg-[#0a0a0d]">
            <img
              src={item.image}
              alt={item.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#14141a] via-[#14141a]/30 to-transparent" />

            <div className="absolute bottom-4 left-6 right-6">
              {item.isHouseFavorite && (
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#c59b27] text-[#0e0e11] text-[11px] font-bold uppercase tracking-wider mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Favorito da Casa</span>
                </div>
              )}
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#f4f4f5]">
                {item.name}
              </h2>
            </div>
          </div>

          <div className="p-6 space-y-6">
            
            {/* Sensorial culinary description */}
            <div className="space-y-2">
              <p className="text-sm sm:text-base text-[#e4e4e7] leading-relaxed">
                {item.sensoryDescription || item.description}
              </p>
              
              <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-[#a1a1aa] font-medium">
                {item.prepTime && (
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-[#e2ba60]" />
                    <span>{item.prepTime}</span>
                  </div>
                )}
                {item.serves && (
                  <div className="flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-[#e2ba60]" />
                    <span>{item.serves}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Ingredients tags list */}
            {item.ingredients && item.ingredients.length > 0 && (
              <div className="space-y-2">
                <span className="text-xs uppercase tracking-wider font-semibold text-[#a1a1aa] block">
                  Ingredientes Selecionados
                </span>
                <div className="flex flex-wrap gap-2">
                  {item.ingredients.map((ing, idx) => (
                    <span
                      key={idx}
                      className="text-xs text-[#d4d4d8] bg-[#1a1a22] border border-[#27272e] px-2.5 py-1 rounded"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Pizza Size Selector (if applicable) */}
            {item.availableSizes && item.availableSizes.length > 0 && (
              <div className="space-y-3 pt-2 border-t border-[#22222a]">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider font-semibold text-[#f4f4f5]">
                    Escolha o Tamanho
                  </span>
                  <span className="text-[11px] text-[#e2ba60] font-medium">Obrigatório</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {item.availableSizes.map((size) => {
                    const isSelected = selectedSize === size.name;
                    const calculatedPrice = (item.promotionalPrice || item.price) * size.priceMultiplier;
                    return (
                      <button
                        key={size.name}
                        onClick={() => {
                          triggerHaptic();
                          setSelectedSize(size.name);
                        }}
                        className={`p-3 rounded-lg border text-left transition-all ${
                          isSelected
                            ? 'bg-[#c59b27]/10 border-[#c59b27] text-[#f4f4f5]'
                            : 'bg-[#181820] border-[#27272e] text-[#a1a1aa] hover:border-[#3f3f4e]'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-semibold">{size.name}</span>
                          {isSelected && <Check className="w-4 h-4 text-[#c59b27]" />}
                        </div>
                        <span className="font-mono text-xs font-bold text-[#e2ba60] block tabular-nums">
                          {formatBRL(calculatedPrice)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Meat Doneness Selector (if applicable) */}
            {item.availableDoneness && (
              <div className="space-y-3 pt-2 border-t border-[#22222a]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 text-[#e63946]" />
                    <span className="text-xs uppercase tracking-wider font-semibold text-[#f4f4f5]">
                      Ponto da Carne
                    </span>
                  </div>
                  <span className="text-[11px] text-[#e2ba60] font-medium">Escolha 1</span>
                </div>

                <div className="space-y-2">
                  {DONENESS_OPTIONS.map((doneness) => {
                    const isSelected = selectedDoneness === doneness.label;
                    return (
                      <div
                        key={doneness.id}
                        onClick={() => {
                          triggerHaptic();
                          setSelectedDoneness(doneness.label);
                        }}
                        className={`p-3 rounded-lg border cursor-pointer transition-all flex items-center justify-between ${
                          isSelected
                            ? 'bg-[#c59b27]/10 border-[#c59b27]'
                            : 'bg-[#181820] border-[#27272e] hover:border-[#383844]'
                        }`}
                      >
                        <div>
                          <span className="text-sm font-semibold text-[#f4f4f5] block">
                            {doneness.label}
                          </span>
                          <span className="text-xs text-[#a1a1aa] block">
                            {doneness.desc}
                          </span>
                        </div>
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                            isSelected
                              ? 'border-[#c59b27] bg-[#c59b27] text-[#0e0e11]'
                              : 'border-[#3f3f4e] bg-transparent'
                          }`}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Customization / Extras Checkboxes */}
            {item.availableExtras && item.availableExtras.length > 0 && (
              <div className="space-y-3 pt-2 border-t border-[#22222a]">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-wider font-semibold text-[#f4f4f5]">
                    Turbine seu prato (Opcionais)
                  </span>
                  <span className="text-[11px] text-[#71717a]">Selecione quantos desejar</span>
                </div>

                <div className="space-y-2">
                  {item.availableExtras.map((extra) => {
                    const isChecked = (selectedExtras[extra.id] || 0) > 0;
                    return (
                      <div
                        key={extra.id}
                        onClick={() => toggleExtra(extra)}
                        className={`p-3 rounded-lg border cursor-pointer transition-all flex items-center justify-between ${
                          isChecked
                            ? 'bg-[#c59b27]/10 border-[#c59b27]'
                            : 'bg-[#181820] border-[#27272e] hover:border-[#383844]'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                              isChecked
                                ? 'border-[#c59b27] bg-[#c59b27] text-[#0e0e11]'
                                : 'border-[#3f3f4e] bg-transparent'
                            }`}
                          >
                            {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>
                          <span className="text-sm font-medium text-[#f4f4f5]">
                            {extra.name}
                          </span>
                        </div>

                        <span className="font-mono text-sm font-semibold text-[#e2ba60] tabular-nums">
                          +{formatBRL(extra.price)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Observations Field */}
            <div className="space-y-2 pt-2 border-t border-[#22222a]">
              <label htmlFor="obs-input" className="text-xs uppercase tracking-wider font-semibold text-[#a1a1aa] block">
                Observações Especiais
              </label>
              <textarea
                id="obs-input"
                value={observation}
                onChange={(e) => setObservation(e.target.value)}
                placeholder="Ex: sem cebola, maionese à parte, cortar em 4 partes..."
                rows={2}
                maxLength={140}
                className="w-full bg-[#181820] border border-[#27272e] rounded-lg p-3 text-sm text-[#f4f4f5] placeholder-[#71717a] focus:outline-none focus:border-[#c59b27] transition-colors"
              />
            </div>

          </div>
        </div>

        {/* Sticky Purchase & Micro-interaction Footer */}
        <div className="p-4 sm:p-5 bg-[#0e0e11] border-t border-[#27272e] flex flex-col sm:flex-row items-center gap-4">
          
          {/* Quantity Stepper */}
          <div className="flex items-center justify-between sm:justify-start w-full sm:w-auto bg-[#181820] border border-[#2e2e38] rounded-lg p-1">
            <button
              onClick={() => {
                triggerHaptic();
                setQuantity((q) => Math.max(1, q - 1));
              }}
              disabled={quantity <= 1}
              aria-label="Diminuir quantidade"
              className="w-9 h-9 rounded flex items-center justify-center text-[#a1a1aa] hover:text-[#f4f4f5] hover:bg-[#252530] disabled:opacity-40 transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-12 text-center font-mono font-bold text-base text-[#f4f4f5] tabular-nums">
              {quantity}
            </span>
            <button
              onClick={() => {
                triggerHaptic();
                setQuantity((q) => q + 1);
              }}
              aria-label="Aumentar quantidade"
              className="w-9 h-9 rounded flex items-center justify-center text-[#a1a1aa] hover:text-[#f4f4f5] hover:bg-[#252530] transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Add to Cart CTA with tactile micro-interaction */}
          <button
            onClick={handleAdd}
            disabled={isAdding}
            className={`w-full flex-1 min-h-[48px] px-6 py-3.5 rounded-lg bg-[#c59b27] hover:bg-[#d4af37] active:scale-98 text-[#0e0e11] font-semibold text-sm transition-all duration-150 flex items-center justify-between shadow-lg shadow-[#c59b27]/25 ${
              isAdding ? 'opacity-90 scale-98 bg-[#a88118]' : ''
            }`}
          >
            <span>{isAdding ? 'Adicionando...' : 'Adicionar ao Pedido'}</span>
            <span className="font-mono text-base font-bold tabular-nums">
              {formatBRL(totalPrice)}
            </span>
          </button>
        </div>

      </div>
    </div>
  );
};
