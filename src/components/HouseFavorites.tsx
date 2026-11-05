import React from 'react';
import { Sparkles, Star, Plus, Flame } from 'lucide-react';
import { MenuItem } from '../types/menu';
import { formatBRL } from '../utils/formatters';

interface HouseFavoritesProps {
  items: MenuItem[];
  onSelectItem: (item: MenuItem) => void;
  onQuickAdd: (item: MenuItem, e: React.MouseEvent) => void;
}

export const HouseFavorites: React.FC<HouseFavoritesProps> = ({
  items,
  onSelectItem,
  onQuickAdd,
}) => {
  if (items.length === 0) return null;

  const featuredRodizio = items.find((i) => i.id === 'rodizio-magnifico') || items[0];
  const otherFavorites = items.filter((i) => i.id !== featuredRodizio.id).slice(0, 4);

  return (
    <section id="favoritos" className="py-12 md:py-16 border-b border-[#27272e] bg-[#111116]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#e2ba60] mb-1">
              <Star className="w-3.5 h-3.5 fill-[#e2ba60]" />
              <span>Seleção do Chef</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#f4f4f5]">
              Os Favoritos da Casa
            </h2>
          </div>
          <p className="text-sm text-[#a1a1aa] max-w-md">
            As criações mais consagradas pelos nossos clientes, preparadas com carinho artesanal e ingredientes nobres.
          </p>
        </div>

        {/* Asymmetric Grid: 1 prominent card + 4 companion cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Main Showcase Card (Rodízio Experience) - 5 columns */}
          <div
            onClick={() => onSelectItem(featuredRodizio)}
            className="lg:col-span-5 bg-[#16161d] rounded-2xl border border-[#c59b27]/40 hover:border-[#c59b27] overflow-hidden group cursor-pointer transition-all duration-300 flex flex-col justify-between shadow-xl shadow-black/40"
          >
            <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-[#0e0e11]">
              <img
                src={featuredRodizio.image}
                alt={featuredRodizio.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#16161d] via-transparent to-transparent" />
              
              <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 bg-[#c59b27] text-[#0e0e11] text-xs font-bold uppercase tracking-wider rounded">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Experiência Suprema</span>
              </div>
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <div className="text-xs text-[#a1a1aa] mb-1">
                  {featuredRodizio.serves} · {featuredRodizio.prepTime}
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#f4f4f5] group-hover:text-[#e2ba60] transition-colors">
                  {featuredRodizio.name}
                </h3>
                <p className="text-sm text-[#a1a1aa] mt-2 line-clamp-2 leading-relaxed">
                  {featuredRodizio.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#27272e] flex items-center justify-between">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#71717a] block">
                    Valor por pessoa
                  </span>
                  <span className="font-mono text-2xl font-bold text-[#f4f4f5] tabular-nums">
                    {formatBRL(featuredRodizio.price)}
                  </span>
                </div>
                <button
                  onClick={(e) => onQuickAdd(featuredRodizio, e)}
                  className="px-4 py-2.5 rounded-lg bg-[#c59b27] hover:bg-[#d4af37] text-[#0e0e11] font-semibold text-xs tracking-wide uppercase transition-colors flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Pedir Agora</span>
                </button>
              </div>
            </div>
          </div>

          {/* Secondary 4-Grid Cards - 7 columns */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {otherFavorites.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectItem(item)}
                className="bg-[#16161d] rounded-xl border border-[#27272e] hover:border-[#c59b27]/60 overflow-hidden group cursor-pointer transition-all duration-200 flex flex-col justify-between shadow-md"
              >
                <div className="relative h-44 w-full overflow-hidden bg-[#0e0e11]">
                  <img
                    src={item.image}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#16161d] via-transparent to-transparent" />
                  {item.isChefSpecial && (
                    <div className="absolute top-3 right-3 px-2 py-0.5 bg-[#e63946] text-white text-[10px] font-bold uppercase tracking-wider rounded">
                      Chef
                    </div>
                  )}
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h4 className="font-serif text-lg font-bold text-[#f4f4f5] group-hover:text-[#e2ba60] transition-colors line-clamp-1">
                      {item.name}
                    </h4>
                    <p className="text-xs text-[#a1a1aa] mt-1 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <span className="font-mono text-base font-bold text-[#f4f4f5] tabular-nums">
                      {formatBRL(item.price)}
                    </span>
                    <button
                      onClick={(e) => onQuickAdd(item, e)}
                      aria-label={`Adicionar ${item.name}`}
                      className="p-2 rounded-lg bg-[#22222b] hover:bg-[#c59b27] text-[#a1a1aa] hover:text-[#0e0e11] transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
