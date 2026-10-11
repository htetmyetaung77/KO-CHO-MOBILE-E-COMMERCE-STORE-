import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  CartItem,
  Order,
  OrderStatus,
  Coupon,
  Giveaway,
  CustomerUser,
  DeliveryZone,
  PaymentConfig,
  ShopSettings,
  BotCommand,
  ChatMessage,
  CustomizationConfig
} from '../types';
import {
  DEFAULT_PRODUCTS,
  DEFAULT_ORDERS,
  DEFAULT_COUPONS,
  DEFAULT_GIVEAWAYS,
  DEFAULT_CUSTOMERS,
  DEFAULT_DELIVERY_ZONES,
  DEFAULT_PAYMENT_CONFIG,
  DEFAULT_SHOP_SETTINGS,
  DEFAULT_BOT_COMMANDS,
  DEFAULT_CUSTOMIZATION
} from '../data/defaultData';

interface ShopContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'createdAt'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  sortBy: 'default' | 'price-asc' | 'price-desc' | 'name';
  setSortBy: (s: 'default' | 'price-asc' | 'price-desc' | 'name') => void;

  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, selectedColor?: string, selectedStorage?: string) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;

  orders: Order[];
  createOrder: (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt'>) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  deleteOrder: (orderId: string) => void;

  coupons: Coupon[];
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  addCoupon: (coupon: Omit<Coupon, 'id' | 'usageCount'>) => void;
  deleteCoupon: (id: string) => void;

  giveaways: Giveaway[];
  addGiveaway: (gw: Omit<Giveaway, 'id' | 'participantsCount' | 'status'>) => void;

  customers: CustomerUser[];
  deliveryZones: DeliveryZone[];
  paymentConfig: PaymentConfig;
  updatePaymentConfig: (config: Partial<PaymentConfig>) => void;
  settings: ShopSettings;
  updateSettings: (updates: Partial<ShopSettings>) => void;
  botCommands: BotCommand[];
  chatMessages: ChatMessage[];
  sendChatMessage: (text: string, sender: 'customer' | 'admin') => void;

  activeTab: 'home' | 'orders' | 'products' | 'users' | 'chats' | 'settings';
  setActiveTab: (tab: 'home' | 'orders' | 'products' | 'users' | 'chats' | 'settings') => void;
  isSideDrawerOpen: boolean;
  setIsSideDrawerOpen: (open: boolean) => void;
  activeDrawerModal: string | null;
  setActiveDrawerModal: (modal: string | null) => void;

  mode: 'admin' | 'storefront';
  setMode: (mode: 'admin' | 'storefront') => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isNewProductModalOpen: boolean;
  setIsNewProductModalOpen: (open: boolean) => void;
  editingProduct: Product | null;
  setEditingProduct: (product: Product | null) => void;
  selectedProductDetail: Product | null;
  setSelectedProductDetail: (product: Product | null) => void;

  customization: CustomizationConfig;
  updateCustomization: (updates: Partial<CustomizationConfig>) => void;

  formatPrice: (amount: number) => string;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [customization, setCustomization] = useState<CustomizationConfig>(() => {
    const saved = localStorage.getItem('teleshop_customization');
    return saved ? JSON.parse(saved) : DEFAULT_CUSTOMIZATION;
  });

  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('teleshop_products');
    return saved ? JSON.parse(saved) : DEFAULT_PRODUCTS;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('teleshop_orders');
    return saved ? JSON.parse(saved) : DEFAULT_ORDERS;
  });

  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    const saved = localStorage.getItem('teleshop_coupons');
    return saved ? JSON.parse(saved) : DEFAULT_COUPONS;
  });

  const [giveaways, setGiveaways] = useState<Giveaway[]>(() => {
    const saved = localStorage.getItem('teleshop_giveaways');
    return saved ? JSON.parse(saved) : DEFAULT_GIVEAWAYS;
  });

  const [customers] = useState<CustomerUser[]>(DEFAULT_CUSTOMERS);
  const [deliveryZones] = useState<DeliveryZone[]>(DEFAULT_DELIVERY_ZONES);

  const [paymentConfig, setPaymentConfig] = useState<PaymentConfig>(() => {
    const saved = localStorage.getItem('teleshop_payment_config');
    return saved ? JSON.parse(saved) : DEFAULT_PAYMENT_CONFIG;
  });

  const [settings, setSettings] = useState<ShopSettings>(() => {
    const saved = localStorage.getItem('teleshop_settings');
    return saved ? JSON.parse(saved) : DEFAULT_SHOP_SETTINGS;
  });

  const [botCommands] = useState<BotCommand[]>(DEFAULT_BOT_COMMANDS);

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'customer',
      customerHandle: '@kyawswar_dev',
      text: 'မင်္ဂလာပါ iPhone 16 White colour 128GB ပစ္စည်းအသင့်ရှိလားဗျာ?',
      time: '09:12 AM'
    },
    {
      id: 'msg-2',
      sender: 'bot',
      customerHandle: '@kyawswar_dev',
      text: 'မင်္ဂလာပါ! iPhone 16 White 128GB အသင့်ရှိပါသည်ရှင်။ ဈေးနှုန်း 3,300,000 MMK ဖြစ်ပြီး ရန်ကုန်မြို့တွင်း အိမ်ရောက်ငွေချေ (COD) ရရှိပါသည်ရှင်။',
      time: '09:12 AM'
    },
    {
      id: 'msg-3',
      sender: 'customer',
      customerHandle: '@kyawswar_dev',
      text: 'ဟုတ်ကဲ့ အော်ဒါတင်လိုက်ပါပြီ KCB-8941 ပါ။ KPay ရှင်းထားပါတယ်!',
      time: '09:15 AM'
    }
  ]);

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('teleshop_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc' | 'name'>('default');

  const [activeTab, setActiveTab] = useState<'home' | 'orders' | 'products' | 'users' | 'chats' | 'settings'>('products');
  const [isSideDrawerOpen, setIsSideDrawerOpen] = useState(false);
  const [activeDrawerModal, setActiveDrawerModal] = useState<string | null>(null);

  const [mode, setMode] = useState<'admin' | 'storefront'>('admin');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isNewProductModalOpen, setIsNewProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [selectedProductDetail, setSelectedProductDetail] = useState<Product | null>(null);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('teleshop_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('teleshop_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('teleshop_coupons', JSON.stringify(coupons));
  }, [coupons]);

  useEffect(() => {
    localStorage.setItem('teleshop_payment_config', JSON.stringify(paymentConfig));
  }, [paymentConfig]);

  useEffect(() => {
    localStorage.setItem('teleshop_settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('teleshop_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('teleshop_customization', JSON.stringify(customization));
  }, [customization]);

  // Derived categories
  const categories = ['All', ...Array.from(new Set(products.map((p) => p.category)))];

  const addProduct = (newProd: Omit<Product, 'id' | 'createdAt'>) => {
    const prod: Product = {
      ...newProd,
      id: `prod-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setProducts((prev) => [prod, ...prev]);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)));
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const addToCart = (product: Product, quantity = 1, selectedColor?: string, selectedStorage?: string) => {
    setCart((prev) => {
      const existing = prev.find(
        (item) =>
          item.product.id === product.id &&
          item.selectedColor === selectedColor &&
          item.selectedStorage === selectedStorage
      );
      if (existing) {
        return prev.map((item) =>
          item === existing ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { product, quantity, selectedColor, selectedStorage }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const createOrder = (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt'>): Order => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const orderNumber = `KCB-${randomNum}`;
    const newOrder: Order = {
      ...orderData,
      id: `ord-${Date.now()}`,
      orderNumber,
      createdAt: new Date().toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      })
    };
    setOrders((prev) => [newOrder, ...prev]);

    // Update today's revenue if confirmed/paid
    setSettings((prev) => ({
      ...prev,
      todayRevenue: prev.todayRevenue + newOrder.total
    }));

    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, status } : o)));
  };

  const deleteOrder = (orderId: string) => {
    setOrders((prev) => prev.filter((o) => o.id !== orderId));
  };

  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    const found = coupons.find((c) => c.code === cleanCode && c.active);
    if (!found) {
      return { success: false, message: 'Invalid or expired coupon code' };
    }
    if (cartSubtotal < found.minSpend) {
      return {
        success: false,
        message: `Minimum spend of ${formatPrice(found.minSpend)} required for this coupon`
      };
    }
    setAppliedCoupon(found);
    return { success: true, message: `Coupon ${found.code} applied successfully!` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  const addCoupon = (coupon: Omit<Coupon, 'id' | 'usageCount'>) => {
    const newC: Coupon = {
      ...coupon,
      id: `c-${Date.now()}`,
      usageCount: 0
    };
    setCoupons((prev) => [newC, ...prev]);
  };

  const deleteCoupon = (id: string) => {
    setCoupons((prev) => prev.filter((c) => c.id !== id));
  };

  const addGiveaway = (gw: Omit<Giveaway, 'id' | 'participantsCount' | 'status'>) => {
    const newGw: Giveaway = {
      ...gw,
      id: `gw-${Date.now()}`,
      participantsCount: 0,
      status: 'active'
    };
    setGiveaways((prev) => [newGw, ...prev]);
  };

  const updatePaymentConfig = (config: Partial<PaymentConfig>) => {
    setPaymentConfig((prev) => ({ ...prev, ...config }));
  };

  const updateSettings = (updates: Partial<ShopSettings>) => {
    setSettings((prev) => ({ ...prev, ...updates }));
  };

  const updateCustomization = (updates: Partial<CustomizationConfig>) => {
    setCustomization((prev) => ({ ...prev, ...updates }));
  };

  const sendChatMessage = (text: string, sender: 'customer' | 'admin') => {
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender,
      customerHandle: '@customer_user',
      text,
      time: now
    };
    setChatMessages((prev) => [...prev, newMsg]);

    // Automated bot reply simulation if customer writes
    if (sender === 'customer' && settings.autoBotReply) {
      setTimeout(() => {
        let reply = 'မင်္ဂလာပါ! အော်ဒါများကို bot တွင် တိုက်ရိုက်မှာယူနိုင်ပါပြီ။ Admin မှ မကြာမီ ပြန်လည်ဖြေကြားပေးပါမည်။';
        const lower = text.toLowerCase();
        if (lower.includes('iphone') || lower.includes('phone') || lower.includes('ဖုန်း')) {
          reply = 'iPhone 16 / iPhone 15 Pro ပစ္စည်းအသင့်ရှိပြီး 1 Year Warranty အပြည့်ပါဝင်ပါသည်ရှင်။ ရန်ကုန် / မန္တလေး အိမ်ရောက်ငွေချေ ရပါသည်!';
        } else if (lower.includes('kpay') || lower.includes('ငွေချေ')) {
          reply = `KBZPay လက်ခံသော အကောင့်: ${paymentConfig.kpayPhone} (${paymentConfig.kpayName}) ဖြစ်ပါသည်ရှင်။`;
        }
        setChatMessages((prev) => [
          ...prev,
          {
            id: `msg-${Date.now() + 1}`,
            sender: 'bot',
            customerHandle: '@customer_user',
            text: reply,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      }, 1000);
    }
  };

  const formatPrice = (amount: number): string => {
    if (settings.currency === 'USD') {
      const usd = (amount / settings.exchangeRate).toFixed(2);
      return `$${Number(usd).toLocaleString()}`;
    }
    return `${amount.toLocaleString()} MMK`;
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        categories,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        sortBy,
        setSortBy,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        orders,
        createOrder,
        updateOrderStatus,
        deleteOrder,
        coupons,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        addCoupon,
        deleteCoupon,
        giveaways,
        addGiveaway,
        customers,
        deliveryZones,
        paymentConfig,
        updatePaymentConfig,
        settings,
        updateSettings,
        customization,
        updateCustomization,
        botCommands,
        chatMessages,
        sendChatMessage,
        activeTab,
        setActiveTab,
        isSideDrawerOpen,
        setIsSideDrawerOpen,
        activeDrawerModal,
        setActiveDrawerModal,
        mode,
        setMode,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isNewProductModalOpen,
        setIsNewProductModalOpen,
        editingProduct,
        setEditingProduct,
        selectedProductDetail,
        setSelectedProductDetail,
        formatPrice
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
