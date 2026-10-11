import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, Bot, User, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const ChatsView: React.FC = () => {
  const { chatMessages, sendChatMessage, settings } = useShop();
  const [inputText, setInputText] = useState('');
  const [role, setRole] = useState<'customer' | 'admin'>('customer');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendChatMessage(inputText.trim(), role);
    setInputText('');
  };

  const quickPrompts = [
    '/start',
    'iPhone 16 White ရှိလားဗျ?',
    'KPay နံပါတ်ပေးပါ',
    'မန္တလေး ပို့ပေးလား?',
    '1 Year Warranty ပါလား?'
  ];

  return (
    <div className="p-3 sm:p-4 space-y-3 pb-24 text-xs h-[calc(100vh-140px)] flex flex-col">
      {/* Header bar */}
      <div className="bg-white rounded-2xl p-3 border border-slate-200 shadow-2xs flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-purple-50 text-[#5f2eea] flex items-center justify-center">
            <MessageCircle className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-xs font-bold text-slate-900">Telegram Bot Live Chat Simulator</h2>
            <p className="text-[10px] text-slate-400">
              Bot: <span className="font-mono text-[#5f2eea]">{settings.botUsername}</span>
            </p>
          </div>
        </div>

        {/* Sender toggle */}
        <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg text-[10px]">
          <button
            type="button"
            onClick={() => setRole('customer')}
            className={`px-2 py-1 rounded font-semibold transition-colors ${
              role === 'customer' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500'
            }`}
          >
            As Customer
          </button>
          <button
            type="button"
            onClick={() => setRole('admin')}
            className={`px-2 py-1 rounded font-semibold transition-colors ${
              role === 'admin' ? 'bg-white text-[#5f2eea] shadow-2xs' : 'text-slate-500'
            }`}
          >
            As Admin
          </button>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 bg-slate-50 rounded-2xl p-3 border border-slate-200 overflow-y-auto space-y-2.5">
        <div className="text-center my-2">
          <span className="text-[10px] bg-slate-200/80 text-slate-600 px-2 py-0.5 rounded-full font-medium">
            Simulated Telegram Bot Session
          </span>
        </div>

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
                className={`max-w-[85%] rounded-2xl px-3 py-2 text-xs leading-relaxed shadow-2xs ${
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
      <form onSubmit={handleSend} className="flex gap-2 shrink-0">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={
            role === 'customer'
              ? 'Type customer inquiry message...'
              : 'Type shop admin response...'
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
  );
};
