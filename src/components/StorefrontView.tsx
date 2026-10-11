import React, { useState } from 'react';
import {
  Search,
  ShoppingCart,
  Send,
  ShieldCheck,
  Truck,
  RotateCcw,
  Tag,
  Phone,
  Facebook,
  ChevronRight,
  Sparkles,
  PackageCheck,
  Check
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from './ProductCard';

export const StorefrontView: React.FC = () => {
  const {
    products,
    categories,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    cartCount,
    setIsCartOpen,
    settings,
    customization,
    formatPrice,
    setSelectedProductDetail
  } = useShop();

  const [orderLookupId, setOrderLookupId] = useState('');
  const [showOrderLookupModal, setShowOrderLookupModal] = useState(false);
  const [lookupResult, setLookupResult] = useState<any>(null);
  const { orders } = useShop();

  const filteredProducts = products.filter((prod) => {
    const matchCategory =
      selectedCategory === 'All' ||
      prod.category.toLowerCase() === selectedCategory.toLowerCase();

    const matchSearch =
      !searchQuery ||
      prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchCategory && matchSearch;
  });

  const handleLookupOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const found = orders.find(
      (o) =>
        o.orderNumber.toLowerCase() === orderLookupId.trim().toLowerCase() ||
        o.customerPhone.includes(orderLookupId.trim())
    );
    setLookupResult(found || 'not_found');
  };

  const bannerImg =
    customization.shopBanners?.[0] ||
    '/src/assets/images/hero_ecommerce_showcase_1791651826248.jpg';

  // Theme gradient class
  const themeGradients: Record<string, string> = {
    default: 'from-[#5f2eea] via-[#7b42f6] to-[#a855f7]',
    midnight: 'from-[#0f172a] via-[#1e293b] to-[#334155]',
    emerald: 'from-[#065f46] via-[#059669] to-[#10b981]',
    rose: 'from-[#9f1239] via-[#e11d48] to-[#fb7185]',
    slate: 'from-[#334155] via-[#475569] to-[#64748b]'
  };

  const activeGradient = themeGradients[customization.publicShopTheme] || themeGradients.rose;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-28 text-xs font-sans">
      {/* Storefront Hero Header */}
      <div className={`bg-gradient-to-r ${activeGradient} text-white px-4 pt-5 pb-6 shadow-md relative overflow-hidden`}>
        {/* Decorative background image overlay */}
        <div className="absolute inset-0 opacity-15 mix-blend-overlay">
          <img src={bannerImg} alt="" className="w-full h-full object-cover" />
        </div>

        <div className="relative z-10 max-w-lg mx-auto">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold tracking-wider uppercase bg-white/20 backdrop-blur-xs px-2.5 py-0.5 rounded-full">
              Official Telegram Store
            </span>

            {/* Shopping Bag Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-xs transition-colors flex items-center gap-1 font-bold text-xs"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Cart</span>
              {cartCount > 0 && (
                <span className="bg-amber-400 text-slate-900 text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          <div className="mt-4">
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white drop-shadow-xs">
              {settings.shopName}
            </h1>
            <p className="text-white/85 text-xs mt-1 max-w-sm leading-relaxed">
              {settings.welcomeMessage || settings.tagline}
            </p>
          </div>

          {/* Quick Telegram Bot Badge */}
          <div className="flex flex-wrap items-center gap-2 mt-4">
            <a
              href={`https://t.me/${settings.botUsername.replace('@', '')}`}
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1.5 rounded-xl bg-white text-slate-900 font-extrabold text-xs shadow-sm hover:bg-slate-100 flex items-center gap-1.5 transition-colors"
            >
              <Send className="w-3.5 h-3.5 text-[#5f2eea]" />
              <span>{settings.botUsername}</span>
            </a>

            <button
              onClick={() => setShowOrderLookupModal(true)}
              className="px-3 py-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-xs backdrop-blur-xs flex items-center gap-1.5 transition-colors"
            >
              <PackageCheck className="w-3.5 h-3.5" />
              <span>Track Order</span>
            </button>
          </div>
        </div>
      </div>

      {/* Store Search & Filter Bar */}
      <div className="bg-white px-4 py-3 border-b border-slate-200 sticky top-0 z-20 shadow-2xs">
        <div className="max-w-lg mx-auto space-y-2.5">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search phones, AirPods, accessories..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#5f2eea]/30"
            />
          </div>

          {/* Horizontal Category Slider */}
          <div className="flex gap-1.5 overflow-x-auto pb-0.5 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap shrink-0 transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#5f2eea] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="max-w-lg mx-auto px-4 py-3">
        <div className="grid grid-cols-3 gap-2 text-center text-[10px] text-slate-600">
          <div className="p-2 bg-white rounded-xl border border-slate-200 flex flex-col items-center gap-1 shadow-2xs">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span className="font-semibold">Official Warranty</span>
          </div>
          <div className="p-2 bg-white rounded-xl border border-slate-200 flex flex-col items-center gap-1 shadow-2xs">
            <Truck className="w-4 h-4 text-blue-600" />
            <span className="font-semibold">Yangon/Gate COD</span>
          </div>
          <div className="p-2 bg-white rounded-xl border border-slate-200 flex flex-col items-center gap-1 shadow-2xs">
            <Send className="w-4 h-4 text-[#5f2eea]" />
            <span className="font-semibold">Telegram 24/7 Bot</span>
          </div>
        </div>
      </div>

      {/* Product Catalog Grid */}
      <div className="max-w-lg mx-auto px-3">
        <div className="flex items-center justify-between px-1 mb-2">
          <span className="font-bold text-slate-800 text-xs uppercase tracking-wider">
            Available Products ({filteredProducts.length})
          </span>
          <span className="text-[11px] text-slate-500 font-medium">100% Brand New In Stock</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* Social & Contact Card */}
      <div className="max-w-lg mx-auto p-4 mt-6">
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-3">
          <h3 className="font-bold text-slate-900 text-xs">Customer Service & Hotline</h3>
          <div className="grid grid-cols-2 gap-2">
            <a
              href={`tel:${settings.supportPhone}`}
              className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100 flex items-center gap-2 transition-colors"
            >
              <Phone className="w-4 h-4 text-emerald-600" />
              <div>
                <div className="text-[10px] text-slate-400">Call Us</div>
                <div className="font-bold font-mono text-slate-800 text-xs">{settings.supportPhone}</div>
              </div>
            </a>

            <a
              href={`https://t.me/${settings.adminTelegram.replace('@', '')}`}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100 flex items-center gap-2 transition-colors"
            >
              <Send className="w-4 h-4 text-[#5f2eea]" />
              <div>
                <div className="text-[10px] text-slate-400">Telegram Admin</div>
                <div className="font-bold text-slate-800 text-xs">{settings.adminTelegram}</div>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Order Lookup Modal */}
      {showOrderLookupModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-sm w-full p-5 shadow-2xl border border-slate-100 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-sm">Track Order Status</h3>
              <button
                onClick={() => {
                  setShowOrderLookupModal(false);
                  setLookupResult(null);
                }}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleLookupOrder} className="space-y-2">
              <input
                type="text"
                required
                placeholder="Enter Order ID (e.g. KCB-8941) or Phone"
                value={orderLookupId}
                onChange={(e) => setOrderLookupId(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800"
              />
              <button
                type="submit"
                className="w-full py-2 bg-[#5f2eea] text-white font-bold rounded-xl text-xs hover:bg-[#5024cf]"
              >
                Search Order
              </button>
            </form>

            {lookupResult && lookupResult !== 'not_found' && (
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-1.5">
                <div className="flex justify-between font-bold">
                  <span>{lookupResult.orderNumber}</span>
                  <span className="text-blue-600 uppercase">{lookupResult.status}</span>
                </div>
                <div className="text-slate-600 text-[11px]">
                  Customer: {lookupResult.customerName} ({lookupResult.customerPhone})
                </div>
                <div className="text-slate-600 text-[11px]">
                  Total: {formatPrice(lookupResult.total)} ({lookupResult.paymentMethod.toUpperCase()})
                </div>
              </div>
            )}

            {lookupResult === 'not_found' && (
              <div className="p-3 bg-rose-50 text-rose-700 rounded-xl text-xs text-center font-medium">
                No order found with this ID or phone number.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
