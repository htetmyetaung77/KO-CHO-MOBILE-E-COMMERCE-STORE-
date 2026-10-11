import React, { useState } from 'react';
import { Users, Send, Phone, Award, ShoppingBag, Search } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const UsersView: React.FC = () => {
  const { customers, formatPrice } = useShop();
  const [search, setSearch] = useState('');

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.telegramHandle.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search)
  );

  return (
    <div className="p-3 sm:p-4 space-y-3 pb-24 text-xs">
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-[#5f2eea]" />
            <h2 className="text-sm font-extrabold text-slate-900">Registered Customers</h2>
          </div>
          <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
            {customers.length} Active Users
          </span>
        </div>

        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by customer name, telegram or phone..."
            className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#5f2eea]/30"
          />
        </div>
      </div>

      <div className="space-y-2.5">
        {filtered.map((customer) => (
          <div
            key={customer.id}
            className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-2xs flex items-center justify-between gap-3 hover:shadow-xs transition-shadow"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 text-white font-black text-sm flex items-center justify-center shrink-0 shadow-xs">
                {customer.name.charAt(0)}
              </div>

              <div className="min-w-0">
                <h4 className="font-bold text-slate-900 text-xs truncate">{customer.name}</h4>
                <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                  <span className="font-mono">{customer.phone}</span>
                  <span>·</span>
                  <span className="text-[#5f2eea] font-medium">{customer.telegramHandle}</span>
                </div>
                <div className="flex items-center gap-3 text-[10px] text-slate-400 mt-1">
                  <span>{customer.ordersCount} orders</span>
                  <span>·</span>
                  <span className="font-bold text-emerald-600">{customer.points} Points</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end shrink-0 gap-1.5">
              <span className="font-black text-blue-600 text-xs tabular-nums">
                {formatPrice(customer.totalSpent)}
              </span>

              <a
                href={`https://t.me/${customer.telegramHandle.replace('@', '')}`}
                target="_blank"
                rel="noreferrer"
                className="px-2.5 py-1 bg-slate-100 hover:bg-[#5f2eea] hover:text-white rounded-lg text-slate-700 font-bold text-[10px] flex items-center gap-1 transition-colors"
              >
                <Send className="w-3 h-3" />
                <span>Chat</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
