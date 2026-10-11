import React, { useState } from 'react';
import {
  Settings,
  Store,
  DollarSign,
  Languages,
  Bot,
  Save,
  RotateCcw,
  Check,
  Send
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const SettingsView: React.FC = () => {
  const { settings, updateSettings } = useShop();

  const [shopName, setShopName] = useState(settings.shopName);
  const [botUsername, setBotUsername] = useState(settings.botUsername);
  const [adminTelegram, setAdminTelegram] = useState(settings.adminTelegram);
  const [currency, setCurrency] = useState<'MMK' | 'USD'>(settings.currency);
  const [exchangeRate, setExchangeRate] = useState(settings.exchangeRate);
  const [autoBotReply, setAutoBotReply] = useState(settings.autoBotReply);
  const [welcomeMessage, setWelcomeMessage] = useState(settings.welcomeMessage);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({
      shopName: shopName.trim(),
      botUsername: botUsername.trim(),
      adminTelegram: adminTelegram.trim(),
      currency,
      exchangeRate: Number(exchangeRate),
      autoBotReply,
      welcomeMessage: welcomeMessage.trim()
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleResetData = () => {
    if (window.confirm('Reset all demo products and orders to original default state?')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="p-3 sm:p-4 space-y-3 pb-24 text-xs">
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs">
        <div className="flex items-center gap-2">
          <Settings className="w-5 h-5 text-[#5f2eea]" />
          <h2 className="text-sm font-extrabold text-slate-900">Shop & Bot Configuration</h2>
        </div>
        <p className="text-[11px] text-slate-500 mt-1">
          Configure your Telegram bot username, store currency, payment details, and automation.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-3">
        {/* Store Profile */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-3">
          <h3 className="font-bold text-slate-900 flex items-center gap-1.5 text-xs">
            <Store className="w-4 h-4 text-[#5f2eea]" />
            <span>Storefront Profile</span>
          </h3>

          <div>
            <label className="block text-slate-600 mb-1 font-medium">Shop Brand Name</label>
            <input
              type="text"
              value={shopName}
              onChange={(e) => setShopName(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs font-bold"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-slate-600 mb-1 font-medium">Telegram Bot Username</label>
              <input
                type="text"
                value={botUsername}
                onChange={(e) => setBotUsername(e.target.value)}
                placeholder="@KoChoMobileBot"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs font-mono"
              />
            </div>
            <div>
              <label className="block text-slate-600 mb-1 font-medium">Admin Telegram Handle</label>
              <input
                type="text"
                value={adminTelegram}
                onChange={(e) => setAdminTelegram(e.target.value)}
                placeholder="@kocho_admin"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs font-mono"
              />
            </div>
          </div>
        </div>

        {/* Currency & Exchange */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-3">
          <h3 className="font-bold text-slate-900 flex items-center gap-1.5 text-xs">
            <DollarSign className="w-4 h-4 text-emerald-600" />
            <span>Currency & Pricing</span>
          </h3>

          <div className="grid grid-cols-2 gap-2 items-center">
            <div>
              <label className="block text-slate-600 mb-1 font-medium">Display Currency</label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as any)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs font-bold"
              >
                <option value="MMK">MMK (Myanmar Kyats)</option>
                <option value="USD">USD ($)</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-600 mb-1 font-medium">1 USD = MMK Rate</label>
              <input
                type="number"
                value={exchangeRate}
                onChange={(e) => setExchangeRate(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs font-mono"
              />
            </div>
          </div>
        </div>

        {/* Bot Automation */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-3">
          <h3 className="font-bold text-slate-900 flex items-center gap-1.5 text-xs">
            <Bot className="w-4 h-4 text-purple-600" />
            <span>Telegram Bot Auto-Responder</span>
          </h3>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={autoBotReply}
              onChange={(e) => setAutoBotReply(e.target.checked)}
              className="w-4 h-4 text-[#5f2eea] rounded border-slate-300"
            />
            <span className="font-semibold text-slate-700">
              Enable Automatic 24/7 Telegram Reply
            </span>
          </label>

          <div>
            <label className="block text-slate-600 mb-1 font-medium">Welcome Greeting Message (Burmese)</label>
            <textarea
              rows={2}
              value={welcomeMessage}
              onChange={(e) => setWelcomeMessage(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs"
            />
          </div>
        </div>

        {/* Save button */}
        <div className="flex items-center gap-2 pt-1">
          <button
            type="submit"
            className="flex-1 py-3 px-4 bg-[#5f2eea] hover:bg-[#5024cf] text-white font-bold rounded-xl transition-all shadow-md shadow-purple-600/20 flex items-center justify-center gap-2 active:scale-98"
          >
            {saved ? <Check className="w-4 h-4 text-white" /> : <Save className="w-4 h-4" />}
            <span>{saved ? 'Saved Successfully!' : 'Save Settings'}</span>
          </button>

          <button
            type="button"
            onClick={handleResetData}
            className="p-3 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl font-bold transition-colors"
            title="Reset to default demo data"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};
