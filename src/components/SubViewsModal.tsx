import React, { useState } from 'react';
import {
  X,
  TrendingUp,
  Gift,
  Ticket,
  Newspaper,
  CreditCard,
  Palette,
  Bot,
  UserCheck,
  QrCode,
  Radio,
  Send,
  HelpCircle,
  ShieldCheck,
  Truck,
  User,
  Award,
  Check,
  Plus,
  Trash2,
  Copy,
  CheckCheck
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const SubViewsModal: React.FC = () => {
  const {
    activeDrawerModal,
    setActiveDrawerModal,
    settings,
    updateSettings,
    formatPrice,
    orders,
    coupons,
    addCoupon,
    deleteCoupon,
    giveaways,
    addGiveaway,
    paymentConfig,
    updatePaymentConfig,
    deliveryZones,
    botCommands
  } = useShop();

  const [copied, setCopied] = useState(false);

  // New Coupon form state
  const [newCode, setNewCode] = useState('');
  const [newDiscount, setNewDiscount] = useState(10);
  const [newMinSpend, setNewMinSpend] = useState(300000);

  // New Giveaway form state
  const [gwTitle, setGwTitle] = useState('');
  const [gwPrize, setGwPrize] = useState('');
  const [gwEndDate, setGwEndDate] = useState('2026-11-01');

  // Broadcast state
  const [broadcastText, setBroadcastText] = useState(
    '🔥 THADINGYUT SPECIAL PROMO! iPhone 16 White 128GB in stock now! Free delivery in Yangon + Free 20W Fast Charger with every purchase. Order via @KoChoMobileBot!'
  );
  const [broadcastSent, setBroadcastSent] = useState(false);

  if (!activeDrawerModal) return null;

  const handleClose = () => {
    setActiveDrawerModal(null);
  };

  const handleAddCouponSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCode.trim()) return;
    addCoupon({
      code: newCode.trim().toUpperCase(),
      discountPercent: Number(newDiscount),
      minSpend: Number(newMinSpend),
      active: true,
      expiresAt: '2026-12-31'
    });
    setNewCode('');
  };

  const handleAddGiveawaySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gwTitle.trim() || !gwPrize.trim()) return;
    addGiveaway({
      title: gwTitle.trim(),
      prize: gwPrize.trim(),
      endDate: gwEndDate
    });
    setGwTitle('');
    setGwPrize('');
  };

  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    setBroadcastSent(true);
    setTimeout(() => {
      setBroadcastSent(false);
      setActiveDrawerModal(null);
    }, 1800);
  };

  const totalSales = orders.reduce((acc, o) => acc + o.total, 0);
  const estProfit = Math.round(totalSales * 0.18); // ~18% profit margin on tech products

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-100 overflow-hidden">
        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-wide">
            {activeDrawerModal === 'profit' && '📈 Profit & Financial Analytics'}
            {activeDrawerModal === 'giveaways' && '🎁 Giveaway Campaigns'}
            {activeDrawerModal === 'coupons' && '🎫 Coupon Discounts Manager'}
            {activeDrawerModal === 'newsfeed' && '📰 Shop Announcements & Newsfeed'}
            {activeDrawerModal === 'payments' && '💳 Payment Gateways Setup'}
            {activeDrawerModal === 'customize' && '🎨 Shop Branding & Customization'}
            {activeDrawerModal === 'ai-agent' && '🤖 AI Telegram Bot Auto-Reply'}
            {activeDrawerModal === 'staff' && '👥 Staff Accounts & Permissions'}
            {activeDrawerModal === 'qr-dashboard' && '㗊 QR Menu Dashboard'}
            {activeDrawerModal === 'qr-menu' && '🍽️ In-Store QR Table Menu'}
            {activeDrawerModal === 'qr-tables' && '🪑 Store Tables Setup'}
            {activeDrawerModal === 'qr-orders' && '📋 QR Dine-In Orders'}
            {activeDrawerModal === 'broadcast' && '📡 Telegram Channel Broadcast'}
            {activeDrawerModal === 'commands' && '✈️ Telegram Bot Commands'}
            {activeDrawerModal === 'bot-customization' && '🤖 Bot Token & Webhook Setup'}
            {activeDrawerModal === 'delivery' && '🚚 Delivery Fees & Township Zones'}
            {activeDrawerModal === 'profile' && '📋 Shop Owner Profile'}
            {activeDrawerModal === 'points' && '🎗️ Customer Loyalty Points'}
            {activeDrawerModal === 'faqs' && '❓ Frequently Asked Questions'}
            {activeDrawerModal === 'subscription' && '🛡️ Subscription Plan Status'}
          </h2>
          <button
            onClick={handleClose}
            className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 text-xs space-y-4">
          {/* PROFIT MODAL */}
          {activeDrawerModal === 'profit' && (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl">
                  <div className="text-[10px] font-bold text-emerald-800 uppercase">Total Sales</div>
                  <div className="text-base font-black text-emerald-950 mt-1 tabular-nums">
                    {formatPrice(totalSales)}
                  </div>
                </div>
                <div className="p-3.5 bg-purple-50 border border-purple-200 rounded-2xl">
                  <div className="text-[10px] font-bold text-purple-800 uppercase">Estimated Profit</div>
                  <div className="text-base font-black text-[#5f2eea] mt-1 tabular-nums">
                    {formatPrice(estProfit)}
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-2">
                <h4 className="font-bold text-slate-800">Financial Breakdown</h4>
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500">Today's Revenue</span>
                  <span className="font-bold text-slate-900 tabular-nums">
                    {formatPrice(settings.todayRevenue)}
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500">Gross Orders Count</span>
                  <span className="font-bold text-slate-900">{orders.length} orders</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span className="text-slate-500">Average Order Value</span>
                  <span className="font-bold text-slate-900 tabular-nums">
                    {formatPrice(orders.length ? Math.round(totalSales / orders.length) : 0)}
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Average Margin</span>
                  <span className="font-bold text-emerald-600">~18.2%</span>
                </div>
              </div>
            </div>
          )}

          {/* GIVEAWAYS MODAL */}
          {activeDrawerModal === 'giveaways' && (
            <div className="space-y-4">
              <div className="bg-pink-50 border border-pink-200 rounded-2xl p-3.5 space-y-2">
                <h4 className="font-bold text-pink-900">Create New Giveaway</h4>
                <form onSubmit={handleAddGiveawaySubmit} className="space-y-2">
                  <input
                    type="text"
                    required
                    placeholder="Giveaway Title (e.g. Month-End Grand Prize)"
                    value={gwTitle}
                    onChange={(e) => setGwTitle(e.target.value)}
                    className="w-full px-3 py-1.5 bg-white border border-pink-200 rounded-xl text-xs"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Prize Details (e.g. AirPods Pro 2 + 50,000 MMK)"
                    value={gwPrize}
                    onChange={(e) => setGwPrize(e.target.value)}
                    className="w-full px-3 py-1.5 bg-white border border-pink-200 rounded-xl text-xs"
                  />
                  <div className="flex gap-2">
                    <input
                      type="date"
                      value={gwEndDate}
                      onChange={(e) => setGwEndDate(e.target.value)}
                      className="px-3 py-1.5 bg-white border border-pink-200 rounded-xl text-xs flex-1"
                    />
                    <button
                      type="submit"
                      className="px-4 py-1.5 bg-pink-600 text-white font-bold rounded-xl text-xs hover:bg-pink-700"
                    >
                      Launch
                    </button>
                  </div>
                </form>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-800">Active & Past Campaigns</h4>
                {giveaways.map((gw) => (
                  <div
                    key={gw.id}
                    className="p-3 bg-slate-50 border border-slate-200 rounded-2xl space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <h5 className="font-bold text-slate-900">{gw.title}</h5>
                      <span
                        className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase ${
                          gw.status === 'active'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-slate-200 text-slate-700'
                        }`}
                      >
                        {gw.status}
                      </span>
                    </div>
                    <p className="text-pink-700 font-semibold">{gw.prize}</p>
                    <div className="flex justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-200">
                      <span>{gw.participantsCount} participants</span>
                      <span>Ends: {gw.endDate}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* COUPONS MODAL */}
          {activeDrawerModal === 'coupons' && (
            <div className="space-y-4">
              <form onSubmit={handleAddCouponSubmit} className="bg-purple-50 p-3.5 rounded-2xl border border-purple-200 space-y-2">
                <h4 className="font-bold text-purple-900">Add New Promo Coupon</h4>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    required
                    placeholder="Coupon Code (e.g. VIP20)"
                    value={newCode}
                    onChange={(e) => setNewCode(e.target.value)}
                    className="px-3 py-1.5 bg-white border border-purple-200 rounded-xl text-xs uppercase"
                  />
                  <input
                    type="number"
                    required
                    min={1}
                    max={99}
                    placeholder="Discount %"
                    value={newDiscount}
                    onChange={(e) => setNewDiscount(Number(e.target.value))}
                    className="px-3 py-1.5 bg-white border border-purple-200 rounded-xl text-xs"
                  />
                </div>
                <div className="flex gap-2">
                  <input
                    type="number"
                    step={10000}
                    placeholder="Min Spend (MMK)"
                    value={newMinSpend}
                    onChange={(e) => setNewMinSpend(Number(e.target.value))}
                    className="px-3 py-1.5 bg-white border border-purple-200 rounded-xl text-xs flex-1"
                  />
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-[#5f2eea] text-white font-bold rounded-xl text-xs hover:bg-[#5024cf]"
                  >
                    Add Code
                  </button>
                </div>
              </form>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-800">Existing Active Coupons</h4>
                {coupons.map((c) => (
                  <div
                    key={c.id}
                    className="p-3 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-black text-slate-900 font-mono text-sm">{c.code}</span>
                        <span className="text-[10px] font-bold text-purple-700 bg-purple-100 px-1.5 py-0.2 rounded">
                          {c.discountPercent ? `${c.discountPercent}% OFF` : `-${formatPrice(c.discountAmount || 0)}`}
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-500 mt-0.5">
                        Min spend: {formatPrice(c.minSpend)} · Used: {c.usageCount} times
                      </div>
                    </div>
                    <button
                      onClick={() => deleteCoupon(c.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PAYMENTS MODAL */}
          {activeDrawerModal === 'payments' && (
            <div className="space-y-3">
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-3">
                <h4 className="font-bold text-slate-800">KBZPay (KPay) Setup</h4>
                <div>
                  <label className="block text-slate-600 mb-1 font-medium">KBZPay Phone Number</label>
                  <input
                    type="text"
                    value={paymentConfig.kpayPhone}
                    onChange={(e) => updatePaymentConfig({ kpayPhone: e.target.value })}
                    className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-xl font-mono text-xs"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 mb-1 font-medium">KBZPay Account Name</label>
                  <input
                    type="text"
                    value={paymentConfig.kpayName}
                    onChange={(e) => updatePaymentConfig({ kpayName: e.target.value })}
                    className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold"
                  />
                </div>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-3">
                <h4 className="font-bold text-slate-800">WavePay Setup</h4>
                <div>
                  <label className="block text-slate-600 mb-1 font-medium">WavePay Phone Number</label>
                  <input
                    type="text"
                    value={paymentConfig.wavePhone}
                    onChange={(e) => updatePaymentConfig({ wavePhone: e.target.value })}
                    className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-xl font-mono text-xs"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 mb-1 font-medium">WavePay Account Name</label>
                  <input
                    type="text"
                    value={paymentConfig.waveName}
                    onChange={(e) => updatePaymentConfig({ waveName: e.target.value })}
                    className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold"
                  />
                </div>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-2">
                <h4 className="font-bold text-slate-800">Additional Options</h4>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={paymentConfig.codEnabled}
                    onChange={(e) => updatePaymentConfig({ codEnabled: e.target.checked })}
                    className="w-4 h-4 text-[#5f2eea] rounded"
                  />
                  <span>Cash on Delivery (COD) Enabled</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={paymentConfig.starsEnabled}
                    onChange={(e) => updatePaymentConfig({ starsEnabled: e.target.checked })}
                    className="w-4 h-4 text-[#5f2eea] rounded"
                  />
                  <span>Telegram Stars & Crypto USDT Enabled</span>
                </label>
              </div>
            </div>
          )}

          {/* TELEGRAM BROADCAST MODAL */}
          {activeDrawerModal === 'broadcast' && (
            <form onSubmit={handleSendBroadcast} className="space-y-3">
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-2xl text-blue-900 text-xs">
                Broadcast instant push alerts to all 1,420+ subscribers who started your Telegram bot!
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Broadcast Message Text</label>
                <textarea
                  rows={4}
                  required
                  value={broadcastText}
                  onChange={(e) => setBroadcastText(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                />
              </div>

              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                <div className="font-bold text-slate-800 text-[11px]">Target Audience:</div>
                <div className="text-slate-600 text-[11px]">
                  ✅ Channel: <span className="font-mono">{settings.channelUsername}</span>
                </div>
                <div className="text-slate-600 text-[11px]">
                  ✅ Bot Users: <span className="font-mono">{settings.botUsername}</span> (All active chats)
                </div>
              </div>

              <button
                type="submit"
                disabled={broadcastSent}
                className="w-full py-3 px-4 bg-[#5f2eea] hover:bg-[#5024cf] text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                {broadcastSent ? <Check className="w-4 h-4" /> : <Radio className="w-4 h-4" />}
                <span>{broadcastSent ? 'Broadcasting to 1,420 users...' : 'Send Broadcast Now'}</span>
              </button>
            </form>
          )}

          {/* DELIVERY MODAL */}
          {activeDrawerModal === 'delivery' && (
            <div className="space-y-3">
              <h4 className="font-bold text-slate-800">Delivery Rates & Zones</h4>
              {deliveryZones.map((zone) => (
                <div
                  key={zone.id}
                  className="p-3 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between"
                >
                  <div>
                    <h5 className="font-bold text-slate-900">{zone.name}</h5>
                    <div className="text-[10px] text-slate-500 mt-0.5">
                      Est. time: {zone.estimatedTime}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-blue-600 tabular-nums">
                      {formatPrice(zone.fee)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* PROFILE MODAL */}
          {activeDrawerModal === 'profile' && (
            <div className="space-y-3">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                <div className="flex items-center gap-3 pb-3 border-b border-slate-200">
                  <div className="w-12 h-12 rounded-2xl bg-[#5f2eea] text-white font-black text-lg flex items-center justify-center shadow-xs">
                    KC
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-900">{settings.shopName}</h3>
                    <p className="text-[10px] text-slate-500">Verified Telegram E-Commerce Seller</p>
                  </div>
                </div>

                <div className="space-y-1.5 pt-1 text-slate-700">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Owner Name</span>
                    <span className="font-bold">U Ko Cho</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Shop Hotline</span>
                    <span className="font-mono font-bold">{settings.supportPhone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Admin Telegram</span>
                    <span className="font-mono text-[#5f2eea] font-bold">{settings.adminTelegram}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Location</span>
                    <span className="font-bold">Kamayut Township, Yangon</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* POINTS MODAL */}
          {activeDrawerModal === 'points' && (
            <div className="space-y-3">
              <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl space-y-1">
                <h4 className="font-bold text-amber-900">Loyalty Rewards Program</h4>
                <p className="text-[11px] text-amber-800">
                  Customers earn 1 Point for every 10,000 MMK spent. 100 Points = 10,000 MMK discount voucher.
                </p>
              </div>

              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 space-y-2">
                <div className="font-bold text-slate-800">Reward Tiers</div>
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span>Bronze Tier (0 - 500 Pts)</span>
                  <span className="font-bold">Standard Delivery</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span>Silver Tier (501 - 2,000 Pts)</span>
                  <span className="font-bold">5% Auto Discount</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Gold VIP (2,000+ Pts)</span>
                  <span className="font-bold text-amber-600">Free Yangon Delivery + Priority</span>
                </div>
              </div>
            </div>
          )}

          {/* AI AGENT CONFIG */}
          {activeDrawerModal === 'ai-agent' && (
            <div className="space-y-3">
              <div className="bg-purple-50 border border-purple-200 p-3.5 rounded-2xl text-purple-900 space-y-1">
                <h4 className="font-bold">AI Shop Assistant Engine</h4>
                <p className="text-[11px] text-purple-800">
                  Your Telegram Bot automatically understands customer inquiries regarding iPhone prices, stock, delivery, and payment options.
                </p>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Bot Personality & Knowledge</label>
                <textarea
                  rows={3}
                  defaultValue="You are the official Telegram shopping assistant for KO CHO MOBILE E-commerce Store in Myanmar. Help customers select phones, check prices in MMK, and provide KBZPay account details."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                />
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => {
                    alert('AI Agent instructions updated!');
                    setActiveDrawerModal(null);
                  }}
                  className="px-4 py-2 bg-[#5f2eea] text-white font-bold rounded-xl"
                >
                  Save AI Rules
                </button>
              </div>
            </div>
          )}

          {/* QR MENU / TABLES */}
          {(activeDrawerModal === 'qr-dashboard' ||
            activeDrawerModal === 'qr-menu' ||
            activeDrawerModal === 'qr-tables' ||
            activeDrawerModal === 'qr-orders') && (
            <div className="space-y-3 text-center py-4">
              <div className="w-14 h-14 bg-purple-50 text-[#5f2eea] rounded-2xl flex items-center justify-center mx-auto mb-2">
                <QrCode className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-sm text-slate-900">QR Table & In-Store System</h3>
              <p className="text-slate-500 text-xs max-w-xs mx-auto">
                Generate in-store QR codes for customer counters and show tables. Customers scan and open the Telegram bot menu directly.
              </p>
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-left space-y-1.5 mt-2">
                <div className="font-bold text-slate-800">Active Tables / Counters:</div>
                <div className="flex justify-between py-1 border-b border-slate-200">
                  <span>Counter 1 (Showcase Display)</span>
                  <span className="font-bold text-emerald-600">Online</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Counter 2 (Customer Lounge)</span>
                  <span className="font-bold text-emerald-600">Online</span>
                </div>
              </div>
            </div>
          )}

          {/* TELEGRAM COMMANDS */}
          {activeDrawerModal === 'commands' && (
            <div className="space-y-2">
              <h4 className="font-bold text-slate-800 mb-2">Telegram Bot Slash Commands</h4>
              {botCommands.map((cmd) => (
                <div
                  key={cmd.command}
                  className="p-3 bg-slate-50 border border-slate-200 rounded-2xl space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-[#5f2eea] text-xs">
                      {cmd.command}
                    </span>
                    <span className="text-[10px] text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded font-semibold">
                      Active
                    </span>
                  </div>
                  <p className="text-slate-600 font-medium">{cmd.description}</p>
                  <p className="text-[10px] text-slate-400 italic">Response: "{cmd.response}"</p>
                </div>
              ))}
            </div>
          )}

          {/* SUBSCRIPTION */}
          {activeDrawerModal === 'subscription' && (
            <div className="space-y-3 text-center py-2">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-2">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="font-black text-sm text-slate-900">Pro Enterprise Plan</h3>
              <p className="text-slate-500 text-xs">
                Active until October 2027 · Unlimited Telegram Products & Broadcasts
              </p>
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 text-left space-y-1.5">
                <div className="flex justify-between">
                  <span>Products Limit</span>
                  <span className="font-bold text-emerald-600">Unlimited</span>
                </div>
                <div className="flex justify-between">
                  <span>Telegram Broadcasts</span>
                  <span className="font-bold text-emerald-600">Unlimited</span>
                </div>
                <div className="flex justify-between">
                  <span>AI Agent Responses</span>
                  <span className="font-bold text-emerald-600">Enabled</span>
                </div>
              </div>
            </div>
          )}

          {/* FAQS */}
          {activeDrawerModal === 'faqs' && (
            <div className="space-y-2.5">
              {[
                {
                  q: 'ဖုန်းအော်ဒါများကို Telegram bot တွင် မည်သို့မှာယူရပါသလဲ?',
                  a: 'လိုချင်သောဖုန်းကို ရွေးချယ်ပြီး "Buy on Telegram" သို့မဟုတ် "Checkout via Telegram" ခလုတ်ကို နှိပ်ပါက Telegram bot တွင် message အလိုအလျောက် ပို့ပေးပြီး မှာယူနိုင်ပါသည်။'
                },
                {
                  q: 'ငွေပေးချေမှု မည်သို့ပြုလုပ်ရသလဲ?',
                  a: 'KBZPay, WavePay ဖြင့် လွှဲနိုင်သလို ရန်ကုန်မြို့တွင်း အိမ်ရောက်ငွေချေ (Cash on Delivery) စနစ်ဖြင့်လည်း ရရှိပါသည်။'
                },
                {
                  q: 'အာမခံ (Warranty) ပါဝင်ပါသလား?',
                  a: 'ဖုန်းအသစ်အားလုံးအတွက် 1 Year Official International Warranty နှင့် 7 Days Replacement အာမခံ ပါဝင်ပါသည်။'
                }
              ].map((faq, idx) => (
                <div key={idx} className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                  <h5 className="font-bold text-slate-900 text-xs">{faq.q}</h5>
                  <p className="text-slate-600 text-[11px] leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          )}

          {/* NEWSFEED */}
          {activeDrawerModal === 'newsfeed' && (
            <div className="space-y-3">
              <div className="p-3 bg-purple-50 rounded-2xl border border-purple-200 space-y-1">
                <span className="text-[10px] font-bold text-purple-700">NEW ARRIVAL ANNOUNCEMENT</span>
                <h4 className="font-bold text-slate-900">Apple iPhone 16 White / Black in stock!</h4>
                <p className="text-slate-600 text-[11px]">
                  ယခုလအတွင်း ဝယ်ယူသူတိုင်းအတွက် 20W Fast Charger + Privacy Screen Protector လက်ဆောင်ပေးအပ်နေပါပြီ။
                </p>
                <div className="text-[10px] text-slate-400 pt-1">Posted 2 hours ago</div>
              </div>

              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                <span className="text-[10px] font-bold text-slate-500">DELIVERY NOTICE</span>
                <h4 className="font-bold text-slate-900">သီတင်းကျွတ် ရုံးပိတ်ရက် ပို့ဆောင်မှု</h4>
                <p className="text-slate-600 text-[11px]">
                  သီတင်းကျွတ်ကာလအတွင်း ရန်ကုန်မြို့တွင်း ပုံမှန်အတိုင်း ပို့ဆောင်ပေးမည်ဖြစ်ပြီး နယ်ကားဂိတ်များ ပို့ဆောင်မှုကို ၂ ရက်ကြိုတင် အော်ဒါတင်ပေးပါရန် မေတ္တာရပ်ခံအပ်ပါသည်။
                </p>
                <div className="text-[10px] text-slate-400 pt-1">Posted yesterday</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
