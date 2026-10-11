import React, { useState } from 'react';
import { Menu, Sparkles, RefreshCw, ShoppingBag, Eye, Store } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const ShopNavbar: React.FC = () => {
  const {
    settings,
    customization,
    setIsSideDrawerOpen,
    setActiveDrawerModal,
    formatPrice,
    cartCount,
    setIsCartOpen,
    mode,
    setMode
  } = useShop();

  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  const topBarThemeClasses: Record<string, string> = {
    'neon-purple': 'bg-gradient-to-r from-[#5925dc] via-[#6332ec] to-[#6e3ff3] text-white',
    'graphite-grey': 'bg-gradient-to-r from-[#1e293b] via-[#334155] to-[#475569] text-white',
    'clean-white': 'bg-gradient-to-r from-[#ffffff] via-[#f8fafc] to-[#f1f5f9] text-slate-900 border-b border-slate-200',
    'royal-navy': 'bg-gradient-to-r from-[#172554] via-[#1e3a8a] to-[#1d4ed8] text-white',
    'dark-emerald': 'bg-gradient-to-r from-[#022c22] via-[#065f46] to-[#047857] text-white',
    'ruby-rose': 'bg-gradient-to-r from-[#4c0519] via-[#9f1239] to-[#be123c] text-white',
    'ocean-cyan': 'bg-gradient-to-r from-[#083344] via-[#0369a1] to-[#0284c7] text-white',
    'sunset-flame': 'bg-gradient-to-r from-[#7c2d12] via-[#c2410c] to-[#ea580c] text-white'
  };

  const navClass = topBarThemeClasses[customization?.adminTopBarTheme || 'neon-purple'] || topBarThemeClasses['neon-purple'];
  const isWhiteTheme = customization?.adminTopBarTheme === 'clean-white';

  return (
    <header className={`${navClass} px-4 py-3 shadow-md sticky top-0 z-20 transition-colors duration-300`}>
      <div className="flex items-center justify-between gap-3">
        {/* Left: Hamburger menu button */}
        <button
          onClick={() => setIsSideDrawerOpen(true)}
          className={`p-1.5 -ml-1 ${isWhiteTheme ? 'text-slate-800 hover:bg-slate-100' : 'text-white hover:bg-white/15'} rounded-lg transition-colors active:scale-95`}
          aria-label="Open Shop Menu"
        >
          <Menu className="w-6 h-6 stroke-[2.2]" />
        </button>

        {/* Center: Shop title & Today revenue */}
        <div className="flex-1 text-center min-w-0">
          <h1 className={`text-[14px] font-extrabold uppercase tracking-wide truncate ${isWhiteTheme ? 'text-slate-900' : 'text-white'} drop-shadow-sm`}>
            {settings.shopName}
          </h1>
          <div className={`text-[11px] font-medium ${isWhiteTheme ? 'text-[#5f2eea] font-bold' : 'text-cyan-200'} tabular-nums`}>
            Today: {formatPrice(settings.todayRevenue)}
          </div>
        </div>

        {/* Right actions: AI Sparkle, Refresh, Store View */}
        <div className="flex items-center gap-1.5 -mr-1">
          <button
            onClick={() => setActiveDrawerModal('ai-agent')}
            className="p-1.5 text-white/90 hover:text-white hover:bg-white/15 rounded-lg transition-colors active:scale-95"
            title="AI Chatbot & Order Assistant"
          >
            <Sparkles className="w-5 h-5 text-amber-200" />
          </button>

          <button
            onClick={handleRefresh}
            className={`p-1.5 text-white/90 hover:text-white hover:bg-white/15 rounded-lg transition-colors active:scale-95 ${
              isRefreshing ? 'animate-spin' : ''
            }`}
            title="Refresh Catalog & Orders"
          >
            <RefreshCw className="w-5 h-5" />
          </button>

          {/* Toggle or Shopping Bag */}
          <button
            onClick={() => {
              if (mode === 'admin') {
                setMode('storefront');
              } else {
                setIsCartOpen(true);
              }
            }}
            className="relative p-1.5 text-white hover:bg-white/15 rounded-lg transition-colors active:scale-95"
            title={mode === 'admin' ? 'View Buyer Storefront' : 'View Cart'}
          >
            {mode === 'admin' ? (
              <Store className="w-5 h-5 text-emerald-300" />
            ) : (
              <ShoppingBag className="w-5 h-5" />
            )}
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
