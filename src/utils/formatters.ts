import { CartItem, CustomerOrder } from '../types/menu';

export function formatBRL(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

export function triggerHaptic() {
  if (typeof window !== 'undefined' && 'vibrate' in navigator) {
    try {
      navigator.vibrate(30);
    } catch {
      // ignore
    }
  }
}

export function generateWhatsAppOrderMessage(
  cartItems: CartItem[],
  subtotal: number,
  deliveryFee: number,
  total: number,
  customer: CustomerOrder
): string {
  const lineBreak = '\n';
  let message = `🍽️ *PEDIDO MAGNÍFICO BURGER & PIZZA* 🍽️${lineBreak}`;
  message += `━━━━━━━━━━━━━━━━━━━━${lineBreak}`;
  message += `👤 *Cliente:* ${customer.customerName}${lineBreak}`;
  message += `📱 *Telefone:* ${customer.phone}${lineBreak}`;
  message += `📍 *Tipo:* ${customer.orderType === 'dine-in' ? `Mesa nº ${customer.tableNumber || 'Salão'}` : `Entrega: ${customer.address || 'Não informado'}`}${lineBreak}`;
  message += `💳 *Pagamento:* ${formatPaymentMethod(customer.paymentMethod)}${customer.needChangeFor ? ` (Troco para R$ ${customer.needChangeFor})` : ''}${lineBreak}`;
  message += `━━━━━━━━━━━━━━━━━━━━${lineBreak}`;
  message += `*ITENS DO PEDIDO:*${lineBreak}`;

  cartItems.forEach((item, index) => {
    message += `${lineBreak}${index + 1}. *${item.quantity}x ${item.menuItem.name}* (${formatBRL(item.totalPrice)})${lineBreak}`;
    if (item.selectedSize) {
      message += `   • Tamanho: ${item.selectedSize}${lineBreak}`;
    }
    if (item.selectedDoneness) {
      message += `   • Ponto: ${item.selectedDoneness}${lineBreak}`;
    }
    if (item.selectedExtras && item.selectedExtras.length > 0) {
      item.selectedExtras.forEach((extra) => {
        message += `   • + ${extra.quantity}x ${extra.extra.name} (+${formatBRL(extra.extra.price * extra.quantity)})${lineBreak}`;
      });
    }
    if (item.observation) {
      message += `   • Obs: _${item.observation}_${lineBreak}`;
    }
  });

  message += `${lineBreak}━━━━━━━━━━━━━━━━━━━━${lineBreak}`;
  message += `Subtotal: ${formatBRL(subtotal)}${lineBreak}`;
  if (customer.orderType === 'delivery') {
    message += `Taxa de Entrega: ${deliveryFee === 0 ? 'Grátis' : formatBRL(deliveryFee)}${lineBreak}`;
  }
  message += `*TOTAL A PAGAR: ${formatBRL(total)}*${lineBreak}`;
  message += `━━━━━━━━━━━━━━━━━━━━${lineBreak}`;
  message += `_Obrigado por escolher a Magnífico! Aguardamos a confirmação._ ✨`;

  return message;
}

function formatPaymentMethod(method: CustomerOrder['paymentMethod']): string {
  switch (method) {
    case 'pix':
      return 'PIX (Chave imediata)';
    case 'cartao_credito':
      return 'Cartão de Crédito na Entrega / Máquina';
    case 'cartao_debito':
      return 'Cartão de Débito';
    case 'dinheiro':
      return 'Dinheiro em Espécie';
    default:
      return method;
  }
}
