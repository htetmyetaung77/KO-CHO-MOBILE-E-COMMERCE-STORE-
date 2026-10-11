import React, { useState } from 'react';
import {
  X,
  Send,
  CheckCircle2,
  Copy,
  QrCode,
  CreditCard,
  Truck,
  Phone,
  User,
  MapPin,
  Check,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PaymentMethod, Order } from '../types';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartSubtotal,
    appliedCoupon,
    formatPrice,
    paymentConfig,
    settings,
    createOrder,
    deliveryZones
  } = useShop();

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('09');
  const [customerTelegram, setCustomerTelegram] = useState('@');
  const [city, setCity] = useState('Yangon');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('kpay');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);
  const [copied, setCopied] = useState(false);

  if (!isCheckoutOpen) return null;

  const discountAmount = appliedCoupon
    ? appliedCoupon.discountPercent
      ? (cartSubtotal * appliedCoupon.discountPercent) / 100
      : appliedCoupon.discountAmount || 0
    : 0;

  const currentZone = deliveryZones.find((z) => z.name.includes(city)) || deliveryZones[0];
  const deliveryFee = currentZone ? currentZone.fee : 3000;
  const finalTotal = Math.max(0, cartSubtotal - discountAmount + deliveryFee);

  const formatTelegramOrderMarkdown = (order: Order) => {
    let msg = `🛍️ *KO CHO MOBILE BOT SHOP — ORDER #${order.orderNumber}*\n\n`;
    msg += `👤 *Customer:* ${order.customerName}\n`;
    msg += `📞 *Phone:* ${order.customerPhone}\n`;
    msg += `✈️ *Telegram:* ${order.customerTelegram}\n`;
    msg += `📍 *Delivery Address:* ${order.address}, ${order.city}\n`;
    msg += `💳 *Payment Method:* ${order.paymentMethod.toUpperCase()}\n\n`;
    msg += `🛒 *ORDER ITEMS:*\n`;

    order.items.forEach((item, index) => {
      const variant = [item.selectedColor, item.selectedStorage].filter(Boolean).join(' / ');
      msg += `${index + 1}. *${item.product.name}* ${variant ? `(${variant})` : ''} x ${item.quantity} = ${formatPrice(item.product.price * item.quantity)}\n`;
    });

    if (order.discount > 0) {
      msg += `🎁 *Discount:* -${formatPrice(order.discount)}\n`;
    }
    msg += `🚚 *Delivery Fee:* ${formatPrice(order.deliveryFee)}\n`;
    msg += `💰 *TOTAL AMOUNT:* *${formatPrice(order.total)}*\n\n`;
    if (order.notes) {
      msg += `📝 *Notes:* ${order.notes}\n\n`;
    }
    msg += `⚡ Order placed via telegramecommerce.shop`;
    return msg;
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim() || !address.trim()) {
      alert('Please fill in your name, phone number, and address.');
      return;
    }

    setIsSubmitting(true);

    const newOrder = createOrder({
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      customerTelegram: customerTelegram.trim() || '@customer',
      address: address.trim(),
      city,
      items: [...cart],
      subtotal: cartSubtotal,
      deliveryFee,
      discount: discountAmount,
      total: finalTotal,
      paymentMethod,
      paymentStatus: paymentMethod === 'cod' ? 'pending' : 'paid',
      status: 'pending',
      notes: notes.trim()
    });

    setCompletedOrder(newOrder);
    setIsSubmitting(false);

    // Copy to clipboard
    const telegramText = formatTelegramOrderMarkdown(newOrder);
    navigator.clipboard.writeText(telegramText);
  };

  const handleOpenTelegram = () => {
    if (!completedOrder) return;
    const msg = formatTelegramOrderMarkdown(completedOrder);
    const botUser = settings.botUsername.replace('@', '');
    const tgUrl = `https://t.me/${botUser}?start=order_${completedOrder.orderNumber}`;
    window.open(tgUrl, '_blank');
  };

  const handleCopyReceipt = () => {
    if (!completedOrder) return;
    const msg = formatTelegramOrderMarkdown(completedOrder);
    navigator.clipboard.writeText(msg);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setCompletedOrder(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-100 overflow-hidden">
        {/* Modal Header */}
        <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Send className="w-5 h-5 text-[#5f2eea]" />
            <h2 className="text-base font-extrabold text-slate-900">
              {completedOrder ? 'Order Confirmed' : 'Telegram Checkout'}
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Zero-Login Banner */}
        <div className="bg-emerald-50 border-b border-emerald-100 px-4 py-2 flex items-center justify-between text-[11px] text-emerald-800">
          <div className="flex items-center gap-1.5 font-bold">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>အကောင့်ဝင်ရန်မလိုပါ · အိမ်ရောက်ငွေချေ (COD) တိုက်ရိုက်မှာယူနိုင်ပါသည်</span>
          </div>
          <span className="text-[10px] bg-emerald-600 text-white font-bold px-1.5 py-0.5 rounded shrink-0">
            Direct Order
          </span>
        </div>

        {/* Modal Content */}
        {completedOrder ? (
          /* Order Confirmed Screen */
          <div className="p-6 overflow-y-auto space-y-4 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 className="w-9 h-9 stroke-[2.2]" />
            </div>

            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                Order Placed Successfully
              </span>
              <h3 className="text-xl font-black text-slate-900 mt-0.5">
                {completedOrder.orderNumber}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Your order is recorded and ready to send to our Telegram Bot!
              </p>
            </div>

            {completedOrder.paymentMethod === 'cod' && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3 text-emerald-900 text-xs text-left space-y-1">
                <div className="font-extrabold flex items-center gap-1.5 text-emerald-800">
                  <Truck className="w-4 h-4 text-emerald-600" />
                  <span>အိမ်ရောက်ငွေချေ (Cash on Delivery) အော်ဒါ အတည်ပြုပြီးပါပြီ</span>
                </div>
                <p className="text-[11px] text-emerald-700">
                  ပစ္စည်းရောက်ရှိချိန်တွင် ကျသင့်ငွေ {formatPrice(completedOrder.total)} ကို ပေးချေနိုင်ပါပြီ။ မကြာမီ ပို့ဆောင်ရေးမှ ဖုန်းဆက်ပြီး လာပို့ပေးပါမည်။
                </p>
              </div>
            )}

            {/* Receipt Summary Card */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-left text-xs space-y-2">
              <div className="flex justify-between pb-2 border-b border-slate-200">
                <span className="text-slate-500">Customer</span>
                <span className="font-bold text-slate-900">{completedOrder.customerName}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-slate-200">
                <span className="text-slate-500">Phone</span>
                <span className="font-bold text-slate-900">{completedOrder.customerPhone}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-slate-200">
                <span className="text-slate-500">Payment</span>
                <span className="font-bold uppercase text-[#5f2eea]">
                  {completedOrder.paymentMethod}
                </span>
              </div>
              <div className="flex justify-between pt-1 font-bold text-sm text-slate-900">
                <span>Total</span>
                <span className="text-blue-600">{formatPrice(completedOrder.total)}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-2">
              <button
                onClick={handleOpenTelegram}
                className="w-full py-3.5 px-4 rounded-xl bg-[#5f2eea] hover:bg-[#5024cf] text-white font-bold text-sm shadow-md shadow-purple-600/30 transition-all flex items-center justify-center gap-2 active:scale-98"
              >
                <Send className="w-4 h-4 stroke-[2.4]" />
                <span>Open in Telegram ({settings.botUsername})</span>
              </button>

              <button
                onClick={handleCopyReceipt}
                className="w-full py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs transition-colors flex items-center justify-center gap-2"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied to Clipboard!' : 'Copy Formatted Telegram Message'}</span>
              </button>
            </div>
          </div>
        ) : (
          /* Checkout Form */
          <form onSubmit={handleSubmitOrder} className="flex-1 overflow-y-auto p-5 space-y-4 text-xs">
            {/* Step 1: Customer Contact */}
            <div>
              <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-1.5 text-xs">
                <User className="w-3.5 h-3.5 text-[#5f2eea]" />
                <span>1. Contact & Customer Details</span>
              </h3>

              <div className="space-y-2">
                <div>
                  <label className="block text-slate-600 mb-1 font-medium">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Ko Kyaw Swar"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs focus:ring-2 focus:ring-[#5f2eea]/30"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-slate-600 mb-1 font-medium">
                      Phone Number <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="09..."
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 mb-1 font-medium">Telegram Handle</label>
                    <input
                      type="text"
                      value={customerTelegram}
                      onChange={(e) => setCustomerTelegram(e.target.value)}
                      placeholder="@username"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: Shipping Address */}
            <div>
              <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-1.5 text-xs">
                <MapPin className="w-3.5 h-3.5 text-[#5f2eea]" />
                <span>2. Delivery Address</span>
              </h3>

              <div className="space-y-2">
                <div>
                  <label className="block text-slate-600 mb-1 font-medium">Region / City</label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs font-medium"
                  >
                    <option value="Yangon">Yangon (Downtown & Townships) - 3,000 MMK</option>
                    <option value="Mandalay">Mandalay (Express Gate Delivery) - 4,500 MMK</option>
                    <option value="Naypyidaw">Naypyidaw (Gate Delivery) - 5,500 MMK</option>
                    <option value="Bago">Bago - 4,000 MMK</option>
                    <option value="Taunggyi">Taunggyi (Shan State) - 6,000 MMK</option>
                    <option value="Other">Other Township (Express Gate)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-600 mb-1 font-medium">
                    Detailed Address / Street <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="e.g. No. 42, Hledan 1st Street, Kamayut Township"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 mb-1 font-medium">Order Notes / Landmark</label>
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="e.g. Call before coming, near City Mart"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-xs"
                  />
                </div>
              </div>
            </div>

            {/* Step 3: Payment Method */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-slate-900 flex items-center gap-1.5 text-xs">
                  <CreditCard className="w-3.5 h-3.5 text-[#5f2eea]" />
                  <span>3. Payment Method (ငွေပေးချေမှုစနစ်)</span>
                </h3>
                <span className="text-[10px] text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full font-bold">
                  ⚠️ COD မရသေးပါ
                </span>
              </div>

              {/* Notice that Cash on delivery is not available yet */}
              <div className="mb-2 p-2.5 rounded-xl bg-amber-50/80 border border-amber-200 text-[11px] text-amber-900 flex items-center gap-2">
                <span className="text-sm">⚠️</span>
                <span>
                  <strong>လောလောဆယ် အိမ်ရောက်ငွေချေ (COD) မရသေးပါ။</strong> KBZPay သို့မဟုတ် WavePay ဖြင့် ငွေလွှဲပေးချေနိုင်ပါသည်ခင်ဗျာ။
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'kpay', name: 'KBZPay', mmk: 'KPay လွှဲမည်', badge: 'Recommended', available: true },
                  { id: 'wavepay', name: 'WavePay', mmk: 'WavePay', badge: 'Instant', available: true },
                  { id: 'cbpay', name: 'CB Bank', mmk: 'CB Bank', badge: 'Bank Pay', available: true }
                ].map((p) => {
                  const isSelected = paymentMethod === p.id;
                  return (
                    <button
                      type="button"
                      key={p.id}
                      onClick={() => setPaymentMethod(p.id as PaymentMethod)}
                      className={`p-2.5 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1 ${
                        isSelected
                          ? 'border-[#5f2eea] bg-purple-50/80 text-[#5f2eea] shadow-xs ring-1 ring-[#5f2eea]'
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span className="font-black text-xs">{p.name}</span>
                      <span className="text-[9px] font-bold text-slate-600 leading-none">
                        {p.mmk}
                      </span>
                      <span className="text-[8px] font-bold px-1.5 py-0.2 rounded border bg-white text-purple-700 border-purple-200">
                        {p.badge}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Payment Details Box for KBZPay */}
              {paymentMethod === 'kpay' && (
                <div className="mt-2.5 p-3 rounded-2xl bg-blue-50 border border-blue-200 text-[11px] space-y-1.5">
                  <div className="flex items-center justify-between text-blue-900 font-bold">
                    <span>KBZPay Account Details:</span>
                    <span className="text-[10px] bg-blue-600 text-white px-1.5 py-0.2 rounded font-semibold">
                      0% Fee
                    </span>
                  </div>
                  <div className="text-slate-700">
                    <div>
                      Phone: <span className="font-mono font-bold text-blue-900">{paymentConfig.kpayPhone}</span>
                    </div>
                    <div>
                      Account Name: <span className="font-bold">{paymentConfig.kpayName}</span>
                    </div>
                  </div>
                  <p className="text-[10px] text-blue-700 leading-tight">
                    * ငွေလွှဲပြီးပါက screenshot ပြေစာအား Telegram chat တွင် ပေးပို့ပေးပါရန်။
                  </p>
                </div>
              )}

              {/* Payment Details Box for WavePay */}
              {paymentMethod === 'wavepay' && (
                <div className="mt-2.5 p-3 rounded-2xl bg-amber-50 border border-amber-200 text-[11px] space-y-1.5">
                  <div className="flex items-center justify-between text-amber-900 font-bold">
                    <span>WavePay Account Details:</span>
                    <span className="text-[10px] bg-amber-600 text-white px-1.5 py-0.2 rounded font-semibold">
                      Instant
                    </span>
                  </div>
                  <div className="text-slate-700">
                    <div>
                      Phone: <span className="font-mono font-bold text-amber-900">{paymentConfig.wavePhone}</span>
                    </div>
                    <div>
                      Account Name: <span className="font-bold">{paymentConfig.waveName}</span>
                    </div>
                  </div>
                  <p className="text-[10px] text-amber-700 leading-tight">
                    * WavePay ဖြင့် အလွယ်တကူငွေလွှဲနိုင်ပါသည်။
                  </p>
                </div>
              )}

              {/* Payment Details Box for CB Bank */}
              {paymentMethod === 'cbpay' && (
                <div className="mt-2.5 p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-[11px] space-y-1.5">
                  <div className="flex items-center justify-between text-emerald-900 font-bold">
                    <span>CB Bank Account:</span>
                    <span className="text-[10px] bg-emerald-600 text-white px-1.5 py-0.2 rounded font-semibold">
                      Direct
                    </span>
                  </div>
                  <div className="text-slate-700">
                    <div>
                      Account No: <span className="font-mono font-bold text-emerald-900">{paymentConfig.cbAccount}</span>
                    </div>
                    <div>
                      Account Name: <span className="font-bold">{paymentConfig.cbName}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Price Breakdown */}
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-1 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal ({cart.length} items)</span>
                <span className="font-semibold tabular-nums">{formatPrice(cartSubtotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600">
                  <span>Coupon Discount</span>
                  <span className="font-semibold tabular-nums">-{formatPrice(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-600">
                <span>Delivery Fee ({city})</span>
                <span className="font-semibold tabular-nums">{formatPrice(deliveryFee)}</span>
              </div>
              <div className="flex justify-between font-extrabold text-sm text-slate-900 pt-1.5 border-t border-slate-200">
                <span>Total Due</span>
                <span className="text-blue-600 tabular-nums">{formatPrice(finalTotal)}</span>
              </div>
            </div>

            {/* Submit Action */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-4 rounded-xl bg-[#5f2eea] hover:bg-[#5024cf] text-white font-bold text-xs shadow-md shadow-purple-600/30 transition-all flex items-center justify-center gap-2 active:scale-98 disabled:opacity-50"
            >
              <Send className="w-4 h-4 stroke-[2.4]" />
              <span>အော်ဒါတင်ပြီး Telegram သို့ ပို့မည် (Complete Order)</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
