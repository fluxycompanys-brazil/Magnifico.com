import React, { useState } from 'react';
import { X, CheckCircle, Send, Copy, ArrowLeft, QrCode, CreditCard, Banknote, ShieldCheck } from 'lucide-react';
import { CartItem, CustomerOrder, OrderType } from '../types/menu';
import { formatBRL, generateWhatsAppOrderMessage, triggerHaptic } from '../utils/formatters';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  orderType: OrderType;
  onClearCart: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  orderType: initialOrderType,
  onClearCart,
}) => {
  if (!isOpen) return null;

  const [customer, setCustomer] = useState<CustomerOrder>({
    customerName: '',
    phone: '',
    orderType: initialOrderType,
    tableNumber: '',
    address: '',
    paymentMethod: 'pix',
    needChangeFor: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedPix, setCopiedPix] = useState(false);
  const [copiedWhatsApp, setCopiedWhatsApp] = useState(false);

  const subtotal = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
  const deliveryFee = customer.orderType === 'delivery' ? (subtotal >= 100 ? 0 : 8.0) : 0;
  const total = subtotal + deliveryFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    triggerHaptic();
    setIsSubmitted(true);
  };

  const handleSendWhatsApp = () => {
    triggerHaptic();
    const message = generateWhatsAppOrderMessage(cartItems, subtotal, deliveryFee, total, customer);
    const encoded = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/551143096520?text=${encoded}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleCopyMessage = () => {
    triggerHaptic();
    const message = generateWhatsAppOrderMessage(cartItems, subtotal, deliveryFee, total, customer);
    navigator.clipboard.writeText(message);
    setCopiedWhatsApp(true);
    setTimeout(() => setCopiedWhatsApp(false), 2500);
  };

  const simulatedPixKey = "00020126580014br.gov.bcb.pix0136magnifico-burger-pix-checkout-20265204000053039865405" + total.toFixed(2);

  const handleCopyPix = () => {
    triggerHaptic();
    navigator.clipboard.writeText(simulatedPixKey);
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Click outside backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-lg bg-[#14141a] border border-[#27272e] rounded-2xl shadow-2xl p-6 overflow-hidden z-10 max-h-[90vh] overflow-y-auto no-scrollbar">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Fechar checkout"
          className="absolute top-4 right-4 p-2 rounded-lg text-[#a1a1aa] hover:text-[#f4f4f5] hover:bg-[#1f1f28] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            <div className="mb-6">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#e2ba60] block">
                Etapa Final
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#f4f4f5]">
                Concluir Pedido
              </h3>
              <p className="text-xs text-[#a1a1aa] mt-1">
                Revise suas preferências para envio à cozinha da Magnífico.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Customer Name */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-[#a1a1aa] block mb-1.5">
                  Seu Nome Completo *
                </label>
                <input
                  type="text"
                  required
                  value={customer.customerName}
                  onChange={(e) => setCustomer({ ...customer, customerName: e.target.value })}
                  placeholder="Como podemos te chamar?"
                  className="w-full bg-[#1c1c24] border border-[#2e2e38] rounded-lg px-3.5 py-2.5 text-sm text-[#f4f4f5] placeholder-[#71717a] focus:outline-none focus:border-[#c59b27] transition-colors"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-[#a1a1aa] block mb-1.5">
                  WhatsApp / Celular *
                </label>
                <input
                  type="tel"
                  required
                  value={customer.phone}
                  onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                  placeholder="(11) 99999-9999"
                  className="w-full bg-[#1c1c24] border border-[#2e2e38] rounded-lg px-3.5 py-2.5 text-sm text-[#f4f4f5] placeholder-[#71717a] focus:outline-none focus:border-[#c59b27] transition-colors"
                />
              </div>

              {/* Order Type Toggle */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-[#a1a1aa] block mb-1.5">
                  Local de Consumo *
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setCustomer({ ...customer, orderType: 'delivery' })}
                    className={`py-2 px-3 rounded-lg text-xs font-medium border text-center transition-all ${
                      customer.orderType === 'delivery'
                        ? 'bg-[#c59b27]/15 border-[#c59b27] text-[#e2ba60] font-semibold'
                        : 'bg-[#1c1c24] border-[#2e2e38] text-[#a1a1aa]'
                    }`}
                  >
                    Entrega em Domicílio
                  </button>
                  <button
                    type="button"
                    onClick={() => setCustomer({ ...customer, orderType: 'dine-in' })}
                    className={`py-2 px-3 rounded-lg text-xs font-medium border text-center transition-all ${
                      customer.orderType === 'dine-in'
                        ? 'bg-[#c59b27]/15 border-[#c59b27] text-[#e2ba60] font-semibold'
                        : 'bg-[#1c1c24] border-[#2e2e38] text-[#a1a1aa]'
                    }`}
                  >
                    Na Mesa (Salão)
                  </button>
                </div>
              </div>

              {/* Address or Table Number */}
              {customer.orderType === 'delivery' ? (
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#a1a1aa] block mb-1.5">
                    Endereço de Entrega Completo *
                  </label>
                  <input
                    type="text"
                    required
                    value={customer.address}
                    onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                    placeholder="Rua, número, complemento, bairro"
                    className="w-full bg-[#1c1c24] border border-[#2e2e38] rounded-lg px-3.5 py-2.5 text-sm text-[#f4f4f5] placeholder-[#71717a] focus:outline-none focus:border-[#c59b27] transition-colors"
                  />
                </div>
              ) : (
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wider text-[#a1a1aa] block mb-1.5">
                    Número da sua Mesa no Salão *
                  </label>
                  <input
                    type="text"
                    required
                    value={customer.tableNumber}
                    onChange={(e) => setCustomer({ ...customer, tableNumber: e.target.value })}
                    placeholder="Ex: Mesa 07 ou Balcão"
                    className="w-full bg-[#1c1c24] border border-[#2e2e38] rounded-lg px-3.5 py-2.5 text-sm text-[#f4f4f5] placeholder-[#71717a] focus:outline-none focus:border-[#c59b27] transition-colors"
                  />
                </div>
              )}

              {/* Payment Method */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-[#a1a1aa] block mb-1.5">
                  Forma de Pagamento
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'pix', label: 'PIX (Imediato)', icon: QrCode },
                    { id: 'cartao_credito', label: 'Cartão Crédito', icon: CreditCard },
                    { id: 'cartao_debito', label: 'Cartão Débito', icon: CreditCard },
                    { id: 'dinheiro', label: 'Dinheiro', icon: Banknote },
                  ].map((p) => {
                    const Icon = p.icon;
                    const isSelected = customer.paymentMethod === p.id;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setCustomer({ ...customer, paymentMethod: p.id as any })}
                        className={`p-2.5 rounded-lg border text-left flex items-center gap-2 text-xs transition-all ${
                          isSelected
                            ? 'bg-[#c59b27]/15 border-[#c59b27] text-[#e2ba60] font-semibold'
                            : 'bg-[#1c1c24] border-[#2e2e38] text-[#a1a1aa]'
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">{p.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {customer.paymentMethod === 'dinheiro' && (
                <div>
                  <label className="text-xs font-semibold text-[#a1a1aa] block mb-1">
                    Precisa de troco para quanto? (Opcional)
                  </label>
                  <input
                    type="text"
                    value={customer.needChangeFor}
                    onChange={(e) => setCustomer({ ...customer, needChangeFor: e.target.value })}
                    placeholder="Ex: R$ 100,00"
                    className="w-full bg-[#1c1c24] border border-[#2e2e38] rounded-lg px-3.5 py-2 text-sm text-[#f4f4f5] placeholder-[#71717a] focus:outline-none focus:border-[#c59b27]"
                  />
                </div>
              )}

              {/* Total review */}
              <div className="p-3 bg-[#0e0e11] rounded-lg border border-[#27272e] flex items-center justify-between text-sm">
                <span className="text-[#a1a1aa]">Valor Final a Pagar:</span>
                <span className="font-mono text-lg font-bold text-[#e2ba60] tabular-nums">
                  {formatBRL(total)}
                </span>
              </div>

              <button
                type="submit"
                className="w-full min-h-[48px] py-3.5 px-4 rounded-lg bg-[#c59b27] hover:bg-[#d4af37] text-[#0e0e11] font-semibold text-sm transition-all duration-150 flex items-center justify-center gap-2 shadow-lg shadow-[#c59b27]/25 mt-4"
              >
                <span>Confirmar e Gerar Pedido</span>
                <ShieldCheck className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : (
          /* Confirmation Screen */
          <div className="text-center py-4 space-y-5">
            <div className="w-14 h-14 rounded-full bg-[#c59b27]/15 border border-[#c59b27]/40 flex items-center justify-center mx-auto text-[#e2ba60]">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs uppercase font-mono tracking-widest text-[#e2ba60]">
                Pedido Registrado com Sucesso
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#f4f4f5] mt-1">
                Obrigado, {customer.customerName}!
              </h3>
              <p className="text-xs text-[#a1a1aa] mt-1.5 max-w-sm mx-auto">
                Seu pedido no valor de <strong className="text-[#f4f4f5] font-mono">{formatBRL(total)}</strong> está pronto para ser enviado diretamente para o atendimento.
              </p>
            </div>

            {/* PIX copy box if chosen */}
            {customer.paymentMethod === 'pix' && (
              <div className="p-4 bg-[#0e0e11] rounded-xl border border-[#27272e] text-left space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#f4f4f5] flex items-center gap-1.5">
                    <QrCode className="w-4 h-4 text-[#e2ba60]" />
                    Chave PIX Copia e Cola
                  </span>
                  <span className="text-[11px] text-[#e2ba60] font-mono">
                    {formatBRL(total)}
                  </span>
                </div>
                <div className="p-2.5 bg-[#181820] rounded border border-[#2e2e38] text-[11px] font-mono text-[#a1a1aa] break-all select-all">
                  {simulatedPixKey}
                </div>
                <button
                  onClick={handleCopyPix}
                  className="w-full py-2 rounded bg-[#272733] hover:bg-[#323240] text-xs font-semibold text-[#f4f4f5] flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedPix ? 'Chave PIX Copiada!' : 'Copiar Chave PIX'}</span>
                </button>
              </div>
            )}

            {/* Actions */}
            <div className="space-y-3 pt-2">
              <button
                onClick={handleSendWhatsApp}
                className="w-full min-h-[48px] py-3.5 px-4 rounded-lg bg-[#25D366] hover:bg-[#20ba5a] text-[#0e0e11] font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-98"
              >
                <Send className="w-4 h-4" />
                <span>Enviar Pedido pelo WhatsApp (11) 4309-6520</span>
              </button>

              <button
                onClick={handleCopyMessage}
                className="w-full py-2.5 px-4 rounded-lg bg-[#1c1c24] hover:bg-[#252530] text-xs text-[#a1a1aa] hover:text-[#f4f4f5] border border-[#2e2e38] flex items-center justify-center gap-2 transition-colors"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copiedWhatsApp ? 'Comprovante Copiado!' : 'Copiar Resumo do Pedido'}</span>
              </button>

              <button
                onClick={() => {
                  onClearCart();
                  onClose();
                }}
                className="text-xs text-[#71717a] hover:text-[#a1a1aa] transition-colors pt-2 block mx-auto"
              >
                Voltar ao Cardápio e Novo Pedido
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
