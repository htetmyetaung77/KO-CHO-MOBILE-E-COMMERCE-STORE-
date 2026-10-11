import React from 'react';
import { X, ChevronDown, MoreVertical, Smartphone, Monitor } from 'lucide-react';
import { useShop } from '../context/ShopContext';

interface TelegramHeaderProps {
  isMobileDeviceView: boolean;
  setIsMobileDeviceView: (v: boolean) => void;
}

export const TelegramHeader: React.FC<TelegramHeaderProps> = ({
  isMobileDeviceView,
  setIsMobileDeviceView
}) => {
  const { settings, mode, setMode } = useShop();

  return (
    <div className="bg-[#1c2431] text-white px-3 py-2 flex items-center justify-between text-xs select-none border-b border-slate-800">
      {/* Left: Close icon & Title info */}
      <div className="flex items-center gap-3 overflow-hidden">
        <button
          onClick={() => {
            if (window.confirm('Close Telegram Mini App?')) {
              window.location.reload();
            }
          }}
          className="text-slate-300 hover:text-white p-1 rounded transition-colors"
          title="Close WebApp"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-1.5 font-bold text-sm tracking-tight text-white truncate">
            <span>{settings.shopName}</span>
          </div>
          <span className="text-[11px] text-slate-400 font-mono truncate">
            telegramecommerce.shop/products
          </span>
        </div>
      </div>

      {/* Right controls: View toggle, Chevron, 3 dots */}
      <div className="flex items-center gap-1 shrink-0">
        <button
          onClick={() => setMode(mode === 'admin' ? 'storefront' : 'admin')}
          className={`px-2 py-1 text-[11px] font-medium rounded-md transition-colors flex items-center gap-1 ${
            mode === 'admin'
              ? 'bg-purple-600/40 text-purple-200 border border-purple-500/50'
              : 'bg-emerald-600/40 text-emerald-200 border border-emerald-500/50'
          }`}
          title="Toggle between Shop Admin and Buyer Storefront"
        >
          <span>{mode === 'admin' ? 'Shop Admin' : 'Buyer Store'}</span>
        </button>

        <button
          onClick={() => setIsMobileDeviceView(!isMobileDeviceView)}
          className="p-1.5 text-slate-300 hover:text-white rounded hover:bg-slate-700/60 transition-colors"
          title={isMobileDeviceView ? 'Switch to Full Width Desktop' : 'Switch to Telegram Mobile Frame'}
        >
          {isMobileDeviceView ? (
            <Monitor className="w-4 h-4 text-slate-300" />
          ) : (
            <Smartphone className="w-4 h-4 text-slate-300" />
          )}
        </button>

        <button className="p-1 text-slate-300 hover:text-white">
          <ChevronDown className="w-4 h-4" />
        </button>
        <button className="p-1 text-slate-300 hover:text-white">
          <MoreVertical className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
