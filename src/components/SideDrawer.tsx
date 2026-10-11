import React from 'react';
import {
  X,
  TrendingUp,
  Gift,
  Newspaper,
  CreditCard,
  Palette,
  Bot,
  UserCheck,
  QrCode,
  UtensilsCrossed,
  Armchair,
  ClipboardList,
  Radio,
  Send,
  HelpCircle,
  ShieldCheck,
  Settings,
  LogOut
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const SideDrawer: React.FC = () => {
  const {
    isSideDrawerOpen,
    setIsSideDrawerOpen,
    setActiveDrawerModal,
    setActiveTab,
    settings
  } = useShop();

  if (!isSideDrawerOpen) return null;

  const handleItemClick = (modalKey: string) => {
    setIsSideDrawerOpen(false);
    if (modalKey === 'settings-tab') {
      setActiveTab('settings');
    } else {
      setActiveDrawerModal(modalKey);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        onClick={() => setIsSideDrawerOpen(false)}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      />

      {/* Drawer content */}
      <div className="relative w-72 max-w-[85vw] bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-250 ease-out">
        {/* Top Header */}
        <div className="px-5 py-4 flex items-center justify-between border-b border-slate-100">
          <h2 className="text-lg font-extrabold text-[#5f2eea]">Menu</h2>
          <button
            onClick={() => setIsSideDrawerOpen(false)}
            className="w-7 h-7 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-500 flex items-center justify-center transition-colors"
            aria-label="Close Menu"
          >
            <X className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        {/* Scrollable Menu Items */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 divide-y divide-slate-100">
          {/* Main items */}
          <div className="space-y-1">
            <button
              onClick={() => handleItemClick('profit')}
              className="w-full flex items-center gap-3.5 px-3 py-2 rounded-xl text-slate-700 hover:bg-slate-50 transition-colors text-xs font-semibold"
            >
              <TrendingUp className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Profit</span>
            </button>

            <button
              onClick={() => handleItemClick('giveaways')}
              className="w-full flex items-center gap-3.5 px-3 py-2 rounded-xl text-slate-700 hover:bg-slate-50 transition-colors text-xs font-semibold"
            >
              <Gift className="w-4 h-4 text-pink-600 shrink-0" />
              <span>Giveaways</span>
            </button>

            <button
              onClick={() => handleItemClick('newsfeed')}
              className="w-full flex items-center gap-3.5 px-3 py-2 rounded-xl text-slate-700 hover:bg-slate-50 transition-colors text-xs font-semibold"
            >
              <Newspaper className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Newsfeed</span>
            </button>

            <button
              onClick={() => handleItemClick('payments')}
              className="w-full flex items-center gap-3.5 px-3 py-2 rounded-xl text-slate-700 hover:bg-slate-50 transition-colors text-xs font-semibold"
            >
              <CreditCard className="w-4 h-4 text-indigo-600 shrink-0" />
              <span>Payments</span>
            </button>

            <button
              onClick={() => handleItemClick('customize')}
              className="w-full flex items-center gap-3.5 px-3 py-2 rounded-xl text-slate-700 hover:bg-slate-50 transition-colors text-xs font-semibold"
            >
              <Palette className="w-4 h-4 text-purple-600 shrink-0" />
              <span>Customize</span>
            </button>

            <button
              onClick={() => handleItemClick('ai-agent')}
              className="w-full flex items-center gap-3.5 px-3 py-2 rounded-xl text-slate-700 hover:bg-slate-50 transition-colors text-xs font-semibold"
            >
              <Bot className="w-4 h-4 text-teal-600 shrink-0" />
              <span>AI Agent</span>
            </button>

            <button
              onClick={() => handleItemClick('staff')}
              className="w-full flex items-center gap-3.5 px-3 py-2 rounded-xl text-slate-700 hover:bg-slate-50 transition-colors text-xs font-semibold"
            >
              <UserCheck className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Staff Accounts</span>
            </button>
          </div>

          {/* QR MENU Card Group */}
          <div className="pt-2">
            <div className="text-[11px] font-bold text-[#5f2eea] flex items-center gap-1 px-1 mb-1.5 uppercase tracking-wider">
              <UtensilsCrossed className="w-3.5 h-3.5" />
              <span>QR MENU</span>
            </div>

            <div className="bg-slate-50/80 rounded-2xl p-1.5 border border-slate-100 space-y-0.5">
              <button
                onClick={() => handleItemClick('qr-dashboard')}
                className="w-full flex items-center gap-3 px-2.5 py-1.5 rounded-lg text-slate-700 hover:bg-white transition-colors text-xs font-medium"
              >
                <QrCode className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span>QR Dashboard</span>
              </button>
              <button
                onClick={() => handleItemClick('qr-menu')}
                className="w-full flex items-center gap-3 px-2.5 py-1.5 rounded-lg text-slate-700 hover:bg-white transition-colors text-xs font-medium"
              >
                <UtensilsCrossed className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span>QR Menu</span>
              </button>
              <button
                onClick={() => handleItemClick('qr-tables')}
                className="w-full flex items-center gap-3 px-2.5 py-1.5 rounded-lg text-slate-700 hover:bg-white transition-colors text-xs font-medium"
              >
                <Armchair className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span>QR Tables</span>
              </button>
              <button
                onClick={() => handleItemClick('qr-orders')}
                className="w-full flex items-center gap-3 px-2.5 py-1.5 rounded-lg text-slate-700 hover:bg-white transition-colors text-xs font-medium"
              >
                <ClipboardList className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span>QR Orders</span>
              </button>
            </div>
          </div>

          {/* TELEGRAM Card Group */}
          <div className="pt-2">
            <div className="text-[11px] font-bold text-[#5f2eea] flex items-center gap-1 px-1 mb-1.5 uppercase tracking-wider">
              <Send className="w-3.5 h-3.5" />
              <span>TELEGRAM</span>
            </div>

            <div className="bg-slate-50/80 rounded-2xl p-1.5 border border-slate-100 space-y-0.5">
              <button
                onClick={() => handleItemClick('broadcast')}
                className="w-full flex items-center gap-3 px-2.5 py-1.5 rounded-lg text-slate-700 hover:bg-white transition-colors text-xs font-medium"
              >
                <Radio className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span>Broadcast</span>
              </button>
              <button
                onClick={() => handleItemClick('commands')}
                className="w-full flex items-center gap-3 px-2.5 py-1.5 rounded-lg text-slate-700 hover:bg-white transition-colors text-xs font-medium"
              >
                <Send className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span>Telegram Command</span>
              </button>
              <button
                onClick={() => handleItemClick('bot-customization')}
                className="w-full flex items-center gap-3 px-2.5 py-1.5 rounded-lg text-slate-700 hover:bg-white transition-colors text-xs font-medium"
              >
                <Bot className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span>Bot Customization</span>
              </button>
            </div>
          </div>

          {/* Footer Utility links */}
          <div className="pt-2 space-y-1">
            <button
              onClick={() => handleItemClick('faqs')}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-slate-700 hover:bg-slate-50 transition-colors text-xs font-semibold"
            >
              <HelpCircle className="w-4 h-4 text-slate-500 shrink-0" />
              <span>FAQs</span>
            </button>
            <button
              onClick={() => handleItemClick('subscription')}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-slate-700 hover:bg-slate-50 transition-colors text-xs font-semibold"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Subscription</span>
            </button>
            <button
              onClick={() => handleItemClick('settings-tab')}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-slate-700 hover:bg-slate-50 transition-colors text-xs font-semibold"
            >
              <Settings className="w-4 h-4 text-slate-500 shrink-0" />
              <span>Settings</span>
            </button>
            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to log out?')) {
                  alert('Session reset.');
                }
              }}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-rose-600 hover:bg-rose-50 transition-colors text-xs font-semibold"
            >
              <LogOut className="w-4 h-4 text-rose-600 shrink-0" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Footer info */}
        <div className="p-3 bg-slate-50 border-t border-slate-100 text-[10px] text-slate-500 text-center">
          <span>{settings.shopName}</span>
          <span className="mx-1.5">·</span>
          <span>v2.4 Pro</span>
        </div>
      </div>
    </div>
  );
};
