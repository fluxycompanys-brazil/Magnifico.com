import React from 'react';
import { Utensils, BookOpen, ChevronRight } from 'lucide-react';

export const HeroBanner: React.FC = () => {
  const whatsappUrl =
    'https://wa.me/551143096520?text=Ol%C3%A1!%20Gostaria%20de%20fazer%20um%20pedido%20na%20Magn%C3%ADfico%20Burguer%20%26%20Pizza.';

  return (
    <section className="relative overflow-hidden border-b border-[#27272e] bg-[#0b0b0e] py-4 sm:py-6 lg:py-8">
      {/* Subtle ambient lighting */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-96 bg-[#c59b27]/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Official Banner Artwork */}
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-[#2e2e3a] shadow-2xl bg-[#09090d] group">
          <img
            src="/assets/aistudio/WhatsApp_Image_2026-11-05_at_14.51.13_95729847.jpeg"
            alt="Magnífico Burguer & Pizza - Sabor Incrível em Cada Mordida! Pizzas e Hambúrgueres de Alta Qualidade"
            referrerPolicy="no-referrer"
            className="w-full h-auto object-cover block"
          />

          {/* Interactive Clickable Hotspots overlaying the exact artwork buttons */}
          {/* 1. Hotspot: FAZER PEDIDO (Red Button on image) -> WhatsApp */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Fazer Pedido no WhatsApp (11) 4309-6520"
            className="absolute left-[29%] top-[73.5%] w-[20%] h-[9.5%] rounded-full opacity-0 hover:opacity-100 hover:ring-2 hover:ring-white/60 transition-all cursor-pointer bg-white/5 active:scale-95"
            title="Fazer Pedido no WhatsApp (11) 4309-6520"
          />

          {/* 2. Hotspot: VER CARDÁPIO (Dark Button on image) -> #rodizio-oficial */}
          <a
            href="#rodizio-oficial"
            aria-label="Ver Cardápio do Rodízio Magnífico"
            className="absolute left-[50.5%] top-[73.5%] w-[20%] h-[9.5%] rounded-full opacity-0 hover:opacity-100 hover:ring-2 hover:ring-[#c59b27]/80 transition-all cursor-pointer bg-white/5 active:scale-95"
            title="Ver Cardápio do Rodízio"
          />
        </div>

        {/* Dedicated Action Buttons Bar (Guarantees easy 1-touch tapping on mobile and desktop) */}
        <div className="mt-4 sm:mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {/* Button 1: Fazer Pedido -> WhatsApp */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[48px] px-6 sm:px-8 py-3.5 rounded-full bg-gradient-to-r from-[#dc2626] to-[#e11d48] hover:from-[#b91c1c] hover:to-[#be123c] text-white font-extrabold text-sm sm:text-base tracking-wider uppercase shadow-lg shadow-red-950/60 hover:shadow-red-700/30 transition-all duration-150 flex items-center justify-center gap-2 border border-red-400/30 active:scale-95 cursor-pointer"
          >
            <Utensils className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            <span>Fazer Pedido no WhatsApp</span>
            <ChevronRight className="w-4 h-4" />
          </a>

          {/* Button 2: Ver Cardápio -> #rodizio-oficial */}
          <a
            href="#rodizio-oficial"
            className="min-h-[48px] px-6 sm:px-8 py-3.5 rounded-full bg-[#121218] hover:bg-[#1a1a24] text-[#f4d58d] hover:text-white font-extrabold text-sm sm:text-base tracking-wider uppercase shadow-lg shadow-black/80 transition-all duration-150 flex items-center justify-center gap-2 border border-[#c59b27]/60 hover:border-[#c59b27] active:scale-95 cursor-pointer"
          >
            <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-[#e2ba60]" />
            <span>Ver Cardápio do Rodízio</span>
            <ChevronRight className="w-4 h-4 text-[#e2ba60]" />
          </a>
        </div>
      </div>
    </section>
  );
};


