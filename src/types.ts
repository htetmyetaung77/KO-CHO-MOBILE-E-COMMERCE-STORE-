export interface Product {
  id: string;
  name: string;
  price: number; // in MMK
  originalPrice?: number;
  category: string;
  inStock: boolean;
  stockCount: number;
  image: string;
  description: string;
  specs?: Record<string, string>;
  colors?: string[];
  storage?: string[];
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedStorage?: string;
}

export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
export type PaymentMethod = 'kpay' | 'wavepay' | 'cod' | 'cbpay' | 'stars' | 'usdt';

export interface Order {
  id: string;
  orderNumber: string; // e.g. KCB-8942
  customerName: string;
  customerPhone: string;
  customerTelegram: string;
  address: string;
  city: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  paymentMethod: PaymentMethod;
  paymentStatus: 'pending' | 'paid' | 'verified';
  status: OrderStatus;
  notes?: string;
  createdAt: string;
}

export interface Coupon {
  id: string;
  code: string;
  discountPercent?: number;
  discountAmount?: number;
  minSpend: number;
  active: boolean;
  usageCount: number;
  expiresAt: string;
}

export interface Giveaway {
  id: string;
  title: string;
  prize: string;
  endDate: string;
  participantsCount: number;
  status: 'active' | 'drawn';
  winner?: string;
}

export interface CustomerUser {
  id: string;
  name: string;
  phone: string;
  telegramHandle: string;
  ordersCount: number;
  totalSpent: number;
  points: number;
  lastActive: string;
}

export interface DeliveryZone {
  id: string;
  name: string;
  fee: number;
  estimatedTime: string;
  freeThreshold?: number;
}

export interface PaymentConfig {
  kpayPhone: string;
  kpayName: string;
  kpayQrImage?: string;
  wavePhone: string;
  waveName: string;
  cbAccount: string;
  cbName: string;
  codEnabled: boolean;
  starsEnabled: boolean;
}

export type AdminTemplate = 'classic' | 'midnight';
export type PublicShopTheme = 'default' | 'midnight' | 'emerald' | 'rose' | 'slate';
export type AdminTopBarTheme =
  | 'neon-purple'
  | 'graphite-grey'
  | 'clean-white'
  | 'royal-navy'
  | 'dark-emerald'
  | 'ruby-rose'
  | 'ocean-cyan'
  | 'sunset-flame';

export interface SocialLink {
  id: string;
  platform: 'phone' | 'facebook' | 'telegram' | 'tiktok' | 'viber';
  value: string;
  label?: string;
}

export interface AIAgentConfig {
  enabled: boolean;
  gender: 'male' | 'female';
  customPrompt: string;
  quickQuestions: string[];
  quickReplies: string[];
}

export interface CustomizationConfig {
  adminTemplate: AdminTemplate;
  publicShopTheme: PublicShopTheme;
  adminTopBarTheme: AdminTopBarTheme;
  orderButtonLabel: string;
  currency: 'MMK' | 'USD' | 'THB' | 'SGD';
  shopBanners: string[];
  socialLinks: SocialLink[];
  aiAgent: AIAgentConfig;
}

export interface ShopSettings {
  shopName: string;
  tagline: string;
  botUsername: string;
  channelUsername: string;
  adminTelegram: string;
  adminChatId?: string;
  botToken?: string;
  supportPhone: string;
  currency: 'MMK' | 'USD';
  exchangeRate: number; // 1 USD = MMK
  language: 'my' | 'en';
  todayRevenue: number;
  autoBotReply: boolean;
  welcomeMessage: string;
}

export interface BotCommand {
  command: string;
  description: string;
  response: string;
  enabled: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'customer' | 'bot' | 'admin';
  text: string;
  time: string;
  customerHandle: string;
}
