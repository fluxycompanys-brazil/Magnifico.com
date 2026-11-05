/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { PhysicalMenuModal } from './components/PhysicalMenuModal';
import { OfficialRodizioBoard } from './components/OfficialRodizioBoard';
import { MENU_ITEMS } from './data/menuData';
import { MenuItem, CartItem, OrderType, SelectedExtra } from './types/menu';
import { formatBRL, triggerHaptic } from './utils/formatters';
import { ShoppingBag, Sparkles, Phone, MapPin, Clock, ChevronUp } from 'lucide-react';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  // Modals & Drawers
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isPhysicalMenuOpen, setIsPhysicalMenuOpen] = useState(false);

  // Cart & Order State
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [orderType, setOrderType] = useState<OrderType>('delivery');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Cart total calculations
  const cartItemCount = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }, [cartItems]);

  const cartTotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.totalPrice, 0);
  }, [cartItems]);

  // Toast feedback
  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Add customized item to cart
  const handleAddToCart = (
    item: MenuItem,
    quantity: number,
    selectedDoneness?: string,
    selectedSize?: string,
    selectedExtras: SelectedExtra[] = [],
    observation?: string
  ) => {
    triggerHaptic();

    const sizeMultiplier = item.availableSizes?.find((s) => s.name === selectedSize)?.priceMultiplier || 1.0;
    const basePrice = (item.promotionalPrice || item.price) * sizeMultiplier;
    const extrasPrice = selectedExtras.reduce((acc, e) => acc + e.extra.price * e.quantity, 0);
    const unitPrice = basePrice + extrasPrice;
    const totalPrice = unitPrice * quantity;

    const newCartItem: CartItem = {
      cartItemId: `${item.id}-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      menuItem: item,
      quantity,
      selectedDoneness,
      selectedSize,
      selectedExtras,
      observation,
      unitPrice,
      totalPrice,
    };

    setCartItems((prev) => [...prev, newCartItem]);
    showToast(`Adicionado: ${quantity}x ${item.name}`);
  };

  // Quick add for simple items
  const handleQuickAdd = (item: MenuItem, e: React.MouseEvent) => {
    e.stopPropagation();
    
    // If it has customizable extras or doneness, open the modal instead
    if (item.availableDoneness || (item.availableExtras && item.availableExtras.length > 0) || item.availableSizes) {
      setSelectedItem(item);
      return;
    }

    triggerHaptic();
    const unitPrice = item.promotionalPrice || item.price;
    const newCartItem: CartItem = {
      cartItemId: `${item.id}-${Date.now()}`,
      menuItem: item,
      quantity: 1,
      selectedExtras: [],
      unitPrice,
      totalPrice: unitPrice,
    };

    setCartItems((prev) => [...prev, newCartItem]);
    showToast(`Adicionado: 1x ${item.name}`);
  };

  const handleUpdateQuantity = (cartItemId: string, newQty: number) => {
    triggerHaptic();
    if (newQty <= 0) {
      handleRemoveItem(cartItemId);
      return;
    }

    setCartItems((prev) =>
      prev.map((item) => {
        if (item.cartItemId === cartItemId) {
          return {
            ...item,
            quantity: newQty,
            totalPrice: item.unitPrice * newQty,
          };
        }
        return item;
      })
    );
  };

  const handleRemoveItem = (cartItemId: string) => {
    triggerHaptic();
    setCartItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const rodizioItem = MENU_ITEMS.find((i) => i.id === 'rodizio-magnifico');

  const handleOrderRodizioFromBoard = (selectedRounds: string[]) => {
    if (!rodizioItem) return;
    const observation =
      selectedRounds.length > 0
        ? `1ª Rodada escolhida: ${selectedRounds.join(', ')}`
        : 'Rodízio completo com todas as rodadas livres';
    handleAddToCart(rodizioItem, 1, undefined, undefined, [], observation);
    setIsCartOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0e0e11] text-[#f4f4f5] flex flex-col font-sans selection:bg-[#c59b27]/30 selection:text-[#fbfbfb]">
      
      {/* Fixed Luxury Header */}
      <Header
        cartItemCount={cartItemCount}
        cartTotal={cartTotal}
        onOpenCart={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        isSearchOpen={isSearchOpen}
        onToggleSearch={() => setIsSearchOpen((prev) => !prev)}
        onOpenMenuAttachment={() => setIsPhysicalMenuOpen(true)}
      />

      {/* Hero Showcase Banner */}
      <HeroBanner />

      {/* Official Physical Menu Board (Cardápio Rodízio Oficial) */}
      <main id="rodizio-oficial" className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <OfficialRodizioBoard
          items={MENU_ITEMS}
          onSelectItem={(item) => setSelectedItem(item)}
          onAddRodizioToCart={handleOrderRodizioFromBoard}
          onOpenPhysicalPhoto={() => setIsPhysicalMenuOpen(true)}
          searchQuery={searchQuery}
          onClearSearch={() => setSearchQuery('')}
        />
      </main>

      {/* Floating Mobile Cart Pill (Thumb-friendly & within 15% sticky cap) */}
      {cartItemCount > 0 && !isCartOpen && (
        <aside
          aria-label="Resumo do pedido atual"
          className="md:hidden fixed bottom-4 left-4 right-4 z-40"
        >
          <button
            onClick={() => {
              triggerHaptic();
              setIsCartOpen(true);
            }}
            className="w-full py-3.5 px-5 rounded-xl bg-[#c59b27] hover:bg-[#d4af37] active:scale-98 text-[#0e0e11] font-bold text-sm shadow-2xl shadow-black/80 flex items-center justify-between border border-[#e2ba60]/40 transition-all"
          >
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-4 h-4" />
              <span>Ver Pedido ({cartItemCount} {cartItemCount === 1 ? 'item' : 'itens'})</span>
            </div>
            <span className="font-mono text-base tabular-nums">
              {formatBRL(cartTotal)}
            </span>
          </button>
        </aside>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 md:bottom-6 right-6 z-50 bg-[#16161f] border border-[#c59b27]/60 text-[#f4f4f5] px-4 py-3 rounded-xl shadow-2xl text-xs font-semibold flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <Sparkles className="w-4 h-4 text-[#e2ba60]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-20 border-t border-[#27272e] bg-[#09090c] text-xs text-[#71717a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            
            {/* Col 1: Brand */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded bg-[#c59b27] flex items-center justify-center text-[#0e0e11] font-bold font-serif text-sm">
                  M
                </div>
                <span className="font-serif text-base font-bold text-[#f4f4f5] tracking-wider">
                  MAGNÍFICO
                </span>
              </div>
              <p className="text-xs text-[#71717a] leading-relaxed">
                Burguer gourmet grelhado na brasa e pizzas artesanais de fermentação lenta em forno a lenha. A autêntica experiência gastronômica.
              </p>
            </div>

            {/* Col 2: Horários */}
            <div className="space-y-2">
              <span className="font-semibold uppercase tracking-wider text-[#d4d4d8] block flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#e2ba60]" />
                Horário de Funcionamento
              </span>
              <p>Terça a Domingo: 18h00 às 23h45</p>
              <p>Sexta e Sábado: 18h00 às 00h30</p>
              <p className="text-[#a1a1aa]">Segunda-feira: Fechado para descanso</p>
            </div>

            {/* Col 3: Atendimento */}
            <div className="space-y-2">
              <span className="font-semibold uppercase tracking-wider text-[#d4d4d8] block flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#e2ba60]" />
                Pedidos & Reservas
              </span>
              <p>
                WhatsApp:{' '}
                <a
                  href="https://wa.me/551143096520"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#25D366] hover:underline font-mono font-medium"
                >
                  (11) 4309-6520
                </a>
              </p>
              <p>Salão com Rodízio & Espaço Família</p>
              <p>Atendimento & Pedidos via WhatsApp</p>
            </div>

            {/* Col 4: Informações do Rodízio */}
            <div className="space-y-3">
              <span className="font-semibold uppercase tracking-wider text-[#d4d4d8] block flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#e2ba60]" />
                Rodízio Completo
              </span>
              <p>R$ 79,90 por pessoa.</p>
              <p>Burguers Gourmet, Pizzas Premium Doces e Salgadas, Refil de Refrigerante livre.</p>
              <button
                onClick={() => setIsPhysicalMenuOpen(true)}
                className="text-left text-[#e2ba60] hover:underline transition-colors block text-xs font-semibold cursor-pointer"
              >
                Ver Foto do Panfleto Original
              </button>
            </div>

          </div>

          <div className="pt-8 border-t border-[#1c1c24] flex flex-col sm:flex-row items-center justify-between gap-4">
            <p>© 2026 Magnífico Burguer e Pizza. Todos os direitos reservados.</p>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 text-xs text-[#a1a1aa] hover:text-[#e2ba60] transition-colors cursor-pointer"
            >
              <span>Voltar ao topo</span>
              <ChevronUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </footer>

      {/* Modals & Overlays */}
      <ProductDetailModal
        item={selectedItem}
        isOpen={Boolean(selectedItem)}
        onClose={() => setSelectedItem(null)}
        onAddToCart={handleAddToCart}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        orderType={orderType}
        onChangeOrderType={setOrderType}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        orderType={orderType}
        onClearCart={handleClearCart}
      />

      <PhysicalMenuModal
        isOpen={isPhysicalMenuOpen}
        onClose={() => setIsPhysicalMenuOpen(false)}
      />

    </div>
  );
}
