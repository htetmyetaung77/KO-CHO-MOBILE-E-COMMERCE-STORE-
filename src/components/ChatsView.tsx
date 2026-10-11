import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, Bot, CheckCircle2, RefreshCw, Zap, Bell } from 'lucide-react';
import { useShop } from '../context/ShopContext';

interface LiveTgMessage {
  id: string;
  chatId: number;
  senderName: string;
  senderHandle: string;
  text: string;
  time: string;
  isFromAdmin: boolean;
  replySent?: string;
}

export const ChatsView: React.FC = () => {
  const { chatMessages, sendChatMessage, settings } = useShop();
  const [inputText, setInputText] = useState('');
  const [role, setRole] = useState<'customer' | 'admin'>('customer');
  const [liveMessages, setLiveMessages] = useState<LiveTgMessage[]>([]);
  const [botStatus, setBotStatus] = useState<{ connected: boolean; username: string } | null>(null);
  const [isSendingPing, setIsSendingPing] = useState(false);
  const [pingSuccess, setPingSuccess] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Poll real telegram messages from backend
  const fetchBotMessages = async () => {
    try {
      const [chatsRes, statusRes] = await Promise.all([
        fetch('/api/bot/chats').then((r) => r.json()).catch(() => null),
        fetch('/api/bot/status').then((r) => r.json()).catch(() => null)
      ]);

      if (chatsRes && chatsRes.messages) {
        setLiveMessages(chatsRes.messages);
      }
      if (statusRes) {
        setBotStatus({
          connected: statusRes.connected,
          username: statusRes.bot?.username || 'kocho_mobile_service_bot'
        });
      }
    } catch (e) {
      // Non-blocking
    }
  };

  useEffect(() => {
    fetchBotMessages();
    const interval = setInterval(fetchBotMessages, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, liveMessages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const text = inputText.trim();
    sendChatMessage(text, role);
    setInputText('');

    // If role is admin and there's a live customer, also forward reply to Telegram API
    if (role === 'admin' && liveMessages.length > 0) {
      const targetChat = liveMessages[0].chatId;
      try {
        await fetch('/api/bot/send-reply', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chatId: targetChat, text })
        });
        fetchBotMessages();
      } catch (err) {
        console.error('Failed to send live reply:', err);
      }
    }
  };

  const handleTestPing = async () => {
    setIsSendingPing(true);
    setPingSuccess(false);
    try {
      const res = await fetch('/api/bot/test-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: `🔔 [KO CHO MOBILE BOT]\nမင်္ဂလာပါ! Bot သည် လက်ရှိ အဆင်ပြေစွာ ချိတ်ဆက်အလုပ်လုပ်နေပါသည် ✅\n\n⚠️ သတိပြုရန် - လောလောဆယ် အိမ်ရောက်ငွေချေ မရသေးပါ (KPay/WavePay ဖြင့် ငွေလွှဲမှာယူနိုင်ပါသည်)`
        })
      });
      const data = await res.json();
      if (data.success) {
        setPingSuccess(true);
        setTimeout(() => setPingSuccess(false), 3000);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsSendingPing(false);
    }
  };

  const quickPrompts = [
    '/start',
    'iPhone 16 White ရှိလားဗျ?',
    'KPay နံပါတ်ပေးပါ',
    'အိမ်ရောက်ငွေချေ ရပါသလား?',
    'မန္တလေး ပို့ပေးလား?',
    '1 Year Warranty ပါလား?'
  ];

  return (
    <div className="p-3 sm:p-4 space-y-3 pb-24 text-xs h-[calc(100vh-140px)] flex flex-col">
      {/* Bot Connection Status Bar */}
      <div className="bg-white rounded-2xl p-3 border border-slate-200 shadow-2xs space-y-2 shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-[#5f2eea] flex items-center justify-center">
              <MessageCircle className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="text-xs font-bold text-slate-900">Telegram Bot Live Chat</h2>
                <span className="flex items-center gap-1 text-[9px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.2 rounded-full font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Connected
                </span>
              </div>
              <p className="text-[10px] text-slate-500">
                Bot: <span className="font-mono text-[#5f2eea] font-bold">@{botStatus?.username || 'kocho_mobile_service_bot'}</span>
                {' · '}Admin: <span className="font-mono text-slate-700 font-semibold">{settings.adminTelegram}</span>
              </p>
            </div>
          </div>

          {/* Test Ping Button */}
          <button
            onClick={handleTestPing}
            disabled={isSendingPing}
            className="px-2.5 py-1.5 bg-purple-50 hover:bg-purple-100 text-[#5f2eea] rounded-xl font-bold text-[10px] flex items-center gap-1 border border-purple-200 transition-colors active:scale-95 disabled:opacity-50"
            title="Send test message to your Telegram right now"
          >
            {pingSuccess ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700 font-bold">Sent!</span>
              </>
            ) : isSendingPing ? (
              <>
                <RefreshCw className="w-3 h-3 animate-spin" />
                <span>Sending...</span>
              </>
            ) : (
              <>
                <Zap className="w-3 h-3" />
                <span>Test Telegram Ping</span>
              </>
            )}
          </button>
        </div>

        {/* Info banner about COD rule */}
        <div className="bg-amber-50/90 border border-amber-200/80 rounded-xl px-2.5 py-1.5 text-[10px] text-amber-900 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <Bell className="w-3 h-3 text-amber-600 shrink-0" />
            <span>Bot Rules: <strong>လောလောဆယ် အိမ်ရောက်ငွေချေ (COD) မရသေးပါ။</strong> KPay/WavePay ဖြင့်သာ ချေရန် အလိုအလျောက် ဖြေကြားပါသည်။</span>
          </span>
          <span className="font-bold text-amber-700 bg-amber-100/80 px-1.5 py-0.2 rounded">Auto Bot Active</span>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 bg-slate-50 rounded-2xl p-3 border border-slate-200 overflow-y-auto space-y-2.5">
        <div className="text-center my-1">
          <span className="text-[10px] bg-slate-200/80 text-slate-600 px-2 py-0.5 rounded-full font-medium">
            Active Telegram Session & Simulator
          </span>
        </div>

        {/* Render simulated messages */}
        {chatMessages.map((msg) => {
          const isCustomer = msg.sender === 'customer';
          const isBot = msg.sender === 'bot';

          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isCustomer ? 'items-start' : 'items-end'}`}
            >
              <div className="flex items-center gap-1 mb-0.5 text-[9px] text-slate-400">
                {isBot && <Bot className="w-2.5 h-2.5 text-[#5f2eea]" />}
                <span>
                  {isCustomer ? 'Customer (@kyawswar)' : isBot ? settings.botUsername : 'Shop Admin'}
                </span>
                <span>·</span>
                <span>{msg.time}</span>
              </div>

              <div
                className={`max-w-[85%] rounded-2xl px-3 py-2 text-xs leading-relaxed shadow-2xs whitespace-pre-wrap ${
                  isCustomer
                    ? 'bg-white text-slate-800 border border-slate-200 rounded-tl-xs'
                    : isBot
                    ? 'bg-[#5f2eea] text-white rounded-tr-xs'
                    : 'bg-emerald-600 text-white rounded-tr-xs'
                }`}
              >
                {msg.text}
              </div>
            </div>
          );
        })}

        {/* Render real Telegram incoming messages if any */}
        {liveMessages.map((lm) => (
          <div key={lm.id} className="flex flex-col items-start pt-1 border-t border-slate-200/60">
            <div className="flex items-center gap-1 mb-0.5 text-[9px] text-blue-600 font-semibold">
              <span className="bg-blue-100 px-1 rounded text-[8px]">Live Telegram</span>
              <span>{lm.senderName} ({lm.senderHandle})</span>
              <span>·</span>
              <span>{lm.time}</span>
            </div>
            <div className="max-w-[85%] rounded-2xl px-3 py-2 text-xs leading-relaxed bg-white text-slate-900 border border-blue-200 shadow-2xs">
              {lm.text}
            </div>
            {lm.replySent && (
              <div className="flex flex-col items-end w-full mt-1">
                <div className="text-[9px] text-slate-400">Bot Auto-Reply</div>
                <div className="max-w-[85%] rounded-2xl px-3 py-2 text-xs bg-[#5f2eea] text-white rounded-tr-xs whitespace-pre-wrap">
                  {lm.replySent}
                </div>
              </div>
            )}
          </div>
        ))}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompt Chips */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 shrink-0 no-scrollbar">
        {quickPrompts.map((prompt, i) => (
          <button
            key={i}
            onClick={() => {
              sendChatMessage(prompt, 'customer');
            }}
            className="px-2.5 py-1 bg-white border border-slate-200 text-slate-700 hover:border-[#5f2eea] hover:text-[#5f2eea] rounded-full text-[10px] font-semibold whitespace-nowrap shrink-0 transition-colors"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Message input */}
      <div className="flex items-center gap-2 shrink-0">
        <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg text-[10px] shrink-0">
          <button
            type="button"
            onClick={() => setRole('customer')}
            className={`px-2 py-1 rounded font-semibold transition-colors ${
              role === 'customer' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500'
            }`}
          >
            Customer
          </button>
          <button
            type="button"
            onClick={() => setRole('admin')}
            className={`px-2 py-1 rounded font-semibold transition-colors ${
              role === 'admin' ? 'bg-white text-[#5f2eea] shadow-2xs' : 'text-slate-500'
            }`}
          >
            Admin
          </button>
        </div>

        <form onSubmit={handleSend} className="flex gap-2 flex-1">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={
              role === 'customer'
                ? 'မေးခွန်းရိုက်ထည့်ပါ (ဥပမာ- iPhone 16 ဈေး)...'
                : 'ဆိုင်ရှင်အနေဖြင့် ပြန်ကြားရန် ရိုက်ထည့်ပါ...'
            }
            className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#5f2eea]/30"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-[#5f2eea] hover:bg-[#5024cf] text-white rounded-xl font-bold flex items-center justify-center transition-colors shadow-xs active:scale-95"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
