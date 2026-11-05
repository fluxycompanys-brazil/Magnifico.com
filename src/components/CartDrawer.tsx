import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Bike, UtensilsCrossed } from 'lucide-react';
import { CartItem, OrderType } from '../types/menu';
import { formatBRL, triggerHaptic } from '../utils/formatters';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  orderType: OrderType;
  onChangeOrderType: (type: OrderType) => void;
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  orderType,
  onChangeOrderType,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.totalPrice, 0);
  const deliveryFee = orderType === 'delivery' ? (subtotal >= 100 ? 0 : 8.0) : 0;
  const total = subtotal + deliveryFee;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      
      {/* Dimmed backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#121217] border-l border-[#27272e] shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300 ease-out">
          
          {/* Drawer Header */}
          <div className="p-5 border-b border-[#27272e] bg-[#0e0e11] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#c59b27]/15 border border-[#c59b27]/30 flex items-center justify-center">
                <ShoppingBag className="w-4 h-4 text-[#e2ba60]" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-[#f4f4f5]">
                  Seu Pedido
                </h3>
                <span className="text-xs text-[#a1a1aa]">
                  {items.length === 0 ? 'Sacola vazia' : `${items.length} ${items.length === 1 ? 'item' : 'itens'}`}
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              aria-label="Fechar carrinho"
              className="p-2 rounded-lg text-[#a1a1aa] hover:text-[#f4f4f5] hover:bg-[#1f1f28] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Delivery / Dine-in Segmented Switch */}
          <div className="p-4 bg-[#16161d] border-b border-[#27272e]">
            <div className="grid grid-cols-2 p-1 bg-[#0e0e11] rounded-lg border border-[#27272e]">
              <button
                onClick={() => {
                  triggerHaptic();
                  onChangeOrderType('delivery');
                }}
                className={`py-2 px-3 rounded-md text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                  orderType === 'delivery'
                    ? 'bg-[#c59b27] text-[#0e0e11] shadow-sm'
                    : 'text-[#a1a1aa] hover:text-[#f4f4f5]'
                }`}
              >
                <Bike className="w-3.5 h-3.5" />
                <span>Delivery (Entrega)</span>
              </button>

              <button
                onClick={() => {
                  triggerHaptic();
                  onChangeOrderType('dine-in');
                }}
                className={`py-2 px-3 rounded-md text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                  orderType === 'dine-in'
                    ? 'bg-[#c59b27] text-[#0e0e11] shadow-sm'
                    : 'text-[#a1a1aa] hover:text-[#f4f4f5]'
                }`}
              >
                <UtensilsCrossed className="w-3.5 h-3.5" />
                <span>No Salão (Mesa)</span>
              </button>
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-[#71717a] space-y-3">
                <ShoppingBag className="w-12 h-12 stroke-[1.2] opacity-40 text-[#a1a1aa]" />
                <p className="font-serif text-lg text-[#a1a1aa]">
                  Sua sacola gastronômica está vazia
                </p>
                <p className="text-xs text-[#71717a] max-w-xs">
                  Selecione os hambúrgueres artesanais, pizzas a lenha ou o famoso Rodízio Magnífico para começar.
                </p>
                <button
                  onClick={onClose}
                  className="mt-2 px-4 py-2 rounded-lg bg-[#1f1f28] hover:bg-[#282834] text-xs font-medium text-[#e2ba60] border border-[#2e2e38] transition-colors"
                >
                  Explorar Pratos
                </button>
              </div>
            ) : (
              items.map((cartItem) => (
                <div
                  key={cartItem.cartItemId}
                  className="bg-[#181820] rounded-xl border border-[#27272e] p-3.5 space-y-3 transition-colors hover:border-[#383844]"
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={cartItem.menuItem.image}
                      alt={cartItem.menuItem.name}
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 rounded-lg object-cover shrink-0 border border-[#27272e]"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-serif text-sm font-bold text-[#f4f4f5] truncate">
                          {cartItem.menuItem.name}
                        </h4>
                        <span className="font-mono text-sm font-bold text-[#e2ba60] tabular-nums shrink-0">
                          {formatBRL(cartItem.totalPrice)}
                        </span>
                      </div>

                      {/* Details & Customizations */}
                      <div className="text-[11px] text-[#a1a1aa] mt-1 space-y-0.5">
                        {cartItem.selectedSize && (
                          <div className="text-[#d4d4d8]">
                            Tamanho: <span className="font-medium">{cartItem.selectedSize}</span>
                          </div>
                        )}
                        {cartItem.selectedDoneness && (
                          <div className="text-[#d4d4d8]">
                            Ponto: <span className="font-medium">{cartItem.selectedDoneness}</span>
                          </div>
                        )}
                        {cartItem.selectedExtras && cartItem.selectedExtras.length > 0 && (
                          <div className="text-[#e2ba60]">
                            Extras: {cartItem.selectedExtras.map((e) => e.extra.name).join(', ')}
                          </div>
                        )}
                        {cartItem.observation && (
                          <div className="italic text-[#71717a]">
                            Obs: "{cartItem.observation}"
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Quantity and removal footer */}
                  <div className="flex items-center justify-between pt-2 border-t border-[#22222a]">
                    <button
                      onClick={() => {
                        triggerHaptic();
                        onRemoveItem(cartItem.cartItemId);
                      }}
                      aria-label="Remover item"
                      className="text-xs text-[#71717a] hover:text-[#e63946] flex items-center gap-1 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remover</span>
                    </button>

                    <div className="flex items-center gap-2 bg-[#121217] border border-[#27272e] rounded-lg p-0.5">
                      <button
                        onClick={() => {
                          triggerHaptic();
                          onUpdateQuantity(cartItem.cartItemId, cartItem.quantity - 1);
                        }}
                        aria-label="Diminuir"
                        className="w-7 h-7 rounded flex items-center justify-center text-[#a1a1aa] hover:text-[#f4f4f5] hover:bg-[#202028] transition-colors"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-6 text-center font-mono text-xs font-bold text-[#f4f4f5] tabular-nums">
                        {cartItem.quantity}
                      </span>
                      <button
                        onClick={() => {
                          triggerHaptic();
                          onUpdateQuantity(cartItem.cartItemId, cartItem.quantity + 1);
                        }}
                        aria-label="Aumentar"
                        className="w-7 h-7 rounded flex items-center justify-center text-[#a1a1aa] hover:text-[#f4f4f5] hover:bg-[#202028] transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer & Checkout Action */}
          {items.length > 0 && (
            <div className="p-5 bg-[#0e0e11] border-t border-[#27272e] space-y-4">
              
              {/* Financial Breakdown */}
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between text-[#a1a1aa]">
                  <span>Subtotal</span>
                  <span className="font-mono tabular-nums text-[#f4f4f5]">
                    {formatBRL(subtotal)}
                  </span>
                </div>

                {orderType === 'delivery' && (
                  <div className="flex items-center justify-between text-[#a1a1aa]">
                    <span>Taxa de Entrega</span>
                    <span className="font-mono tabular-nums text-[#f4f4f5]">
                      {deliveryFee === 0 ? (
                        <span className="text-[#e2ba60] font-semibold">Grátis (Pedido &gt; R$ 100)</span>
                      ) : (
                        formatBRL(deliveryFee)
                      )}
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between text-base font-bold text-[#f4f4f5] pt-2 border-t border-[#22222a]">
                  <span className="font-serif">Total Estimado</span>
                  <span className="font-mono text-lg text-[#e2ba60] tabular-nums">
                    {formatBRL(total)}
                  </span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={() => {
                  triggerHaptic();
                  onProceedToCheckout();
                }}
                className="w-full min-h-[48px] px-6 py-3.5 rounded-lg bg-[#c59b27] hover:bg-[#d4af37] active:scale-98 text-[#0e0e11] font-semibold text-sm transition-all duration-150 flex items-center justify-center gap-2 shadow-lg shadow-[#c59b27]/25"
              >
                <span>Finalizar Pedido</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
