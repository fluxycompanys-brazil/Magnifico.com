export type CategoryId =
  | 'hamburgueres-artesanais'
  | 'pizzas-tradicionais'
  | 'pizzas-especiais'
  | 'combos-exclusivos'
  | 'porcoes'
  | 'acompanhamentos'
  | 'bebidas'
  | 'milk-shakes'
  | 'sobremesas';

export interface ExtraOption {
  id: string;
  name: string;
  price: number;
}

export interface MenuItem {
  id: string;
  name: string;
  category: CategoryId;
  price: number;
  promotionalPrice?: number;
  description: string;
  sensoryDescription: string;
  ingredients: string[];
  image: string;
  isHouseFavorite?: boolean;
  isChefSpecial?: boolean;
  isIncludedInRodizio?: boolean;
  serves?: string;
  prepTime?: string;
  allergens?: string[];
  availableDoneness?: boolean;
  availableSizes?: { name: string; priceMultiplier: number; label: string }[];
  availableExtras?: ExtraOption[];
}

export interface SelectedExtra {
  extra: ExtraOption;
  quantity: number;
}

export interface CartItem {
  cartItemId: string;
  menuItem: MenuItem;
  quantity: number;
  selectedDoneness?: string;
  selectedSize?: string;
  selectedExtras: SelectedExtra[];
  observation?: string;
  unitPrice: number;
  totalPrice: number;
}

export type OrderType = 'delivery' | 'dine-in';

export interface CustomerOrder {
  customerName: string;
  phone: string;
  orderType: OrderType;
  tableNumber?: string;
  address?: string;
  paymentMethod: 'pix' | 'cartao_credito' | 'cartao_debito' | 'dinheiro';
  needChangeFor?: string;
}
