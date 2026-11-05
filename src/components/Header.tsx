import React from 'react';
import { ShoppingBag, Search, UtensilsCrossed, Sparkles, Phone } from 'lucide-react';
import { formatBRL } from '../utils/formatters';

interface HeaderProps {
  cartItemCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  isSearchOpen: boolean;
  onToggleSearch: () => void;
  onOpenMenuAttachment: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartItemCount,
  cartTotal,
  onOpenCart,
  searchQuery,
  onSearchChange,
  isSearchOpen,
  onToggleSearch,
  onOpenMenuAttachment,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#0e0e11]/90 backdrop-blur-md border-b border-[#27272e] transition-colors duration-200">
      {/* Top Bar Contract: Zone 1 (Wordmark) — Zone 2 (Nav links) — Zone 3 (Primary action) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#c59b27] via-[#e2ba60] to-[#9e7914] flex items-center justify-center shadow-lg shadow-[#c59b27]/20 group-hover:scale-105 transition-transform duration-200">
              <UtensilsCrossed className="w-5 h-5 text-[#0e0e11]" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-wider text-[#f4f4f5] group-hover:text-[#e2ba60] transition-colors whitespace-nowrap">
                MAGNÍFICO
              </span>
              <span className="text-[10px] tracking-[0.25em] uppercase text-[#a1a1aa] font-medium -mt-1">
                Burguer & Pizza
              </span>
            </div>
          </a>
        </div>

        {/* Zone 2: Clean single-line navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#a1a1aa]">
          <a
            href="#rodizio-oficial"
            className="hover:text-[#e2ba60] transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 font-semibold text-[#f4d58d]"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#e2ba60]" />
            Cardápio do Rodízio
          </a>
        </nav>

        {/* Zone 3: Utility actions & Cart CTA */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Direct WhatsApp link */}
          <a
            href="https://wa.me/551143096520"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Atendimento no WhatsApp (11) 4309-6520"
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#25D366] border border-[#25D366]/30 transition-colors text-xs font-semibold shrink-0"
          >
            <Phone className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">(11) 4309-6520</span>
          </a>

          {/* Quick search button */}
          <button
            onClick={onToggleSearch}
            aria-label="Buscar pratos"
            className="p-2.5 rounded-lg text-[#a1a1aa] hover:text-[#f4f4f5] hover:bg-[#1c1c22] border border-transparent hover:border-[#2e2e38] transition-colors"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Primary Cart Action Button */}
          <button
            onClick={onOpenCart}
            aria-label="Abrir carrinho de compras"
            className="relative flex items-center gap-2.5 px-4 py-2.5 rounded-lg bg-[#c59b27] hover:bg-[#d4af37] active:scale-95 text-[#0e0e11] font-semibold text-sm shadow-md shadow-[#c59b27]/25 transition-all duration-150 whitespace-nowrap shrink-0"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Pedido</span>
            {cartItemCount > 0 ? (
              <span className="flex items-center gap-1.5 bg-[#0e0e11] text-[#e2ba60] px-2 py-0.5 rounded text-xs font-bold font-mono tabular-nums">
                <span>{cartItemCount}</span>
                <span className="hidden lg:inline">· {formatBRL(cartTotal)}</span>
              </span>
            ) : (
              <span className="text-xs opacity-80">(0)</span>
            )}
          </button>
        </div>
      </div>

      {/* Expandable Search Drawer */}
      {isSearchOpen && (
        <div className="border-t border-[#27272e] bg-[#141419] px-4 py-3 sm:px-6">
          <div className="max-w-2xl mx-auto relative flex items-center">
            <Search className="absolute left-3.5 w-4 h-4 text-[#71717a]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Buscar por hambúrguer, pizza, calabresa, refrigerante, sobremesa..."
              autoFocus
              className="w-full bg-[#0e0e11] border border-[#2e2e38] rounded-lg pl-10 pr-10 py-2.5 text-sm text-[#f4f4f5] placeholder-[#71717a] focus:outline-none focus:border-[#c59b27] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 text-xs text-[#a1a1aa] hover:text-[#f4f4f5] px-1.5 py-0.5 rounded bg-[#1c1c22]"
              >
                Limpar
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
