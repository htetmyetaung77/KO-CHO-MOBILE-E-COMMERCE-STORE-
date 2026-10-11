import React, { useState } from 'react';
import {
  X,
  ShoppingCart,
  Send,
  Check,
  ShieldCheck,
  Truck,
  RotateCcw,
  Copy,
  CheckCheck
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const ProductDetailModal: React.FC = () => {
  const {
    selectedProductDetail,
    setSelectedProductDetail,
    addToCart,
    setIsCartOpen,
    formatPrice,
    settings,
    customization,
    setIsCheckoutOpen
  } = useShop();

  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedStorage, setSelectedStorage] = useState<string>('');
  const [copied, setCopied] = useState(false);

  if (!selectedProductDetail) return null;

  const product = selectedProductDetail;

  const currentColor = selectedColor || product.colors?.[0] || '';
  const currentStorage = selectedStorage || product.storage?.[0] || '';

  const handleAddToCart = () => {
    addToCart(product, quantity, currentColor, currentStorage);
    setSelectedProductDetail(null);
    setIsCartOpen(true);
  };

  const handleCashOnDelivery = () => {
    addToCart(product, quantity, currentColor, currentStorage);
    setSelectedProductDetail(null);
    setIsCheckoutOpen(true);
  };

  // Generate Telegram Direct Order Text
  const generateTelegramMessage = () => {
    const text = `🛍️ *NEW ORDER INQUIRY*\n` +
      `Product: *${product.name}*\n` +
      (currentColor ? `Color: *${currentColor}*\n` : '') +
      (currentStorage ? `Storage: *${currentStorage}*\n` : '') +
      `Quantity: *${quantity}*\n` +
      `Price: *${formatPrice(product.price * quantity)}*\n\n` +
      `I would like to order this item. Please confirm availability & delivery.`;
    return text;
  };

  const handleOrderOnTelegram = () => {
    const message = generateTelegramMessage();
    const encoded = encodeURIComponent(message);
    const botUser = settings.botUsername.replace('@', '');
    const tgUrl = `https://t.me/${botUser}?start=order_${product.id}`;

    // Also copy to clipboard for convenience
    navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);

    // Open telegram
    window.open(tgUrl, '_blank');
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(generateTelegramMessage());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-100 overflow-hidden">
        {/* Modal Header */}
        <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            {product.category}
          </span>
          <button
            onClick={() => setSelectedProductDetail(null)}
            className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4 text-xs">
          {/* Main Product Image */}
          <div className="relative aspect-4/3 rounded-2xl bg-slate-100 overflow-hidden border border-slate-200">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src =
                  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"><rect fill="%23f1f5f9" width="400" height="300"/><text fill="%2364748b" font-size="16" x="50%25" y="50%25" text-anchor="middle">' +
                  encodeURIComponent(product.name) +
                  '</text></svg>';
              }}
            />

            <div className="absolute top-3 left-3">
              {product.inStock ? (
                <span className="bg-emerald-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-lg shadow-sm uppercase tracking-wide">
                  IN STOCK ({product.stockCount} AVAILABLE)
                </span>
              ) : (
                <span className="bg-rose-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-lg shadow-sm uppercase tracking-wide">
                  OUT OF STOCK
                </span>
              )}
            </div>
          </div>

          {/* Title & Price */}
          <div>
            <h2 className="text-lg font-extrabold text-slate-900 leading-snug">
              {product.name}
            </h2>

            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-xl font-black text-blue-600 tabular-nums">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-xs text-slate-400 line-through tabular-nums">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
          </div>

          {/* Color Selection */}
          {product.colors && product.colors.length > 0 && (
            <div>
              <label className="block font-bold text-slate-700 mb-1.5">
                Select Color: <span className="font-semibold text-purple-600">{currentColor}</span>
              </label>
              <div className="flex flex-wrap gap-1.5">
                {product.colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setSelectedColor(c)}
                    className={`px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                      currentColor === c
                        ? 'border-[#5f2eea] bg-purple-50 text-[#5f2eea] shadow-xs'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Storage Selection */}
          {product.storage && product.storage.length > 0 && (
            <div>
              <label className="block font-bold text-slate-700 mb-1.5">
                Select Storage / Variant: <span className="font-semibold text-purple-600">{currentStorage}</span>
              </label>
              <div className="flex flex-wrap gap-1.5">
                {product.storage.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedStorage(s)}
                    className={`px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all ${
                      currentStorage === s
                        ? 'border-[#5f2eea] bg-purple-50 text-[#5f2eea] shadow-xs'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Stepper */}
          <div className="flex items-center justify-between py-2 border-y border-slate-100">
            <span className="font-bold text-slate-700">Quantity</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold flex items-center justify-center transition-colors"
              >
                -
              </button>
              <span className="w-8 text-center font-bold text-sm text-slate-900 tabular-nums">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold flex items-center justify-center transition-colors"
              >
                +
              </button>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="font-bold text-slate-800 mb-1">Description</h4>
            <p className="text-slate-600 leading-relaxed">{product.description}</p>
          </div>

          {/* Specs Table */}
          {product.specs && Object.keys(product.specs).length > 0 && (
            <div className="bg-slate-50 rounded-2xl p-3 border border-slate-100">
              <h4 className="font-bold text-slate-800 mb-2">Technical Specifications</h4>
              <div className="space-y-1.5">
                {Object.entries(product.specs).map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-2 text-[11px] py-1 border-b border-slate-200/60 last:border-0">
                    <span className="text-slate-500 font-medium">{k}</span>
                    <span className="text-slate-800 font-semibold text-right">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Trust Guarantees */}
          <div className="grid grid-cols-3 gap-2 text-center text-[10px] text-slate-600 pt-1">
            <div className="p-2 bg-slate-50 rounded-xl flex flex-col items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span className="font-semibold">100% Genuine</span>
            </div>
            <div className="p-2 bg-slate-50 rounded-xl flex flex-col items-center gap-1">
              <Truck className="w-4 h-4 text-blue-600" />
              <span className="font-semibold">Fast Gate/COD</span>
            </div>
            <div className="p-2 bg-slate-50 rounded-xl flex flex-col items-center gap-1">
              <RotateCcw className="w-4 h-4 text-purple-600" />
              <span className="font-semibold">Warranty Protected</span>
            </div>
          </div>
        </div>

        {/* Modal Bottom Buy Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 space-y-2">
          {/* Instant Cash on Delivery Button */}
          <button
            onClick={handleCashOnDelivery}
            className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 active:scale-98"
          >
            <Truck className="w-4 h-4 stroke-[2.4]" />
            <span>🚚 အိမ်ရောက်ငွေချေ (Cash on Delivery) မှာယူမည်</span>
          </button>

          <div className="flex gap-2">
            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              className="flex-1 py-2.5 px-3 rounded-xl bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 font-bold shadow-2xs transition-colors flex items-center justify-center gap-1.5 active:scale-98 text-xs"
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>Add to Cart</span>
            </button>

            {/* Buy on Telegram */}
            <button
              onClick={handleOrderOnTelegram}
              className="flex-1 py-2.5 px-3 rounded-xl bg-[#5f2eea] hover:bg-[#5024cf] text-white font-bold shadow-md shadow-purple-600/20 transition-colors flex items-center justify-center gap-1.5 active:scale-98 text-xs"
            >
              <Send className="w-3.5 h-3.5 stroke-[2.4]" />
              <span>⚡ {customization?.orderButtonLabel || 'Buy Now'}</span>
            </button>

            {/* Copy Message button */}
            <button
              onClick={handleCopyText}
              className="p-2.5 rounded-xl bg-slate-200/80 hover:bg-slate-300 text-slate-700 transition-colors"
              title="Copy Telegram Order Message format"
            >
              {copied ? <CheckCheck className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
