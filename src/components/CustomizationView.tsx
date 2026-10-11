import React, { useState } from 'react';
import {
  Sparkles,
  RefreshCw,
  Store,
  Menu,
  Lock,
  Phone,
  Facebook,
  Send,
  Plus,
  Trash2,
  Check,
  Save,
  HelpCircle,
  MessageSquare,
  Zap,
  ShoppingBag,
  DollarSign,
  Image as ImageIcon,
  ChevronRight,
  ChevronDown,
  Layers,
  Palette,
  Bot
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import {
  AdminTemplate,
  PublicShopTheme,
  AdminTopBarTheme,
  SocialLink
} from '../types';

export const CustomizationView: React.FC = () => {
  const {
    customization,
    updateCustomization,
    settings,
    updateSettings,
    setIsSideDrawerOpen,
    setActiveDrawerModal,
    mode,
    setMode
  } = useShop();

  const [activeSocialTab, setActiveSocialTab] = useState<'phone' | 'facebook' | 'telegram' | 'tiktok' | 'viber'>('phone');
  const [socialInputs, setSocialInputs] = useState<SocialLink[]>(customization.socialLinks || []);
  const [newSocialValue, setNewSocialValue] = useState('');
  const [newSocialLabel, setNewSocialLabel] = useState('');
  const [showAddSocialModal, setShowAddSocialModal] = useState(false);

  // AI Agent settings
  const [aiEnabled, setAiEnabled] = useState(customization.aiAgent?.enabled ?? true);
  const [aiGender, setAiGender] = useState<'male' | 'female'>(customization.aiAgent?.gender ?? 'male');
  const [customPrompt, setCustomPrompt] = useState(
    customization.aiAgent?.customPrompt ||
      'ဝယ်ရင်စိတ်ချရပြီး... ရောင်းရင်ဈေးကောင်းရမယ့် KO CHO MOBILE E-commerce Store မှ ကြိုဆိုပါတယ်။ ဖုန်းအသစ်များနှင့် ဒစ်ဂျစ်တယ်ပစ္စည်းများကို စိတ်ချစွာမှာယူနိုင်ပါသည်။'
  );
  const [quickQuestions, setQuickQuestions] = useState<string[]>(
    customization.aiAgent?.quickQuestions || [
      'iPhone 16 ဈေးနှုန်းဘယ်လောက်လဲ?',
      'အိမ်ရောက်ငွေချေ (COD) ရပါသလား?',
      'KPay အကောင့်နံပါတ်ပေးပါ'
    ]
  );
  const [quickReplies, setQuickReplies] = useState<string[]>(
    customization.aiAgent?.quickReplies || [
      'iPhone 16 အသင့်ရှိပြီး 1 Year Warranty အပြည့်ပါဝင်ပါသည်ရှင်။',
      'ရန်ကုန်မြို့တွင်း အိမ်ရောက်ငွေချေ ပို့ဆောင်ခ 3,000 MMK ဖြင့် ရရှိပါသည်ရှင်။'
    ]
  );

  const [newQuestionText, setNewQuestionText] = useState('');
  const [newReplyText, setNewReplyText] = useState('');
  const [showAddQuestion, setShowAddQuestion] = useState(false);
  const [showAddReply, setShowAddReply] = useState(false);

  // Order button & Currency
  const [orderButtonLabel, setOrderButtonLabel] = useState(customization.orderButtonLabel || 'Buy Now');
  const [isOrderButtonDropdown, setIsOrderButtonDropdown] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState(customization.currency || 'MMK');
  const [isCurrencyDropdown, setIsCurrencyDropdown] = useState(false);

  // Banners
  const [banners, setBanners] = useState<string[]>(customization.shopBanners || []);
  const [bannerInput, setBannerInput] = useState('');
  const [showAddBanner, setShowAddBanner] = useState(false);

  const [savedBannerSuccess, setSavedBannerSuccess] = useState(false);
  const [savedAiSuccess, setSavedAiSuccess] = useState(false);
  const [savedSocialSuccess, setSavedSocialSuccess] = useState(false);

  // Top bar theme chips
  const topBarThemes: { id: AdminTopBarTheme; label: string; bgClass: string; borderClass: string }[] = [
    { id: 'neon-purple', label: 'Neon Purple', bgClass: 'bg-[#5f2eea]', borderClass: 'border-purple-400' },
    { id: 'graphite-grey', label: 'Graphite Grey', bgClass: 'bg-[#334155]', borderClass: 'border-slate-500' },
    { id: 'clean-white', label: 'Clean White', bgClass: 'bg-[#ffffff]', borderClass: 'border-slate-300' },
    { id: 'royal-navy', label: 'Royal Navy', bgClass: 'bg-[#1e3a8a]', borderClass: 'border-blue-500' },
    { id: 'dark-emerald', label: 'Dark Emerald', bgClass: 'bg-[#065f46]', borderClass: 'border-emerald-500' },
    { id: 'ruby-rose', label: 'Ruby Rose', bgClass: 'bg-[#be123c]', borderClass: 'border-rose-500' },
    { id: 'ocean-cyan', label: 'Ocean Cyan', bgClass: 'bg-[#0284c7]', borderClass: 'border-cyan-500' },
    { id: 'sunset-flame', label: 'Sunset Flame', bgClass: 'bg-[#ea580c]', borderClass: 'border-orange-500' }
  ];

  // Public shop themes
  const publicThemes: { id: PublicShopTheme; label: string; gradient: string }[] = [
    { id: 'default', label: 'Default', gradient: 'from-[#5f2eea] to-[#a855f7]' },
    { id: 'midnight', label: 'Midnight', gradient: 'from-[#0f172a] to-[#1e293b]' },
    { id: 'emerald', label: 'Emerald', gradient: 'from-[#059669] to-[#10b981]' },
    { id: 'rose', label: 'Rose', gradient: 'from-[#e11d48] to-[#fb7185]' },
    { id: 'slate', label: 'Slate', gradient: 'from-[#475569] to-[#64748b]' }
  ];

  const handleSaveAi = () => {
    updateCustomization({
      aiAgent: {
        enabled: aiEnabled,
        gender: aiGender,
        customPrompt,
        quickQuestions,
        quickReplies
      }
    });
    setSavedAiSuccess(true);
    setTimeout(() => setSavedAiSuccess(false), 2000);
  };

  const handleSaveSocial = () => {
    updateCustomization({ socialLinks: socialInputs });
    setSavedSocialSuccess(true);
    setTimeout(() => setSavedSocialSuccess(false), 2000);
  };

  const handleAddSocial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSocialValue.trim()) return;
    const item: SocialLink = {
      id: `soc-${Date.now()}`,
      platform: activeSocialTab,
      value: newSocialValue.trim(),
      label: newSocialLabel.trim() || undefined
    };
    const updated = [...socialInputs, item];
    setSocialInputs(updated);
    updateCustomization({ socialLinks: updated });
    setNewSocialValue('');
    setNewSocialLabel('');
    setShowAddSocialModal(false);
  };

  const currentTabSocials = socialInputs.filter((s) => s.platform === activeSocialTab);

  return (
    <div className="min-h-screen bg-[#0d1117] text-slate-100 pb-28 text-xs font-sans">
      {/* Sub-header Navigation */}
      <div className="bg-[#161b22] px-4 py-3 flex items-center justify-between border-b border-slate-800 sticky top-0 z-20">
        <button
          onClick={() => setIsSideDrawerOpen(true)}
          className="p-1 text-slate-300 hover:text-white"
        >
          <Menu className="w-5 h-5" />
        </button>

        <h1 className="text-sm font-bold text-white tracking-wide">Customization</h1>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveDrawerModal('ai-agent')}
            className="p-1 text-slate-400 hover:text-white"
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
          </button>
          <button
            onClick={() => window.location.reload()}
            className="p-1 text-slate-400 hover:text-white"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={() => setMode(mode === 'admin' ? 'storefront' : 'admin')}
            className="p-1 text-purple-400 hover:text-white"
          >
            <Store className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="p-4 max-w-lg mx-auto space-y-5">
        <h2 className="text-xl font-bold text-white tracking-tight">Customization</h2>

        {/* CARD 1: Admin UI Templates */}
        <div className="bg-[#161b22] rounded-3xl p-4 border border-slate-800/80 shadow-md space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center">
              <Layers className="w-3.5 h-3.5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white">Admin UI Templates</h3>
              <p className="text-[11px] text-slate-400">
                Switch between different dashboard UI & navigation layouts
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1">
            {/* Template: Classic */}
            <div
              onClick={() => updateCustomization({ adminTemplate: 'classic' })}
              className={`rounded-2xl p-3 border transition-all cursor-pointer ${
                customization.adminTemplate === 'classic'
                  ? 'border-purple-500 bg-purple-500/10 shadow-xs'
                  : 'border-slate-800 bg-[#1c2128] hover:border-slate-700'
              }`}
            >
              {/* Mockup Preview */}
              <div className="rounded-xl bg-slate-100 p-2 h-20 relative overflow-hidden flex flex-col justify-between">
                <div className="flex gap-1 items-center">
                  <span className="w-2 h-2 rounded-full bg-purple-500" />
                  <span className="w-10 h-1 rounded bg-slate-300" />
                </div>
                <div className="grid grid-cols-2 gap-1">
                  <div className="h-6 rounded bg-purple-100 border border-purple-200" />
                  <div className="h-6 rounded bg-slate-200" />
                </div>
                <span className="absolute top-1 right-1 bg-black text-[9px] text-white font-bold px-1 rounded">
                  Default
                </span>
              </div>

              <div className="mt-2.5 flex items-center justify-between">
                <div>
                  <div className="font-bold text-white text-xs">Classic</div>
                  <div className="text-[10px] text-slate-400">Collapsible Sidebar</div>
                </div>
                <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-bold">
                  {customization.adminTemplate === 'classic' ? 'Active' : 'Apply'}
                </span>
              </div>
            </div>

            {/* Template: Midnight */}
            <div
              onClick={() => updateCustomization({ adminTemplate: 'midnight' })}
              className={`rounded-2xl p-3 border transition-all cursor-pointer ${
                customization.adminTemplate === 'midnight'
                  ? 'border-purple-500 bg-purple-500/10 shadow-xs'
                  : 'border-slate-800 bg-[#1c2128] hover:border-slate-700'
              }`}
            >
              {/* Mockup Preview */}
              <div className="rounded-xl bg-[#0d1117] p-2 h-20 relative overflow-hidden flex flex-col justify-between border border-slate-800">
                <div className="flex gap-1 items-center">
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  <span className="w-10 h-1 rounded bg-slate-700" />
                </div>
                <div className="grid grid-cols-2 gap-1">
                  <div className="h-6 rounded bg-slate-800 border border-slate-700" />
                  <div className="h-6 rounded bg-slate-800" />
                </div>
              </div>

              <div className="mt-2.5 flex items-center justify-between">
                <div>
                  <div className="font-bold text-white text-xs">Midnight</div>
                  <div className="text-[10px] text-slate-400">Collapsible Sidebar</div>
                </div>
                <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-bold">
                  {customization.adminTemplate === 'midnight' ? 'Active' : 'Apply'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* CARD 2: Public Shop Theme */}
        <div className="bg-[#161b22] rounded-3xl p-4 border border-slate-800/80 shadow-md space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-pink-500/20 text-pink-400 flex items-center justify-center">
              <Palette className="w-3.5 h-3.5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white">Public Shop Theme</h3>
              <p className="text-[11px] text-slate-400">Choose your shop's color scheme</p>
            </div>
          </div>

          <div className="grid grid-cols-5 gap-2 pt-1">
            {publicThemes.map((th) => {
              const isSelected = customization.publicShopTheme === th.id;
              return (
                <button
                  key={th.id}
                  onClick={() => updateCustomization({ publicShopTheme: th.id })}
                  className="flex flex-col items-center gap-1.5 group"
                >
                  <div
                    className={`w-full h-11 rounded-xl bg-gradient-to-br ${th.gradient} transition-transform group-hover:scale-105 ${
                      isSelected
                        ? 'ring-2 ring-white ring-offset-2 ring-offset-[#161b22] shadow-lg'
                        : 'opacity-85'
                    }`}
                  />
                  <span
                    className={`text-[10px] font-semibold ${
                      isSelected ? 'text-white font-bold' : 'text-slate-400'
                    }`}
                  >
                    {th.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* CARD 3: Admin Top Bar Theme */}
        <div className="bg-[#161b22] rounded-3xl p-4 border border-slate-800/80 shadow-md space-y-3">
          <div>
            <h3 className="font-bold text-sm text-white">Admin Top Bar Theme</h3>
            <p className="text-[11px] text-slate-400">
              Choose the color scheme for your admin top navigation bar
            </p>
          </div>

          <div className="grid grid-cols-4 gap-2.5 pt-1">
            {topBarThemes.map((tb) => {
              const isSelected = customization.adminTopBarTheme === tb.id;
              return (
                <button
                  key={tb.id}
                  onClick={() => updateCustomization({ adminTopBarTheme: tb.id })}
                  className="flex flex-col items-center gap-1.5 group"
                >
                  <div
                    className={`w-full h-10 rounded-xl ${tb.bgClass} transition-all ${
                      isSelected
                        ? `ring-2 ring-white ring-offset-2 ring-offset-[#161b22] scale-105`
                        : 'opacity-80 hover:opacity-100'
                    }`}
                  />
                  <span
                    className={`text-[9px] text-center font-medium leading-tight truncate w-full ${
                      isSelected ? 'text-white font-bold' : 'text-slate-400'
                    }`}
                  >
                    {tb.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* CARD 4: Social Media & Contact Links */}
        <div className="bg-[#161b22] rounded-3xl p-4 border border-slate-800/80 shadow-md space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-sm text-white">Social Media & Contact Links</h3>
              <p className="text-[11px] text-slate-400">
                Configure up to 3 links/numbers per platform for your public shop popup
              </p>
            </div>
            <span className="text-[10px] font-bold text-amber-300 bg-amber-500/20 border border-amber-500/30 px-2 py-0.5 rounded-md flex items-center gap-1 shrink-0">
              <Lock className="w-3 h-3" />
              <span>Requires Business Plan</span>
            </span>
          </div>

          {/* Social Platform Tabs */}
          <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar pt-1">
            {[
              { id: 'phone', label: 'Phone', icon: Phone, color: 'bg-emerald-600' },
              { id: 'facebook', label: 'Facebook', icon: Facebook, color: 'bg-blue-600' },
              { id: 'telegram', label: 'Telegram', icon: Send, color: 'bg-sky-500' },
              { id: 'tiktok', label: 'TikTok', icon: MessageSquare, color: 'bg-slate-700' },
              { id: 'viber', label: 'Viber', icon: Phone, color: 'bg-purple-600' }
            ].map((p) => {
              const Icon = p.icon;
              const isActive = activeSocialTab === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setActiveSocialTab(p.id as any)}
                  className={`px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-semibold shrink-0 transition-colors ${
                    isActive
                      ? 'bg-purple-600 text-white shadow-xs'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{p.label}</span>
                </button>
              );
            })}
          </div>

          {/* Platform Entries Card */}
          <div className="bg-[#0d1117] rounded-2xl p-3.5 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 capitalize">
                {activeSocialTab} ({currentTabSocials.length}/3 entries)
              </span>
              <button
                onClick={() => setShowAddSocialModal(true)}
                disabled={currentTabSocials.length >= 3}
                className="px-2.5 py-1 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg text-xs flex items-center gap-1 disabled:opacity-50"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add {activeSocialTab}</span>
              </button>
            </div>

            {currentTabSocials.length === 0 ? (
              <div className="py-6 text-center text-slate-500 italic text-[11px]">
                No links added for {activeSocialTab} yet (Max 3)
              </div>
            ) : (
              <div className="space-y-2">
                {currentTabSocials.map((soc) => (
                  <div
                    key={soc.id}
                    className="p-2.5 bg-[#161b22] rounded-xl border border-slate-800 flex items-center justify-between"
                  >
                    <div>
                      <div className="font-bold text-white text-xs">{soc.value}</div>
                      {soc.label && <div className="text-[10px] text-slate-400">{soc.label}</div>}
                    </div>
                    <button
                      onClick={() => {
                        const updated = socialInputs.filter((s) => s.id !== soc.id);
                        setSocialInputs(updated);
                        updateCustomization({ socialLinks: updated });
                      }}
                      className="text-slate-500 hover:text-rose-400 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Add social modal/inline */}
          {showAddSocialModal && (
            <div className="p-3 bg-slate-800/80 rounded-2xl space-y-2 animate-in fade-in">
              <input
                type="text"
                placeholder={
                  activeSocialTab === 'phone'
                    ? 'Phone number (e.g. 09 798 442 190)'
                    : activeSocialTab === 'telegram'
                    ? '@username'
                    : 'URL link...'
                }
                value={newSocialValue}
                onChange={(e) => setNewSocialValue(e.target.value)}
                className="w-full px-3 py-1.5 bg-[#0d1117] border border-slate-700 rounded-xl text-white text-xs"
              />
              <input
                type="text"
                placeholder="Label / Title (e.g. Hotline 1)"
                value={newSocialLabel}
                onChange={(e) => setNewSocialLabel(e.target.value)}
                className="w-full px-3 py-1.5 bg-[#0d1117] border border-slate-700 rounded-xl text-white text-xs"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddSocialModal(false)}
                  className="px-3 py-1 text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleAddSocial}
                  className="px-3 py-1 bg-purple-600 text-white rounded-lg font-bold"
                >
                  Add Entry
                </button>
              </div>
            </div>
          )}

          <button
            onClick={handleSaveSocial}
            className="w-full py-2.5 px-4 bg-[#5f2eea] hover:bg-[#5024cf] text-white font-bold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2"
          >
            {savedSocialSuccess ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            <span>{savedSocialSuccess ? 'Saved Successfully!' : 'Save Social & Contact Links'}</span>
          </button>
        </div>

        {/* CARD 5: AI Agent */}
        <div className="bg-[#161b22] rounded-3xl p-4 border border-slate-800/80 shadow-md space-y-3.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-white">AI Agent</h3>
                <p className="text-[11px] text-slate-400">
                  Let AI answer customer questions on your shop
                </p>
              </div>
            </div>

            {/* Enable switch */}
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={aiEnabled}
                onChange={(e) => setAiEnabled(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-500"></div>
            </label>
          </div>

          {/* AI Gender */}
          <div>
            <label className="block text-slate-400 mb-1.5 font-medium">AI Gender</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setAiGender('male')}
                className={`py-2 rounded-xl font-bold flex items-center justify-center gap-1.5 transition-colors ${
                  aiGender === 'male'
                    ? 'bg-slate-700 text-white border border-teal-500'
                    : 'bg-[#0d1117] text-slate-400 border border-slate-800'
                }`}
              >
                <span>♂ Male</span>
              </button>
              <button
                type="button"
                onClick={() => setAiGender('female')}
                className={`py-2 rounded-xl font-bold flex items-center justify-center gap-1.5 transition-colors ${
                  aiGender === 'female'
                    ? 'bg-slate-700 text-white border border-teal-500'
                    : 'bg-[#0d1117] text-slate-400 border border-slate-800'
                }`}
              >
                <span>♀ Female</span>
              </button>
            </div>
          </div>

          {/* Website Custom Prompt (Burmese Prompt) */}
          <div>
            <label className="block text-slate-400 mb-1 font-medium">Website Custom Prompt</label>
            <div className="bg-[#0d1117] border border-slate-800 rounded-2xl p-3 flex items-start gap-2">
              <span className="text-teal-400 mt-0.5">🌐</span>
              <textarea
                rows={3}
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder="Enter AI persona and shop prompt instructions..."
                className="flex-1 bg-transparent text-slate-200 text-xs focus:outline-none leading-relaxed"
              />
            </div>
          </div>

          <button
            onClick={handleSaveAi}
            className="w-full py-2.5 px-4 bg-teal-500 hover:bg-teal-600 text-slate-950 font-black rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            {savedAiSuccess ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            <span>{savedAiSuccess ? 'Settings Saved!' : 'Save AI Settings'}</span>
          </button>

          {/* Quick Questions */}
          <div className="pt-2 border-t border-slate-800/80 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
                <HelpCircle className="w-3.5 h-3.5 text-teal-400" />
                <span>QUICK QUESTIONS</span>
                <span className="px-1.5 py-0.2 rounded-full bg-slate-800 text-[10px] text-teal-300">
                  {quickQuestions.length}
                </span>
              </div>
              <button
                onClick={() => setShowAddQuestion(!showAddQuestion)}
                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-teal-300 font-bold rounded-lg text-[11px] flex items-center gap-1"
              >
                <Plus className="w-3 h-3" />
                <span>Add Question</span>
              </button>
            </div>

            {showAddQuestion && (
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. မန္တလေး ပို့ဆောင်ခ ဘယ်လောက်လဲ?"
                  value={newQuestionText}
                  onChange={(e) => setNewQuestionText(e.target.value)}
                  className="flex-1 px-3 py-1.5 bg-[#0d1117] border border-slate-700 rounded-xl text-white text-xs"
                />
                <button
                  onClick={() => {
                    if (newQuestionText.trim()) {
                      setQuickQuestions([...quickQuestions, newQuestionText.trim()]);
                      setNewQuestionText('');
                      setShowAddQuestion(false);
                    }
                  }}
                  className="px-3 py-1.5 bg-teal-500 text-slate-950 font-bold rounded-xl text-xs"
                >
                  Save
                </button>
              </div>
            )}

            <div className="space-y-1">
              {quickQuestions.map((q, idx) => (
                <div
                  key={idx}
                  className="p-2 bg-[#0d1117] rounded-xl border border-slate-800 flex items-center justify-between text-[11px]"
                >
                  <span className="text-slate-300">{q}</span>
                  <button
                    onClick={() => setQuickQuestions(quickQuestions.filter((_, i) => i !== idx))}
                    className="text-slate-500 hover:text-rose-400"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Replies */}
          <div className="pt-2 border-t border-slate-800/80 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-300">
                <Zap className="w-3.5 h-3.5 text-purple-400" />
                <span>CHAT QUICK REPLIES</span>
                <span className="px-1.5 py-0.2 rounded-full bg-slate-800 text-[10px] text-purple-300">
                  {quickReplies.length}
                </span>
              </div>
              <button
                onClick={() => setShowAddReply(!showAddReply)}
                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-purple-300 font-bold rounded-lg text-[11px] flex items-center gap-1"
              >
                <Plus className="w-3 h-3" />
                <span>Add Quick Reply</span>
              </button>
            </div>

            {showAddReply && (
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. Customer support reply template..."
                  value={newReplyText}
                  onChange={(e) => setNewReplyText(e.target.value)}
                  className="flex-1 px-3 py-1.5 bg-[#0d1117] border border-slate-700 rounded-xl text-white text-xs"
                />
                <button
                  onClick={() => {
                    if (newReplyText.trim()) {
                      setQuickReplies([...quickReplies, newReplyText.trim()]);
                      setNewReplyText('');
                      setShowAddReply(false);
                    }
                  }}
                  className="px-3 py-1.5 bg-purple-600 text-white font-bold rounded-xl text-xs"
                >
                  Save
                </button>
              </div>
            )}

            <div className="space-y-1">
              {quickReplies.map((r, idx) => (
                <div
                  key={idx}
                  className="p-2 bg-[#0d1117] rounded-xl border border-slate-800 flex items-center justify-between text-[11px]"
                >
                  <span className="text-slate-300">{r}</span>
                  <button
                    onClick={() => setQuickReplies(quickReplies.filter((_, i) => i !== idx))}
                    className="text-slate-500 hover:text-rose-400"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CARD 6: Order Button */}
        <div className="bg-[#161b22] rounded-3xl p-4 border border-slate-800/80 shadow-md space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center">
              <ShoppingBag className="w-3.5 h-3.5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white">Order Button</h3>
              <p className="text-[11px] text-slate-400">Choose the label for the buy button</p>
            </div>
          </div>

          <div className="relative">
            <button
              onClick={() => setIsOrderButtonDropdown(!isOrderButtonDropdown)}
              className="w-full p-3 bg-[#0d1117] border border-slate-800 rounded-2xl flex items-center justify-between text-xs text-white font-semibold hover:border-slate-700"
            >
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-purple-400" />
                <span>
                  Current: <span className="font-bold text-purple-300">{orderButtonLabel}</span>
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </button>

            {isOrderButtonDropdown && (
              <div className="mt-1 bg-[#1c2128] border border-slate-700 rounded-2xl p-1.5 space-y-1 shadow-xl">
                {['Buy Now', 'Order via Telegram', 'Add to Cart', 'ဝယ်ယူမည်', 'Instant Order'].map((lbl) => (
                  <button
                    key={lbl}
                    onClick={() => {
                      setOrderButtonLabel(lbl);
                      updateCustomization({ orderButtonLabel: lbl });
                      setIsOrderButtonDropdown(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs flex justify-between items-center ${
                      orderButtonLabel === lbl
                        ? 'bg-purple-600/30 text-purple-300 font-bold'
                        : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <span>{lbl}</span>
                    {orderButtonLabel === lbl && <Check className="w-3.5 h-3.5" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* CARD 7: Currency */}
        <div className="bg-[#161b22] rounded-3xl p-4 border border-slate-800/80 shadow-md space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <DollarSign className="w-3.5 h-3.5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white">Currency</h3>
              <p className="text-[11px] text-slate-400">Set the currency for your bot and shop</p>
            </div>
          </div>

          <div className="relative">
            <button
              onClick={() => setIsCurrencyDropdown(!isCurrencyDropdown)}
              className="w-full p-3 bg-[#0d1117] border border-slate-800 rounded-2xl flex items-center justify-between text-xs text-white font-semibold hover:border-slate-700"
            >
              <div className="flex items-center gap-2">
                <span className="font-bold text-emerald-400">$</span>
                <span>
                  {selectedCurrency === 'MMK'
                    ? 'MMK — Myanmar Kyat (default)'
                    : selectedCurrency === 'USD'
                    ? 'USD — United States Dollar'
                    : selectedCurrency === 'THB'
                    ? 'THB — Thai Baht'
                    : 'SGD — Singapore Dollar'}
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </button>

            {isCurrencyDropdown && (
              <div className="mt-1 bg-[#1c2128] border border-slate-700 rounded-2xl p-1.5 space-y-1 shadow-xl">
                {[
                  { id: 'MMK', label: 'MMK — Myanmar Kyat (default)' },
                  { id: 'USD', label: 'USD — United States Dollar' },
                  { id: 'THB', label: 'THB — Thai Baht' },
                  { id: 'SGD', label: 'SGD — Singapore Dollar' }
                ].map((cur) => (
                  <button
                    key={cur.id}
                    onClick={() => {
                      setSelectedCurrency(cur.id as any);
                      updateCustomization({ currency: cur.id as any });
                      updateSettings({ currency: cur.id === 'USD' ? 'USD' : 'MMK' });
                      setIsCurrencyDropdown(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs flex justify-between items-center ${
                      selectedCurrency === cur.id
                        ? 'bg-emerald-600/30 text-emerald-300 font-bold'
                        : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <span>{cur.label}</span>
                    {selectedCurrency === cur.id && <Check className="w-3.5 h-3.5" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* CARD 8: Shop Banners */}
        <div className="bg-[#161b22] rounded-3xl p-4 border border-slate-800/80 shadow-md space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center">
              <ImageIcon className="w-3.5 h-3.5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white">Shop Banners</h3>
              <p className="text-[11px] text-slate-400">
                Banner images for your public shop (3:1 or 16:9, max 5)
              </p>
            </div>
          </div>

          <div
            onClick={() => setShowAddBanner(true)}
            className="border-2 border-dashed border-slate-800 hover:border-slate-700 rounded-2xl p-6 text-center cursor-pointer transition-colors"
          >
            <div className="flex items-center justify-center gap-2 text-slate-400 font-bold">
              <ImageIcon className="w-4 h-4" />
              <span>Add Banner Image</span>
            </div>
          </div>

          {banners.length === 0 ? (
            <p className="text-[11px] text-slate-500 text-center">
              No banners set. Your shop will use the default gradient background.
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              {banners.map((b, i) => (
                <div key={i} className="relative rounded-xl overflow-hidden aspect-16/9 bg-slate-800">
                  <img src={b} alt="" className="w-full h-full object-cover" />
                  <button
                    onClick={() => {
                      const updated = banners.filter((_, idx) => idx !== i);
                      setBanners(updated);
                      updateCustomization({ shopBanners: updated });
                    }}
                    className="absolute top-1 right-1 p-1 bg-black/60 hover:bg-rose-600 rounded-full text-white"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {showAddBanner && (
            <div className="p-3 bg-[#0d1117] rounded-xl border border-slate-800 space-y-2">
              <input
                type="text"
                placeholder="Paste banner image URL or select preset..."
                value={bannerInput}
                onChange={(e) => setBannerInput(e.target.value)}
                className="w-full px-3 py-1.5 bg-[#161b22] border border-slate-700 rounded-xl text-white text-xs"
              />
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    setBannerInput('/src/assets/images/hero_ecommerce_showcase_1791651826248.jpg')
                  }
                  className="px-2 py-1 bg-slate-800 text-[10px] text-slate-300 rounded font-semibold"
                >
                  Use Generated Banner
                </button>
                <div className="flex-1" />
                <button
                  onClick={() => setShowAddBanner(false)}
                  className="px-3 py-1 text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (bannerInput.trim()) {
                      const updated = [...banners, bannerInput.trim()];
                      setBanners(updated);
                      updateCustomization({ shopBanners: updated });
                      setBannerInput('');
                      setShowAddBanner(false);
                    }
                  }}
                  className="px-3 py-1 bg-purple-600 text-white rounded-lg font-bold"
                >
                  Add Banner
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
