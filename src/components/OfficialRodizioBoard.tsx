import React, { useState } from 'react';
import { Sparkles, Utensils, Check, Plus, Image as ImageIcon } from 'lucide-react';
import { MenuItem } from '../types/menu';
import { formatBRL, triggerHaptic } from '../utils/formatters';

interface OfficialRodizioBoardProps {
  items: MenuItem[];
  onSelectItem: (item: MenuItem) => void;
  onAddRodizioToCart: (selectedRounds: string[]) => void;
  onOpenPhysicalPhoto: () => void;
  searchQuery?: string;
  onClearSearch?: () => void;
}

export const OfficialRodizioBoard: React.FC<OfficialRodizioBoardProps> = ({
  items,
  onSelectItem,
  onAddRodizioToCart,
  onOpenPhysicalPhoto,
  searchQuery,
  onClearSearch,
}) => {
  const [selectedDishes, setSelectedDishes] = useState<string[]>([]);

  const query = searchQuery?.toLowerCase().trim() || '';
  const filterByQuery = (item: MenuItem) => {
    if (!query) return true;
    return (
      item.name.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.ingredients?.some((ing) => ing.toLowerCase().includes(query))
    );
  };

  // Filter items into the 4 official sections of the flyer
  const entradas = items.filter(
    (i) => i.category === 'porcoes' && i.isIncludedInRodizio && filterByQuery(i)
  );
  const burgers = items.filter(
    (i) => i.category === 'hamburgueres-artesanais' && i.isIncludedInRodizio && filterByQuery(i)
  );
  const pizzasSalgadas = items.filter(
    (i) => (i.category === 'pizzas-tradicionais' || i.category === 'pizzas-especiais') && i.isIncludedInRodizio && filterByQuery(i)
  );
  const pizzasDoces = items.filter(
    (i) => i.category === 'sobremesas' && i.isIncludedInRodizio && filterByQuery(i)
  );

  const totalFilteredCount = entradas.length + burgers.length + pizzasSalgadas.length + pizzasDoces.length;

  const rodizioMasterItem = items.find((i) => i.id === 'rodizio-magnifico');

  const toggleDishSelection = (name: string, e: React.MouseEvent) => {
    e.stopPropagation();
    triggerHaptic();
    setSelectedDishes((prev) =>
      prev.includes(name) ? prev.filter((d) => d !== name) : [...prev, name]
    );
  };

  const handleOrderRodizio = () => {
    triggerHaptic();
    onAddRodizioToCart(selectedDishes);
  };

  return (
    <section className="my-12 rounded-3xl bg-[#121217] border border-[#383848] p-6 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden">
      
      {/* Background ambient texture */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#c59b27]/10 via-[#e63946]/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Header Banner mirroring the exact flyer design */}
      <div className="text-center max-w-3xl mx-auto space-y-4 mb-10">
        
        <div className="flex items-center justify-center gap-2">
          <span className="font-serif text-3xl sm:text-4xl md:text-5xl font-black tracking-widest text-[#f4d58d] uppercase drop-shadow-md">
            RODÍZIO DE
          </span>
        </div>

        {/* The 3 iconic colored pill boxes from the cardápio flyer */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <div className="py-3 px-4 rounded-xl bg-gradient-to-r from-[#0284c7] to-[#0ea5e9] text-white font-extrabold text-sm sm:text-base tracking-wider uppercase shadow-lg shadow-sky-950/50 flex items-center justify-center border border-sky-300/30">
            BURGUER GOURMET
          </div>
          <div className="py-3 px-4 rounded-xl bg-gradient-to-r from-[#d97706] to-[#eab308] text-[#1a1200] font-extrabold text-sm sm:text-base tracking-wider uppercase shadow-lg shadow-amber-950/50 flex items-center justify-center border border-amber-200/40">
            PIZZA PREMIUM
          </div>
          <div className="py-3 px-4 rounded-xl bg-gradient-to-r from-[#be185d] to-[#ec4899] text-white font-extrabold text-sm sm:text-base tracking-wider uppercase shadow-lg shadow-pink-950/50 flex items-center justify-center border border-pink-300/30">
            REFRI Á VONTADE
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2 text-xs text-[#a1a1aa]">
          <span>★ Valor por pessoa: <strong className="text-[#f4f4f5] font-mono text-sm">R$ 79,90</strong></span>
          <span aria-hidden="true">·</span>
          <a
            href="https://wa.me/551143096520"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#25D366] hover:underline flex items-center gap-1 font-semibold"
          >
            <span>WhatsApp: (11) 4309-6520</span>
          </a>
          <span aria-hidden="true">·</span>
          <button
            onClick={onOpenPhysicalPhoto}
            className="text-[#e2ba60] hover:underline flex items-center gap-1 font-semibold cursor-pointer"
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Ver foto do panfleto original</span>
          </button>
        </div>

        {query && (
          <div className="flex items-center justify-center gap-2 pt-1 text-xs">
            <span className="text-[#a1a1aa]">
              Filtrando por <strong className="text-[#e2ba60]">"{searchQuery}"</strong> ({totalFilteredCount} {totalFilteredCount === 1 ? 'item encontrado' : 'itens encontrados'} no rodízio)
            </span>
            {onClearSearch && (
              <button
                onClick={onClearSearch}
                className="text-[#e63946] hover:underline font-semibold ml-2 cursor-pointer"
              >
                Limpar busca
              </button>
            )}
          </div>
        )}
      </div>

      {/* 4 Official Columns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 pt-4 border-t border-[#272732]">
        
        {/* Column 1: ENTRADAS ESPECIAIS (3 cols) */}
        <div className="lg:col-span-3 space-y-4">
          <div className="border-b border-[#c59b27]/40 pb-2 flex items-center justify-between">
            <h3 className="font-serif text-lg font-bold text-[#f4d58d] uppercase tracking-wider">
              Entradas Especiais
            </h3>
            <span className="text-[11px] font-mono text-[#71717a]">{entradas.length} itens</span>
          </div>

          <div className="space-y-1.5">
            {entradas.map((item) => {
              const isSelected = selectedDishes.includes(item.name);
              return (
                <div
                  key={item.id}
                  onClick={() => onSelectItem(item)}
                  className={`p-2.5 rounded-lg border text-left cursor-pointer transition-all flex items-center justify-between group ${
                    isSelected
                      ? 'bg-[#c59b27]/15 border-[#c59b27] text-[#f4f4f5]'
                      : 'bg-[#181820] border-[#272730] hover:border-[#3f3f50] text-[#d4d4d8]'
                  }`}
                >
                  <div className="min-w-0 flex-1 pr-2">
                    <span className="text-xs font-semibold block group-hover:text-[#e2ba60] transition-colors truncate">
                      {item.name}
                    </span>
                  </div>
                  <button
                    onClick={(e) => toggleDishSelection(item.name, e)}
                    aria-label={`Selecionar ${item.name}`}
                    className={`w-6 h-6 rounded flex items-center justify-center shrink-0 border transition-colors ${
                      isSelected
                        ? 'bg-[#c59b27] border-[#c59b27] text-[#0e0e11]'
                        : 'border-[#3f3f50] hover:border-[#e2ba60] text-[#71717a]'
                    }`}
                  >
                    {isSelected ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <Plus className="w-3.5 h-3.5" />}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Column 2: BURGUER GOURMET (3 cols) */}
        <div className="lg:col-span-3 space-y-4">
          <div className="border-b border-[#0ea5e9]/40 pb-2 flex items-center justify-between">
            <h3 className="font-serif text-lg font-bold text-[#38bdf8] uppercase tracking-wider">
              Burguer Gourmet
            </h3>
            <span className="text-[11px] font-mono text-[#71717a]">{burgers.length} tipos</span>
          </div>

          <div className="space-y-1.5">
            {burgers.map((item) => {
              const isSelected = selectedDishes.includes(item.name);
              return (
                <div
                  key={item.id}
                  onClick={() => onSelectItem(item)}
                  className={`p-2.5 rounded-lg border text-left cursor-pointer transition-all flex items-center justify-between group ${
                    isSelected
                      ? 'bg-[#0ea5e9]/15 border-[#0ea5e9] text-[#f4f4f5]'
                      : 'bg-[#181820] border-[#272730] hover:border-[#3f3f50] text-[#d4d4d8]'
                  }`}
                >
                  <div className="min-w-0 flex-1 pr-2">
                    <span className="text-xs font-semibold block group-hover:text-[#38bdf8] transition-colors truncate">
                      {item.name}
                    </span>
                    <span className="text-[10px] text-[#71717a] block truncate">
                      Blend 180g na brasa
                    </span>
                  </div>
                  <button
                    onClick={(e) => toggleDishSelection(item.name, e)}
                    aria-label={`Selecionar ${item.name}`}
                    className={`w-6 h-6 rounded flex items-center justify-center shrink-0 border transition-colors ${
                      isSelected
                        ? 'bg-[#0ea5e9] border-[#0ea5e9] text-[#0e0e11]'
                        : 'border-[#3f3f50] hover:border-[#38bdf8] text-[#71717a]'
                    }`}
                  >
                    {isSelected ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <Plus className="w-3.5 h-3.5" />}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Column 3: PIZZAS SALGADAS PREMIUM (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="border-b border-[#eab308]/40 pb-2 flex items-center justify-between">
            <h3 className="font-serif text-lg font-bold text-[#facc15] uppercase tracking-wider">
              Pizzas Salgadas
            </h3>
            <span className="text-[11px] font-mono text-[#71717a]">{pizzasSalgadas.length} sabores</span>
          </div>

          <div className="space-y-1.5 max-h-[480px] overflow-y-auto pr-1 no-scrollbar">
            {pizzasSalgadas.map((item) => {
              const isSelected = selectedDishes.includes(item.name);
              return (
                <div
                  key={item.id}
                  onClick={() => onSelectItem(item)}
                  className={`p-2.5 rounded-lg border text-left cursor-pointer transition-all flex items-center justify-between group ${
                    isSelected
                      ? 'bg-[#eab308]/15 border-[#eab308] text-[#f4f4f5]'
                      : 'bg-[#181820] border-[#272730] hover:border-[#3f3f50] text-[#d4d4d8]'
                  }`}
                >
                  <div className="min-w-0 flex-1 pr-2">
                    <span className="text-xs font-semibold block group-hover:text-[#facc15] transition-colors truncate">
                      {item.name}
                    </span>
                    <span className="text-[10px] text-[#71717a] block truncate">
                      {item.description}
                    </span>
                  </div>
                  <button
                    onClick={(e) => toggleDishSelection(item.name, e)}
                    aria-label={`Selecionar ${item.name}`}
                    className={`w-6 h-6 rounded flex items-center justify-center shrink-0 border transition-colors ${
                      isSelected
                        ? 'bg-[#eab308] border-[#eab308] text-[#0e0e11]'
                        : 'border-[#3f3f50] hover:border-[#facc15] text-[#71717a]'
                    }`}
                  >
                    {isSelected ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <Plus className="w-3.5 h-3.5" />}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Column 4: PIZZAS DOCES & AVISO REFIL (2 cols) */}
        <div className="lg:col-span-2 space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="border-b border-[#ec4899]/40 pb-2 flex items-center justify-between">
              <h3 className="font-serif text-lg font-bold text-[#f472b6] uppercase tracking-wider">
                Pizzas Doces
              </h3>
              <span className="text-[11px] font-mono text-[#71717a]">4 sabores</span>
            </div>

            <div className="space-y-1.5">
              {pizzasDoces.map((item) => {
                const isSelected = selectedDishes.includes(item.name);
                return (
                  <div
                    key={item.id}
                    onClick={() => onSelectItem(item)}
                    className={`p-2.5 rounded-lg border text-left cursor-pointer transition-all flex items-center justify-between group ${
                      isSelected
                        ? 'bg-[#ec4899]/15 border-[#ec4899] text-[#f4f4f5]'
                        : 'bg-[#181820] border-[#272730] hover:border-[#3f3f50] text-[#d4d4d8]'
                    }`}
                  >
                    <div className="min-w-0 flex-1 pr-1">
                      <span className="text-xs font-semibold block group-hover:text-[#f472b6] transition-colors truncate">
                        {item.name}
                      </span>
                    </div>
                    <button
                      onClick={(e) => toggleDishSelection(item.name, e)}
                      aria-label={`Selecionar ${item.name}`}
                      className={`w-6 h-6 rounded flex items-center justify-center shrink-0 border transition-colors ${
                        isSelected
                          ? 'bg-[#ec4899] border-[#ec4899] text-[#0e0e11]'
                          : 'border-[#3f3f50] hover:border-[#f472b6] text-[#71717a]'
                      }`}
                    >
                      {isSelected ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <Plus className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom notice box mirroring the yellow banner on the flyer */}
          <div className="p-3 rounded-xl bg-[#2a2412] border border-[#eab308]/40 text-left space-y-1 mt-4">
            <span className="text-[10px] font-bold text-[#eab308] uppercase tracking-wider block">
              DEMAIS BEBIDAS E SOBREMESAS
            </span>
            <span className="text-[10px] text-[#d4d4d8] block">
              NÃO INCLUSAS NO RODÍZIO
            </span>
            <div className="pt-1 text-[11px] font-bold text-[#fef08a] border-t border-[#eab308]/30">
              REFRIGERANTE REFIL À VONTADE!
            </div>
          </div>
        </div>

      </div>

      {/* Floating CTA bar inside the official Rodízio board */}
      <div className="mt-8 pt-6 border-t border-[#272732] flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#0e0e11]/60 p-4 rounded-2xl">
        <div className="text-left">
          <span className="text-xs text-[#a1a1aa] block">
            {selectedDishes.length === 0
              ? 'Clique no botão "+" ao lado de qualquer item para montar seus pratos favoritos da primeira rodada'
              : `${selectedDishes.length} itens marcados para a 1ª rodada do seu Rodízio`}
          </span>
          <span className="text-xs text-[#e2ba60] font-medium">
            Tudo liberado à vontade durante toda a permanência no salão
          </span>
        </div>

        <button
          onClick={handleOrderRodizio}
          className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#c59b27] hover:bg-[#d4af37] active:scale-98 text-[#0e0e11] font-bold text-sm tracking-wide transition-all shadow-xl shadow-[#c59b27]/25 flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          <span>Pedir Rodízio Magnífico — R$ 79,90</span>
        </button>
      </div>

    </section>
  );
};
