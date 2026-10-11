import React, { useState } from 'react';
import {
  Box,
  Send,
  Phone,
  Copy,
  Check,
  CheckCircle2,
  Clock,
  Truck,
  Trash2,
  Filter,
  Search
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Order, OrderStatus } from '../types';

export const OrdersView: React.FC = () => {
  const {
    orders,
    updateOrderStatus,
    deleteOrder,
    formatPrice,
    settings
  } = useShop();

  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredOrders = orders.filter((order) => {
    const matchStatus = statusFilter === 'all' || order.status === statusFilter;
    const matchSearch =
      !searchQuery ||
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerPhone.includes(searchQuery) ||
      order.customerTelegram.toLowerCase().includes(searchQuery.toLowerCase());
    return matchStatus && matchSearch;
  });

  const handleCopyOrderText = (order: Order) => {
    let msg = `🛍️ *KO CHO MOBILE BOT SHOP — ORDER #${order.orderNumber}*\n\n`;
    msg += `👤 *Customer:* ${order.customerName}\n`;
    msg += `📞 *Phone:* ${order.customerPhone}\n`;
    msg += `✈️ *Telegram:* ${order.customerTelegram}\n`;
    msg += `📍 *Address:* ${order.address}, ${order.city}\n`;
    msg += `💳 *Payment:* ${order.paymentMethod.toUpperCase()} (${order.paymentStatus})\n\n`;
    msg += `🛒 *Items:*\n`;
    order.items.forEach((item, i) => {
      msg += `${i + 1}. ${item.product.name} x ${item.quantity} = ${formatPrice(item.product.price * item.quantity)}\n`;
    });
    msg += `\n💰 *Total:* ${formatPrice(order.total)}`;

    navigator.clipboard.writeText(msg);
    setCopiedId(order.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleChatCustomer = (handle: string) => {
    const clean = handle.replace('@', '');
    window.open(`https://t.me/${clean}`, '_blank');
  };

  return (
    <div className="p-3 sm:p-4 space-y-3 pb-24 text-xs">
      {/* Top Header & Search */}
      <div className="bg-white rounded-2xl p-3 border border-slate-200 shadow-2xs space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Box className="w-5 h-5 text-[#5f2eea]" />
            <h2 className="text-sm font-extrabold text-slate-900">Orders Management</h2>
          </div>
          <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
            {orders.length} Total Orders
          </span>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by order #, phone, customer name..."
            className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#5f2eea]/30"
          />
        </div>

        {/* Status Filter Tabs */}
        <div className="flex gap-1 overflow-x-auto pb-0.5 no-scrollbar text-[11px]">
          {[
            { id: 'all', label: 'All Orders' },
            { id: 'pending', label: 'Pending' },
            { id: 'confirmed', label: 'Confirmed' },
            { id: 'processing', label: 'Processing' },
            { id: 'shipped', label: 'Shipped' },
            { id: 'delivered', label: 'Delivered' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`px-2.5 py-1 rounded-lg font-semibold shrink-0 transition-colors ${
                statusFilter === tab.id
                  ? 'bg-[#5f2eea] text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div className="bg-white rounded-2xl p-8 border border-slate-200 text-center">
          <Box className="w-10 h-10 text-slate-300 mx-auto mb-2" />
          <h4 className="font-bold text-slate-700">No orders found</h4>
          <p className="text-slate-400 text-[11px] mt-0.5">
            Orders placed via web or Telegram bot will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredOrders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-3"
            >
              {/* Order Header */}
              <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-2.5">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-black text-slate-900 text-sm">
                      {order.orderNumber}
                    </span>
                    <span className="text-[10px] text-slate-400">{order.createdAt}</span>
                  </div>
                  <div className="font-semibold text-slate-700 text-xs mt-0.5">
                    {order.customerName}
                  </div>
                </div>

                <div className="flex flex-col items-end">
                  <span className="font-black text-blue-600 text-sm tabular-nums">
                    {formatPrice(order.total)}
                  </span>
                  <span className="text-[10px] font-bold uppercase text-slate-500 bg-slate-100 px-1.5 py-0.2 rounded mt-0.5">
                    {order.paymentMethod} · {order.paymentStatus}
                  </span>
                </div>
              </div>

              {/* Customer Contact & Address */}
              <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-100 text-[11px] space-y-1">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                    <Phone className="w-3 h-3 text-slate-400" />
                    <a href={`tel:${order.customerPhone}`} className="hover:underline font-mono">
                      {order.customerPhone}
                    </a>
                  </div>

                  <button
                    onClick={() => handleChatCustomer(order.customerTelegram)}
                    className="flex items-center gap-1 text-[#5f2eea] font-semibold hover:underline"
                  >
                    <Send className="w-3 h-3" />
                    <span>{order.customerTelegram}</span>
                  </button>
                </div>

                <div className="text-slate-600 truncate">
                  📍 {order.address}, {order.city}
                </div>
                {order.notes && (
                  <div className="text-amber-700 bg-amber-50 p-1.5 rounded text-[10px]">
                    Note: {order.notes}
                  </div>
                )}
              </div>

              {/* Items List */}
              <div className="space-y-1.5">
                {order.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between text-xs py-1 border-b border-slate-50 last:border-0"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <img
                        src={item.product.image}
                        alt=""
                        className="w-7 h-7 rounded-lg object-cover bg-slate-100 shrink-0"
                      />
                      <div className="truncate">
                        <span className="font-medium text-slate-800">{item.product.name}</span>
                        {(item.selectedColor || item.selectedStorage) && (
                          <span className="text-[10px] text-slate-400 ml-1">
                            ({[item.selectedColor, item.selectedStorage].filter(Boolean).join('/')})
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="font-semibold text-slate-700 shrink-0 ml-2 tabular-nums">
                      {item.quantity}x {formatPrice(item.product.price)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Status Updater & Action Bar */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100">
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-bold text-slate-500">Status:</span>
                  <select
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                    className="px-2 py-1 bg-slate-100 border border-slate-200 rounded-lg text-xs font-bold text-slate-800 focus:ring-2 focus:ring-[#5f2eea]/30"
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleCopyOrderText(order)}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-[11px] flex items-center gap-1 transition-colors"
                    title="Copy Telegram markdown format"
                  >
                    {copiedId === order.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    <span>{copiedId === order.id ? 'Copied' : 'Telegram Text'}</span>
                  </button>

                  <button
                    onClick={() => {
                      if (window.confirm(`Delete order ${order.orderNumber}?`)) {
                        deleteOrder(order.id);
                      }
                    }}
                    className="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    title="Delete order"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
