import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CategoryId } from '../types/menu';
import { CATEGORIES } from '../data/menuData';

interface CategoryNavProps {
  activeCategory: CategoryId | 'todos';
  onSelectCategory: (cat: CategoryId | 'todos') => void;
  categoryCounts: Record<string, number>;
}

export const CategoryNav: React.FC<CategoryNavProps> = ({
  activeCategory,
  onSelectCategory,
  categoryCounts,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const offset = direction === 'left' ? -240 : 240;
      scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <div className="sticky top-20 z-30 bg-[#0e0e11]/95 backdrop-blur-md border-b border-[#27272e] py-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center">
          
          {/* Left Arrow Scroll for Desktop */}
          <button
            onClick={() => scroll('left')}
            aria-label="Rolar para esquerda"
            className="hidden md:flex p-1.5 rounded-lg text-[#71717a] hover:text-[#f4f4f5] hover:bg-[#1c1c22] transition-colors shrink-0 mr-2"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Horizontal category tabs */}
          <div
            ref={scrollContainerRef}
            className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth py-1 w-full"
          >
            {/* "Todos" button */}
            <button
              onClick={() => onSelectCategory('todos')}
              className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg whitespace-nowrap shrink-0 transition-all duration-150 flex items-center gap-1.5 ${
                activeCategory === 'todos'
                  ? 'bg-[#c59b27] text-[#0e0e11] font-semibold shadow-sm shadow-[#c59b27]/30'
                  : 'text-[#a1a1aa] hover:text-[#f4f4f5] hover:bg-[#1a1a22]'
              }`}
            >
              <span>Todos os Pratos</span>
              <span className={`text-[11px] font-mono tabular-nums ${activeCategory === 'todos' ? 'text-[#0e0e11]/80' : 'text-[#71717a]'}`}>
                ({Object.values(categoryCounts).reduce((a, b) => a + b, 0)})
              </span>
            </button>

            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              const count = categoryCounts[cat.id] || 0;
              return (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.id)}
                  className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg whitespace-nowrap shrink-0 transition-all duration-150 flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#c59b27] text-[#0e0e11] font-semibold shadow-sm shadow-[#c59b27]/30'
                      : 'text-[#a1a1aa] hover:text-[#f4f4f5] hover:bg-[#1a1a22]'
                  }`}
                >
                  <span>{cat.name}</span>
                  {count > 0 && (
                    <span className={`text-[11px] font-mono tabular-nums ${isActive ? 'text-[#0e0e11]/80' : 'text-[#71717a]'}`}>
                      ({count})
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Arrow Scroll for Desktop */}
          <button
            onClick={() => scroll('right')}
            aria-label="Rolar para direita"
            className="hidden md:flex p-1.5 rounded-lg text-[#71717a] hover:text-[#f4f4f5] hover:bg-[#1c1c22] transition-colors shrink-0 ml-2"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

        </div>
      </div>
    </div>
  );
};
