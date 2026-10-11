import React from 'react';
import {
  LayoutGrid,
  Box,
  ShoppingBag,
  Users,
  MessageCircle,
  Settings,
  Plus
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const BottomNav: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    setIsNewProductModalOpen,
    orders,
    chatMessages
  } = useShop();

  const pendingOrdersCount = orders.filter((o) => o.status === 'pending').length;

  const navItems = [
    {
      id: 'home',
      label: 'Home',
      icon: LayoutGrid,
      badge: 0
    },
    {
      id: 'orders',
      label: 'Orders',
      icon: Box,
      badge: pendingOrdersCount
    },
    {
      id: 'products',
      label: 'Products',
      icon: ShoppingBag,
      badge: 0
    },
    {
      id: 'users',
      label: 'Users',
      icon: Users,
      badge: 0
    },
    {
      id: 'chats',
      label: 'Chats',
      icon: MessageCircle,
      badge: 1 // simulated new customer inquiry
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      badge: 0
    }
  ] as const;

  return (
    <>
      {/* Floating Action Button (+) matching Screenshot 1 */}
      {activeTab === 'products' && (
        <button
          onClick={() => setIsNewProductModalOpen(true)}
          className="fixed bottom-20 right-4 md:right-8 w-13 h-13 rounded-full bg-[#5f2eea] text-white shadow-xl shadow-purple-600/30 flex items-center justify-center hover:bg-[#5024cf] active:scale-95 transition-all z-20 group"
          aria-label="Add New Product"
        >
          <Plus className="w-7 h-7 stroke-[2.6] group-hover:rotate-90 transition-transform duration-200" />
        </button>
      )}

      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200/90 shadow-lg px-2 py-1.5 z-20">
        <div className="max-w-lg mx-auto grid grid-cols-6 gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all relative ${
                  isActive
                    ? 'text-[#5f2eea] font-bold'
                    : 'text-slate-400 hover:text-slate-600 font-medium'
                }`}
              >
                <div className="relative">
                  <Icon
                    className={`w-5 h-5 transition-transform ${
                      isActive ? 'scale-110 stroke-[2.4]' : 'stroke-[1.8]'
                    }`}
                  />
                  {item.badge > 0 && (
                    <span className="absolute -top-1 -right-2 bg-rose-500 text-white text-[9px] font-bold min-w-3.5 h-3.5 px-0.5 rounded-full flex items-center justify-center shadow-xs">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className="text-[10px] mt-0.5 tracking-tight truncate w-full text-center">
                  {item.label}
                </span>
                {isActive && (
                  <span className="w-1 h-1 rounded-full bg-[#5f2eea] mt-0.5" />
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
};
