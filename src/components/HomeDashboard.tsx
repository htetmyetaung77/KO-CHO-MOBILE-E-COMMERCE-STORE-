import React from 'react';
import {
  TrendingUp,
  Box,
  ShoppingBag,
  Users,
  Send,
  Plus,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle,
  Clock,
  Truck
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const HomeDashboard: React.FC = () => {
  const {
    settings,
    orders,
    products,
    customers,
    formatPrice,
    setActiveTab,
    setIsNewProductModalOpen,
    setActiveDrawerModal
  } = useShop();

  const totalRevenue = orders.reduce((acc, o) => acc + o.total, 0);
  const pendingOrders = orders.filter((o) => o.status === 'pending');
  const deliveredOrders = orders.filter((o) => o.status === 'delivered');

  return (
    <div className="p-4 space-y-4 pb-24 text-xs">
      {/* Top Welcome & KPI Summary Banner */}
      <div className="bg-gradient-to-br from-[#5925dc] via-[#6332ec] to-[#7b42f6] text-white rounded-3xl p-5 shadow-md">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold text-purple-200">Shop Overview</span>
          <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-bold">
            Live Telegram Bot Active
          </span>
        </div>

        <div className="mt-2">
          <div className="text-[11px] text-purple-100 font-medium">Today's Sales Revenue</div>
          <div className="text-2xl font-black tracking-tight tabular-nums mt-0.5">
            {formatPrice(settings.todayRevenue)}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-white/15 text-center">
          <div>
            <div className="text-[10px] text-purple-200">Total Orders</div>
            <div className="text-base font-extrabold tabular-nums mt-0.5">{orders.length}</div>
          </div>
          <div>
            <div className="text-[10px] text-purple-200">In-Stock Products</div>
            <div className="text-base font-extrabold tabular-nums mt-0.5">
              {products.filter((p) => p.inStock).length}
            </div>
          </div>
          <div>
            <div className="text-[10px] text-purple-200">Subscribers</div>
            <div className="text-base font-extrabold tabular-nums mt-0.5">1,420+</div>
          </div>
        </div>
      </div>

      {/* Quick Action Cards */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => setIsNewProductModalOpen(true)}
          className="p-3.5 bg-white rounded-2xl border border-slate-200/80 shadow-2xs hover:shadow-xs transition-all text-left flex items-center justify-between group"
        >
          <div>
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-[#5f2eea] flex items-center justify-center mb-1.5">
              <Plus className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div className="font-bold text-slate-900 text-xs">Add Product</div>
            <div className="text-[10px] text-slate-500">Post phone or gadget</div>
          </div>
          <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-[#5f2eea] transition-colors" />
        </button>

        <button
          onClick={() => setActiveDrawerModal('broadcast')}
          className="p-3.5 bg-white rounded-2xl border border-slate-200/80 shadow-2xs hover:shadow-xs transition-all text-left flex items-center justify-between group"
        >
          <div>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-1.5">
              <Send className="w-4 h-4" />
            </div>
            <div className="font-bold text-slate-900 text-xs">Broadcast</div>
            <div className="text-[10px] text-slate-500">Send to all users</div>
          </div>
          <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 transition-colors" />
        </button>
      </div>

      {/* Weekly Sales Chart (Visual Bar representation) */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-900 text-xs">Sales Activity (This Week)</h3>
            <p className="text-[10px] text-slate-400">Total {formatPrice(totalRevenue)}</p>
          </div>
          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
            +24.5% vs last week
          </span>
        </div>

        <div className="h-28 flex items-end justify-between gap-2 pt-2 px-1">
          {[
            { day: 'Mon', val: 40, amt: '2.1M' },
            { day: 'Tue', val: 65, amt: '3.4M' },
            { day: 'Wed', val: 50, amt: '2.8M' },
            { day: 'Thu', val: 80, amt: '4.2M' },
            { day: 'Fri', val: 95, amt: '5.1M' },
            { day: 'Sat', val: 100, amt: '5.6M' },
            { day: 'Sun', val: 60, amt: '3.3M' }
          ].map((bar, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center gap-1 group">
              <div className="text-[9px] font-bold text-slate-400 group-hover:text-[#5f2eea] transition-colors tabular-nums">
                {bar.amt}
              </div>
              <div
                className="w-full rounded-lg bg-slate-100 group-hover:bg-[#5f2eea] transition-colors relative"
                style={{ height: `${bar.val}%` }}
              >
                <div
                  className="w-full bg-[#5f2eea] rounded-lg absolute bottom-0"
                  style={{ height: `${bar.val * 0.7}%` }}
                />
              </div>
              <span className="text-[10px] text-slate-500 font-medium">{bar.day}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Orders Section */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-900 text-xs">Recent Orders</h3>
          <button
            onClick={() => setActiveTab('orders')}
            className="text-[11px] font-bold text-[#5f2eea] hover:underline"
          >
            View All ({orders.length})
          </button>
        </div>

        <div className="space-y-2">
          {orders.slice(0, 3).map((order) => (
            <div
              key={order.id}
              onClick={() => setActiveTab('orders')}
              className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between cursor-pointer hover:bg-purple-50/50 transition-colors"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900">{order.orderNumber}</span>
                  <span className="text-slate-400">·</span>
                  <span className="text-slate-600 font-medium">{order.customerName}</span>
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  {order.items.length} items · {order.city} · {order.paymentMethod.toUpperCase()}
                </div>
              </div>

              <div className="text-right">
                <div className="font-bold text-blue-600 tabular-nums">
                  {formatPrice(order.total)}
                </div>
                <span
                  className={`inline-block text-[9px] font-bold px-1.5 py-0.2 rounded-full uppercase mt-0.5 ${
                    order.status === 'confirmed' || order.status === 'processing'
                      ? 'bg-blue-100 text-blue-700'
                      : order.status === 'shipped'
                      ? 'bg-amber-100 text-amber-700'
                      : order.status === 'delivered'
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
