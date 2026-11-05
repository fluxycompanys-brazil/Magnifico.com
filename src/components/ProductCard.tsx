import React, { useRef, useState, useEffect } from 'react';
import { Plus, SlidersHorizontal, Flame, Sparkles } from 'lucide-react';
import { MenuItem } from '../types/menu';
import { formatBRL, triggerHaptic } from '../utils/formatters';

interface ProductCardProps {
  item: MenuItem;
  onSelectItem: (item: MenuItem) => void;
  onQuickAdd: (item: MenuItem, e: React.MouseEvent) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  item,
  onSelectItem,
  onQuickAdd,
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsAnimated(true);
      return;
    }

    const element = cardRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry && entry.isIntersecting) {
          setIsAnimated(true);
          observer.unobserve(entry.target);
          observer.disconnect();
        }
      },
      {
        threshold: 0.2, // Trigger once when at least 20% enters viewport
        rootMargin: '0px',
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  const hasCustomizations = (item.availableExtras && item.availableExtras.length > 0) || item.availableDoneness || item.availableSizes;

  const handleQuickAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    triggerHaptic();
    onQuickAdd(item, e);
  };

  return (
    <div
      ref={cardRef}
      onClick={() => onSelectItem(item)}
      className={`group relative bg-[#14141a] rounded-xl border border-[#27272e] hover:border-[#c59b27]/60 overflow-hidden cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/60 flex flex-col justify-between rotation-entry-target rotation-entry-ready ${
        isAnimated ? 'rotation-entry-animate' : ''
      }`}
    >
      {/* Lead with Imagery (65% of visual presence) */}
      <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-[#0a0a0d]">
        <img
          src={item.image}
          alt={item.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#14141a] via-[#14141a]/15 to-transparent" />

        {/* Quiet metadata indicators (top right/left) */}
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
          {item.isHouseFavorite && (
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-[#c59b27] text-[#0e0e11] rounded shadow-sm">
              Favorito
            </span>
          )}
          {item.isChefSpecial && (
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-[#e63946] text-white rounded shadow-sm">
              Chef
            </span>
          )}
        </div>

        {/* Portion / Servings Quiet Metadata */}
        {item.serves && (
          <div className="absolute bottom-2 left-3 text-[11px] text-[#d4d4d8] font-medium bg-[#0e0e11]/80 backdrop-blur-sm px-2 py-0.5 rounded border border-[#27272e]/60">
            {item.serves}
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <h3 className="font-serif text-lg sm:text-xl font-bold text-[#f4f4f5] group-hover:text-[#e2ba60] transition-colors leading-snug">
            {item.name}
          </h3>
          
          <p className="text-xs sm:text-sm text-[#a1a1aa] mt-1.5 line-clamp-2 leading-relaxed font-normal">
            {item.description}
          </p>
        </div>

        {/* Bottom strip: Price & Action */}
        <div className="pt-3 border-t border-[#22222a] flex items-center justify-between gap-2">
          <div className="flex flex-col">
            {item.promotionalPrice ? (
              <div className="flex items-baseline gap-1.5">
                <span className="font-mono text-lg sm:text-xl font-bold text-[#e2ba60] tabular-nums">
                  {formatBRL(item.promotionalPrice)}
                </span>
                <span className="font-mono text-xs text-[#71717a] line-through tabular-nums">
                  {formatBRL(item.price)}
                </span>
              </div>
            ) : (
              <span className="font-mono text-lg sm:text-xl font-bold text-[#f4f4f5] tabular-nums">
                {formatBRL(item.price)}
              </span>
            )}
            <span className="text-[10px] text-[#71717a] uppercase tracking-wider">
              {hasCustomizations ? 'Personalizável' : 'Preparo artesanal'}
            </span>
          </div>

          {/* Action button */}
          {hasCustomizations ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelectItem(item);
              }}
              className="min-h-[44px] px-3.5 py-2 rounded-lg bg-[#22222b] hover:bg-[#c59b27] text-[#e2ba60] hover:text-[#0e0e11] font-semibold text-xs tracking-wide transition-all duration-150 flex items-center gap-1.5 shrink-0 border border-[#2e2e38] hover:border-transparent active:scale-95"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Opções</span>
            </button>
          ) : (
            <button
              onClick={handleQuickAddClick}
              aria-label={`Adicionar ${item.name}`}
              className="min-h-[44px] min-w-[44px] px-3.5 py-2 rounded-lg bg-[#c59b27] hover:bg-[#d4af37] text-[#0e0e11] font-semibold text-xs tracking-wide transition-all duration-150 flex items-center justify-center gap-1.5 shrink-0 active:scale-95 shadow-sm shadow-[#c59b27]/20"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Adicionar</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
