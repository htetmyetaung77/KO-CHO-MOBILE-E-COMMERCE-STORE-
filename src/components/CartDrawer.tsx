import React, { useState } from 'react';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  Ticket,
  Check,
  AlertCircle,
  Truck
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateCartQuantity,
    cartSubtotal,
    formatPrice,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    setIsCheckoutOpen
  } = useShop();

  const [couponInput, setCouponInput] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<{ success: boolean; message: string } | null>(null);

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    setCouponFeedback(res);
    if (res.success) {
      setCouponInput('');
    }
    setTimeout(() => setCouponFeedback(null), 3500);
  };

  const discountAmount = appliedCoupon
    ? appliedCoupon.discountPercent
      ? (cartSubtotal * appliedCoupon.discountPercent) / 100
      : appliedCoupon.discountAmount || 0
    : 0;

  const deliveryEstimate = 3000;
  const finalTotal = Math.max(0, cartSubtotal - discountAmount + (cart.length > 0 ? deliveryEstimate : 0));

  const handleProceedCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-in fade-in"
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#5f2eea]" />
            <h2 className="text-base font-extrabold text-slate-900">Your Cart</h2>
            <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
              {cart.reduce((sum, item) => sum + item.quantity, 0)} items
            </span>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Cart items list */}
        {cart.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
            <div className="w-16 h-16 rounded-full bg-purple-50 text-[#5f2eea] flex items-center justify-center mb-3">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h3 className="text-sm font-bold text-slate-800">Your cart is empty</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-xs">
              Explore our mobile phones, tech accessories, and digital goods to start shopping.
            </p>
            <button
              onClick={() => setIsCartOpen(false)}
              className="mt-4 px-5 py-2.5 rounded-xl bg-[#5f2eea] text-white text-xs font-bold shadow-sm hover:bg-[#5024cf] transition-colors"
            >
              Browse Products
            </button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {cart.map((item, idx) => (
              <div
                key={`${item.product.id}-${idx}`}
                className="bg-white rounded-2xl p-3 border border-slate-200 shadow-2xs flex gap-3 items-center"
              >
                {/* Thumbnail */}
                <div className="w-16 h-16 rounded-xl bg-slate-100 overflow-hidden shrink-0 border border-slate-100">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-slate-900 truncate">
                    {item.product.name}
                  </h4>
                  {(item.selectedColor || item.selectedStorage) && (
                    <div className="text-[10px] text-slate-500 mt-0.5">
                      {[item.selectedColor, item.selectedStorage].filter(Boolean).join(' · ')}
                    </div>
                  )}
                  <div className="text-xs font-extrabold text-blue-600 mt-1 tabular-nums">
                    {formatPrice(item.product.price)}
                  </div>
                </div>

                {/* Quantity Controls & Delete */}
                <div className="flex flex-col items-end gap-1.5 shrink-0">
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-slate-400 hover:text-rose-500 p-0.5 transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center gap-1.5 bg-slate-100 rounded-lg p-0.5">
                    <button
                      onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                      className="w-5 h-5 rounded flex items-center justify-center text-slate-600 hover:bg-white"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-bold text-slate-800 w-4 text-center tabular-nums">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                      className="w-5 h-5 rounded flex items-center justify-center text-slate-600 hover:bg-white"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Coupon Code Input */}
            <div className="pt-2">
              {appliedCoupon ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-2.5 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-emerald-800">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <div>
                      <span className="font-bold">{appliedCoupon.code}</span>
                      <span className="text-[11px] text-emerald-700 ml-1.5">
                        (-{formatPrice(discountAmount)})
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-slate-400 hover:text-rose-600 text-[11px] font-semibold"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <div className="relative flex-1">
                    <Ticket className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      placeholder="Coupon Code (e.g. WELCOME10)"
                      className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs uppercase text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#5f2eea]/30"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold transition-colors"
                  >
                    Apply
                  </button>
                </form>
              )}

              {couponFeedback && (
                <div
                  className={`mt-1.5 text-[11px] flex items-center gap-1 ${
                    couponFeedback.success ? 'text-emerald-600' : 'text-rose-600'
                  }`}
                >
                  {couponFeedback.success ? <Check className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                  <span>{couponFeedback.message}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Footer Summary */}
        {cart.length > 0 && (
          <div className="p-4 bg-slate-50 border-t border-slate-100 space-y-2 text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal</span>
              <span className="font-semibold text-slate-900 tabular-nums">{formatPrice(cartSubtotal)}</span>
            </div>

            {discountAmount > 0 && (
              <div className="flex justify-between text-emerald-600">
                <span>Discount</span>
                <span className="font-semibold tabular-nums">-{formatPrice(discountAmount)}</span>
              </div>
            )}

            <div className="flex justify-between text-slate-600">
              <span>Estimated Delivery (Yangon/Gate)</span>
              <span className="font-semibold text-slate-900 tabular-nums">{formatPrice(deliveryEstimate)}</span>
            </div>

            <div className="flex justify-between text-sm font-extrabold text-slate-900 pt-2 border-t border-slate-200">
              <span>Total Amount</span>
              <span className="text-blue-600 tabular-nums">{formatPrice(finalTotal)}</span>
            </div>

            {/* Cash on Delivery Direct Button */}
            <button
              onClick={handleProceedCheckout}
              className="w-full mt-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 active:scale-98 text-xs"
            >
              <Truck className="w-4 h-4 stroke-[2.4]" />
              <span>🚚 အိမ်ရောက်ငွေချေ (Cash on Delivery) မှာမည်</span>
            </button>

            {/* Other Checkout */}
            <button
              onClick={handleProceedCheckout}
              className="w-full py-2.5 px-4 rounded-xl bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 font-bold shadow-2xs transition-all flex items-center justify-center gap-2 active:scale-98 text-xs"
            >
              <span>KPay / WavePay / Telegram မှာယူမည်</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
